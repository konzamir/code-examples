#!/bin/sh

python manage.py makemigrations 
python manage.py migrate 
echo "Running command '$*'"
exec su -p - ${PYTHON_RUN_USER} -s /bin/bash -c "$*"