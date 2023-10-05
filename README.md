# ⛩️📃⛩️Incident Page Project for CampusLand📃⛩️

This project aims to develop an incident page for CampusLand, an educational platform that allows trainers, students and administrators to report and manage incidents that occur in three classrooms (Apolo, Spunikt and Artemis), as well as in the Hunters space and the auditorium. The project will be based on Node.js and React.js technologies and will use MongoDB as database.

## general objective 

The main objective of this project is to create a platform that facilitates communication and monitoring of incidents in the CampusLand environment. Users will be able to report problems and, in the case of trainers and administrative staff, mark incidents as solved and manage the incorporation of new campers to the platform.

## **specific objectives**

### **🛂🧭Planning Phase🧭🛂**

------

- 🧧🔎research and investigation🔎🧧
  - [x] Conduct a thorough investigation of the operation of an incident system.
  - [x] Identify the types of information to be stored (classrooms, occurrence, users, roles, status, etc.).
  - [x] Determine the fields and attributes required for each type of information.
- 🎯🔀Database structure design🔀🎯
  - [x] Identify the collections needed in the database (classrooms, occurrence, users, roles, status, etc.).
  - [x] Identify the relationships between collections (incidents assigned to different classrooms, teachers in charge of each classroom, etc.).
- 🚧🐲API architecture planning🐲🚧
  - [x] Decide on the paths and endpoints needed to perform CRUD operations on the database.
  - [x] Design how specific data queries will be handled (search for incidents by user, incidents of a specific classroom).
- ⛩️📟web design📟⛩️

### **🐾🪓Development Phase🪓🐾**

------

- 🧭🚧Environment Setup🚧🧭

  - [x] Install and configure Node.js  in the project.
  - [x] Configure the dependencies to be used in the project.

- 👻🪙Database and Collections Creation🪙👻

  - [x] Write scripts to create collections in the MongoDB database.

- 🛑🎞️API Development🎞️🛑

  - [x] Implement routes and controllers for each CRUD operation.
  - [x] Develop logic to handle specific queries.

- 🕵️🐨Data Validation and Sanitization🐨🕵️

  - [x] Implement validations to ensure consistent and valid input data.
  - [x] Perform appropriate sanitization to prevent possible injection attacks.

  ------

- 🧭🎈Unit and Integration Testing🎈🧭

  - [x] Write tests to verify the functionality of routes and controllers.
  - [x] Test the interaction between different parts of the API and the database.

- 🧭🚧React Environment Setup🚧🧭

  - [x] Install and configure React in the project.
  - [x] Configure the dependencies to be used in the React section.

- 👻🪙Component Creation🪙👻

  - [x] Create the components that make up the project.
  - [x] Functionality of the different components.
  - [x] Routing distribution for the different components.

- 🛑🔗Functionality Testing🔗🛑

  - [x] Testing the connection between the API and React.
  - [ ] Testing the functionality of routes.
  - [ ] Testing the usage of components.

------

### **🎆🎨Implementation Phase🎨🎆**

------

- 🎯🎞️Documentation🎞️🎯
  - [ ] Create clear and concise documentation on how to use the API and the website, including examples of requests and responses.
  - [ ] Document the structure of the database and the relationship between collections.
- 🪙🚧Final Testing and Adjustments🚧🪙

## ⚙🚨⚙️Prerequisites ⚙️🚨

Before executing the code, make sure:

- have the MongoDB database installed on your system.
- Have VScode's MongoDB extension or the MongoDB terminal installed.
- Make sure you have [Node.js(V9.5.1)](https://nodejs.org/) and [React(V9.5.1)](https://es.react.dev) installed on your system before you start.

------

## 💥⚙️**Steps to use the MongoDB extension in Visual Studio Code⚙️**💥

(click on the arrow to display the information)

  <details>
    <summary> <h3>  Step 1: ⚓Installation of the extension.⚓ </h3></summary> 
   <h4>  1. Open Visual Studio Code <br>
    2. Click on the "Extensions" icon in the left sidebar (or press `Ctrl+Shift+X` on Windows/Linux or `Cmd+Shift+X` on macOS).. <br>
    3. In the search field, type "MongoDB" and select the "MongoDB for VSCode" extension created by Microsoft. <br>
    4. Click "Install" to install the extension. <br></h4>
 </details>


  <details>
    <summary> <h3> Step 2: 🛫Connecting to the MongoDB database.🛫 </h3></summary> 
   <h4> 
       1. Open a project in Visual Studio Code or create a new one. <br>
       2. In the left sidebar, select the "MONGODB" section. <br>
       3. Click on the "Add Connection" icon at the top of the section. <br>
       4. Select or enter the connection string of your MongoDB database. You can use a local connection (`mongodb://localhost:27017/database_name`) or a remote connection provided by a MongoDB service provider. <br>
       5. If necessary, provide a descriptive name for the connection. <br>
       6.  Click on "Connect". <br></h4>
 </details>


 <details>
    <summary> <h3> Step 3: 🛰️Explorando and managing the datos🛰️ database.🛰️ </h3></summary> 
   <h4> 
       1. Una vez conectado, verás la estructura de la base de datos en la sección "MONGODB" de Visual Studio 
       Code.<br>
       2. Once connected, you will see the database structure in the "MONGODB" section of Visual Studio 
       Code<br>
       3. Expand a database to view your collections.<br>
       4. Expands a collection to view the documents stored in it.<br>
       5. You can right-click on a database or collection to perform actions such as create, delete and modify documents, 
       delete and modify documents.<br>
       6. Use the different options available in the context menu to manage your database 
       MongoDB efficiently.<br></h4>
 </details>



------

## [**🍁🎉Installation🎉**🍁]

1. Clone this repository on your machine`https://github.com/JuanJoseDuranRinconCAMPUS2/Incidents_CampusLand`
2. Access the project directory: `cd Incidents_CampusLand`
3. Install the dependencies: (run the `npm i` command to install the project dependencies)

------

## ⚕️🈂️diagram to database🈂️⚕️

![](https://i.ibb.co/JHSGvR0/Campus-incidents-1.png)

------

## **🏁🎆Configuration**🎆🏁

1. Locates the `.env` file in the data project array

2. Within the `.env` file, define the following environment variables:

   - VITE_PORT_FRONTEND=5173

     VITE_PORT_BACKEND=5174

     VITE_HOSTNAME="127.19.8.7"

     NODE_ATLAS_USER="juanjoseduranrincon404"

     NODE_ATLAS_PASSWORD="Mgkq49muHOUs00TQ"

     NODE_ATLAS_DB="Campus_incidents"

     NODE_JWT_PRIMATE_KEY= "OzxyFUjshnqFsiFIwjfrHfsIjhjnajIjfymFsiYmfyNxYmjGjfzynkzqFsiUtxnynajqdXnqqdYmnslFyYmjXfrjYnrj"

     NODEEMAIL_MAIL_NAME="tiendagaming82@gmail.com"

     NODEEMAIL_MAIL_PASSWORD="wpsnxrigcgkgyzqr"

     

   Reemplaza `NODE_ATLAS_USER`, `NODE_ATLAS_PASSWORD`, y con los datos de tu base de datos de Mongo.

------

## 🦊㊙️Use㊙️🦊

1. Run the project in development mode (Node.js and Vite together):

   ```bash
   npm run dev
   ```

   This will start the Node.js server and the React application using Vite at the same time.

2. Or, if you prefer to run only the Node.js server:

   ```bash
   npm run start
   ```

   This will start only the Node.js server, and the React application will be on standby.

3. Access the application in your browser:

   - Web application: [http://127.19.8.7:5173](http://127.19.8.7:5173/)
   - Server API: [http://127.19.8.7:5174](http://127.19.8.7:5174/)

(if you are in the cluster remember that the ip changes to the cluster ip)

## ⛩🔀⛩️Functionalities⛩️🔀

- **User registration**: Users can create accounts by providing their username and password.
- **Login**: Users can log in with their credentials.
- **Password recovery**: Users can request a password recovery by email.
- **Role-based ticket handling pages**: users according to their role will have a different interface to handle tickets.
- **Roles functions:**
- **Campers:** They can create their own tickets, view them and see the tickets according to their classroom or specific parameters.
- **Trainers**: Trainers can do all of the above, but also validate users entering the website, choosing whether to allow access or delete the account.
- **User validation system:** when users are created they go to a waiting list where trainers can accept their request to enter the website, if they authorize it, the user can enter normally, if they disapprove it, the user's account will be deleted.
- **Account status system with GMAIL:** emails are sent to the user to inform about the status of his account, when an account is created to the registered email is sent an email explaining that the creation of start was successful and to wait for the authorization email, then if it is authorized an email is sent informing that your account was validated.
- Data sorting: in the tables with incident information you can modify the values to be observed, filter data according to the value or search for a specific data.

## Users for Default

to improve the testing process we show you two validated accounts with the roles of trainer and camper for the management of the website.

```json
Trainer:
{
Name
"Fred1987"
Password
"12345"
}
Camper
Name
"JuanJose"
Password
"Monochrome":
{
Name
"Fred1987"
Password
"12345"
}
```

------

## **clarification:**

there are no test users with the admin role, since it is a role which is under development and its interface is not yet developed.

## do not create users with the admin role

------

## error handling:

if you encounter any errors notify me, and restart the page.

------

## [**🪄⚗️PostMan Archive⚗️🪄**](https://github.com/JuanJoseDuranRinconCAMPUS2/Incidents_CampusLand/blob/main/PostMan/IncidentsCampus.postman_collection.json)

Here you will find the file with the PostMan collections used to run the endpoints in the easiest way of this project.

for this project we use postman as the main api documentation method, there you can find all the routes saved in folders with the data structure required to work.

[Click Here To Go Directly To The File](https://github.com/JuanJoseDuranRinconCAMPUS2/Incidents_CampusLand/blob/main/PostMan/IncidentsCampus.postman_collection.json)

## [**🚀🎇Import thunder file🎇🚀**]

- Download the IncidentsCampus.postman_collection.json file from the link above.
- Open PostMan, go to Collections 
- Click where it says "Import".
- Select the file IncidentsCampus.postman_collection.json
- And that's it. You will now have all the folders that constitute the endPoints of the project.
