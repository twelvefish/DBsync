"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const config = require("./config");
const databaseURLPath = "https://messagingsystem-218402.firebaseio.com";
const serviceAccountPath = '../../functions/serviceAccount/messagingsystem-218402-firebasekey.json';
var serviceAccount = require(serviceAccountPath);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURLPath
});
const connectSQL_1 = require("./connectSQL");
connectSQL_1.connectSQL(config.sqlString);
//# sourceMappingURL=index.js.map