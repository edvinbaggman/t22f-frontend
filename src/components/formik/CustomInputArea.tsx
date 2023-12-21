import React from 'react';
import { useField, FieldAttributes } from 'formik';

interface TextInputProps extends FieldAttributes<any> {
  label: string;
  name: string;
}

const CustomInputArea = ({ label, name }: TextInputProps) => {
  const [field, meta] = useField({
    name,
    placeholder: '',
  });

  return (
    <div className='mb-4'>
      <label
        className='block text-gray-700 text-sm font-bold mb-2'
        htmlFor={name}
      >
        {label}
      </label>
      <textarea
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          meta.touched && meta.error ? 'border-red-500' : 'border'
        }`}
        rows={4}
        {...field}
      />
      {meta.touched && meta.error && (
        <p className='text-red-500 text-xs italic'>{meta.error}</p>
      )}
    </div>
  );
};

export default CustomInputArea;
