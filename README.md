# csvtojson
converts csv files to json format


## Steps to run locally
1. Clone the repo
2. Set the necessary environment variables, like PORT, etc.
3. Run the server using npm start or npm run dev in the terminal.
4. Api route is /convert 
5. Upload the csv with fieldname = 'csvfile' from Postman or any other client side. Make sure the 'form-data' is selected as dataType in Postman and nothing else to avoid error.
6. json data is recieved as response.



future tasks.
send a json file
store teh json data in mongoDB
make a frontend using ejs
host it somewhere
