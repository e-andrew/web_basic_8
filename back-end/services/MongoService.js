const { MongoClient } = require("mongodb");

class MongoService {
    constructor(config) {
        this.client = new MongoClient(`mongodb://${config.host}:${config.port}`);
        this.database = "storage";
        this.credential = "credential";
        this.userinfo = "userinfo";
    }

    async createCredentials(record) {
        return this.client.db(this.database).collection(this.credential).insertOne(record);
    }

    async readCredentials(query) {
        return this.client.db(this.database).collection(this.credential).find(query).toArray();
    }

    async readAllCredentials() {
        return this.client.db(this.database).collection(this.credential).find({}).toArray();
    }

    async updateCredentials(query, data) {
        return this.client.db(this.database).collection(this.credential).replaceOne(query, data);
    }

    async deleteCredentials(query) {
        return this.client.db(this.database).collection(this.credential).deleteOne(query);
    }

    async createUserinfo(data) {
        return this.client.db(this.database).collection(this.userinfo).insertOne(data);
    }

    async readUserinfo(query) {
        return this.client.db(this.database).collection(this.userinfo).find(query).toArray();
    }

    async updateUserinfo(query, data) {
        return this.client.db(this.database).collection(this.userinfo).replaceOne(query, data);
    }

    async deleteUserinfo(query) {
        return this.client.db(this.database).collection(this.userinfo).deleteOne(query);
    }

    async close() {
        this.client.close();
    }
}

module.exports.MongoService = MongoService;