const productsModel = require("../models/products.model");




exports.getHome = (req, res, next) => {
    // get products
    // render index.ejs


    // get category
    // if category && categoray !== all
    //      make filter
    // else
    //      render all
    console.log(req.session.userId);
    let category = req.query.category;
    let validCategories = ['clothes','phones','computer','shuhe'];
    let productsPromise;
    if(category && validCategories.includes( category) ) productsPromise = productsModel.getProductsByCategory(category)
    else productsPromise = productsModel.getAllProducts();
    productsPromise.then(products => {
        res.render('index', {
            products: products,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
            pageTitle: 'Home'

        });
    })



}