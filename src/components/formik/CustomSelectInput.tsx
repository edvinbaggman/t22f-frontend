import React from 'react';
import { useField } from 'formik';

interface CustomSelectInput {
  label: string;
  name: string;
  type: string;
  options: {
    value: string;
    label: string;
  }[];
}

const CustomSelectInput = ({
  label,
  name,
  type,
  options,
}: CustomSelectInput) => {
  const [field, meta] = useField({
    name,
    placeholder: '',
    type,
  });

  return (
    <div>
      <select
        {...field}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          meta.touched && meta.error ? 'border-red-500' : 'border'
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <p className='text-red-500 text-xs italic'>{meta.error}</p>
      )}
    </div>
  );
};

export default CustomSelectInput;
