# OxyTradePost
Reproduction Instructions: 
1. Download the chat branch: https://github.com/Shuting-sli2/OxyTradePost/tree/chat
3. Rename the folder to “OxyTradePost”
2. Download Visual Code Studio IDE.
3. Download node.JS: https://nodejs.org/en/
   type npm -v- 
   if a version comes out it's installed
4. npm install --save-dev nodemon
5. npm install react-router-dom
6. Atlas Cloud MongoDB
      - Create database at https://cloud.mongodb.com
      - Create .env file in root folder
      - In .env file, set MONGODB_URL=mongodb+srv://your-db-connection
		*Note: 1) After setting up your account in MongoDB, choose ‘connect to application’, then proceed to step b & c. 2) Then copy the URI String from the MongoDB       clipboard. MAKE SURE to remove the angle brackets "<"and ">" around <password> when replacing your password from the URI. Also, you should use user password,       not account password.
7. Open a new terminal, type command 'npm start' to start the backend server
8. Open a new terminal, type command 'cd fronend2', and then 'npm start' to start the frontend. A new window should props up on your browser. 
 
Other things: 
1. Download MongoDB compass to view data in database: https://www.mongodb.com/try/download/compass
2. A documentation of other libraries installed: 
	1. npm install mongodb
	2. npm install express
	3. npm install axios
	4. npm install redux react-redux
	5. npm install mongoose
	6. npm install dotenv
	7. npm install jsonwebtoken
	8. npm install cloudinary
	9. npm install cors
	10. npm install socket.io
	11. npm install bcryptjs
	12. npm install --save-dev cross-env
	13. npm install --save express-async-handler
	14. npm install --save react-images-upload
	15. npm i socket.io-client
	16. npm install eslint@7 --save-dev
