exports.register = function(req,res) {
    res.sendFile('./views/register.html', {root: global.cfgJson.projectPath})
}