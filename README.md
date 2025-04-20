# Assessment Project

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **Assessment Project** is a full-stack application designed to manage and display sales data. It includes features such as filtering, searching, and uploading sales data. The project is built using modern web technologies, including React for the frontend and Node.js with Express for the backend.

---

## Features

- **Sales Data Management**: View, filter, and search sales data by transaction ID, customer name, and product name.
- **File Upload**: Upload CSV files to populate the sales database.
- **Pagination**: Navigate through large datasets with ease.
- **Dynamic Filters**: Filter data by customer name and product name.
- **Search Functionality**: Search across multiple fields (transaction ID, customer name, product name).
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## Technologies Used

### Frontend:

- **React**: For building the user interface.
- **React Data Grid**: For displaying tabular data.
- **TypeScript**: For type safety and better development experience.

### Backend:

- **Node.js**: For server-side logic.
- **Express**: For building RESTful APIs.
- **MongoDB**: For storing sales data.
- **Mongoose**: For MongoDB object modeling.

### Other Tools:

- **Multer**: For handling file uploads.
- **Axios**: For making HTTP requests.
- **CSV Parser**: For processing uploaded CSV files.

---

## Setup Instructions

### Prerequisites:

- **Node.js** (v16 or higher)
- **MongoDB** (running locally or in the cloud)
- **Docker** (optional, for containerized deployment)

### Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/assessment-project.git
   cd assessment-project
   ```
2. Install dependencies for both frontend and backend:

# Install backend dependencies

cd backend
npm install

# Install frontend dependencies

cd ../frontend
npm install

3. Set up environment variables:  
    Create a .env file in the frontend directory with the following:
   VITE_API_BASE_URL=http://localhost:5001/api

4. Run the application:
   Use Docker Compose to build and start the containers:
   docker-compose up --build

5. Access the application:
   a. Frontend: Open your browser and navigate to http://localhost:3000.
   b. Backend: The API will be available at http://localhost:5001/api.

6. Stop the application:
   To stop the containers, run:
   docker-compose down

Manual Setup  
 If you prefer to run the application without Docker, follow these steps:

Prerequisites:
Node.js (v16 or higher)
MongoDB (running locally or in the cloud)

Steps:

1. Clone the repository:
   git clone https://github.com/your-username/assessment-project.git
   cd assessment-project
2. Install dependencies for both frontend and backend:

   # Install backend dependencies

   cd backend
   npm install

   # Install frontend dependencies

   cd ../frontend
   npm install

3. Set up environment variables:
   Create a .env file in the frontend directory with the following:
   VITE_API_BASE_URL=http://localhost:5001/api

4. Start the backend server:
   cd backend
   npm start
5. Start the frontend development server:
   cd frontend
   npm run dev

6. Open your browser and navigate to
   Frontend: http://localhost:3000
   Backend: The API will be available at http://localhost:5001/api.

# Usage

1.  View Sales Data:
    a. Navigate to the homepage to view the sales data in a table format.
    b. Use filters and the search bar to refine the data.

2.  Upload Sales Data:
    a. Go to the "Upload" page and upload a CSV file to populate the database.

3.  Pagination:
    a. Use the pagination controls to navigate through large datasets.

## API Endpoints

| Method | Route                     | Description              |
| ------ | ------------------------- | ------------------------ |
| POST   | /api/upload               | Upload CSV file          |
| GET    | /api/sales                | Fetch all sales records  |
| GET    | /api/sales/upload-history | Fetch all upload history |

# Folder Structure

assessment-project/
├── backend/
│ ├── src/
│ │ ├── controllers/ # Business logic
│ │ ├── models/ # Mongoose schemas
│ │ ├── routes/ # API routes
│ │ ├── services/ # Utility services
│ │ └── app.js # Express app setup
| | └── config.js # configuration settings
│ |
│ └── index.js # Server entry point
├── frontend/
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── containers/ # Page-level components
│ │ ├── services/ # API service functions
│ │ └── App.tsx # Main React component
│ ├── .env # Frontend environment variables
│ └── vite.config.ts # Vite configuration
└── docker-compose.yml # Docker Compose configuration
└── README.md # Project documentation
