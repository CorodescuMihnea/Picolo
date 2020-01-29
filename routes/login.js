exports.login = function(req,res) {
  res.sendFile('./views/login.html', {root: global.cfgJson.projectPath})
  // let today = new Date();
  // let users = {
  //   "first_name": req.body.first_name,
  //   "last_name": req.body.last_name,
  //   "email": req.body.email,
  //   "password": req.body.password,
  //   "created": today,
  //   "modified": today
  // }
  // connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
  //   if (error) {
  //     console.log("error ocurred", error);
  //     res.send({
  //       "code": 400,
  //       "failed": "error ocurred"
  //     })
  //   } else {
  //     console.log('The solution is: ', results);
  //     res.send({
  //       "code": 200,
  //       "success": "user registered sucessfully"
  //     });
  //   }
  // });
}