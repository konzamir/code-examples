#!/bin/bash 

alembic upgrade head
echo "Running command '$*'"  
exec su -p - ${PYTHON_RUN_USER} -s /bin/bash -c "$*"
