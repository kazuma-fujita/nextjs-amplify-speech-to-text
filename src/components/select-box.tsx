import { ChangeEvent, Dispatch } from "react";

type Props = {
  options: Record<string, string>[];
  defaultValue: string;
  setSelectOption: Dispatch<string>;
};

export const SelectBox = ({
  options,
  defaultValue,
  setSelectOption,
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectOption(event.target.value);
  };

  return (
    <select onChange={handleChange} defaultValue={defaultValue}>
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};
