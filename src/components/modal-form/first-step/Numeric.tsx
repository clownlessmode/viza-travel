import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface NumberInputWithButtonsProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (value: string) => void;
  min?: number;
  max?: number;
}

export const NumberInputWithButtons = ({
  min = 1,
  max = 1000,
  disabled,
  value,
  onChange,
  ...rest
}: NumberInputWithButtonsProps) => {
  const numericValue = typeof value === "number" ? value : Number(value) || 0;

  const increment = () => {
    if (numericValue < max) {
      onChange?.(String(numericValue + 1));
    }
  };

  const decrement = () => {
    if (numericValue > min) {
      onChange?.(String(numericValue - 1));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <Button
        type="button"
        variant="outline"
        onClick={decrement}
        disabled={disabled || numericValue <= min}
        className="w-10 h-10"
      >
        <Minus size={16} />
      </Button>

      <Input
        {...rest}
        type="number"
        min={min}
        max={max}
        disabled={disabled}
        value={value}
        onChange={handleInputChange}
        className="text-center"
      />

      <Button
        type="button"
        variant="outline"
        onClick={increment}
        disabled={disabled || numericValue >= max}
        className="w-10 h-10"
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};
