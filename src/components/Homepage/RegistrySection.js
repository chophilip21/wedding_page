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
import { useRouter } from "next/router";

const RegistrySection = () => {
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [isValid, setIsValid] = useState(null); // null means no attempt yet
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [paymentInfo, setPaymentInfo] = useState(null); // Stores payment info
  const { toast } = useToast();
  const dialogRef = useRef(null);

  // Function to adjust dialog position when the keyboard is visible
  const handleInputFocus = () => {
    if (dialogRef.current) {
      dialogRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dashedLine = Array(3)
    .fill()
    .map((_, index) => (
      <div key={index} className="w-[2px] h-[5px] my-[3px] bg-gold" />
    ));

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (password.length > 0) {
      setLoading(true);
      //path for opening admin page. No need to protect this too much as this is like a hidden button for convenience and admin page has an auth
      if (password === process.env.NEXT_PUBLIC_ADMIN_ACCESS_PASSWORD) {
        window.open("/admin", "_blank");
        setLoading(false);
        setIsValid(false);
        setErrorText("Incorrect password");
      } else {
        try {
          const response = await fetch("/api/check-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
          });

          const result = await response.json();

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
              setIsValid(true);
              setPaymentInfo(paymentResult.paymentInfo);
              console.log(paymentInfo);
              setErrorText("");
            } else {
              setIsValid(false);
              setErrorText("There is a problem. Try again later or contact us");
            }
          } else {
            setIsValid(false);
            setErrorText("Incorrect password");
          }
        } catch (error) {
          setIsValid(false);
          setErrorText("There is a problem. Try again later or contact us");
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    } else {
      setErrorText("Insert password");
      setLoading(false);
      setIsValid(null);
    }
  };

  const copyToClipboardEntireBox = (currency) => {
    let copiedText = "";

    if (currency === "eur") {
      copiedText += `
      Account Holder: ${paymentInfo.EUR.accountHolder}
  IBAN: ${paymentInfo.EUR.iban}
  Bank Name: ${paymentInfo.EUR.bankName}
  BIC: ${paymentInfo.EUR.bic}
      `;
    } else if (currency === "gbp") {
      copiedText += `
      Account Holder: ${paymentInfo.GBP.accountHolder}
  Sort Code: ${paymentInfo.GBP.sortCode}
  Account Number: ${paymentInfo.GBP.accountNumber}
  Bank Name: ${paymentInfo.GBP.bankName}
      `;
    } else if (currency === "pln") {
      copiedText += `
       Account Holder: ${paymentInfo.PLN.accountHolder}
  IBAN: ${paymentInfo.PLN.iban}
  Bank Name: ${paymentInfo.PLN.bankName}
  BIC: ${paymentInfo.PLN.bic}
      `;
    } else {
      return;
    }

    navigator.clipboard
      .writeText(copiedText)
      .then(() => {
        toast({
          title: "Copied",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          variant: "destructive",
          title: "Could not copy it",
        });
      });
  };

  const copyTextToCLipboard = (text) => {
    let copiedText = `${text}`;

    navigator.clipboard
      .writeText(copiedText)
      .then(() => {
        toast({
          title: "Copied",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          variant: "destructive",
          title: "Could not copy it",
        });
      });
  };

  const formatSortCode = (sortCode) => {
    return sortCode.replace(/(\d{2})(?=\d)/g, "$1-").slice(0, 8);
  };

  useEffect(() => {
    // Optionally, listen for focus and blur events on inputs
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
      className="bg-blue px-4 sm:px-12 py-12 flex items-center flex-col relative overflow-hidden"
    >
      {/* Title */}
      <div className="w-full flex flex-col items-center px-4 z-10 mb-8 md:mb-12">
        <Image
          src={images.glass}
          alt="glass"
          width={95}
          height={95}
          quality={100}
          className="mb-4 w-[90px] h-auto brightness-95 "
        />
        <div className="flex flex-col justify-center items-center">
          <h3 translate="no" className="text-white font-bold z-20 ">
            GIFT
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10"
          >
            Registry
          </h3>
        </div>
      </div>

      <div className="relative w-full max-w-[700px] text-white text-center flex flex-col items-center z-10">
        <p translate="no" className=" text-center mb-4">
          Your presence at our wedding is the greatest gift we could ask for.
        </p>
        {dashedLine}
        <p translate="no" className=" text-center my-4">
          However, if you wish to honor us with a gift, we would greatly
          appreciate a monetary contribution to help us build our future
          together.
        </p>
        {dashedLine}
        <p translate="no" className=" text-center my-4">
          We kindly ask our international guests to consider sending their gift
          via IBAN transfer or a similar method such as Revolut. For our Polish
          guests, contributions can be made online or given in cash at the
          wedding, whichever is more convenient.
        </p>
        {dashedLine}
        <p translate="no" className=" text-center my-4">
          To access the IBAN details, please click the button below and enter
          the password you received with the invitation, or contact us directly
          for further information.
        </p>
        <Dialog>
          <DialogTrigger translate="no" className="btn2 mb-4">
            View Info
          </DialogTrigger>
          <DialogContent
            ref={dialogRef}
            className="max-h-[90vh] sm:max-w-[580px] max-sm:w-[95%] max-sm:p-2 max-sm:rounded-md"
          >
            <DialogHeader>
              <DialogTitle translate="no" className="text-3xl font-bold">
                {!isValid && !paymentInfo
                  ? "Enter the password"
                  : "The password is correct"}
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
                          placeholder="Enter password"
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
                        {loading ? "Checking..." : "Submit"}
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
                      EUR
                    </h5>{" "}
                    <button
                      translate="no"
                      onClick={() => copyToClipboardEntireBox("eur")}
                      className="flex items-center gap-1 mr-2 text-sm text-[#233d74] underline underline-offset-2"
                    >
                      <IoCopyOutline /> Copy All
                    </button>
                  </div>
                  <div className="w-full flex flex-col items-start justify-start p-4 bg-gray-100">
                    {/* <div className="w-full flex items-center justify-between gap-1"></div> */}
                    <div className="w-full flex items-center justify-between gap-1">
                      {" "}
                      <p
                        translate="no"
                        className="font-sans font-light text-left flex flex-col sm:flex-row sm:gap-1 tracking-wide break-all"
                      >
                        <span className="font-semibold">Account Holder: </span>
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
                        className="font-sans font-light text-left flex flex-col sm:flex-row sm:gap-1 tracking-wide break-all"
                      >
                        <span className="font-semibold">IBAN: </span>
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
                        className="font-sans font-light text-left flex flex-col sm:flex-row sm:gap-1 tracking-wide break-all"
                      >
                        <span className="font-semibold">Bank Name:</span>
                        {paymentInfo.EUR.bankName}
                      </p>{" "}
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
                        className="font-sans font-light text-left flex flex-col sm:flex-row sm:gap-1 tracking-wide break-all"
                      >
                        <span className="font-semibold">BIC: </span>
                        {paymentInfo.EUR.bic}
                      </p>
                      <button
                        onClick={() => copyTextToCLipboard(paymentInfo.EUR.bic)}
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
                      GBP
                    </h5>{" "}
                    <button
                      translate="no"
                      onClick={() => copyToClipboardEntireBox("gbp")}
                      className="flex items-center gap-1 mr-2 text-sm text-[#233d74] underline underline-offset-2"
                    >
                      <IoCopyOutline /> Copy All
                    </button>
                  </div>
                  <div className="w-full flex flex-col items-start justify-start p-4 bg-gray-100">
                    <div className="w-full flex items-center justify-between gap-1">
                      {" "}
                      <p
                        translate="no"
                        className="font-sans font-light text-left flex flex-col sm:flex-row sm:gap-1 tracking-wide break-all"
                      >
                        <span className="font-semibold">Account Holder: </span>
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
                        className="font-sans font-light text-left flex flex-col sm:flex-row sm:gap-1 tracking-wide break-all"
                      >
                        <span className="font-semibold">Sort Code: </span>
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
                        className="font-sans font-light text-left flex flex-col sm:flex-row sm:gap-1 tracking-wide break-all"
                      >
                        <span className="font-semibold">Account Number: </span>
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
                        className="font-sans font-light text-left flex flex-col sm:flex-row sm:gap-1 tracking-wide break-all"
                      >
                        <span className="font-semibold">Bank Name: </span>
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
                      PLN
                    </h5>{" "}
                    <button
                      translate="no"
                      onClick={() => copyToClipboardEntireBox("pln")}
                      className="flex items-center gap-1 mr-2 text-sm text-[#233d74] underline underline-offset-2"
                    >
                      <IoCopyOutline /> Copy All
                    </button>
                  </div>
                  <div className="w-full flex flex-col items-start justify-start p-4 bg-gray-100">
                    <div className="w-full flex items-center justify-between gap-1">
                      <p
                        translate="no"
                        className="font-sans font-light text-left flex flex-col sm:flex-row sm:gap-1 tracking-wide break-all"
                      >
                        <span className="font-semibold">Account Holder: </span>
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
                        className=" font-sans font-light text-left flex flex-col sm:flex-row sm:gap-1 tracking-wide break-all"
                      >
                        <span className="font-semibold">IBAN: </span>
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
                        className="font-sans font-light text-left flex flex-col sm:flex-row sm:gap-1 tracking-wide break-all"
                      >
                        <span className="font-semibold">Bank Name: </span>
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

                    <div className="w-full flex items-center justify-between gap-1">
                      <p
                        translate="no"
                        className="font-sans font-light text-left flex flex-col sm:flex-row sm:gap-1 tracking-wide break-all"
                      >
                        <span className="font-semibold">BIC: </span>
                        {paymentInfo.PLN.bic}
                      </p>
                      <button
                        onClick={() => copyTextToCLipboard(paymentInfo.PLN.bic)}
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

        {dashedLine}
        <p translate="no" className="text-center mt-4 mb-12">
          In lieu of flowers, which we already have in abundance, we would be
          delighted to receive scratch cards or lottery tickets as a fun and
          exciting way to celebrate our new beginning.
        </p>
        <h3 translate="no" className="font-bold text-center text-gold">
          THANK YOU
        </h3>
      </div>
    </section>
  );
};

export default RegistrySection;
