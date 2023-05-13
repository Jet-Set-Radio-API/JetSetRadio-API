# Setup a Development Environment

This page will guide you on setting up a development environment for this project.

## Prerequisites
 - Node 
 - NPM
 - Code Editor of your choice

## Steps

1. Fork the project then clone it. Example:
    ```sh
    git clone git@github.com:Jet-Set-Radio-API/JetSetRadio-API.git
    ```
2. Install Dependencies
    ```sh
    npm install
    ```
3. [Create](https://account.mongodb.com/account/login) a local MongoDB Database or in Atlas 

4. Obtain the database Connection URI

5. Fill out a .env file. You can use the [.env.example](./../../.env.example) file as a template. it needs to be renamed to ```qa.env```
    - Reference this example uri with yours to extract what is needed for the .env file
    ``` 
    mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>.<DOMAIN>?retryWrites=true&w=majority
    ```

    qa.env example
    ```
    PORT=
    BASE_URL=http://localhost:<PORT>
    LOG_LEVEL=info

    # MONGO CONNECT (get from connection string)
    MONGO_USER=
    MONGO_PASS=
    MONGO_CLUSTER=
    MONGO_DOMAIN=

    # MONGO DATABASES (names do not matter)
    JSR_DB=
    JSRF_DB=
    CORE_DB=
    ```
    The databases section in the env file are names of the databases. For development purposes it does not matter what these names are just as long as you can distinguish one from the other and you know which one is Core, JSR, or JSRF. 

6. Run the project 
    ```sh
    npm run qa
    ```
7. (Optional) - To populate your local database with production data, hit the /pipe route in your browser or using Postman. The logs should indicate if the piping was successful.
    ```sh
    http://localhost:3005/pipe
    ```
    Warning: hitting this route will delete EVERYTHING from your local database and populate it exactly with what exists in production.
