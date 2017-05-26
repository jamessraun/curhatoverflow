var express = require('express')
var router = express.Router()
var UserController = require('../controllers/controller-user')
var CurhatController = require ('../controllers/controller-curhat')
var CommentController = require ('../controllers/comment-controller')

router.get('/login',UserController.loginscreen)
router.get('/profile/:id',UserController.editProfile)
router.post('/updateProfile/:id',UserController.updateProfile)
router.get('/signup',(req,res)=>{
  res.render('signup',{title:"Signup",message:null})
})
router.post('/signup',UserController.signup)
router.post('/login',UserController.login)
router.get('/logout',UserController.logout)


router.get('/',CurhatController.Home)
router.get('/myCurhat',CurhatController.myCurhats)
router.get('/Curhat',CurhatController.searchCurhat)
router.get('/editCurhat/:id',CurhatController.editCurhat)
router.post('/updateCurhat/:id', CurhatController.updateCurhat)
router.post('/createCurhat',CurhatController.createCurhat)
router.get('/deleteCurhat/:id',CurhatController.deleteCurhat)

//untuk bikin komen
router.post('/curhat/:id', CommentController.createcomment)
//untuk edit comment
router.get('/curhat/comment/:id', CommentController.editComment)
//untuk update comment
router.post('/curhat/comment/:commentID', CommentController.updateComment)
//untuk delete comment
router.get('/deleteComment/:id', CommentController.deleteComment)




module.exports = router;
