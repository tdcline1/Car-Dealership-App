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

while ! curl -s http://127.0.0.1:8000/ > /dev/null; do
  sleep 1
done

echo "Django server is running! Opening browser..."
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://127.0.0.1:8000/ 2>/dev/null
elif [[ "$OSTYPE" == "darwin"* ]]; then
    open http://127.0.0.1:8000/ 2>/dev/null
elif [[ "$OSTYPE" == "msys"* || "$OSTYPE" == "cygwin"* ]]; then
    cmd.exe /c start http://127.0.0.1:8000/
else
    echo "Unsupported OS: Please open http://127.0.0.1:8000/ manually"
fi
