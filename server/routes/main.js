const router = require('express').Router();
const Category = require('../modals/category');

router.route('/categories')
.get((req, res, next)=>{
    Category.find({}, (err,categories)=>{
        res.json({
            success: true,
            message: 'success',
            categories: categories
        })
    })
})
.post((req, res, next)=>{
    let category = new Category();
    category.name = req.body.category;
    category.save();

    res.json({
        success: true,
        message: 'Successful'
    });
});

module.exports = router;
