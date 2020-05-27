const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;

const authGuard = require("./guards/auth.guard");

const authController = require("../controllers/auth.controller");

router.get("/signup", authGuard.notAuth, authController.getSignup);


//let o = {a:5}; let {a} = o; // let a = o.a

router.post(
    "/signup", authGuard.notAuth,
    bodyParser.urlencoded({extended: true}),
    check('username').not().isEmpty().withMessage('username is required'),
    check('email').not()
        .isEmpty().withMessage('email is required')
        .isEmail().withMessage('invalid format'),
    check('password').not()
        .isEmpty().withMessage("password is required")
        .isLength({min: 6})
        .withMessage('password must be at least 6 characters'),

    check('confirmpassword').custom((value, {req}) => { // custom validator
           if(value === req.body.password) return true
           else throw 'passwords do not equal';
    }),

    authController.postSignup
);

router.get("/login", authGuard.notAuth,       
     authController.getLogin
);

router.post(
    "/login",
    authGuard.notAuth,
    bodyParser.urlencoded({ extended: true}),
    check("email")
     .not()
     .isEmpty()
     .withMessage("email is required")
     .isEmail()
     .withMessage("invalid format"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("password is required")
      .isLength({ min: 6})
      .withMessage("password must be at least 6 characters"),
      
    authController.postLogin
);

router.all(
    '/logout', authGuard.isAuth ,authController.logout
);

module.exports = router;