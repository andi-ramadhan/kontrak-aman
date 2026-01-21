import { useState } from 'react'
import './App.css'
import Button from '@mui/material/Button'

export default function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setStatus({ type: 'info', message: 'Uploading...' });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Upload success:', data);
        setStatus({ type: 'success', message: `Successfully uploaded: ${data.file.originalname}` });
        setFile(null);
        // Reset the file input value
        e.target.reset();
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setStatus({ type: 'error', message: err.message || 'Error uploading file' });
    } finally {
      setUploading(false);
    }
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full border border-gray-300 p-4 bg-gray-50'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full border border-gray-300'>
        <h1 className='text-2xl font-bold mb-6 text-gray-800 text-center'>Document Upload</h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex flex-col items-center space-y-4'>
            <input
              type='file'
              id='file-upload'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            <label htmlFor='file-upload'>
              <Button
                variant='outlined'
                component='span'
                sx={{ textTransform: 'none', borderRadius: '8px', px: 4 }}
              >
                {file ? 'Change File' : 'Select File'}
              </Button>
            </label>

            {file && (
              <div className='text-sm text-gray-600 font-medium'>
                {file.name}
              </div>
            )}
          </div>

          <div className='flex justify-center pt-4'>
            <Button
              variant='contained'
              type='submit'
              disabled={!file || uploading}
              sx={{
                minWidth: '150px',
                borderRadius: '8px',
                bgcolor: '#4F46E5',
                '&:hover': { bgcolor: '#4338CA' }
              }}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </form>

        {status.message && (
          <div className={`mt-6 p-3 rounded-lg text-sm text-center font-medium ${status.type === 'success' ? 'bg-green-100 text-green-700' :
            status.type === 'error' ? 'bg-red-100 text-red-700' :
              'bg-blue-100 text-blue-700'
            }`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  )
}
