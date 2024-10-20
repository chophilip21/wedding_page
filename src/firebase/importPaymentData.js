/**
 * @file importPaymentData.js
 * @description This script is used to push payment data into Firestore from a local file.
 * To run the import process, execute the command: `node src/firebase/importPaymentData.js`.
 *
 * Example of how the payment data should look like:
 *
 * const paymentData = {
 *   EUR: {
 *     iban: "DE89370400440532013000",
 *     accountHolder: "Emanuele Sgroi",
 *     bankName: "Commerzbank AG",
 *     bic: "COBADEFFXXX",
 *   },
 *   GBP: {
 *     sortCode: "60-16-13",
 *     accountNumber: "31926819",
 *     accountHolder: "Emanuele Sgroi",
 *     bankName: "National Westminster Bank",
 *   },
 *   PLN: {
 *     iban: "PL27114020040000300201355387",
 *     accountHolder: "Emanuele Sgroi",
 *     bankName: "mBank S.A.",
 *     bic: "BREXPLPWXXX",
 *   },
 * };
 *
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

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
