# Setup a Development Environment

This page will guide you on setting up a development environment for this project.

## Prerequisites
 - Node 
 - NPM
 - Code Editor of your choice

## Steps

1. Clone the Project
    ```sh
    git clone git@github.com:Jet-Set-Radio-API/JetSetRadio-API.git
    ```
2. Install Dependencies
    ```sh
    npm install
    ```
3. [Create](https://account.mongodb.com/account/login) a MongoDB Database in Atlas 
   - If you need help with this step, feel free to reach out.
4. Obtain the database Connection URI

5. Fill out a .env file using .env.example as a template; make sure to rename the file to ```qa.env```
6. Run the project 
    ```sh
    npm run qa
    ```
7. (Optional) - To populate your local database with production data, hit the /pipe route in your browser or using Postman. The logs should indicate if the piping was successful.
    ```sh
    http://localhost:3005/pipe
    ```
