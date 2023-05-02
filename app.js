const express=require('express');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const app = express();
const port= 8080;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// Abhishek
const uri = "mongodb+srv://abhishekshrestha5125:9vg9or9p@clustor1a.mrjuys9.mongodb.net/?retryWrites=true&w=majority";
// Bikash
// const uri = "mongodb+srv://acharyab2:Iamcosmos@acharyab2.wg17b1q.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const jwt_expiration=86400000;
const jwtsalt='privatekey';
const salt='$2b$10$Imnq7Q2r0RS7DqaKV0rpPe';
/* Middleware */
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());
var db=null
async function connect(){
	let connection=await client.connect()
	return connection
}
async function insert(db,database,collection,document){
  let dbo=db.db(database)
  let result=await dbo.collection(collection).insertOne(document)
  console.log(result)
  return result;
}
async function find(db,database,collection,criteria){
  let dbo=db.db(database)
  let result=await dbo.collection(collection).find(criteria).toArray()
  //console.log(result)
  return result;
}
async function start(){
	db=await connect()
	console.log('mongoDB connected')
	app.listen(port,()=>{
	  console.log(`Example app listening on port ${port}`)
	})
}
start()

/* WEB routes */

app.get('/auth/signup',(req,res)=>{
	res.status(200).send(fs.readFileSync('./pages/auth/signup.html','utf-8'))
})
app.get('/auth/signin',(req,res)=>{
	res.status(200).send(fs.readFileSync('./pages/auth/signin.html','utf-8'))
})



app.get('/game',(req,res) =>{
	res.status(200).send(fs.readFileSync('/FrontEnd/html/game.html','utf-8'))
})

/* API routes */


app.post('/api/auth/signup',(req,res)=>{
    // signup the new user
});

app.post('/api/auth/signin',(req,res)=>{
// login if the user exit
})



app.get('/api/games',(req,res)=>{
// get the game history
})

app.post('/api/games',(req,res)=>{
    // create game
    })
    
app.get('/api/games/gameid',(req,res)=>{
    // current status of the game
    })

app.post('/api/games/gameid',(req,res)=>{
        // join game
    })

app.put('/api/games/gameid',(req,res)=>{

})
// Bikash signup api
// app.post('/api/auth/signup',(req,res)=>{
// 	const databaseName = "BingoGame";
// 	const collectionName = "users";
// 	if((find(db,databaseName,collectionName,{username:req.body.email},{email:1}) >0 )) {
// 		console.log("User Exists!")
// 		res.status(406).json({message:'User already exists'});
// 	}
// 	else {
// 		req.body.password=bcrypt.hashSync(req.body.password,salt).replace(`${salt}.`,'');
// 		insert(db,databaseName,collectionName, req.body);
// 		res.sendFile(__dirname + "/public/FrontEnd/html/login.html");
// 		res.status(201).json({message:'User created'})
		
// 	}
// })

// Abhi signup api




// async function checkUser(token){
// 	let result=await database.collection('users').find({jwt:token},{_id:1}).toArray();
// 	if(result.length>0){
// 		console.log(result[0]._id.toString().replace('New ObjectId("','').replace('")',''))
// 		return result[0]._id.toString().replace('New ObjectId("','').replace('")','')
// 	}
// 	return null
// }


// app.post('/api/auth/signin',(req,res)=>{
// 	database.collection('users').find({email:req.body.email},{_id:1,email:1,password:1}).toArray(function(err, result){
// 		console.log(result)
// 		if (err) throw err
// 		if(result.length==0) res.status(406).json({message:'User is not registered'})
// 		else{
// 			if(result[0].password!=bcrypt.hashSync(req.body.password,salt).replace(`${salt}.`,'')) return res.status(406).json({message:'Wrong password'})
// 			else{
// 				userId=result[0]._id.toString().replace('New ObjectId("','').replace('")','')
// 				console.log(userId)
// 				let token=jwt.sign({id:userId},jwtsalt,{expiresIn:jwt_expiration})
// 				database.collection('users').updateOne({_id:ObjectId(userId)},{$set:{jwt:token}},function(err,result){
// 					if (err) throw err
// 					res.status(200).setHeader('Authorization', `Bearer ${token}`).json({message:'User authenticated'})
// 				})
// 			}
// 		}
// 	})
// })

// app.get('/',(req,res)=>{
//   res.send('index.html');
// })
// app.get('/users/:user/userhistory', (res,req)=> {
//   // replace the tab witht he user history
//   res.send("User History")
// })

// // this gets the playerState for each player
// app.get('/games/users/:user/playerState',(res,req)=>{
//   database.collection("Games").find({email:req.body.email},{projection: {palyerState: 1, _id:0}}.toArray((err, result)=> {
//     if (err) throw err;
//     res.send(result);
//   }))
// })
// app.get('/api/auth/signout',(req,res)=>{
// 	res.json(req.body)
// 	res.sendFile(__dirname + "/public/FrontEnd/html/login.html");
// })
// app.get('/api/request',(req,res)=>{
// 	res.json(req.body)
// })

// app.get('/api/data',async (req,res)=>{
// 	let userId = await checkUser(req.cookies['jwt'])
// 	console.log(userId)
// 	res.json({userId:userId})
// })



