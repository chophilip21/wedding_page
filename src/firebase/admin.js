const admin = require("firebase-admin");

// Check if a Firebase Admin app is already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
    // Optionally, specify the databaseURL if you're using Realtime Database
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
} else {
  admin.app(); // If already initialized, use that one
}

const db = admin.firestore();

module.exports = { db };
