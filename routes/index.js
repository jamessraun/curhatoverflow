var express = require('express')
var router = express.Router()
var controller = require('../controllers/controller')

router.get('/login',controller.login)
router.get('/signup',controller.signup)
router.get('/',controller.home)
router.get('/profile',controller.profile)

router.get('/mycurhat',controller.mycurhat)



module.exports = router;
