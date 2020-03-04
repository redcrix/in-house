module.exports = (app, passport) => {

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
        next();
  
    } else {
      // Forbidden
      res.status(401).send({
        code:401,
        success: false, 
        message: 'Authentication Token is not valid'
    });
    }
  
  }

const apis = require('../controller/controller');

    app.post('/login', apis.login);
    app.post('/signup', apis.signup);
    app.get('/product', apis.show_all_product);
    app.post('/add_product', apis.add_product);
    app.get('/competition', apis.show_all_competition);
    app.post('/add_competition_details', apis.add_competition_details);
    app.get('/add_competitors', apis.add_competitors);
}