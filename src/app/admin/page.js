"use client";

import React, { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Loading from "@/components/Loading/Loading";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const allowedEmail = process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAIL;

  // Function to log in with Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === allowedEmail) {
        setUser(result.user); // Set the user if email matches
        setErrorMessage(null);
        setLoading(false);
      } else {
        setErrorMessage("Unauthorized access");
        handleLogout(); // Log out immediately if not authorized
        setLoading(false);
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Logout Failed");
      setLoading(false);
    }
  };

  // Function to log out
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null); // Clear the user state
      setLoading(false);
    } catch (error) {
      console.error("Logout failed", error);
      setLoading(false);
    }
  };

  // Track authentication state and auto-logout on window close
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email === allowedEmail) {
        setUser(user); // User is logged in
      } else {
        setUser(null); // User is logged out
      }
    });

    // Add a listener for window/tab closing
    const handleBeforeUnload = () => {
      handleLogout();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      unsubscribe(); // Clean up the Firebase auth listener
      window.removeEventListener("beforeunload", handleBeforeUnload); // Clean up the unload listener
    };
  }, [allowedEmail]);

  return (
    <div
      className={`relative font-sans min-h-screen flex flex-col items-center ${
        user ? "justify-start" : "justify-center"
      } justify-start bg-gray-100 p-4`}
    >
      <h3 className="font-sans mb-6 text-black">Admin Panel</h3>
      {errorMessage && (
        <p className="font-sans text-red-500 mb-4">{errorMessage}</p>
      )}
      {user ? (
        <div className="w-full flex justify-center border-b border-neutral-500 pb-4">
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/")} // This works with the new router
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Go Back to Home
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <button
            onClick={handleGoogleLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4 bg-blue flex items-center gap-2 font-semibold"
          >
            <FcGoogle size={30} /> Login with Google
          </button>

          <button
            onClick={() => router.push("/")} // This works with the new router
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mt-4"
          >
            Go Back to Home
          </button>
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
}
