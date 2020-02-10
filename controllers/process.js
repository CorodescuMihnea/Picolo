exports.processBlob = function(req, res) {
	if (req.method == "POST") {
		const reqData = req.body;
		console.log(reqData.body);
    res.send(req.body);
	}
}