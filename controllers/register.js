const mysql = require('mysql');

exports.register = function (req, res) {
	message = 'SHIT FUCK';
	if (req.method == "POST") {
		const reqData = req.body;
		const timestamp = Math.round((new Date()).getTime() / 1000000);
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

		global.connection.connect();

		// connection.ping(function (err) {
		// 	if (err) throw err;
		// 	console.log('Server responded to ping');
		// });

		connection.query(sql, function (err, result) {
			if (err) console.log(err);
			
			message = "Success! Your account has been created.";
			res.render('register.ejs', { message: message });
			connection.commit(function () {
				connection.end();
			});
		});
	} else {
		res.render('register', { message : message });
	}
};