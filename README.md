# open-hypertrophy

An open-source web-based strength tracker for hypertrophy

Note: This project is under construction.

## Concept

![Concept](excalidraws/concept.excalidraw.png)

## Run Locally using Docker

1. Install https://taskfile.dev/installation/ to get access to `task` command. This step is optional and the commands can be directly run without `task` command.
1. Run a postgres server on port 5432, if you haven't already.
   ```
   task run-db
   ```
1. Build and run the server.
   ```
   task build run
   ```
1. The server should be running in http://127.0.0.1:8000/.

1. Create a user to access the web application.
   ```
   task create-superuser
   ```

## License

This project is licensed under the terms of the MIT license.
