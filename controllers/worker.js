const mysql = require('mysql');

exports.getWorkerView = function (req, res) {
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
			console.log(req.body)
			params = {};
			res.render('workerContainer.ejs', { user: user, params: params });
			// message = "HERE IS YOUR SLAVE";
		}
		else {
			res.render('workerRequestForm.ejs', { user: user });
		}
	});
} 

exports.getWorker = function (req, res) {
	const reqData = req.body;
	/**
	 * do the actual worker creating
	 */

	// Use res sendFile to actually send the worker
	res.send("MAKE THIS MESSAGE GREAT AGAIN ");
}
