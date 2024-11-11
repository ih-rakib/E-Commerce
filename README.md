# Ecommerce Application

## Description

This is a modern and responsive Ecommerce application built with the MERN stack (MongoDB, Express, React, and Node.js). It provides a user-friendly interface where customers can browse, search, and purchase a wide range of products, including toys, games, and more.

The application features user authentication with JWT, allowing users to securely log in and register. Users can explore products by categories, view detailed product information, and manage their shopping experience.

## Features

- **Product Listings**: Browse a variety of products organized into categories.
- **Product Search**: Quickly search for products by name or category.
- **Single Product View**: View detailed information for individual products.
- **User Authentication**: Secure login and registration using JWT for authentication.
- **Protected Routes**: Certain features are available only to authenticated users.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- **Error Handling**: Includes a custom 404 page for incorrect routes.

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **State Management**: RTK Query for managing state and API requests
- **Authentication**: JWT (JSON Web Token) for secure authentication
- **Database**: MongoDB
- **Image Uploads**: Cloudinary (optional)

## API Endpoints

### Users API

- **Login**
  - **Endpoint**: `/auth/login`
  - **Method**: POST
  - **Description**: Authenticates a user and returns a JWT.
  
- **Register**
  - **Endpoint**: `/auth/register`
  - **Method**: POST
  - **Description**: Registers a new user.
  
- **Get All Users**
  - **Endpoint**: `/auth/users`
  - **Method**: GET
  - **Description**: Retrieves a list of all users.
  
- **Logout**
  - **Endpoint**: `/auth/logout`
  - **Method**: POST
  - **Description**: Logs out the current user.
  
- **Delete User**
  - **Endpoint**: `/auth/users/:id`
  - **Method**: DELETE
  - **Description**: Deletes a user by ID.
  
- **Update User Role**
  - **Endpoint**: `/auth/users/:id`
  - **Method**: PATCH
  - **Description**: Updates the role of a user by ID.
  
- **Update User Profile**
  - **Endpoint**: `/auth/update-profile`
  - **Method**: PATCH
  - **Description**: Updates the current user's profile.

---

### Products API

- **Create Product**
  - **Endpoint**: `/products/create-product`
  - **Method**: POST
  - **Description**: Creates a new product.
  
- **Get All Products**
  - **Endpoint**: `/products`
  - **Method**: GET
  - **Description**: Retrieves a list of all products, can filter by category.
  
- **Get Single Product**
  - **Endpoint**: `/products/:id`
  - **Method**: GET
  - **Description**: Retrieves a single product by ID.
  
- **Update Product**
  - **Endpoint**: `/products/update-product/:id`
  - **Method**: PATCH
  - **Description**: Updates a product by ID.
  
- **Delete Product**
  - **Endpoint**: `/products/:id`
  - **Method**: DELETE
  - **Description**: Deletes a product by ID.
  
- **Related Products**
  - **Endpoint**: `/products/related/:id`
  - **Method**: GET
  - **Description**: Retrieves related products based on the provided product ID.

---

### Reviews API

- **Post Review**
  - **Endpoint**: `/reviews/post-review`
  - **Method**: POST
  - **Description**: Adds a review for a product.

---


## Enhancements

- **Payment Integration**: Payment gateways integrated using "Stripe".
- **Image Upload**: "Cloudinary" is used for uploading images.
- **Order Tracking**: Allow users to track their orders in real-time.
- **Admin Panel**: Implemented an admin dashboard for managing products and users.
- **User Panel**: Implemented an user dashboard for tracking order status, reviews, products etc.
