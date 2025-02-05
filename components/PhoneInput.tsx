import Select, { SingleValue } from "react-select";
import { CountryCode } from "libphonenumber-js";

interface CountryOption {
  label: string;
  value: CountryCode;
  code: string;
  dialCode: string;
}

interface PhoneInputProps {
  countryOptions: CountryOption[];
  selectedCountry: CountryOption | null;
  onCountryChange: (newValue: SingleValue<CountryOption>) => void;
  phone: string;
  setPhone: (phone: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countryOptions,
  selectedCountry,
  onCountryChange,
  phone,
  setPhone,
}) => {
  return (
    <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden w-full bg-white">
      <div className="flex items-center w-2/3 px-2 bg-white">
        <img
          src={`https://flagcdn.com/w40/${selectedCountry?.code.toLowerCase()}.png`}
          onError={(e) => (e.currentTarget.src = "/fallback-flag.png")}
          alt={selectedCountry?.label}
          width={24}
          height={16}
          className="rounded mr-2"
        />
        <Select
          options={countryOptions}
          value={selectedCountry}
          onChange={onCountryChange}
          getOptionLabel={(e) => `${e.label} (${e.dialCode})`}
          getOptionValue={(e) => e.value}
          isSearchable={true}
          menuPortalTarget={document.body}
          styles={{
            control: (base) => ({
              ...base,
              border: "none",
              boxShadow: "none",
              background: "transparent",
              width: "auto",
            }),
            menu: (base) => ({
              ...base,
              background: "white",
              color: "black",
              zIndex: 1000,
            }),
            option: (base, state) => ({
              ...base,
              color: "black",
              background: state.isSelected ? "#e5e7eb" : "white",
              ":hover": { background: "#d1d5db" },
            }),
          }}
        />
      </div>

      <input
        type="tel" 
        value={phone}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/\D/g, ""); 
          setPhone(numericValue);
        }}
        placeholder="Enter phone number"
        className="w-2/3 p-2 outline-none text-black bg-white"
        inputMode="numeric" 
        pattern="[0-9]*" 
      />
    </div>
  );
};

export default PhoneInput;
