const Category = require('../models/category');

//middleware check
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cat) => {
        if(err){
            return res.status(400).json({
                error: "Category not found in DB"
            })
        }
        req.category = cat; 
        next();
    });
};

//create
exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save category in DB"
            })
        }
        res.json({category}); 
    });
};

//read
exports.getCategory = (req, res) => {
    return res.json(req.category)

};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: "No category in DB"
            })
        }
        res.json(categories);
    });
};

//update
exports.updateCategory = (req, res) => {
    //get category name and change it with the one inputed
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update category"
            })
        }
        res.json(updatedCategory); 
    });
};

//delete
exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if(err){
            return res.status(400).json({
                error: `Failed to delete category`
            })
        }
        res.json({
            message: `successfully deleted ${category} category`
        });
    });
};