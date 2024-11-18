/**
 * @file RegistrySection.js
 * @description This component handles the Registry section of the wedding website, allowing guests to unlock payment details via a password-protected dialog. It supports copying payment details to the clipboard.
 *              Admin can use a different password that redirect to the admin panel when entered.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import React, { useState, useRef, useEffect } from "react";
import images from "@/utils/imagesImport";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoCopyOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import translations from "@/utils/translations";

const RegistrySection = ({ language }) => {
  // Destructure translation strings
  const {
    title,
    description_1,
    description_2,
    description_3,
    description_4,
    button,
    thanks,
    error_from_api,
    error_incorrect_password,
    error_insert_password,
    account_holder,
    iban,
    bank_name,
    bic,
    sort_code,
    account_number,
    eur,
    gbp,
    pln,
    toast_copied,
    toast_error,
    dialog_title,
    placeholder,
    submit_button,
    copy_all,
  } = translations[language].registry_section;

  // States for managing the input password and showing/hiding it
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  const [isValid, setIsValid] = useState(null); // null means no attempt yet
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState(""); // Error message text
  const [paymentInfo, setPaymentInfo] = useState(null); // Stores payment info
  const { toast } = useToast(); // Hook to trigger toast messages
  const dialogRef = useRef(null); // Reference to adjust the dialog position

  // Variants for the framer motion animation
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const secondaryVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } },
  };

  // Function to adjust dialog position when the keyboard is visible
  const handleInputFocus = () => {
    if (dialogRef.current) {
      dialogRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Render a custom dashed line on screen
  const dashedLine = Array(3)
    .fill()
    .map((_, index) => (
      <div key={index} className="w-[2px] h-[5px] my-[3px] bg-gold" />
    ));

  // Handles submitting the password to retrieve payment information
  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (password.length > 0) {
      setLoading(true);
      // Path for opening admin page. No need to protect this too much as this is like a hidden button for convenience and admin page has an auth
      if (password === process.env.NEXT_PUBLIC_ADMIN_ACCESS_PASSWORD) {
        window.open("/admin", "_blank"); // Redirect to admin page
        setLoading(false);
        setIsValid(false);
        setErrorText(error_incorrect_password);
      } else {
        try {
          // Check password from the server
          const response = await fetch("/api/check-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
          });

          const result = await response.json();
          // Check if the password is correct
          if (result.success) {
            const response = await fetch("/api/get-payment-info", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ password }),
            });

            const paymentResult = await response.json();

            if (paymentResult.success) {
              // Password is valid, and payment info is available
              setIsValid(true);
              setPaymentInfo(paymentResult.paymentInfo);
              console.log(paymentInfo);
              setErrorText("");
            } else {
              setIsValid(false);
              setErrorText(error_from_api);
            }
          } else {
            setIsValid(false);
            setErrorText(error_incorrect_password);
          }
        } catch (error) {
          // Handle any API errors
          setIsValid(false);
          setErrorText(error_from_api);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    } else {
      setErrorText(error_insert_password); // Show error if password is empty
      setLoading(false);
      setIsValid(null);
    }
  };

  // Copies all payment details of a currency to the clipboard
  const copyToClipboardEntireBox = (currency) => {
    let copiedText = "";

    if (currency === "eur") {
      copiedText += `${account_holder} ${paymentInfo.EUR.accountHolder}\n${iban} ${paymentInfo.EUR.iban}\n${bank_name} ${paymentInfo.EUR.bankName}\n${bic} ${paymentInfo.EUR.bic}`;
    } else if (currency === "gbp") {
      copiedText += `${account_holder} ${paymentInfo.GBP.accountHolder}\n${sort_code} ${paymentInfo.GBP.sortCode}\n${account_number} ${paymentInfo.GBP.accountNumber}\n${bank_name} ${paymentInfo.GBP.bankName}`;
    } else if (currency === "pln") {
      copiedText += `${account_holder} ${paymentInfo.PLN.accountHolder}\n${iban} ${paymentInfo.PLN.iban}\n${account_number} ${paymentInfo.PLN.accountNumber}\n${bank_name} ${paymentInfo.PLN.bankName}`;
    } else {
      return;
    }

    navigator.clipboard
      .writeText(copiedText)
      .then(() => {
        toast({
          title: toast_copied,
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          variant: "destructive",
          title: toast_error,
        });
      });
  };

  // Copies a specific text to the clipboard
  const copyTextToCLipboard = (text) => {
    let copiedText = `${text}`;

    navigator.clipboard
      .writeText(copiedText)
      .then(() => {
        toast({
          title: toast_copied,
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          variant: "destructive",
          title: toast_error,
        });
      });
  };

  // Format sort code from 123456 to 12-34-56
  const formatSortCode = (sortCode) => {
    return sortCode.replace(/(\d{2})(?=\d)/g, "$1-").slice(0, 8);
  };

  // Effect to handle scrolling when inputs are focused (mobile)
  useEffect(() => {
    const inputElements = document.querySelectorAll("input");
    inputElements.forEach((input) => {
      input.addEventListener("focus", handleInputFocus);
    });

    return () => {
      inputElements.forEach((input) => {
        input.removeEventListener("focus", handleInputFocus);
      });
    };
  }, []);

  return (
    <section
      id="gift-section"
      className="relative bg-blue px-4 sm:px-12 py-12 flex items-center flex-col overflow-hidden"
    >
      {/* Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={primaryVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center px-4 z-10 mb-8 md:mb-12"
      >
        <Image
          src={images.glass}
          alt="glass"
          width={95}
          height={95}
          quality={100}
          className="mb-4 w-[90px] h-auto brightness-95"
        />
        <div className="flex flex-col justify-center items-center">
          <h3 translate="no" className="text-white font-bold z-20 ">
            {title.main}
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10"
          >
            {title.sub}
          </h3>
        </div>
      </motion.div>

      <div className="relative w-full max-w-[700px] text-white text-center flex flex-col items-center z-10">
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
          className=" text-center mb-4"
        >
          {description_1}
        </motion.p>
        {dashedLine}
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
          className=" text-center my-4"
        >
          {description_2}
        </motion.p>
        {dashedLine}
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
          className=" text-center my-4"
        >
          {description_3}
        </motion.p>
        {dashedLine}
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
          className=" text-center my-4"
        >
          {description_4}
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Dialog>
            <DialogTrigger
              translate="no"
              className="bg-transparent text-gold border border-gold px-3 py-2 rounded-full mt-6  transition-all duration-300 hover:bg-gold hover:text-white"
            >
              {button}
            </DialogTrigger>
            <DialogContent
              ref={dialogRef}
              className="max-h-[90vh] sm:max-w-[580px] max-sm:w-[95%] max-sm:p-2 max-sm:rounded-md"
            >
              <DialogHeader>
                <DialogTitle translate="no" className="text-3xl font-bold">
                  {!isValid && !paymentInfo
                    ? dialog_title.before
                    : dialog_title.after}
                </DialogTitle>
                <DialogDescription className="flex flex-col items-center">
                  {!isValid && !paymentInfo && (
                    <>
                      <form
                        onSubmit={handlePasswordSubmit}
                        className="w-full flex flex-col items-center"
                      >
                        <div className="w-full h-[42px] mb-4 flex border  py-0 pl-0 pr-2 rounded-lg">
                          <Input
                            translate="no"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            type={viewPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={placeholder}
                            className="font-serif mb-4 focus:outline-none focus:ring-0 text-lg border-none"
                          />
                          <button
                            type="button"
                            translate="no"
                            onClick={(e) => {
                              e.preventDefault();
                              setViewPassword(!viewPassword);
                            }}
                            className="active:bg-zinc-200 rounded-full"
                          >
                            {viewPassword ? (
                              <FaRegEye size={20} />
                            ) : (
                              <FaRegEyeSlash size={20} />
                            )}
                          </button>
                        </div>
                        <Button
                          translate="no"
                          type="submit"
                          disabled={loading}
                          className="bg-[#233d74] hover:bg-gold text-lg w-fit"
                        >
                          {loading
                            ? submit_button.loading
                            : submit_button.submit}
                        </Button>
                        {isValid === false && errorText.length > 0 && (
                          <span
                            translate="no"
                            className="text-red-500 mt-2 text-lg"
                          >
                            {errorText}
                          </span>
                        )}
                        {isValid === null && errorText.length > 0 && (
                          <span
                            translate="no"
                            className="text-red-500 mt-2 text-lg"
                          >
                            {errorText}
                          </span>
                        )}
                      </form>
                    </>
                  )}
                </DialogDescription>
              </DialogHeader>
              {isValid && paymentInfo && (
                <div className="w-full h-full max-h-[75svh] relative overflow-auto flex flex-col justify-start items-start px-2 py-2 gap-4">
                  <div className="w-full text-left flex flex-col justify-start items-start">
                    <div className="w-full flex justify-between gap-2">
                      <h5 translate="no" className="font-sans font-semibold">
                        {eur}
                      </h5>{" "}
                      <button
                        translate="no"
                        onClick={() => copyToClipboardEntireBox("eur")}
                        className="flex items-center gap-1 mr-2 text-sm text-[#233d74] underline underline-offset-2"
                      >
                        <IoCopyOutline /> {copy_all}
                      </button>
                    </div>
                    <div className="w-full flex flex-col items-start justify-start p-4 bg-gray-100">
                      <div className="w-full flex items-center justify-between gap-1">
                        {" "}
                        <p
                          translate="no"
                          className="font-sans font-light text-left flex flex-col sm:gap-1"
                        >
                          <span className="font-semibold">
                            {account_holder}
                          </span>
                          {paymentInfo.EUR.accountHolder}
                        </p>
                        <button
                          onClick={() =>
                            copyTextToCLipboard(paymentInfo.EUR.accountHolder)
                          }
                          className="mb-4"
                        >
                          <IoCopyOutline size={18} />
                        </button>
                      </div>
                      <div className="w-full flex items-center justify-between gap-1">
                        <p
                          translate="no"
                          className="font-sans font-light text-left flex flex-col  sm:gap-1"
                        >
                          <span className="font-semibold">{iban}</span>
                          {paymentInfo.EUR.iban}
                        </p>{" "}
                        <button
                          onClick={() =>
                            copyTextToCLipboard(paymentInfo.EUR.iban)
                          }
                          className="mb-4"
                        >
                          <IoCopyOutline size={18} />
                        </button>
                      </div>

                      <div className="w-full flex items-center justify-between gap-1">
                        <p
                          translate="no"
                          className="font-sans font-light text-left flex flex-col  sm:gap-1"
                        >
                          <span className="font-semibold">{bank_name}</span>
                          {paymentInfo.EUR.bankName}
                        </p>
                        <button
                          onClick={() =>
                            copyTextToCLipboard(paymentInfo.EUR.bankName)
                          }
                          className="mb-4"
                        >
                          <IoCopyOutline size={18} />
                        </button>
                      </div>

                      <div className="w-full flex items-center justify-between gap-1">
                        <p
                          translate="no"
                          className="font-sans font-light text-left flex flex-col sm:gap-1"
                        >
                          <span className="font-semibold">{bic}</span>
                          {paymentInfo.EUR.bic}
                        </p>
                        <button
                          onClick={() =>
                            copyTextToCLipboard(paymentInfo.EUR.bic)
                          }
                          className="mb-4"
                        >
                          <IoCopyOutline size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full text-left flex flex-col justify-start items-start">
                    <div className="w-full flex justify-between gap-2">
                      <h5 translate="no" className="font-sans font-semibold">
                        {gbp}
                      </h5>
                      <button
                        translate="no"
                        onClick={() => copyToClipboardEntireBox("gbp")}
                        className="flex items-center gap-1 mr-2 text-sm text-[#233d74] underline underline-offset-2"
                      >
                        <IoCopyOutline /> {copy_all}
                      </button>
                    </div>
                    <div className="w-full flex flex-col items-start justify-start p-4 bg-gray-100">
                      <div className="w-full flex items-center justify-between gap-1">
                        <p
                          translate="no"
                          className="font-sans font-light text-left flex flex-col sm:gap-1"
                        >
                          <span className="font-semibold">
                            {account_holder}
                          </span>
                          {paymentInfo.GBP.accountHolder}
                        </p>
                        <button
                          onClick={() =>
                            copyTextToCLipboard(paymentInfo.GBP.accountHolder)
                          }
                          className="mb-4"
                        >
                          <IoCopyOutline size={18} />
                        </button>
                      </div>

                      <div className="w-full flex items-center justify-between gap-1">
                        <p
                          translate="no"
                          className="font-sans font-light text-left flex flex-col sm:gap-1"
                        >
                          <span className="font-semibold">{sort_code}</span>
                          {formatSortCode(paymentInfo.GBP.sortCode)}
                        </p>
                        <button
                          onClick={() =>
                            copyTextToCLipboard(paymentInfo.GBP.sortCode)
                          }
                          className="mb-4"
                        >
                          <IoCopyOutline size={18} />
                        </button>
                      </div>

                      <div className="w-full flex items-center justify-between gap-1">
                        <p
                          translate="no"
                          className="font-sans font-light text-left flex flex-col sm:gap-1"
                        >
                          <span className="font-semibold">
                            {account_number}
                          </span>
                          {paymentInfo.GBP.accountNumber}
                        </p>
                        <button
                          onClick={() =>
                            copyTextToCLipboard(paymentInfo.GBP.accountNumber)
                          }
                          className="mb-4"
                        >
                          <IoCopyOutline size={18} />
                        </button>
                      </div>

                      <div className="w-full flex items-center justify-between gap-1">
                        <p
                          translate="no"
                          className="font-sans font-light text-left flex flex-col sm:gap-1"
                        >
                          <span className="font-semibold">{bank_name}</span>
                          {paymentInfo.GBP.bankName}
                        </p>
                        <button
                          onClick={() =>
                            copyTextToCLipboard(paymentInfo.GBP.bankName)
                          }
                          className="mb-4"
                        >
                          <IoCopyOutline size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full text-left flex flex-col justify-start items-start">
                    <div className="w-full flex justify-between gap-2">
                      <h5 translate="no" className="font-sans font-semibold">
                        {pln}
                      </h5>{" "}
                      <button
                        translate="no"
                        onClick={() => copyToClipboardEntireBox("pln")}
                        className="flex items-center gap-1 mr-2 text-sm text-[#233d74] underline underline-offset-2"
                      >
                        <IoCopyOutline /> {copy_all}
                      </button>
                    </div>
                    <div className="w-full flex flex-col items-start justify-start p-4 bg-gray-100">
                      <div className="w-full flex items-center justify-between gap-1">
                        <p
                          translate="no"
                          className="font-sans font-light text-left flex flex-col sm:gap-1"
                        >
                          <span className="font-semibold">
                            {account_holder}
                          </span>
                          {paymentInfo.PLN.accountHolder}
                        </p>
                        <button
                          onClick={() =>
                            copyTextToCLipboard(paymentInfo.PLN.accountHolder)
                          }
                          className="mb-4"
                        >
                          <IoCopyOutline size={18} />
                        </button>
                      </div>

                      <div className="w-full flex items-center justify-between gap-1">
                        <p
                          translate="no"
                          className=" font-sans font-light text-left flex flex-col sm:gap-1"
                        >
                          <span className="font-semibold">{iban}</span>
                          {paymentInfo.PLN.iban}
                        </p>
                        <button
                          onClick={() =>
                            copyTextToCLipboard(paymentInfo.PLN.iban)
                          }
                          className="mb-4"
                        >
                          <IoCopyOutline size={18} />
                        </button>
                      </div>

                      <div className="w-full flex items-center justify-between gap-1">
                        <p
                          translate="no"
                          className="font-sans font-light text-left flex flex-col sm:gap-1"
                        >
                          <span className="font-semibold">
                            {account_number}
                          </span>
                          {paymentInfo.PLN.accountNumber}
                        </p>
                        <button
                          onClick={() =>
                            copyTextToCLipboard(paymentInfo.PLN.accountNumber)
                          }
                          className="mb-4"
                        >
                          <IoCopyOutline size={18} />
                        </button>
                      </div>

                      <div className="w-full flex items-center justify-between gap-1">
                        <p
                          translate="no"
                          className="font-sans font-light text-left flex flex-col sm:gap-1"
                        >
                          <span className="font-semibold">{bank_name}</span>
                          {paymentInfo.PLN.bankName}
                        </p>
                        <button
                          onClick={() =>
                            copyTextToCLipboard(paymentInfo.PLN.bankName)
                          }
                          className="mb-4"
                        >
                          <IoCopyOutline size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </motion.div>

        <Image
          src={images.divider}
          alt={`divider`}
          width={650}
          height={0}
          quality={100}
          className={`w-[160px] h-auto mt-12 mb-8 `}
        />

        <motion.h3
          initial="hidden"
          whileInView="visible"
          variants={primaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
          className="font-bold text-center text-gold"
        >
          {thanks}
        </motion.h3>
      </div>
      <Image
        src={images.la2}
        alt={`Line art 1`}
        width={650}
        height={0}
        quality={100}
        className={`max-md:hidden absolute w-[250px] md:w-[350px] lg:w-[450px] top-24 xl:top-72 right-0 xl:right-16 z-0 opacity-30 transform rotate-[45deg]`}
      />
      <Image
        src={images.la3}
        alt={`Line art 2`}
        width={650}
        height={0}
        quality={100}
        className={`max-md:hidden w-[250px] md:w-[350px] lg:w-[450px] absolute bottom-20 xl:bottom-32 left-0 z-0 opacity-30 transform scale-x-[-1] rotate-[45deg]`}
      />
    </section>
  );
};

export default RegistrySection;
