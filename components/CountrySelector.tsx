"use client";
import { useState, useRef, useEffect } from "react";
import { CountryCode } from "libphonenumber-js";

interface CountryOption {
  label: string;
  value: CountryCode;
  code: string;
  dialCode: string;
}

interface CountrySelectorProps {
  countryOptions: CountryOption[];
  onChange: (newValue: CountryOption) => void;
}

const defaultCountry: CountryOption = {
  label: "India",
  value: "IN",
  code: "in",
  dialCode: "+91",
};

export default function CountrySelector({
  countryOptions,
  onChange,
}: CountrySelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: CountryOption) => {
    setSelectedCountry(option);
    onChange(option);
    setIsMenuOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-48">
      <div
        className="flex items-center gap-3 p-3 border border-gray-400 rounded bg-white w-full cursor-pointer hover:bg-gray-100"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img
          src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
          onError={(e) => (e.currentTarget.src = "/fallback-flag.png")}
          alt={selectedCountry.label}
          width={30}
          height={20}
          className="rounded"
        />
        <span className="text-black font-bold">{selectedCountry.dialCode}</span>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full z-50 bg-white shadow-lg border border-gray-300 rounded mt-1 overflow-hidden text-black">
          {countryOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-300"
              onClick={() => handleSelect(option)}
            >
              <img
                src={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png`}
                onError={(e) => (e.currentTarget.src = "/fallback-flag.png")}
                alt={option.label}
                width={30}
                height={20}
                className="rounded"
              />
              <span className="text-black font-medium">{option.dialCode} - {option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
