// apotheca addition to inculde a multi checkbox that can be used for expansion to all neighbor nodes
import React, { useState } from "react";

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onChange?: (isChecked: boolean) => void;
}

function Checkbox({ label, isChecked, onChange }: CheckboxProps) {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onChange && onChange(isChecked);
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        {label}
      </label>
    </div>
  );
}

export default Checkbox;