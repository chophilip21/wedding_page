import { NextResponse } from "next/server";
import { db } from "@/firebase/admin"; // Admin SDK instance

export async function POST() {
  try {
    // Fetch payment info from Firestore
    const paymentDoc = await db
      .collection("payment_data")
      .doc("currencies")
      .get();

    if (!paymentDoc.exists) {
      return NextResponse.json({
        success: false,
        message: "Payment data not found",
      });
    }

    // Get all currency information (EUR, GBP, PLN, etc.)
    const paymentData = paymentDoc.data();

    return NextResponse.json({
      success: true,
      paymentInfo: paymentData, // Return all payment data (no currency selection logic)
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching payment info",
      error: error.message, // Send the error message for debugging
    });
  }
}
