# blogify


A full-stack blogging application built with **Node.js**, **Express.js**, **Mongoose**, and **Tailwind CSS**. This app allows users to **sign up**, **log in**, **read blogs**, and **write their own posts**, providing a real-world blogging experience.

## Features

- **User Authentication**  
  - Sign up and login system with secure password handling.
- **Blog Management**  
  - Users can create, edit, and delete their own blogs.
  - Read blogs posted by others.
- **Responsive UI**  
  - Designed with **Tailwind CSS** for a clean and responsive interface.
- **Database Integration**  
  - **MongoDB** is used to store users and blog data through **Mongoose**.

## Technologies Used

- **Node.js** - JavaScript runtime  
- **Express.js** - Web framework for building RESTful APIs  
- **MongoDB** - NoSQL database  
- **Mongoose** - ODM for MongoDB  
- **Tailwind CSS** - Utility-first CSS framework for styling  
- **bcryptjs** - For password hashing  
- **express-session** - For managing user sessions  

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) installed
- [MongoDB](https://www.mongodb.com/) installed or MongoDB Atlas account

### Installation

1. Clone the repository:

Install dependencies:

copy this files-
Folder Structure
- blogging-app/
- ├─ controllers/      # Controllers for handling request logic
- ├─ middleware/       # Middleware for authentication, validation, etc.
- ├─ models/           # Mongoose models for User and Blog
- ├─ routes/           # Express routes for authentication and blogs
- ├─ services/         # Business logic and reusable service functions
- ├─ public/           # Static files (Tailwind CSS, images, etc.)
- ├─ views/            # EJS templates (or your preferred view engine)
- ├─ app.js            # Main application file
- ├─ dbConnect.js      # Database connection setup
- ├─ package.json      # Node.js dependencies and scripts
- └─ package-lock.json # Automatically generated lock file

Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue for suggestions and improvements.

