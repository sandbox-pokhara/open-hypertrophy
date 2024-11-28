FROM node:lts-alpine3.17 AS builder
WORKDIR /app
COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .
RUN npm ci
COPY ./frontend/public ./public
COPY ./frontend/src ./src
COPY ./frontend/components.json .
COPY ./frontend/index.html .
COPY ./frontend/postcss.config.js .
COPY ./frontend/tailwind.config.js .
COPY ./frontend/tsconfig.json .
COPY ./frontend/tsconfig.app.json .
COPY ./frontend/tsconfig.node.json .
COPY ./frontend/vite.config.ts .
RUN npm run build

FROM python:3.11-alpine
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY --from=builder /app/dist/ /app/dist/
COPY backend/manage.py .
COPY backend/project project
COPY backend/core core
EXPOSE 8000
CMD ["/bin/sh", "-c", "python manage.py collectstatic --noinput;python manage.py migrate;gunicorn --bind 0.0.0.0:8000 --workers=1 --env DJANGO_SETTINGS_MODULE=project.settings project.wsgi"]
