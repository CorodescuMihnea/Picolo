const mysql = require('mysql');

exports.login = function (req, res) {
	message = 'SHIT FUCK';
	const sess = req.session;

	if (req.method == "POST") {
		const post = req.body;
		const name = post.user_name;
		const pass = post.password;
		
		const sql = "SELECT id, first_name, last_name, email FROM `users` WHERE `email`='" + email + 
			"' and password = '" + pass + "'";

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
				res.redirect('/home/dashboard');
			}
			else {
				message = 'Wrong Credentials.';
				res.render('login', { message: message });
			}
		});
	} else {
		res.render('login', { message: message });
	}
}