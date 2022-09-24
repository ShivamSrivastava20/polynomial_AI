const express=require('express');
const app=express();
const passport = require('passport');
require('./auth');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
//const { session } = require('passport');
const session = require('express-session');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla' 
  }));
app.use(passport.initialize());
app.use(passport.session());

const CLIENT_ID ='696893014391-413iut3n1qj4a34hrkd1t48l309b1cj7.apps.googleusercontent.com';
const CLIENT_SECRET='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';
const Redirect_URI='http://localhost:8080/sendmail';
const REFRESH_TOKEN='1//04AhTl04YKu0pCgYIARAAGAQSNwF-L9IrNNc99GQEPyZZLJmFLcBAkFFfhnkvA0G-nok-oAHzoZ0XB5XEJJYkKQup7sfcK0dij8Q';


const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    Redirect_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  
 
app.get('/' , (req,res)=>
{
    res.send('<a href="/google">Click Here to Authenticate with GOOGLE<a>');
})

app.get('/google', 
passport.authenticate('google',{ scope :['email' , 'profile']
}))

//-----------------------

//const passport = require('passport');


var GoogleStrategy = require('passport-google-oauth20').Strategy;

let ids;
passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: Redirect_URI,
    passReqToCallback:true 
  },
  
  function(request,accessToken, refreshToken, profile, done) {
    userProfile=profile;
     ids = userProfile.emails.map((obj) => obj.value)
    
    return done(null, userProfile);
}
));

passport.serializeUser(function(user,done)
{
return done(null,user);
});

passport.deserializeUser(function(user,done)
{
return done(null,user);
});

//------------------------------------------



app.get('/sendmail', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    
    res.redirect('/sendmailauth');
  }
);


app.get('/sendmailauth' ,async (req,res)=>{
//async function sendMailtoclient() {
  //  try {
    const accessToken = await oAuth2Client.getAccessToken();

  

 // console.log("Verify" , usernameField);
    
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'srivashivam20@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'Shivam <srivashivam20@gmail.com>',
        to: ids,
        subject: 'EMAIL VERIFICATION',
        text: 'EMAIL VERIFICATION',
        html: '<h1>EMAIL VERIFICATION</h1>',
      };
  
     transport.sendMail(mailOptions);
     res.send({message : "Mail is sent to your mailbox for Verification"})
    })
    app.get('/failed', (req, res) => res.send('You Failed to log in!'))
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