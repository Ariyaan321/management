
# 📺 Demo Video

https://drive.google.com/file/d/1Mi9sd41beycl_eb9zfzd_Th7ZkUtmdxB/view?usp=sharing 


# ⭐ Product and User Management

- The application stores users and products data in a database for easy reference
- CRUD operations could be performed on the stored data
- Robust RestAPI to handle any sort of request


## 🛠️ Installation

Install my-project with npm

```bash
  git clone https://github.com/Ariyaan321/management-MERN.git
  cd management-MERN
```
## 🧰 Setup backend/server

```bash
  cd server
  npm install  // to install all the dependencies in package.json
  touch .env
```
- Add the following in you **.env** file
```
PORT=8080
MDB_CONN_STR='mongodb+srv://mongo:<password>@cluster0.xnxu3xy.mongodb.net/<nameOfDB>?retryWrites=true&w=majority&appName=Cluster0'
```
- make sure to add your own password and DB name to connect with your cluster

### Now start the server 
```bash
  npm start
```
- You should now see the following output in the terminal
```bash
  Example app listening on port 8080
  Database connected!
```
- 🎉 Congratulations you server is now running on port 8080 !!

## ⚛️ Setup frontend/react

- Now navigate to the **management** directory ( i.e., \Management-MERN\client\management> )

```bash
  npm install   // this will install react
  npm start   // start the application
```

- 🎊 Woooo... now both of your frontend and backend application are up and running !!

## ⛓ API Reference

#### Get all users

```http
  GET http://localhost:8080/users
```
#### Create a user

```http
  POST http://localhost:8080/users
```

#### Update a user

```http
  PUT http://localhost:8080/users/:id
```

#### Delete a user

```http
  PUT http://localhost:8080/users/:id
```

- **:id** is the MongoDB **_id**

- **NOTE**: For products you only have to change the **/users -> /products**


#
## Happy Hakcing👋🚀

