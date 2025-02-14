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

echo "Opening Django app in browser..."
sleep 5  # Give the server time to start
xdg-open http://127.0.0.1:8000/ 2>/dev/null || open http://127.0.0.1:8000/ 2>/dev/null || start http://127.0.0.1:8000/
