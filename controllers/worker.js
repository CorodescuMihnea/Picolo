const mysql = require('mysql');

exports.getWorker = function (req, res) {
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

		if (req.method == "POST") {
			console.log(req.body);
			params = {
				pageName: "dashboard",
				domain: req.body.domain,
				imgUrl: req.body.imgUrl,
				lossy: req.body.lossy,
				quality: req.body.quality
			};
			// Push worker entry in db
			res.render('workerContainer.ejs', params);
			// message = "HERE IS YOUR SLAVE";
		}
		else {
			message = "Something went wrong";
			res.render('dashboard.ejs', { message: message });
		}
	});
} 
