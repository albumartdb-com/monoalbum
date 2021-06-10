# Monoalbum

A website to find album art across many websites.  
Very much pre-alpha.

### To build:  
Requirements:
* Docker
* An .env file in the base directory and in the backend directory with identical values. A hardcoded link works, symlinks may not do to Docker restrictions, so avoid using them for this purpose. Values are required for:
    * MONGO_ROOT_USER
    * MONGO_ROOT_PASSWORD
    * MONGO_CONTAINER_NAME
    * MONGO_PORT
    * MONGO_EXPRESS_USER
    * MONGO_EXPRESS_PASSWORD
    * SPOTIFY_CLIENT_ID  
    * SPOTIFY_CLIENT_SECRET  
    * FLASK_ENV
* An .env file in the myapps directory with:
    * EXT_PUBLIC_API_URL=http://localhost:5000/

Then run-  

    ./deploy.sh

From here you can go to localhost:3000 to test the website.  
Input a value to test the API call. Confirm the return value in the dev tools console.  
Double confirm the flask backend request occured by viewing logs on Kibana at localhost:5601 in the logs section. 
