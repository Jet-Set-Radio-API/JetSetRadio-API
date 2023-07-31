## Contributing

I am open and welcome to any contributions. 

## Introduction

The data this application produces lives in MongoDB. This service performs `read-only` operations to get data. A separate service called [Jet-Set-Radio-API-Admin](https://github.com/Jet-Set-Radio-API/JetSetRadio-API-Admin) is an ETL service that prepares/writes data. Each Resource has its own CronJob that fires off weekly. This is done by design in order to have two separate services, each doing one specific thing. This service is the actual API performing `read-only` operations, while the other(`Admin`) is a set of tools performing `write-only` operations to manage this API.

## Getting Started

See the [DEV_SETUP](./DEV_SETUP.md) guide to learn how to set up a dev environment for this project.

If you need to change anything in `Admin`, you can start with the [README](https://github.com/Jet-Set-Radio-API/JetSetRadio-API-Admin/blob/main/README.md) for that project.

## Folder Structure

Src
 - `Config`: Contains database material including connection info, and database operations
 - `Constants`: Common Constants used throughout the project
 - `Controllers`: A list of functions used by their respective file in the `Routes` folder
 - `Docs`: All documentation(excluding the README) lives in this folder
 - `Managers`: Express app middleware lives here, and a HealthCheckManager
 - `Public`: All static material lives here including html, css, client-side js, and images
 - `Routes`: Application endpoints are defined here
 - `Utils`: A list of helper functions and services such as winston logging and swagger doc configs

Test
 - `Helper`: Contains a list of fuctions to use the `mongodb-memory-server` in integration tests.
 - Every other file contains unit and integration tests relating to a specific resource.

Before submitting your changes, make sure to run `npm run test` to verify all tests pass successfully.
