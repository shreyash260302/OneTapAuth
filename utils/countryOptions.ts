import { getCountries, getCountryCallingCode, CountryCode } from "libphonenumber-js";

interface CountryOption {
  label: string;
  value: CountryCode;
  code: string;
  dialCode: string;
}

export function getCountryOptions(): CountryOption[] {
  const supportedCountries: CountryCode[] = getCountries().filter((code) => {
    try {
      return !!getCountryCallingCode(code);
    } catch (error) {
      return false; 
    }
  });

  return supportedCountries.map((code) => ({
    label: new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code,
    value: code,
    code,
    dialCode: `+${getCountryCallingCode(code)}`,
  }));
}
