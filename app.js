
const express=require('express')
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser');
const app=express();
const port= 8080
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://acharyab3:Iamcosmos@acharyab3.wg17b1q.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const jwt_expiration=86400000
const jwtsalt='privatekey'
const salt='$2b$10$Imnq7Q2r0RS7DqaKV0rpPe'
/* Middleware */
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());


// 

client.connect(function(err,db){
	if (err){
        console.log("error")
        console.error(err);
    }
  console.log("Just before")
	console.log('Connected to database')
	database = db.db('BingoGame')
	database.collection("users").find({}).toArray(err,result)
	app.listen(port,async() => {
	  console.log(`Example app listening on port ${port}`)
	})
  client.close();

}
);



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@acharyab2.wg17b1q.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// }); 

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     var database = await client.db("BingoGame").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     app.listen(port,async () => {
// 		console.log(`Example code running on port ${port}`);
// 	})
//   }
// }
// run().catch(console.dir);
async function checkUser(token){
	let result=await database.collection('users').find({jwt:token},{_id:1}).toArray();
	if(result.length>0){
		console.log(result[0]._id.toString().replace('New ObjectId("','').replace('")',''))
		return result[0]._id.toString().replace('New ObjectId("','').replace('")','')
	}
	return null
}


app.post('/api/auth/signup',(req,res)=>{
	console.log(req.body)
	database.collection('users').find({email:res.body.email}).toArray(function(err, result){
		if (err) throw err
		if(result.length>0) res.status(406).json({message:'User already exists'})
		else{
			req.body.password=bcrypt.hashSync(req.body.password,salt).replace(`${salt}.`,'')
			database.collection('users').insertOne(req.body,function(err,result){
				if (err) throw err
				res.status(201).json({message:'User created'})
			})
		}
	})
  console.log("before sending file");
  res.sendFile(__dirname + "/public/FrontEnd/html/login.html");
  console.log("after sending file");

  
})

app.post('/api/auth/signin',(req,res)=>{
	database.collection('users').find({email:req.body.email},{_id:1,email:1,password:1}).toArray(function(err, result){
		console.log(result)
		if (err) throw err
		if(result.length==0) res.status(406).json({message:'User is not registered'})
		else{
			if(result[0].password!=bcrypt.hashSync(req.body.password,salt).replace(`${salt}.`,'')) return res.status(406).json({message:'Wrong password'})
			else{
				userId=result[0]._id.toString().replace('New ObjectId("','').replace('")','')
				console.log(userId)
				let token=jwt.sign({id:userId},jwtsalt,{expiresIn:jwt_expiration})
				database.collection('users').updateOne({_id:ObjectId(userId)},{$set:{jwt:token}},function(err,result){
					if (err) throw err
					res.status(200).setHeader('Authorization', `Bearer ${token}`).json({message:'User authenticated'})
				})
			}
		}
	})
})
app.get('/index.html',(req,res) =>{
    res.sendFile('game.html');

})
app.get('/',(req,res)=>{
  res.send('index.html');
})
app.get('/users/:user/userhistory', (res,req)=> {
  // replace the tab witht he user history
  res.send("User History")
})

// this gets the playerState for each player
app.get('/games/users/:user/playerState',(res,req)=>{
  database.collection("Games").find({email:req.body.email},{projection: {palyerState: 1, _id:0}}.toArray((err, result)=> {
    if (err) throw err;
    res.send(result);
  }))
})
app.get('/api/auth/signout',(req,res)=>{
	res.json(req.body)
})
app.get('/api/request',(req,res)=>{
	res.json(req.body)
})

app.get('/api/data',async (req,res)=>{
	let userId = await checkUser(req.cookies['jwt'])
	console.log(userId)
	res.json({userId:userId})
})



