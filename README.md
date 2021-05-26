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
    * SPOTIPY_CLIENT_ID  
    * SPOTIPY_CLIENT_SECRET  

Then run-  

    ./deploy.sh

### To run: (testing only at the moment)
    docker exec -ti art-aggregator-container bash

That will get you in the backend container. From here you can run a couple tests to confirm the Flask API is working. 

    ./test-api-artist.sh

or

    ./test-api-album.sh
    
Feel free to change the script to get different albums or artists.
