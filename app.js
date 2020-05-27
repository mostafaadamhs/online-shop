const express = require("express");
const path = require("path");

const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');


const homeRouter = require("./routes/home.route");
const productRouter = require("./routes/product.route");
const authRouter = require("./routes/auth.route");
const cartRouter = require("./routes/cart.route");
const adminRouter = require("./routes/admin.route");

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(flash());

// STORE
const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/online-shop',
    collection: 'sessions'
});

// app .use (session({}))
app.use(session({
    secret: 'this is my secret secret to hash express sessions',
    saveUninitialized: false,
    store: STORE,
    //     proxy: true,
    resave: false,


}));

app.set('view engine', 'ejs');
app.set('views', 'views');

// home Router
app.use('/', homeRouter);
// auth Router
app.use('/', authRouter);

// product Router
app.use('/product', productRouter);
// cart Router
app.use("/cart", cartRouter);
// admin Router
app.use("/admin", adminRouter);
//
app.get("/error", (req, res, next) => {
    res.status(500);
    res.render('error.ejs', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin
    })
});

//
/*
app.use((error, req, res ,next) => {
   res.redirect('/error');
});
*/


//
app.get("not-admin", (req, res, next) => {
    res.status(403);
    res.render("not-admin", {
        isUser: req.session.userId,
        isAdmin: false
    });

});
//
app.use((req, res, next) => {
    res.status(404);
    res.render("not-found", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "Page Not Found"
    });
});


const port = process.env.PORT || 3000;

// server listen
app.listen(port, () => {

    console.log("server listen on port " + port);
})