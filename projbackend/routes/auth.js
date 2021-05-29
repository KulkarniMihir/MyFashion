var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');
const {signup, signin, signout, isSignedIn} = require('../controllers/auth')

router.post('/signup', [
    check("name", "name sould be atleast 3 characters !").isLength({ min: 3 }),
    check("email", "email is required/incorrect !").isEmail(),
    check("password", "password should be atleast 3 characters !").isLength({ min: 3 }),
],signup);

router.post('/signin', [
    check("email", "email is required/incorrect !").isEmail(),
    check("password", "password is required !").isLength({ min: 1 }),
],signin);

router.get('/signout', signout);
/*
router.get('/testroute', isSignedIn, (req, res) => {
    res.send("a protected route")
})
*/
module.exports = router;

