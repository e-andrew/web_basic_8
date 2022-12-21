const express = require('express');
const config = require("./configs.js").ServerConfig;
const controllers = require("./controllers.js");

const app = express();
app.use(express.json());

app.route("/entry")
    .get(controllers.getEntryController)
    .options(controllers.optionsEntryController)
    .post(controllers.postEntryController)
    .patch(controllers.verifyViaBodyMiddleware, controllers.patchEntryController)
    .delete(controllers.verifyViaBodyMiddleware, controllers.deleteEntryController);

app.route("/information")
    .get(controllers.verifyViaQueryMiddleware, controllers.getInformationController)
    .options(controllers.optionsInformationController)
    .put(controllers.verifyViaBodyMiddleware, controllers.putInformationController)
    .delete(controllers.verifyViaBodyMiddleware, controllers.deleteInformationController);

const server = app.listen(config.port, config.host);

function shutdown() {
    server.close(async () => {
        await controllers.shutdownController();
        process.exit(0);
    });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);