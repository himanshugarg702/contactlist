const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose')
const Contact=require('./models/contact')
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//middle ware1
// app.use(function(req,res,next){
//     req.myname="himanshu"
//    console.log('middleware 1 called');
//    next();
// });
// middle ware 2
// app.use(function (req,res,next){
    // console.log("my name from mw2",req.myname);
    // console.log('middleware 2 called');
    // next();
// });
var contactList=[
    {
        name:"himanshu garg",
        phone:"1234567654",
    },
    {
        name:"coding ninjas",
        phone:"34543234543",
    },
    {
        name:" ninjas",
        phone:"34543234543",
    }
    
]

app.get('/',function(req,res){
    //    console.log('from the get route controller',req.myname);
    // console.log("hi");
      Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title:" Contacts List",
            contact_list:contacts
      });
  
});
});
app.get('/practice',function(req,res){
return res.render('practice',
{title:"my playing ground with ejs "});
});  

app.post('/create-contact',function(req,res){
    // console.log(req.body);
//    contactList.push({
//     name:req.body.name,
//     phone:req.body.phone,
//    });
// contactList.push(req.body); 
Contact.create({
    name:req.body.name,
    phone:req.body.phone
},function(err,newContact){
    if(err){console.log('error is creating a contact!');
return;}
console.log('********',newContact);
return res.redirect('back')
});
    
});
// for deleting a contact 
app.get('/delete-contact/',function(req,res){
 console.log(req.query);
  // get the query from the url 
//  let phone=req.query.phone;
// get the id from query in the url
let id=req.query.id;
// find the contact in the database using id and delete
Contact.findByIdAndDelete(id,function(err){
    if(err){
        console.log('error in deleting an object from database');
        return;  
    }
    return res.redirect('back');
}); 
 
});

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server ');
        return ;
    }
    console.log('yup my Express Server is running on port',port);
});  