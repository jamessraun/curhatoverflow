

var login = (req,res) => {
  res.render('login')
}

var home = (req,res) => {
  res.render('home')
}

var signup = (req,res) => {
  res.render('signup')
}

var profile = (req,res) => {
  res.render('profile')
}

var mycurhat = (req,res) => {
  res.render('mycurhat')
}

module.exports = {
  login:login,
  home:home,
  signup:signup,
  profile:profile,
  mycurhat:mycurhat
};
