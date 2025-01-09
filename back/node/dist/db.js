"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: 'staycation',
    host: 'localhost',
    database: 'staycation',
    password: 'password',
    port: 5432
});
client.connect();
exports.default = client;
