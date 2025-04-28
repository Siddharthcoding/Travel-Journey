# Travel Journey Backend

This is the backend for the Travel Journey application, providing API endpoints for authentication and trip management.

## Features

- User authentication (signup, login, get current user)
- Trip management (create, read, update, delete)
- Trip filtering by category and country
- Trip search functionality
- MongoDB database with Mongoose ODM

## Setup

1. Clone the repository
2. Install dependencies:
```
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/travel_itinerary
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

Start the development server:
```
npm run dev
```

Start the production server:
```
npm start
```

## Seeding the Database

To seed the database with initial trip data:
```
npm run seed
```

This will create sample trips in the database.

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get the current user (requires authentication)

### Trips

- `GET /api/trips` - Get all trips
- `GET /api/trips/:id` - Get a specific trip by ID
- `POST /api/trips` - Create a new trip (requires authentication)
- `PUT /api/trips/:id` - Update a trip (requires authentication)
- `DELETE /api/trips/:id` - Delete a trip (requires authentication)
- `GET /api/trips/search?q=query` - Search for trips
- `GET /api/trips/category/:category` - Get trips by category
- `GET /api/trips/country/:country` - Get trips by country 