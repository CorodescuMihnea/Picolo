const mysql = require('mysql');

exports.login = function (req, res) {
	message = '';
	var sess = req.session;

	if (req.method == "POST") {
		const reqData = req.body;
		// YES YES HASH THAT SHIT
		const sql = "SELECT id, first_name, last_name, email FROM `users` WHERE `email`='" + reqData.email + 
			"' and password = '" + reqData.password + "'";
		console.log(sql);

		connection = mysql.createConnection({
			host: cfgJson.dbHost,
			database: cfgJson.dbName,
			user: cfgJson.dbUser,
			password: cfgJson.dbPass
		});

		connection.connect();
		connection.query(sql, function (err, results) {
			if (err) console.log(err);

			if (results.length) {
				req.session.userId = results[0].id;
				req.session.user = results[0];
				console.log(results[0].id);
				res.redirect('/dashboard');
			}
			else {
				message = 'Wrong Credentials.';
				res.render('login', { message: message, animate:false });
			}
		});
	} else {
		message = '';
		let animate = false;
		if (req.body.animate === true) animate = true;
		res.render('login', { message: message, animate:animate });
	}
}