# Pallas-cat
Internet application that lets users browse their favourite video streaming platform in one place
The main feature of the application is the ability to watch videos from all of supported platforms, directly streamed

# How to launch
## backend:
1. cd backend
2. make db.cnf file that looks like this:
```
    [client]
    database = pallas_cat
    user = <user>
    password = <password>
    default-character-set = utf8
```
3. pip install requirements.txt
4. python manage.py makemigrations
5. python manage.py migrate
6. python manage.py runserver

## frontend:
1. cd frontend
2. npm install
3. npm run dev
