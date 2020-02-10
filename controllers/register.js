const mysql = require('mysql');

exports.register = function (req, res) {
	message = '';
	if (req.method == "POST") {
		const reqData = req.body;
		const timestamp = Math.round((new Date()).getTime() / 1000000);

		if (reqData.confirm_password != reqData.password) {
			message = "Password doesn't match";
			res.render('register.ejs', { message: message, animate: true });
			return;
		}
		// YES I KNOW I SHOULD HASH THE F... PASSWORD
		const sql = "INSERT INTO `users`(`first_name`,`last_name`,`email`, `password`) VALUES ('" + 
			reqData.first_name + "','" + 
			reqData.last_name + "','" + 
			reqData.email + "','" + 
			reqData.password + "')";
		console.log(sql);

		connection = mysql.createConnection({
			host: cfgJson.dbHost,
			database: cfgJson.dbName,
			user: cfgJson.dbUser,
			password: cfgJson.dbPass
		});

		connection.connect();

		// connection.ping(function (err) {
		// 	if (err) throw err;
		// 	console.log('Server responded to ping');
		// });

		connection.query(sql, function (err, result) {
			if (err) console.log(err);
			
			message = "Success! Your account has been created.";
			res.render('login.ejs', { message: message, animate: true });
			connection.commit(function () {
				connection.end();
			});
		});
	} else {
		res.render('register', { message: message, animate: false });
	}
};