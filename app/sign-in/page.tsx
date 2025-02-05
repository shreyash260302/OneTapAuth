"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PhoneInput from "../../components/PhoneInput";
import { getCountryOptions } from "../../utils/countryOptions";
import { CountryCode } from "libphonenumber-js";

interface CountryOption {
  label: string;
  value: CountryCode;
  code: string;
  dialCode: string;
}

export default function SignIn() {
  const [phone, setPhone] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const options = getCountryOptions();
      setCountryOptions(options);
      setSelectedCountry(options.find((country) => country.value === "IN") || null);
    }
  }, [isClient]);

  const handleCountryChange = (newValue: CountryOption | null) => {
    if (newValue) {
      setSelectedCountry(newValue);
    }
  };

  const handleSendOTP = (): void => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!selectedCountry) {
      alert("Please select a country.");
      return;
    }
  
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("dialCode", selectedCountry.dialCode);
  
    router.push("/otp-verification");
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h2 className="text-3xl font-bold text-gray-900">Continue With Phone</h2>
      <p className="text-gray-500 text-sm mt-1">We will send OTP</p>

      <div className="mt-8 w-32 h-32 rounded-full overflow-hidden border border-gray-300 shadow-lg flex items-center justify-center">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5V8lnoXir1THjSRVRMPuc1kqHginjO9rkA&s"
          width={100}
          height={100}
          alt="Phone Authentication"
          className="object-cover"
        />
      </div>

      <div className="mt-8 w-full max-w-sm">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Enter your phone number<span className="text-red-500">*</span>
        </label>
        <PhoneInput
          countryOptions={countryOptions}
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
          phone={phone}
          setPhone={setPhone}
        />
      </div>

      <button
        onClick={handleSendOTP}
        className="mt-6 bg-[#162D50] text-white font-semibold py-3 rounded-lg w-full max-w-sm shadow-md hover:bg-[#0F1E3C] transition duration-300"
      >
        Get OTP
      </button>
    </div>
  );
}
