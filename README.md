# Car Dealership App

## Overview

This car dealership app allows users to access dealership reviews and inventory, featuring a combination of Django for the backend, React for dynamic frontend components, and multiple microservices for efficient data handling.

## Features

### Backend

- **Django Framework**

  - Django templates for the home screen and basic company info
  - Django views, routing, and a REST API proxy service (using the `requests` library) to manipulate data and handle requests
  - User authentication and authorization with Django's user management system
  - Admin page for manual object additions

- **Microservices (Node.js + Express + MongoDB)**

  - Two backend microservices:
    1. **Dealer Service**: Fetches dealership details and reviews
    2. **Inventory Service**: Fetches available cars and their details
  - Each backend service is **dockerized** for easy deployment

- **Sentiment Analysis Microservice (Flask)**

  - Utilizes IBM's text analysis tool to determine the sentiment of submitted reviews
  - Deployed using a cloud server

### Frontend

- **React-Based UI**
  - Login and registration system
  - Dealer details view (including customer reviews)
  - Dealers list view (filtered by state search box)
  - Search cars component (filter inventory by make, model, mileage, price, and year)
  - Post review form with sentiment analysis integration
  - Navbar for easy navigation
  - Bootstrap for styling

### Deployment & CI/CD

- Each backend service is **containerized** using Docker
- CI/CD pipeline using **GitHub Actions** for automated linting and workflow validation
- Option to deploy the entire application in **Kubernetes** for container orchestration

## Installation & Setup

### Local Development
 visit here: https://car-dealership-app-django.onrender.com 

