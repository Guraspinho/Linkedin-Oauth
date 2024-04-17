const express = require('express');
const passport = require('passport');
const crypto = require('crypto');
const router = express.Router();

// Function to generate a unique state parameter
function generateStateParameter() {
  return crypto.randomBytes(15).toString('hex');
}

router.get('/linkedin', function(req, res, next) {
  passport.authenticate('linkedin', {
    state: generateStateParameter(),
  })(req, res, next);
});

// This route is used to receive the callback after authentication has taken place
router.get('/linkedin/callback', function(req, res, next) {
  passport.authenticate('linkedin', function(err, user, info) {
    if (err) { 
      console.error('Error:', err);
      return next(err); 
    }
    if (!user) { 
      console.error('Authentication failed:', info);
      return res.redirect('/login'); 
    }
    req.logIn(user, function(err) {
      if (err) { 
        console.error('Login failed:', err);
        return next(err); 
      }
      return res.redirect('auth/login/success');
    });
  })(req, res, next);
});

// This route is used to check if login is successful
router.get('/login/success', (req, res) => {
  if (req.user) {
    return res.send(`Welcome to the afterlife, ${req.user}`);
  }
  res.send('Could not log in. Please try again.');
});

// This route is used to log out the user
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;