/*const passport = require('passport');


var GoogleStrategy = require('passport-google-oauth20').Strategy;

const CLIENT_ID ='696893014391-413iut3n1qj4a34hrkd1t48l309b1cj7.apps.googleusercontent.com';
const CLIENT_SECRET='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';
const Redirect_URI='http://localhost:8080/sendmail';
//const REFRESH_TOKEN='1//04AhTl04YKu0pCgYIARAAGAQSNwF-L9IrNNc99GQEPyZZLJmFLcBAkFFfhnkvA0G-nok-oAHzoZ0XB5XEJJYkKQup7sfcK0dij8Q';
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
    console.log(ids);
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

module.exports.ids=ids;
*/