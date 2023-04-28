const open = import('open')
const fs =require('fs')
const express=require('express')
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser');
const app=express()
const port= 8080
console.log(port)
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://acharyab2:OaRvySGCpmzvoPuF@acharyab2.wg17b1q.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const jwt_expiration=86400000
const jwtsalt='privatekey'
const salt='$2b$10$Imnq7Q2r0RS7DqaKV0rpPe'
var database=null
/* Middleware */
app.use(express.static('public'));
app.use(express.static('Front End'));
app.use(bodyParser.json());
app.use(cookieParser());
client.connect(function(err,db){
	if (err){
        console.error(err);
    }
    console.log("Just before")
	console.log('Connected to database')
	database = db.db('BingoGame')
	app.listen(port,async() => {
	  console.log(`Example app listening on port ${port}`)
	  await open(`http://localhost:${port}`)
	})
});

async function checkUser(token){
	let result=await database.collection('users').find({jwt:token},{_id:1}).toArray();
	if(result.length>0){
		console.log(result[0]._id.toString().replace('New ObjectId("','').replace('")',''))
		return result[0]._id.toString().replace('New ObjectId("','').replace('")','')
	}
	return null
}

/* WEB routes */
/*
app.get('/auth/signup',(req,res)=>{
	res.status(200).send(fs.readFileSync('./pages/auth/signup.html','utf-8'))
})
app.get('/auth/signin',(req,res)=>{
	res.status(200).send(fs.readFileSync('./pages/auth/signin.html','utf-8'))
})
app.get('/',async (req,res)=>{
	userId=await checkUser(req.cookies['jwt'])
	console.log(userId)
	res.status(200).send(fs.readFileSync('./pages/public.html','utf-8'))
})
app.get('/private',(req,res)=>{
	res.status(200).send(fs.readFileSync('./pages/private.html','utf-8'))
})
*/
/* API routes */
app.post('/api/auth/signup',(req,res)=>{
	console.log(req.body)
	database.collection('users').find({email:req.body.email},{email:1}).toArray(function(err, result){
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
    res.sendFile(game.html)

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



