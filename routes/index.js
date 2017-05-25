var express = require('express')
var UserController = require('../controllers/controller-user')
var CurhatController = require ('../controllers/controller-curhat')

router.get('/login',User.Controller.loginscreen)
router.get('/editProfile',UserController.editProfile)
router.put('/updateProfile',UserController.updateProfile)
router.post('/signup',UserController.signup)
router.post('/login',UserController.login)
router.delete('/logout',UserController.logout)


router.get('/',CurhatController.Home)
router.get('/myCurhat',CurhatController.myCurhats)
router.get('/Curhat',CurhatController.searchCurhat)
router.get('/editCurhat/:id',CurhatController.editCurhat)
router.post('/updateCurhat/:id', CurhatController.updateCurhat)
router.post('/createCurhat',CurhatController.createCurhat)
router.delete('/deleteCurhat/:id',CurhatController.deleteCurhat)



module.exports = router;
