<!-- markdownlint-disable MD013 -->

# Immunify Health

[Link to WhitePaper](https://drive.google.com/file/d/1OvKDHFv9M518PRhFEM9xFrmwv2oO5wTX/view?usp=share_link)

Build for the Cartesi Hackathon.
Thanks for giving us this opportunity to share our work. We wish we 

## Key Features
1. Deployed a Decentralised SQLite Database
2. Added 2 way Data Encryption Algorithm before persisting data on Cartesi

### To be implemented
1. Tokenization of Health information as NFTs
2. Building a Defentralized Health Marketplace

## Immunify: A Decentralized Permissionless Health Protocol

Thank you for taking the time to review the Immunify white paper. The document is the outcome of a collaborative effort between medical professionals and experts in blockchain technology. The Immunify platform leverages blockchain technology to establish a patient-centric electronic health record system that maintains a single, immutable version of patient data. With Immunify, users are empowered to selectively authorize healthcare providers to access their personal health data.

Immunify facilitates a trustless and transparent interaction recording process, which is securely stored in a decentralized SQLite database. An associated ERC721(future implementation) token enables seamless data interoperability. Additionally, Immunify offers a development platform for innovative health solutions. By leveraging their medical data, users can access various services. The Immunify White Paper outlines our vision and the current challenges in healthcare. It also provides a concise overview of the blockchain technology employed, and how Immunify aims to address specific issues to improve healthcare outcomes for all.


## HTTP API

Here are the available [payload] formats to be used while interacting with the backend using the console application.

#### Patient 

1. Adding a new Patinet 

```shell
yarn start input send --payload "patient POST <address> <name> <age>"
```

2. Querying a patient

```shell
yarn start input send --payload "patient GET <address>"
```

#### Consultations
1. Adding a new consultation

```shell
yarn start input send --payload "consultation POST <medical_history>"
```

2. Querying a consultation

```shell
yarn start input send --payload "consultation GET <id>"
```

#### Admin Functions
1. Adding a Doctor

```shell
yarn start input send --payload "adminfunc POST-D <address> <name>"
```

#### Admin Functions

### Back-end

The DApp's back-end interacts with the Cartesi Rollups framework by retrieving processing requests and then submitting corresponding outputs.

### Front-end

The front-end part of the DApp needs to access the Cartesi Rollups framework to submit user inputs and retrieve the corresponding vouchers, notices and reports produced by the back-end.
Interaction with the Immunify dapp is done with the [frontend-console](./frontend-console) application.

## Requirements

Docker version `20.10.14` with [Docker Buildkit](https://github.com/moby/buildkit) enabled is required for building the environment and executing the examples.
We recommend using [Docker Desktop](https://www.docker.com/products/docker-desktop/), which already enables Buildkit by default.
Alternatively, an environment variable with value `DOCKER_BUILDKIT=1` can also be set.

The below instructions have been tested in systems running both Linux (Ubuntu), MacOS, and Windows (using [WSL](https://docs.microsoft.com/en-us/windows/wsl/install), which is highly recommended for Windows users).

## Running

The Immunify App is currently executed in Host modes, as explained below.


### Setting up in Host mode

The _Cartesi Rollups Host Environment_ provides the very same HTTP API as the regular one, mimicking the behavior of the actual layer-1 and layer-2 components. This way, the Cartesi Rollups infrastructure can make HTTP requests to a back-end that is running natively on localhost. This allows the developer to test and debug the back-end logic using familiar tools, such as an IDE.

The host environment can be executed with the following command:

```shell
git clone https://github.com/Immunify-DAO/immunify-cartesi.git
```
```shell
cd immunify-js
docker compose -f ../docker-compose.yml -f ./docker-compose.override.yml -f ../docker-compose-host.yml up
```

Spin up another terminal and run. This spins up the immunify backend and connects to the cartesi rollup host.
```shell
cd immunify-js
yarn start
```

_Note_: When running in host mode, localhost port `5004` will be used by default to allow the DApp's back-end to communicate with the Cartesi Rollups framework.


### Interacting with the Immunify Backend

________Awaiting deployment on Testnet_________

### Deploying DApps

