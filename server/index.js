const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

//MIDDLEWARE
const checkForSession = require('./middlewares/checkForSession')

//CONTROLLER
const swag_controller = require('./controller/swag_controller')
const auth_controller = require('./controller/auth_controller')
const cart_controller = require('./controller/cart_controller')


const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: 'H311O W0R1D! $$$',
    resave: false,
    saveUninitialized: false
}));

app.use(checkForSession)


//ENDPOINTS
//GETTING THE SWAG
app.get('/api/swag/', swag_controller.read);

//CREATING THE USER
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

const port = 3000;
app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})
