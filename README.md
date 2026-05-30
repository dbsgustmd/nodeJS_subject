# Subscription Diet 🥗

A full-stack subscription management service to help you track, manage, and optimize your recurring expenses.

## Features
- **Dashboard**: Overview of your total monthly spending and active services.
- **Analytics**: Category-wise breakdown of your expenses with interactive charts.
- **Subscription Management**: Full CRUD operations for your subscriptions.
- **Secure Auth**: JWT-based authentication for user signup and login.
- **Responsive Design**: Built with React and TailwindCSS for a great experience on any device.

## Tech Stack
- **Frontend**: React (Vite), TailwindCSS, Recharts, Lucide React, Axios.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB Atlas.
- **Containerization**: Docker & Docker Compose.

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Docker (optional)

### Setup
1. Clone the repository.
2. Create a `.env` file in the `server` directory using `.env.example` as a template.
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
3. Install dependencies:
   ```bash
   # In the server directory
   npm install

   # In the client directory
   npm install
   ```

### Running the App
#### Option 1: Local Development
```bash
# Start backend (server directory)
npm run dev

# Start frontend (client directory)
npm run dev
```

#### Option 2: Docker Compose
```bash
docker-compose up --build
```

## Deployment
This project is ready for deployment on **Render**.
- **Backend**: Use the `server` directory, set environment variables.
- **Frontend**: Build the `client` and serve static files or deploy as a static site.
