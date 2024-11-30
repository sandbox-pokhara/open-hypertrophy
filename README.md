# open-hypertrophy

An open-source web-based strength tracker for hypertrophy

## 🚧 Disclaimer

This project is currently under construction and may not be fully functional or stable. Expect frequent updates and changes as we continue to develop and improve it. Contributions are welcome.

## 🎥 Demo

- Link: https://hypertrophy.sandbox.com.np
- Username: `demo`
- Password: `demo`

## 💡 Concept

![Concept](excalidraws/concept.excalidraw.png)

## 🌟 Feature Requests

Got an idea to make this project even better? We'd love to hear from you!

### How to Submit a Feature Request

1. Check the Issues tab to see if your idea has already been suggested.
1. Provide a clear and detailed description of your idea. Feel free to include:
   - The problem it solves
   - Why it's useful
   - Any potential implementation suggestions

## 📚 API Documentation

https://hypertrophy.sandbox.com.np/api/v1/docs/

## 🖥️ Run Locally using Docker

1. Download `docker-compose.yml`.
1. Start the server.
   ```
   docker compose up
   ```
1. The server should be running in http://127.0.0.1:8000/.

1. Create a user to access the web application.
   ```
   docker compose exec python manage.py createsuperuser
   ```

## 📜 License

This project is licensed under the terms of the MIT license.
