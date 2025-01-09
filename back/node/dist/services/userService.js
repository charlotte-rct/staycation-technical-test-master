"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const db_1 = __importDefault(require("../db"));
const getUser = async (userId) => {
    console.log(db_1.default);
    const res = await db_1.default.query("SELECT * FROM users WHERE id=$1::int", [userId]);
    console.log(res);
    return (0, camelcase_keys_1.default)(res.rows[0]);
};
exports.getUser = getUser;
