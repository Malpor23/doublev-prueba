# Instalar y configurar Laravel con Docker

Configuración de Laravel en el entorno local con Docker: Nginx, Postgres, PHP y pgAdmin.

## Cómo instalar y ejecutar el proyecto

1. ```git clone https://github.com/Malpor23/doublev-prueba.git```
2. ```cd backend```
3. ```composer install```
3. Copiar ```.env.example``` y remplazar el nombre a ```.env```
4. ```php artisan key:generate```
5. ```php artisan migrate --seed```
6. En el navegador ir a ```127.0.0.1:8080```

### Usando Docker
1. ```docker-compose build```
2. ```docker compose up -d```
3. ```docker-compose exec app php artisan {command}```
4. En el navegador ir a ```127.0.0.1:8080```

## Endpoints
```yml
# all
GET: ---------------- api/tickets

# pagination
GET: ---------------- api/tickets?paginate=true&by_paginate={per_page}&page={page}&order={order}&order_by={order_by}&{filter}
# params example
# per_page = 15
# page     = 1
# order    = asc
# order_by = user
# {filter} user = Kiara
# {filter} status = Abierto

# show
GET: --------------- api/tickets/{ticket}


# create
POST: --------------- api/tickets
# body example
# {
#     "user": "Manuel Gomez",
#     "status": "Abierto"
# }

# update
PUT: --------------- api/tickets/{ticket}

# delete
DELETE: ------------ api/tickets/{ticket}
```
