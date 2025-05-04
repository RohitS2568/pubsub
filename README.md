PubSub System
This project implements a Pub/Sub architecture using Node.js with Redis and MongoDB, all containerized using Docker.

🚀 Getting Started
You can run everything using a single Docker command or set it up manually step-by-step.


🐳 Run with Docker Compose (Recommended) --- You can run everything using a single Docker command
To spin up all services (Node.js app, MongoDB, Redis) in one command:

docker compose up


🐳 Run with Docker Compose
docker compose up --build

To stop and remove the containers:
docker compose down


🔧 Manual Setup (Step-by-Step)
1. Install Dependencies

npm install
2. Start MongoDB (Docker)

docker run -d -p 27017:27017 --name mongodb mongo:latest
3. Start Redis (Docker)

docker run -d -p 6379:6379 --name redis redis:latest
4. Start Node.js App (Locally)

npm run start
📂 Project Structure (Optional Section)

/pubsub-project
│
├── src/
│   ├── publisher/
│   ├── subscriber/
│   ├── config/
│   └── ...
├── docker-compose.yml
├── package.json
└── README.md
✅ Notes
Make sure Docker is installed and running.

This app uses Redis for messaging and MongoDB for storage.

Adjust port numbers if conflicts occur.
