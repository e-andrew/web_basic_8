const ServerConnectionOptions = {
    host: '127.0.0.1',
    port: '10001'
}

const TokenOptions = {
    secret: "TestSecretString",
    algorithm: "RS256"
}

const MongoConnectionOptions = {
    host: '127.0.0.1',
    port: 10002,
    username: '',
    password: ''
}

module.exports.ServerConfig = ServerConnectionOptions;
module.exports.TokenConfig = TokenOptions;
module.exports.MongoServiceConfig = MongoConnectionOptions;