import { useField } from 'formik';
import { ChangeEvent } from 'react';

interface CustomRadioButton {
  name: string;
  value: string;
  label: string;
}

const CustomRadioButton = ({ name, value, label }: CustomRadioButton) => {
  const [field, meta, helpers] = useField({ name });
  const { setValue } = helpers;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <label className='flex items-center'>
        <input
          type='radio'
          className='mr-2'
          value={value}
          checked={field.value == value}
          onChange={handleChange}
        />
        {label}
      </label>
    </div>
  );
};

export default CustomRadioButton;
