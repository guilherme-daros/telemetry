# LAND-DATAVIEW21
Software para vizualização dos dados recebidos do barco Guarapuvu I, da equipe Vento Sul - Barco Solar UFSC 

### Building the Docker Image
1. Clone the project repository containing the JS source code.
2. Open a terminal window and navigate to the project directory.
3. Build the Docker image using the following command:

```bash
docker build -t telemetry_js .
```

`This command builds a Docker image named telemetry_js based on the Dockerfile in the current directory.`

### Running the Service

Start the service container with the following command:
```bash
docker run -d --name telemetry_js -p 80:80 telemetry_js
docker ps
```
* -d: Runs the container in detached mode, allowing the process to run in the background.

* --name telemetry_js: Assigns a name to the container for easier management.

* -p: port forwarding

### Stopping and Removing the Container

```bash
#To stop the running service container:
docker stop telemetry_js
#To remove the container:
docker rm telemetry_js
#To remove the built image:
docker rmi telemetry_js
```