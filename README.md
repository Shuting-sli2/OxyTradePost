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
 
You don’t have to, but might also want to: 
1. Download MongoDB compass to view data in database: https://www.mongodb.com/try/download/compass
—-------------—-------------—-------------—-------------—-------------—-------------
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
