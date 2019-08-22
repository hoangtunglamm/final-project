const authorize = (req, res, next) => {
    if (!req.session || !req.session.admin) {
      res.redirect('/auth')
    } else next();
  };
  
  module.exports = { authorize };