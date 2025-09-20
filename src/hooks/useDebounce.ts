import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export const useDebounced = ({
  delay,
  initialValue,
  onCallback = () => {},
}: {
  initialValue?: string;
  delay: number;
  onCallback?(value: any): void;
}) => {
  const [value, setValue] = useState(initialValue);

  const debouncedValue = debounce((inputValue) => {
    setValue(inputValue);
    onCallback(inputValue);
  }, delay);

  const handleChange = (inputValue: any): void => {
    debouncedValue(inputValue);
  };

  useEffect(() => {
    return () => {
      debouncedValue.cancel();
    };
  }, [debouncedValue]);

  return { value, handleChange };
};
