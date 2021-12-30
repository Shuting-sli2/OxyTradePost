# OxyTradePost
Reproduction Instructions:

Download the chat branch: https://github.com/Shuting-sli2/OxyTradePost/tree/chat
Rename the folder to “OxyTradePost”
Download Visual Code Studio IDE.
Download node.JS: https://nodejs.org/en/ type npm -v- if a version comes out it's installed
npm install --save-dev nodemon
npm install react-router-dom
Atlas Cloud MongoDB
Create database at https://cloud.mongodb.com
Create .env file in root folder
In .env file, set MONGODB_URL=mongodb+srv://your-db-connection *Note: 1) After setting up your account in MongoDB, choose ‘connect to application’, then proceed to step b & c. 2) Then copy the URI String from the MongoDB clipboard. MAKE SURE to remove the angle brackets "<"and ">" around when replacing your password from the URI. Also, you should use user password, not account password.
Open a new terminal, type command 'npm start' to start the backend server
Open a new terminal, type command 'cd fronend2', and then 'npm start' to start the frontend. A new window should props up on your browser.
Other things:

Download MongoDB compass to view data in database: https://www.mongodb.com/try/download/compass
A documentation of other libraries installed:
npm install mongodb
npm install express
npm install axios
npm install redux react-redux
npm install mongoose
npm install dotenv
npm install jsonwebtoken
npm install cloudinary
npm install cors
npm install socket.io
npm install bcryptjs
npm install --save-dev cross-env
npm install --save express-async-handler
npm install --save react-images-upload
npm i socket.io-client
npm install eslint@7 --save-dev
