import { ChangeEvent } from "react";

interface prop {
  placeholder: string;
  name: string;
  value: string;
  type: string;
  className: string;
  onSelectItem: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent = ({
  placeholder,
  name,
  value,
  type,
  className,
  onSelectItem,
}: prop) => {
  return (
    <div className="input-group mb-3">
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        aria-label={placeholder}
        aria-describedby="basic-addon1"
        name={name}
        value={value}
        onChange={onSelectItem}
      />
    </div>
  );
};

export default InputComponent;
