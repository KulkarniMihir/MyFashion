var express = require('express')
var router = express.Router()

const {isSignedIn, isAuthenticated} = require('../controllers/auth');
const {getToken, processPayment} = require('../controllers/paymentb');

const {getUserById} = require('../controllers/user');


//params
router.param("userId", getUserById);

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated, processPayment);


module.exports = router;
