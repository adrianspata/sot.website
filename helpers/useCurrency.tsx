import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

// Define the types for currency
export type CurrencyCode = "SEK" | "USD" | "EUR" | "GBP";

export type Currency = {
  code: CurrencyCode;
  symbol: string;
  name: string;
};

// Define the available currencies
export const AVAILABLE_CURRENCIES: Currency[] = [
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
];

const DEFAULT_CURRENCY_CODE: CurrencyCode = "SEK";
const LOCAL_STORAGE_KEY = "sot_currency";

// Define the context type
type CurrencyContextType = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  availableCurrencies: Currency[];
  getCurrencySymbol: (code: CurrencyCode) => string;
};

// Create the context
const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

// Helper function to check if a string is a valid CurrencyCode
const isValidCurrencyCode = (code: unknown): code is CurrencyCode => {
  return AVAILABLE_CURRENCIES.some((c) => c.code === code);
};

// Create the provider component
export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const storedCurrency = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedCurrency && isValidCurrencyCode(storedCurrency)) {
        return storedCurrency;
      }
    } catch (error) {
      console.error("Failed to read currency from localStorage", error);
    }
    return DEFAULT_CURRENCY_CODE;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, currency);
    } catch (error) {
      console.error("Failed to save currency to localStorage", error);
    }
  }, [currency]);

  const setCurrency = useCallback((newCurrency: CurrencyCode) => {
    if (isValidCurrencyCode(newCurrency)) {
      setCurrencyState(newCurrency);
    } else {
      console.warn(`Attempted to set an invalid currency: ${newCurrency}`);
    }
  }, []);

  const getCurrencySymbol = useCallback((code: CurrencyCode): string => {
    const currencyInfo = AVAILABLE_CURRENCIES.find(c => c.code === code);
    return currencyInfo?.symbol ?? DEFAULT_CURRENCY_CODE;
  }, []);

  const value = {
    currency,
    setCurrency,
    availableCurrencies: AVAILABLE_CURRENCIES,
    getCurrencySymbol,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Create the custom hook
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};