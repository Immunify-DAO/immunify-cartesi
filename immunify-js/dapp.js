const { ethers } = require("ethers");
const { encryptData, decryptData } = require("./encryption_module/encrypt");
const { insertRowPatient, getRowPatient} = require("./middleware/patient/patientSchema");
const { insertRowConsultation, getRowConsultation } = require("./middleware/consultations/consultationSchema");
const { insertRowRecord, getRowRecord} = require("./middleware/authentication/recordOfficers/auth");
const { insertRowDoctor, getRowDoctor} = require("./middleware/authentication/doctors/auth");


const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);

//////////////////////////////////
/////////Admin Handler////////////
//////////////////////////////////

async function handle_add_record_addr(address, name) {
    const lastId = await insertRowRecord(address, name);
    console.log(`Added a new record officer with the ID: ${lastId}`); 
}

async function handle_add_doctor_addr(address, name) {
    const lastId = await insertRowDoctor(address, name);
    console.log(`Added a new Doctor with the ID: ${lastId}`); 
}

async function handle_get_doctor_addr(address) {
    const lastId = await getRowDoctor(address);
    console.log(`Hello Doctor: ${lastId}`);
    const id = lastId[0];
    console.log(id);
    return id;
}

//////////////////////////////////
/////////Patient Handler//////////
//////////////////////////////////

// POST Patient Handler
async function handle_add_patient(address, name, age) {
    const lastId = await insertRowPatient(address, name, age);
    console.log(`Added a new patient with the ID: ${lastId}`);
}

// GET Patient Handler
async function handle_get_patient(address) {
    const patient = await getRowPatient(address);
    console.log(`Patient Data: ${patient}`);
}

//////////////////////////////////
///////Consultation Handler///////
//////////////////////////////////

// POST Consultation Handler
async function handle_add_consultation(history) {
    const lastId = await insertRowConsultation(history);
    console.log(`Added a new consultation with the ID: ${lastId}`);
}

// GET Consultation Handler
async function handle_get_consultation(id) {
    const patient = await getRowPatient(id);
    console.log(`Patient Data: ${patient}`);
}

//////////////////////////////////
///////////Encryption/////////////
//////////////////////////////////
async function handle_encrypt(data) {
    const encrypted = await encryptData(data);
    console.log(`Here is the encrypted result: ${encrypted}`);
}

async function handle_advance(data) {
    console.log("Received advance request data " + JSON.stringify(data));
    const payload = data.payload;
    const payloadStr = ethers.utils.toUtf8String(payload);

    const sender = data.metadata.msg_sender;
    console.log(`The caller of this contract is ${sender}`);

    const inputArr = payloadStr.split(" ");
    
    console.log(inputArr);
    try {
        console.log(`Adding notice "${payloadStr}"`);

        const selector = inputArr[0];
        const method = inputArr[1];
        const addr = inputArr[2];
        
        if (selector == "patient") {
            
            parseInt(inputArr[4], 10);
            const patientData = inputArr.slice(2, 5);
            
            switch (method) {
                case 'GET':
                    console.log('Fetching Data');
                    if (addr) {
                        await handle_get_patient(addr);
                    } else {
                        console.log('Invalid input: address must be defined');
                    }
                    break;
                    case 'POST':
                        console.log('Posting Data');
                        await handle_add_patient(...patientData);
                        break;
                        default:
                            console.log('Invalid patient handler method:', method);
                        }
                        
        } else if (selector == "consultation") {
                        
            const consultationData = inputArr[2];
            const id = parseInt(addr);

            switch (method) {
                case 'GET':
                    console.log('Fetching Cousultation Data');
                    await handle_get_consultation(id);
                    break;
                case 'POST':
                    console.log('Adding Consultation Data');
                    console.log('Validating Credentials...');

                    // const res = await handle_get_doctor_addr(sender);
                    // console.log(res[0]);
                    // console.log("Credentials Validated");

                    // const encrData = await handle_encrypt(consultationData);
                    await handle_add_consultation(consultationData);

                    break;
                default:
                    console.log('Invalid Consultation handler method:', method);
            }

        } else if (selector == "adminfunc") {
            
            switch (method) {
                case 'POST-R':
                    console.log("Adding to Record permission list");
                    await handle_add_record_addr(...inputArr.slice(2,4));
                    break;
                case 'POST-D':
                    console.log("Adding to Doctors permission list");
                    await handle_add_doctor_addr(...inputArr.slice(2,4));
                    break;
            }
        } else {
            console.log("No Matching API");
        }
    } catch (e) {
        console.log(`Adding notice with binary value "${payload}"`);
    }

    const advance_req = await fetch(rollup_server + '/notice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ payload })
    });
    const json = await advance_req.json();
    console.log("Received notice status " + advance_req.status + " with body " + JSON.stringify(json));
    return "accept";
}

async function handle_inspect(data) {
    console.log("Received inspect request data " + JSON.stringify(data));
    const payload = data["payload"];
    try {
        const payloadStr = ethers.utils.toUtf8String(payload);
        console.log(`Adding report "${payloadStr}"`);
    } catch (e) {
        console.log(`Adding report with binary value "${payload}"`);
    }
    const inspect_req = await fetch(rollup_server + '/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ payload })
    });
    console.log("Received report status " + inspect_req.status);
    return "accept";
}

var handlers = {
    advance_state: handle_advance,
    inspect_state: handle_inspect,
}

var finish = { status: "accept" };
var rollup_address = null;

(async () => {
    while (true) {
        console.log("Sending finish")

        const finish_req = await fetch(rollup_server + '/finish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'accept' })
        });

        console.log("Received finish status " + finish_req.status);


        if (finish_req.status == 202) {
            console.log("No pending rollup request, trying again");
        } else {
            const rollup_req = await finish_req.json();
            const metadata = rollup_req["data"]["metadata"];
            if (metadata && metadata["epoch_index"] == 0 && metadata["input_index"] == 0) {
                rollup_address = metadata["msg_sender"];
                console.log("Captured rollup address: " + rollup_address);
            } else {
                var handler = handlers[rollup_req["request_type"]];
                finish["status"] = await handler(rollup_req["data"]);
            }
        }
    }
})();
