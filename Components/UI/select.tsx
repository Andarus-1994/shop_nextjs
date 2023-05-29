import { useRef, useEffect, useId } from "react";
import CreatableSelect from "react-select/creatable";

interface PropsSelect {
  options: Option[];
  handleSelect: (selectedOption: Option, filterName: string) => void;
  placeholder: string;
  filterName: string;
  chosenValue: Option | null;
}

type Option = {
  value: string | number;
  label: string | number;
};

export default function SelectCustom({
  options,
  handleSelect,
  placeholder,
  filterName,
  chosenValue,
}: PropsSelect) {
  return (
    <CreatableSelect
      placeholder={placeholder}
      isClearable
      options={options}
      value={chosenValue}
      instanceId={useId()}
      onChange={(e) => handleSelect(e as Option, filterName)}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          padding: "0px 10px",
          border: "none",
          borderRadius: "15px",
          boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
        }),
      }}
    />
  );
}
