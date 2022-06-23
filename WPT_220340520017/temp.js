
const mysql=require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'wptexam',
	port:3306
});


const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');


app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



var result;

app.get('/showstatus',  (req, res)=> {
		let bid = req.query.bookid;

		let output = {status:false,msg:"Bookid not found",bname:"",price:""};
		connection.query('select * from book where bookid=?',[bid],(err,rows)=>{
			if(err){
				console.log("Err"+err);
			}
			else{
				if(rows.length>0)
				{
					output.status=true;
					output.msg="Bookid found";
					output.bname=rows[0].bookname;
					output.price=rows[0].price;
					res.send(output);
				}
				else{
					console.log("no rows found");
					res.send(output);

				}
			}
		});

        
    });




	app.get('/updateInfo',  (req, res)=> {
		let bid = req.query.bookid;
		let bname = req.query.bookname;
		let price = req.query.price;
		

		let output = {status:false,msg:"Bookid not found Can not update "};
		connection.query('update book set bookname=?,price=? where bookid=?',[bname,price,bid],(err,rows)=>{
			if(err){
				console.log("Err"+err);
			}
			else{
				if(rows.affectedRows>0)
				{
					output.status=true;
					output.msg="Book details updated";
					res.send(output);
				}
				else{
					console.log("Bookid not found Can not update ");
					res.send(output);

				}
			}
		});

        
    });






app.listen(8081, function () {
    console.log("server listening at port 8081...");
});