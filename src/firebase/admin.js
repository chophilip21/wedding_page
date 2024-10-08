const admin = require("firebase-admin");
const serviceAccount = require("../../e-k-wedding-website-firebase-adminsdk-tpk2b-3f0dcd0ec9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };
