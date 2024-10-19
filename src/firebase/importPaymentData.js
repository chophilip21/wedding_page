const { db } = require("./adminPush");
const paymentData = require("../utils/paymentData");

// Function to add payment data to Firestore
const importPaymentData = async () => {
  try {
    const docRef = db.collection("payment_data").doc("currencies"); // Set fixed ID for the document
    await docRef.set(paymentData); // Directly set paymentData as an object
    console.log("Payment data successfully added!");
  } catch (error) {
    console.error("Error adding payment data: ", error);
  }
};

importPaymentData();
