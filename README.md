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

Then run-  

    ./deploy.sh

From here you can run a test to confirm the Flask API is working. 

    ./art-aggregator/test_api_get.sh

Feel free to change the script to search for a different value.
