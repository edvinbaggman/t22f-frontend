import React, { FC, useState } from 'react';
import { useField, FieldAttributes } from 'formik';
import Datepicker from 'tailwind-datepicker-react';

interface CustomDatePickerProps extends FieldAttributes<any> {
  label: string;
  name: string;
  defaultDate?: Date;
}

const CustomDatePicker: FC<CustomDatePickerProps> = ({
  label,
  name,
  defaultDate,
}) => {
  const [field, meta, helpers] = useField({ name });
  const [show, setShow] = useState(false);
  const { setValue } = helpers;

  const handleChange = (selectedDate: Date) => {
    setValue(selectedDate);
  };

  const options = {
    maxDate: new Date('2030-01-01'),
    minDate: new Date('2000-01-01'),
    todayBtn: false,
    clearBtn: false,
    defaultDate: defaultDate ? defaultDate : new Date(),
    language: 'en',
  };

  return (
    <div className='mb-4'>
      <label
        className='block text-gray-700 text-sm font-bold mb-2'
        htmlFor={name}
      >
        {label}
      </label>
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={setShow}
        classNames='relative'
      />

      {meta.touched && meta.error && (
        <p className='text-red-500 text-xs italic'>{meta.error}</p>
      )}
    </div>
  );
};

export default CustomDatePicker;
