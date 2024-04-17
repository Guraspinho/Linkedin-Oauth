const express = require('express');
const app = express();
require('dotenv').config();
const routes  = require('./routes/linkedin');
const strat  = require('./auth/linkedin');
const session = require('express-session');
const passport = require('passport');


app.use(session({
    secret: 'your-secret-value',
    resave: false,
    saveUninitialized: false,
  }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign in with LinkedIn</title>
  <style>
    .linkedin-btn {
      background-color: #0077B5; /* LinkedIn blue */
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .linkedin-btn:hover {
      background-color: #005f91; /* Darker shade of LinkedIn blue on hover */
    }
  </style>
</head>
<body>
  <button class="linkedin-btn" onclick="redirectToLinkedIn()">Sign in with LinkedIn</button>

  <script>
    function redirectToLinkedIn() {
      // Redirect to the LinkedIn authentication URL
      window.location.href = "/auth/linkedin";
    }
  </script>
</body>
</html>`);
});

app.get('/login', (req,res) =>
{
    res.send('Please log in to continue');
})

app.use('/auth', routes);   
const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});