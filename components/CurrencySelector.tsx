import { useCurrency, CurrencyCode } from "../helpers/useCurrency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";
import styles from "../styles/components/CurrencySelector.module.css";

export const CurrencySelector = ({ className }: { className?: string }) => {
  const { currency, setCurrency, availableCurrencies } = useCurrency();

  const handleValueChange = (value: string) => {
    // The Select component's onValueChange returns a string,
    // but we know it's a valid CurrencyCode from our items.
    setCurrency(value as CurrencyCode);
  };

  return (
    <Select onValueChange={handleValueChange} value={currency}>
      <SelectTrigger
        className={`${styles.currencyTrigger} ${className || ""}`}
        aria-label="Select Currency"
      >
        <SelectValue>{currency}</SelectValue>
      </SelectTrigger>
      <SelectContent className={styles.currencyContent}>
        {availableCurrencies.map((c) => (
          <SelectItem key={c.code} value={c.code} className={styles.currencyItem}>
            {c.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};