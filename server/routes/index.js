var express = require('express');
var router = express.Router();

function auth(req, res, next){
  if(!req.loggedIn)
    return res.send({"error": "UNAUTHORISED"});

  next();
}

/* GET home page. */
router.get('/check', auth, function(req, res, next) {
  return res.send(JSON.stringify({"status": "SUCCESS", username: req.user}));
});

module.exports = router;
