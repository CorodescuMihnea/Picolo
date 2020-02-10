const mysql = require('mysql');

exports.getProfile = function (req, res) {
	message = '';
	const user = req.session.user,
		userId = req.session.userId;

	if (userId == null) {
		res.redirect("/login");
		return;
	}

	const sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

	connection = mysql.createConnection({
		host: cfgJson.dbHost,
		database: cfgJson.dbName,
		user: cfgJson.dbUser,
		password: cfgJson.dbPass
	});

	connection.query(sql, function (err, results) {
		if (err) console.log(err);
		console.log(results);
		let pageName = "profile";
		res.render('profile.ejs', { user: user, pageName: pageName });
		connection.end();
	});
}

exports.updateProfile = function (req, res) {
	"";
}