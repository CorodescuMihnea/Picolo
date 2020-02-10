exports.processBlob = function(req, res) {
	if (req.method == "POST") {
		console.log("Recieved");
    res.send(req);
	}
}