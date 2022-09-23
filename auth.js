const passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;


const CLIENT_ID ='696893014391-413iut3n1qj4a34hrkd1t48l309b1cj7.apps.googleusercontent.com';
const CLIENT_SECRET='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';
const Redirect_URI='https://mail.google.com';
const REFRESH_TOKEN='1//04AhTl04YKu0pCgYIARAAGAQSNwF-L9IrNNc99GQEPyZZLJmFLcBAkFFfhnkvA0G-nok-oAHzoZ0XB5XEJJYkKQup7sfcK0dij8Q';


passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: Redirect_URI
  },
  function(request ,accessToken, refreshToken, profile, cb) {
   
    return cb(err, profile);
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