const express=require('express');
const app=express();
const passport = require('passport');
require('./auth');
app.get('/' , (req,res)=>
{
    res.send('<a href="/auth/google">Click Here to Authenticate with GOOGLE<a>');
})

app.get('/auth/google',
passport.authenticate('google',{scope : ['email','profile']}));
app.listen(8080 , (err)=>{
    if(err)
    {
        console.log("Issue in the server !! Please check");
    }
    else 
    {
        console.log("Server started !!");
    }
})