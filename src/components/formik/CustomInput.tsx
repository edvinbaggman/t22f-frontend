import React from 'react';
import { useField, FieldAttributes } from 'formik';

interface TextInputProps extends FieldAttributes<any> {
  label: string;
  name: string;
  type: string;
  classnameWidth?: string;
}

const CustomInput = ({
  label,
  name,
  type,
  classnameWidth = 'w-full',
}: TextInputProps) => {
  const [field, meta] = useField({
    name,
    placeholder: '',
    type,
  });

  return (
    <div className='mb-4'>
      <label
        className='block text-gray-700 text-sm font-bold mb-2'
        htmlFor={name}
      >
        {label}
      </label>
      <input
        type={type}
        className={`shadow appearance-none border rounded py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition ${
          meta.touched && meta.error ? 'border-red-500' : 'border-gray-700'
        } ${classnameWidth} `}
        {...field}
      />
      {meta.touched && meta.error && (
        <p className='text-red-500 text-xs italic'>{meta.error}</p>
      )}
    </div>
  );
};

export default CustomInput;
