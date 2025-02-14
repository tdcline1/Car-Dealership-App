#!/bin/bash

echo "Starting Express-MongoDB backend service..."
cd /workspaces/Car-Dealership-App/server/database
docker build . -t nodeapp
docker-compose up -d
echo "Express-MongoDB backend is up!"

echo "Starting second backend service..."
cd ../carsInventory
docker build . -t nodeapp
docker-compose up -d
echo "BE2 is up!"

echo "Building frontend..."
cd ../frontend
npm install
npm run build
echo "Frontend is ready!"

echo "Starting Django server..."
cd ..
pip install virtualenv
virtualenv djangoenv
source djangoenv/bin/activate
python3 -m pip install -U -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate --run-syncdb
python3 manage.py runserver &

sleep 5
echo "Please open the application running on port 8000"
