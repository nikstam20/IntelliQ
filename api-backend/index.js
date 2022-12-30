const path = require('path');
const express = require('express'),
 app = express(),
 webapp = express(),
//  port = 9103,
 router = express.Router();
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const PORT = 9103;
const baseurl = '/inteliq_api';

// TEMPLATE INHERITANCE
const nunjucks = require('nunjucks');	// templating framework

nunjucks.configure(['../frontend/templates/'], {
	autoescape: false,
	express: webapp
})

//const key = fs.readFileSync('./certificates/localhost.decrypted.key');
//const cert = fs.readFileSync('./certificates/localhost.crt');
const server = https.createServer(/*{ key, cert },*/ app);
const webserver = https.createServer(/*{ key, cert },*/ webapp);

// API WEB SERVER
app.get(baseurl, (req,res) => {
	res.end('DIODE IS UP!');
});

server.listen(PORT, () => {
	console.log(`app listening at: https://localhost:${PORT}${baseurl}`);
});

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
app.use(cors());

// WEB SERVER (for frontend)
webserver.listen(80, () => {
	console.log('Web-server is up and runing at: https://localhost:80');
});

const adminhealth = require('../admin/healthcheck'),
	questionnaireupd = require('../admin/questionnaire_upd'),
	resetall = require('../admin/resetall'),
	resetq = require('../admin/resetq'),
    login = require('../admin/usermod'),
    logout = require('../admin/users'),
	questionnaire = require('../questionnaire'),
	question = require('../question'),
	doanswer = require('../doanswer'),
	getsessionanswers = require('../getsessionanswers'),
	getquestionanswers = require('../getquestionanswers');
const { homedir } = require('os');

// RESTFUL API ROUTES
app.use(baseurl+'/admin/healthcheck', adminhealth);
app.use(baseurl+'/admin/questionnaire_upd', questionnaireupd);
app.use(baseurl+'/admin/resetall', resetall);
app.use(baseurl+'/admin/resetq', resetq);
app.use(baseurl+'/admin/usermod', login)
app.use(baseurl+'/admin/users', logout)
app.use(baseurl+'/questionnaire', questionnaire);
app.use(baseurl+'/question', question);
app.use(baseurl+'/doanswer', doanswer);
app.use(baseurl+'/getsessionanswers', getsessionanswers);
app.use(baseurl+'/getquestionanswers', getquestionanswers);

// ROUTES FOR FRONTEND
webapp.use(express.static(path.join(__dirname, '..') + "/frontend/assets"));
webapp.use(express.static(path.join(__dirname, '..') + "/frontend/bundles/dist"));

webapp.use("/", require('./routes/Home.routes.js'));
webapp.use("/chargesby", require('./routes/ChargesBy.routes.js'));
webapp.use("/passesanalysis", require('./routes/PassesAnalysis.routes.js'));
webapp.use("/passesperstation", require('./routes/PassesPerStation.routes.js'));

module.exports = router;