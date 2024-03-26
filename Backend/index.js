const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer")
const fs = require("fs")
const usersModel = require("./models/usersSchema");
const placesModel = require("./models/placesSchema");


const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('/uploads', express.static(__dirname+'/uploads'))

mongoose.connect("mongodb://localhost:27017/HomeAway");

const jwtSecret="this is a secret"

app.post('/signup',(req,res)=>{
    const {firstName,lastName,email,number}=req.body

    usersModel.findOne({email:email})
    .then(user=>{
        if (user){
            res.json("You already heve an account")
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hashed)=>{
                if (err) throw err
                else{
                    password = hashed
                    isHost=false
                    usersModel.create({firstName,lastName,email,number,password,isHost})
                    res.json("You have created an account")
                }
            })        
        }
    }  
    )  
})

app.post('/login', (req,res)=>{
    const {email,password}=req.body
    usersModel.findOne({email:email})
    .then(user=>{
        if (user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if (err) throw err;
                else{
                    if(response){
                        jwt.sign({email:user.email,id:user._id},jwtSecret,{},(err,token)=>{
                            if (err) throw err;
                            res.cookie("token",token).json({state:"You are logged in",userDoc:user})
                        })
                    }
                    else{
                        res.json("Password incorrect")
                    }
                }
            })
        }
        else{
            res.json("User not found")
        }
    })
})

app.get('/profile',(req,res)=>{
    const {token} = req.cookies
    if (token){
        jwt.verify(token,jwtSecret,{},(err,tokenInfo)=>{
            if (err) throw err ;
            else{
                usersModel.findById(tokenInfo.id)
                .then((user)=>{
                    res.json(user)
                })
            }
        })
    }
    else{
        res.json(null)
    }
  
})

app.post('/logout', (req,res)=>{
    res.cookie("token",'').json(true)
})

app.post('/signupashost', (req,res)=>{
    const {id} = req.body
    usersModel.findByIdAndUpdate(id, { isHost: true }, { new: true })
    .then (user=>{
        res.json(user)
    })
   
})

app.post('/postad',(req,res)=>{
    const {owner,title,address,photos,maxguests,description,perks} = req.body
    placesModel.create({owner,title,address,photos,maxguests,description,perks})
    res.json("waiting for review")
})


const photosMidelware = multer({dest:'uploads'});
app.post('/uploadPics',photosMidelware.array('photos',100) , (req,res)=>{
    const uploadedPhotos = []
    for (let i=0; i<req.files.length;i++){
        const {path,originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedPhotos.push(newPath)
    }
    res.json(uploadedPhotos)
    
})

app.get('/myPlaces',(req,res)=>{
    const {token} = req.cookies
    jwt.verify(token,jwtSecret,{},(err,userInfos)=>{
        const {id} = userInfos;
        placesModel.find({owner:id})
        .then(places=>res.json(places))
    })
})

app.post('/placeInfo', (req,res)=>{
    const id = req.body.id;
    placesModel.findById(id)
    .then(place=>res.json(place))
})

app.post('/getOwnerInfo', (req,res)=>{
    const owner = req.owner;
    usersModel.findById(owner)
    .then(info=>res.json(info))
})

app.listen(3001,()=>{
    console.log("The server is running...")
})