# Car Dealership App  🚙

## Overview

This Car Dealership App enables users to browse dealership reviews and inventory. It leverages:
- Django as the main backend framework
- Node.js, Express, and MongoDB for backend database storage and access
- React for dynamic frontend components
- A Sentiment Analysis microservice to analyze and diagnose customer reviews

## Features

### Backend

- **Django Framework**

  - Django templates for the home screen and basic company info
  - Django views, routing, and a REST API proxy service (using the `requests` library) to manipulate data and handle requests
  - User authentication and authorization with Django's user management system (django.contrib.auth module)
  - Admin page for manual object additions

- **Backend Microservices (Node.js + Express + MongoDB)**

  - Two backend microservices:
    1. **Dealer Service**: Fetches dealership details and reviews
    2. **Inventory Service**: Fetches available cars and their details
  - Each backend service is **dockerized** for easy deployment

- **Sentiment Analysis Microservice (Flask)**

  - Utilizes IBM's text analysis tool to determine the sentiment of submitted reviews
  - Deployed using a cloud server

### Frontend

- **React-Based UI**
  - Login and registration components
  - Dealer details component (including customer reviews with sentiment analysis integration)
  - Dealers list component (filtered by state search box)
  - Search cars component (filter a dealer's inventory by make, model, mileage, price, and year)
  - Post review form with sentiment analysis integration
  - Navbar for easy navigation
  - Bootstrap for styling

### Deployment & CI/CD

- Each backend service is **containerized** using Docker
- CI/CD pipeline using **GitHub Actions** for automated linting and workflow validation
- Option to deploy the entire application in **Kubernetes** for container orchestration
- Automated API testing

## Installation & Setup

### Use the app on GitHub Codespaces- It's super easy!

1. **Create a codespace** on the main branch

2. **Run the startup script** (takes about 2 minutes to get the full project running):
   ```sh
   Chmod +x start_dev.sh
   ./start_dev.sh
   ```
3. **Open the app** running on **port 8000**
