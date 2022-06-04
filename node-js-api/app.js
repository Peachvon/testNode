const express = require("express");
const mysql = require('mysql');
const app = express();

const port = process.env.PORT || 3000;
app.set('view engine','ejs')

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'thammatani'
})

conn.connect(function (error) 
{
 if(error )throw error;
 console.log("connected")
})

app.get("/:id", (request,response) =>{
  const id = request.params.id
  var sql = `DELETE FROM user WHERE user_id = ${id} `

  conn.query(sql, function(error,results){
    console.log(results)
     if(error) {
      response.send('error');
      throw error;}
     else{  
     if(results['affectedRows'] == 1){
      response.send('ลบได้');
     }
     else{
      response.send('ลบแล้ว');
     }
    }
     // response.json( results['affectedRows']);}
     //console.log(results)
    
     //response.send('success');
  })
 
})




// app.get( '/',(req, res) => {

//   res.send('index');
// });
app.get( '/user/:id/:name',(req, res) => {
 // console.log(req);
const id = req.params.id
const name = req.params.name
  res.send(`id: ${id} , name:${name}`);
 //` res.send('user ${x}');
});
app.get( '/kfc/:item/:price/:number',(req, res) => {
  // console.log(req);
  const item = req.params.item
  const price = req.params.price
  const number = req.params.number
  const sales = price * number
  //  res.send(`item: ${item} , price: ${price} , number ${number}`)
   res.send(`item: ${item} , sales: ${sales}`)
  
 });
 

app.listen(port, () => {
  console.log('server is running on port: ', port);
});