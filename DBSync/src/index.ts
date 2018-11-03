import * as admin from 'firebase-admin';
import * as config from './config'

const databaseURLPath = "firebaseURL"
const serviceAccountPath = 'firebaseKey'
var serviceAccount = require(serviceAccountPath);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURLPath
});

import { connectSQL } from './connectSQL'

connectSQL(config.sqlString)
