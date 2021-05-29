var express = require('express')
var router = express.Router()

const {
    getProductById, 
    createProduct,
    getProduct,
    photo,
    updateProduct,
    removeProduct,
    getAllProducts,
    getAllUniqueCategories
} = require('../controllers/product');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');
const {getUserById} = require('../controllers/user');


//params
router.param("userId", getUserById);
router.param("productId", getProductById);

//routes
//create route
router.post(
    '/product/create/:userId', 
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    createProduct
);

//read route
router.get('/product/:productId', getProduct);
//optimization for photo
router.get('/product/photo/:productId', photo);

//update route
router.put(
    '/product/:productId/:userId', 
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    updateProduct
);

//delete route
router.delete(
    '/product/:productId/:userId',
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    removeProduct
);

//listing route
router.get('/products', getAllProducts);

router.get('/products/catrgories', getAllUniqueCategories);

module.exports = router;