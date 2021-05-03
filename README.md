# Monoalbum

A website to find album art.  
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
    * SPOTIPY_CLIENT_ID  
    * SPOTIPY_CLIENT_SECRET  

Then run-  

    ./deploy.sh

### To run: (testing only at the moment)
    docker exec -ti backend-container bash

That will get you in the backend container. Run it with   

    python3 main.py

The input request is hardcoded for Led Zepplin at the moment.  
Each album art image file for the selected artist is encoded and entered into the database. And a status indicator keeps the user informed of the progress.  
