import React, { useState } from "react";
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

const RegistrySection = () => {
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(null); // null means no attempt yet
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [paymentInfo, setPaymentInfo] = useState(null); // Stores payment info

  const dashedLine = Array(3)
    .fill()
    .map((_, index) => (
      <div key={index} className="w-[2px] h-[5px] my-[3px] bg-gold" />
    ));

  const handlePasswordCheck = async () => {
    if (password.length > 0) {
      setLoading(true);
      try {
        // Assuming password validation is done here
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
    } else {
      setErrorText("Insert password");
      setLoading(false);
      setIsValid(null);
    }
  };

  return (
    <section
      id="gift-section"
      className="bg-[#233d74] px-4 sm:px-12 py-12 flex items-center flex-col relative overflow-hidden"
    >
      {/* Title */}
      <div className="w-full flex flex-col items-center px-4 z-10 mb-8 md:mb-12">
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
        <p translate="no" className="font-semibold text-center mb-4">
          Your presence at our wedding is the greatest gift we could ask for.
        </p>
        {dashedLine}
        <p translate="no" className="font-semibold text-center my-4">
          However, if you wish to honor us with a gift, we would greatly
          appreciate a monetary contribution to help us build our future
          together.
        </p>
        {dashedLine}
        <p translate="no" className="font-semibold text-center my-4">
          We kindly ask our international guests to consider sending their gift
          via IBAN transfer or a similar method such as Revolut. For our Polish
          guests, contributions can be made online or given in cash at the
          wedding, whichever is more convenient.
        </p>
        {dashedLine}
        <p translate="no" className="font-semibold text-center my-4">
          To access the IBAN details, please click the button below and enter
          the password you received with the invitation, or contact us directly
          for further information.
        </p>
        <Dialog>
          <DialogTrigger className="btn2 mb-4">View Info</DialogTrigger>
          <DialogContent className="max-h-[90svh] max-sm:w-[95%] max-sm:p-2 max-sm:rounded-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {!isValid && !paymentInfo ? "Enter Password" : "View Info"}
              </DialogTitle>
              <DialogDescription className="flex flex-col items-center">
                {!isValid && !paymentInfo && (
                  <>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="mb-4 focus:outline-none focus:ring-0 text-lg"
                    />
                    <Button
                      onClick={handlePasswordCheck}
                      disabled={loading}
                      className="bg-[#233d74] hover:bg-gold text-lg w-fit"
                    >
                      {loading ? "Checking..." : "Submit"}
                    </Button>
                    {isValid === false && errorText.length > 0 && (
                      <span className="text-red-500 mt-2 text-lg">
                        {errorText}
                      </span>
                    )}
                    {isValid === null && errorText.length > 0 && (
                      <span className="text-red-500 mt-2 text-lg">
                        {errorText}
                      </span>
                    )}
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            {isValid && paymentInfo && (
              <div className="w-full h-full max-h-[75svh] relative overflow-auto flex flex-col justify-start items-start px-2 py-2 gap-4">
                <div className="w-full text-left flex flex-col justify-start items-start">
                  <h5 className=" font-bold">EUR</h5>
                  <div className="w-full flex flex-col items-start justify-start p-4 bg-gray-100">
                    <p className="text-left flex flex-col sm:flex-row">
                      <span className="font-bold">Account Holder: </span>
                      {paymentInfo.EUR.accountHolder}
                    </p>
                    <p className="text-left flex flex-col sm:flex-row">
                      <span className="font-bold">IBAN: </span>
                      {paymentInfo.EUR.iban}
                    </p>
                    <p className="text-left flex flex-col sm:flex-row">
                      <span className="font-bold">Bank Name: </span>
                      {paymentInfo.EUR.bankName}
                    </p>
                    <p className="text-left flex flex-col sm:flex-row">
                      <span className="font-bold">BIC: </span>
                      {paymentInfo.EUR.bic}
                    </p>
                  </div>
                </div>

                <div className="w-full text-left flex flex-col justify-start items-start">
                  <h5 className="font-bold">GBP</h5>
                  <div className="w-full flex flex-col items-start justify-start p-4 bg-gray-100">
                    <p className="text-left flex flex-col sm:flex-row">
                      <span className="font-bold">Account Holder: </span>
                      {paymentInfo.GBP.accountHolder}
                    </p>
                    <p className="text-left flex flex-col sm:flex-row">
                      <span className="font-bold">Sort Code: </span>
                      {paymentInfo.GBP.sortCode}
                    </p>
                    <p className="text-left flex flex-col sm:flex-row">
                      <span className="font-bold">Account Number: </span>
                      {paymentInfo.GBP.accountNumber}
                    </p>
                    <p className="text-left flex flex-col sm:flex-row">
                      <span className="font-bold">Bank Name: </span>
                      {paymentInfo.GBP.bankName}
                    </p>
                  </div>
                </div>

                <div className="w-full text-left flex flex-col justify-start items-start">
                  <h5 className="font-bold">PLN</h5>
                  <div className="w-full flex flex-col items-start justify-start p-4 bg-gray-100">
                    <p className="text-left flex flex-col sm:flex-row">
                      <span className="font-bold">Account Holder: </span>
                      {paymentInfo.PLN.accountHolder}
                    </p>
                    <p className="text-left flex flex-col sm:flex-row">
                      <span className="font-bold">IBAN: </span>
                      {paymentInfo.PLN.iban}
                    </p>
                    <p className="text-left flex flex-col sm:flex-row">
                      <span className="font-bold">Bank Name: </span>
                      {paymentInfo.PLN.bankName}
                    </p>
                    <p className="text-left flex flex-col sm:flex-row">
                      <span className="font-bold">BIC: </span>
                      {paymentInfo.PLN.bic}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {dashedLine}
        <p translate="no" className="font-semibold text-center mt-4 mb-12">
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
