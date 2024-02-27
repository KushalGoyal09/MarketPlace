# Marketplace WebApp

Welcome to our Marketplace WebApp! This application allows users to buy products and administrators to add new products. It is built using the following technologies:

- **Express.js**: Backend server framework for handling HTTP requests and responses.
- **React**: Frontend library for building user interfaces.
- **MongoDB**: NoSQL database for storing product and user data.

## Getting Started

To run the application locally, follow these steps:

1. **Clone the repository**:
   ```
   git clone https://github.com/KushalGoyal09/MarketPlace.git
   ```

2. **Install dependencies**:
   - Navigate to the `client` directory and install frontend dependencies:
     ```
     cd client
     npm install
     ```

   - Navigate to the `server` directory and install backend dependencies:
     ```
     cd ../server
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the `server` directory and configure MongoDB connection details and any other necessary environment variables.

4. **Start the development servers**:
   - In one terminal window, start the backend server:
     ```
     cd server
     npm start
     ```

   - In another terminal window, start the frontend development server:
     ```
     cd client
     npm run dev
     ```
     
## Features

- **User Authentication**: Allow users to sign up, log in, and log out securely.
- **Product Listings**: Display available products with details such as name, price, and description.
- **Shopping Cart**: Enable users to add products to their cart for purchasing.
- **Admin Dashboard**: Provide administrators with a dashboard to add new products to the marketplace.
- **Responsive Design**: Ensure the application is accessible and usable across various devices and screen sizes.
