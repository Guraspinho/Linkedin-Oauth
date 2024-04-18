
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const passport = require('passport');

passport.use(
    new LinkedInStrategy(
    {
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: "https://linkedin-oauth-gm9o.onrender.com/auth/linkedin/callback",
    scope: ['openid', 'profile', 'email'],
    state: true,
    passReqToCallback: true,
    },
    function(accessToken, refreshToken, profile, done)
    {
    // asynchronous verification, for effect...
    process.nextTick(function ()
    {
        // To keep the example simple, the user's LinkedIn profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the LinkedIn account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
    });
    }));


    