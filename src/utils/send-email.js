import emailjs from "emailjs-com";

// Initialize EmailJS (this is needed once in your app)
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

const sendEmail = async (data) => {
  try {
    // Send the email using EmailJS service
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // EmailJS Service ID
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, // EmailJS Template ID
      data // Data to be included in the email
    );

    return result; // Return the result on success
  } catch (error) {
    // Log the error and throw it to be handled by the calling function
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;
