const express = require('express');
const passport = require('passport');
const crypto = require('crypto');
const router = express.Router();

// This function generates a random string to use as the state parameter
function generateStateParameter()
{
	return crypto.randomBytes(20).toString('hex');
}

router.get('/linkedin', function(req, res, next)
	{
		const stateParameter = generateStateParameter();
		console.log(stateParameter);
		req.session.state = stateParameter;
		passport.authenticate('linkedin', { state: stateParameter})(req, res, next);
	}
);

// This route is used to receive the callback after authentication has taken place
router.get('/linkedin/callback', function(req, res, next)
{
  passport.authenticate('linkedin', function(err, user, info) {
    if (err)
	{ 
      console.error('Error:', err);
      return next(err); 
    }
    if (!user)
	{ 
		console.log(req.query.state);
      console.error('Authentication failed:', info);
      return res.redirect('/'); 
    }
    req.logIn(user, function(err)
	{
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