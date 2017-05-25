var express = require('express')
var UserController = require('../controllers/controller-user')
var CurhatController = require ('../controllers/controller-curhat')
<<<<<<< HEAD
var CommentController = require ('../controllers/comment-controller')
=======
>>>>>>> master

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
<<<<<<< HEAD

//untuk bikin komen
router.post('/curhat/:id', CommentController.createcomment)
//untuk edit comment
router.get('/curhat/comment/:id', CommentController.editComment)
//untuk update comment
router.post('/curhat/comment/:commentID', CommentController.updateComment)
//untuk delete comment
router.delete('/deleteCurhat/:id', CommentController.deleteComment)
=======
>>>>>>> master



module.exports = router;
