const { db } = require("./adminPush");
const guestsList = require("../utils/guestsList");

// Function to add guests to Firestore
const importGuests = async () => {
  const batch = db.batch(); // Using batch for bulk writes

  guestsList.forEach((guest) => {
    const docRef = db.collection("guests").doc(`${guest.id}`); // Use guest id as document ID
    batch.set(docRef, guest); // Add each guest to Firestore
  });

  try {
    await batch.commit(); // Commit the batch write
    console.log("Guests successfully added!");
  } catch (error) {
    console.error("Error adding guests: ", error);
  }
};

importGuests();
