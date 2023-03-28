const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _=require("lodash");
let alert=require('alert');
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
let myem=" "
let mynm="Guest"
let n2=" "
let adr=" "
let gen=" "
let cnt=" "
let cty=" "


main().catch(err => console.log(err));
async function main(){
    await mongoose.connect('mongodb+srv://prajwalcj78:test123@prajju.bbok5kw.mongodb.net/foodDB');
  console.log("Connected")
  const questionschema={
    question:{ type: String, unique: true },
    answer:{type:String,default:"We will answer your question soon"}
  }
  const loginschema={
    fname:{type:String,required:true},
    lname:String,

    emailid:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    scores:{type:Number,default:0},
    contact:Number,
    address:String,
    city:String,
    Gender:String,
  }
  const reqschema={
    address:String,
    flatno:String,
    landmark:String,
    pincode:Number,
    number:Number,
    
    received:{ type: Boolean, default: false },

  }
  const donationschema={
    head:Number,
    address:String,
    city:String,
    pincode:Number,
    contact:Number,
    contact2:Number,
    availability:String,
    emailid:String,
    time:String,
    received:{type:String,default:"No"}
  }
  const rewardschema={
    Name:String,
    emailid:String,
    address:String,
    contact:Number,
    scores:String,
  }
  const QUE=mongoose.model("QUE",questionschema)
  const People=mongoose.model("People",loginschema)
  const Receiver=mongoose.model("Receiver",reqschema)
  const Donor=mongoose.model("Donor",donationschema)
  const Win=mongoose.model("Win",rewardschema)
  app.get("/faq",function(req,res){
    QUE.find()
    .then(function(que){
        res.render('faq2',{nme:"HOME",nmed:" ",pst:que,i:0,myname:mynm})
  })
  .catch(function(err){
    console.log(err);
  })
})
app.post("/faq",function(req,res){
    const qu=req.body.faqu;
    const ko=new QUE({
        question:qu,
    })
    ko.save()
    res.redirect("/faq")
})
app.get("/",function(req,res){
  res.render('food',{nme:"LOGIN",nmed:"login",myname:mynm});

})
app.get("/login",function(req,res){
  res.render('login',{nme:"HOME",nmed:" ",myname:mynm})
})
app.get("/contact",function(req,res){
  
  res.render('contact',{nme:"HOME",nmed:" ",myname:mynm})
});
app.get("/about",function(req,res){
res.render('aboutus',{nme:"HOME",nmed:" ",myname:mynm})
});
app.get("/sign",function(req,res){
  res.render('signup')
  })
app.post("/sign",function(req,res){
  
  const emai=req.body.email;
  if(emai.slice(-10)!="@gmail.com"){
    alert("add a valid gmail account");
    res.redirect("/sign");
  }
  People.findOne({emailid:emai})
    .then(function(foundemail){
       if(!foundemail){
         mynm=req.body.name1;
         n2=req.body.nam2;
        const pssrd=req.body.password;
   adr=req.body.address;
   gen=req.body.gender;
   cnt =req.body.contact;
   cty=req.body.cty;
  const yuhg=new People({
    fname:mynm,
    lname:n2,
    emailid:emai,
    password:pssrd,
    contact:cnt,
    address:adr,
    city:cty,
    Gender:gen,

  })
  yuhg.save();
  myem=emai;
  
  res.redirect("/");
       }
       else{
      alert("Account is already created from this account please try to login");
        res.redirect("/sign")
       }
    })
    .catch(function(err){
      console.log(err)
    })
  
})
app.get("/profile",function(req,res){
  res.render('profile',{fn:mynm,ln:n2,mah:myem,cit:cty,adrr:adr,phn:cnt,gend:gen})
})
app.post("/login",function(req,res){
  People.findOne({emailid:req.body.Uname})
  .then(function(founditem){
    if(!founditem){
      alert("no account is created with this Email Id please Sign in");
      res.redirect("/login");
    }else{
      if(req.body.pd===founditem.password){
        myem=req.body.Uname;
        mynm=founditem.fname;
        n2=founditem.lname;
        adr=founditem.address;
        gen=founditem.Gender;
        cnt=founditem.contact;
        cty=founditem.city;
        res.redirect("/");
      }else{
        alert("you entered a wrong password");
        res.redirect("/login");
      }
    }
  })
  .catch(function(err){
    console.log(err);
  })
})
app.get("/req",function(req,res){
  res.render("requestfood")
})
app.post("/req",function(req,res){
  
  
  
  const tyu=new Receiver({
    address:req.body.rda,
    flatno:req.body.flatno,
    landmark:req.body.landmark,
    pincoode:req.body.pin,
    number:req.body.altno,
    
})
tyu.save();
res.redirect("/");
})
app.get("/dona",function(req,res){
  res.render("donation");
})
app.post("/dona",function(req,res){
const hu=req.body.head;
const dun=new Donor({
  head:hu,
  address:req.body.abcd,
    city:req.body.ctyi,
    pincode:req.body.pine,
    contact:cnt,
    contact2:req.body.contact,
    availability:req.body.availability,
    emailid:myem,
    time:req.body.time,
    

})
dun.save();
People.findOne({emailid:myem})
.then(function(founditem){
  if(!founditem){
    alert("Your request is confirmed we will reach you soon")
    res.redirect("/")
    
  }else{
    founditem.scores+=hu*100;
   founditem.save()
    res.redirect("/")
  }
})
.catch(function(err){
  console.log(err);
})
})
app.get("/score",function(req,res){
  People.findOne({emailid:myem})
  .then(function(founditem){
    if(!founditem){
      res.render("myscore",{points:0})
    }else{
      res.render("myscore",{points:founditem.scores})
    }
  })
  .catch(function(err){
    console.log(err);
  })
})
app.post("/score",function(req,res){
  People.findOne({emailid:myem})
  .then(function(founditem){
    if(!founditem){
      res.redirect("/score");
    }else{
      const hu=new Win({
        Name:mynm,
    emailid:myem,
    address:adr,
    contact:cnt,
    scores:founditem.scores,
      })
      hu.save()
      founditem.scores=0;
      founditem.save()
      res.redirect("/score")
    }
  })
    
})
app.post("/profile",function(req,res){
   myem=" "
 mynm="Guest"
 n2=" "
 adr=" "
 gen=" "
 cnt=" "
 cty=" "
res.redirect("/")
})

}



app.listen(process.env.PORT||3000,function(){
    console.log("server started on 3000");
})