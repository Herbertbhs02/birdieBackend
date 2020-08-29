import * as express from "express";
import * as mysql from "mysql";
export const pingController = express.Router();


//Setting up connection to aws mysql database
const connection = mysql.createConnection({
  host: 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
  user: 'test-read',
  password: 'xnxPp6QfZbCYkY8',
  database: 'birdietest'
});
connection.connect((err:any) => {
  if(err){
      console.log(err)
  } 
});
//Fetch data from database and send it to front-end

pingController.get('/data', (req, res) => {
         const user = req.query.userInput;
         console.log(user)
  connection.query(`SELECT * FROM events WHERE care_recipient_id="${user}"`, (err:any,rows:any) => {
    //console.log(rows)
    if(err){console.log(err)}else{
        res.status(200).json({
          rows
        });
    }
  });

 });
