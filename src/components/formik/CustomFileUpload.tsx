import { useField } from 'formik';
import { useState } from 'react';

interface CustomFileUplaodProps {
  label: string;
  name: string;
}
const CustomFileUpload = ({ label, name }: CustomFileUplaodProps) => {
  const [field, meta, helpers] = useField({ name });
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const { setValue } = helpers;

  const removeFile = (e: any) => {
    setError('');
    setValue('');
    setFileName('');
  };

  const setFile = (file: any) => {
    const fileType = file.type;
    const fileSize = file.size;
    const allowedFiles = ['image/png', 'image/jpeg'];
    if (fileSize > 5000000) {
      setError('File to large');
    } else if (!allowedFiles.includes(fileType)) {
      setError('Filetype not supported');
    } else {
      setError('');
      setIsDragging(false);
      setValue(file);
      setFileName(file.name);
    }
  };

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <label
          className='block text-gray-700 text-sm font-bold mb-5'
          htmlFor={name}
        >
          {label}
        </label>
        {fileName && (
          <button
            className='p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none'
            onClick={removeFile}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
              <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z' />
            </svg>
          </button>
        )}
      </div>

      <div
        className='flex items-center justify-center w-full'
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label
          htmlFor='dropzone-file'
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ${
            isDragging ? 'bg-gray-100' : 'bg-gray-50'
          } hover:bg-gray-100`}
        >
          {fileName ? (
            <div>{fileName}</div>
          ) : (
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <svg
                className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 16'
              >
                <path
                  stroke='currentColor'
                  d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                />
              </svg>
              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                PNG, JPG (Max 5mb)
              </p>
            </div>
          )}

          <input
            id='dropzone-file'
            type='file'
            className='hidden'
            onChange={handleChange}
          />
        </label>
      </div>
      {error && <p className='text-red-500 text-xs italic'>{error}</p>}
    </>
  );
};

export default CustomFileUpload;
