FROM python:3.7

COPY ./src /src

WORKDIR /src

RUN pip install --no-cache-dir -r requirements/prod.txt

COPY ./docker/python/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
