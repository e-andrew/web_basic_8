const configs = require("./configs.js");
const jwt = require("jsonwebtoken");
const tokenConfig = configs.TokenConfig;
const mongoService = require("./services/MongoService.js").MongoService;
const database = new mongoService(configs.MongoServiceConfig);

function verifyViaQueryMiddleware(req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    try {
        const payload = jwt.verify(req.query.token, tokenConfig.secret);
        req.body.login = payload.login;
        next();
    } catch (err) {
        res.status(419).json({ description: "Unautorised access." });
    }
}

function verifyViaBodyMiddleware(req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    try {
        const payload = jwt.verify(req.body.token, tokenConfig.secret);
        req.body.login = payload.login;
        next();
    } catch (err) {
        res.status(419).json({ description: "Unautorised access." });
    }
}

async function getEntryController(req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    const credentials = await database.readCredentials({ login: req.query.login });

    if (credentials.length != 0 && credentials[0].password == req.query.password) {
        res.status(200).json({ token: jwt.sign({ login: credentials[0].login, status: credentials[0].status }, tokenConfig.secret) });
    } else {
        res.status(404).json({ description: "Wrong login or password." });
    }
}

function optionsEntryController(req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, PATCH, DELETE");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.json({});
}

async function postEntryController(req, res) {
    res.set("Access-Control-Allow-Origin", "*");

    const login = req.body.login;
    const password = req.body.password;
    const passwordAgain = req.body.password_again;
    const credentials = await database.readCredentials({ login: login });

    if (credentials.length == 0 && password == passwordAgain) {
        const record = { login: login, password: password, status: "user" };
        await database.createCredentials(record);
        res.status(200).json({ login: login, status: "user" });
    } else {
        res.status(422).json({ description: "User is already exists or password mismatch." });
    }
}

async function patchEntryController(req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    const query = { login: req.body.login };
    const credentials = (await database.readCredentials(query))[0];
    credentials.password = req.body.password;
    await database.updateCredentials(query, credentials);
    res.json({});
}

async function deleteEntryController(req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    const query = { login: req.body.login };
    database.deleteCredentials(query);
    res.json({});
}

async function getInformationController(req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    const query = { login: req.body.login };
    const data = await database.readUserinfo(query);
    res.json({ userinfo: data.length == 0 ? "" : data[0].userinfo });
}

function optionsInformationController(req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "PUT, DELETE");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.json({});
}

async function putInformationController(req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    const query = { login: req.body.login };
    const newUserinfo = { login: req.body.login, userinfo: req.body.userinfo };
    const oldUserinfo = await database.readUserinfo(query);
   
    if (oldUserinfo.length == 0) await database.createUserinfo(newUserinfo);    
    else await database.updateUserinfo(query, newUserinfo);    
    res.json({});
}

async function deleteInformationController(req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    const query = { login: req.body.login };
    database.deleteUserinfo(query);
    res.json({});
}

async function shutdownController() {
    await database.close();
}

module.exports.verifyViaQueryMiddleware = verifyViaQueryMiddleware;
module.exports.verifyViaBodyMiddleware = verifyViaBodyMiddleware;

module.exports.getEntryController = getEntryController;
module.exports.optionsEntryController = optionsEntryController;
module.exports.postEntryController = postEntryController;
module.exports.patchEntryController = patchEntryController;
module.exports.deleteEntryController = deleteEntryController;

module.exports.getInformationController = getInformationController;
module.exports.optionsInformationController = optionsInformationController;
module.exports.putInformationController = putInformationController;
module.exports.deleteInformationController = deleteInformationController;
module.exports.shutdownController = shutdownController;
