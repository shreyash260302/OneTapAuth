"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function OTPVerification() {
  const [phone, setPhone] = useState<string>("");
  const [dialCode, setDialCode] = useState<string>("");
  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    setPhone(sessionStorage.getItem("phone") || "");
    setDialCode(sessionStorage.getItem("dialCode") || "");
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);


    if (value !== "" && index < 5) {
      (
        document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      )?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    console.log("Verifying OTP for:", dialCode + phone, "OTP:", otpCode);

    
    setIsVerified(true);
    alert("OTP Verified Successfully!");

   
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const handleResendOTP = () => {
    setResendTimer(30);
    setCanResend(false);
    console.log("Resending OTP to:", dialCode + phone);
    alert("A new OTP has been sent.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <button
        onClick={() => router.push("/")}
        className="absolute top-5 left-5 text-2xl text-gray-600"
      >
        ←
      </button>

      <h2 className="text-3xl font-bold text-gray-900">
        Verify Your Phone Number
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Verification code has been sent
      </p>
      <p className="text-gray-500 text-sm mt-1">
        to {dialCode} {phone}
      </p>

      <div className="mt-8 w-32 h-32 rounded-full overflow-hidden border border-gray-300 shadow-lg flex items-center justify-center">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnsIfE-jT4HRvYZ_MQbKmdTEVThfgrTqWbxg&s"
          width={100}
          height={100}
          alt="Phone Authentication"
          className="object-cover"
        />
      </div>

      <div className="mt-6 flex gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            maxLength={1}
            className="w-12 h-12 text-center text-xl font-semibold border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
        ))}
      </div>

      <div className="mt-3 text-gray-500">
        {canResend ? (
          <button
            onClick={handleResendOTP}
            className="text-blue-500 font-semibold"
          >
            Resend OTP
          </button>
        ) : (
          <p>Resend OTP in {resendTimer} seconds</p>
        )}
      </div>

   
      <button
        onClick={handleVerifyOTP}
        disabled={otp.join("").length < 6}
        className={`mt-6 py-3 w-full max-w-sm text-white font-semibold rounded-lg shadow-md transition duration-300 ${
          otp.join("").length === 6
            ? "bg-[#162D50] hover:bg-[#0F1E3C]"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Verify OTP
      </button>

      {/* Success Message */}
      {isVerified && (
        <p className="mt-3 text-green-500">OTP Verified Successfully!</p>
      )}
    </div>
  );
}
