import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type !== 'application/pdf') {
      setError('Hanya file PDF yang diperbolehkan');
      return;
    }

    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5MB');
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Silakan pilih file terlebih dahulu');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('contract', file);

      const response = await axios.post('/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate(`/results/${response.data.analysisId}`);

    } catch (err) {
      setError(err.response?.data?.error || 'Gagal mengunggah file');
      console.error('Error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans selection:bg-lime-200 relative overflow-hidden flex flex-col">
      {/* Decorative background elements */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden -z-10'>
        <div className='absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-lime-100 rounded-full blur-3xl opacity-50'></div>
        <div className='absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-100 rounded-full blur-3xl opacity-50'></div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black italic tracking-tighter text-neutral-900">
          KONTRAK<span className='text-lime-600'>AMAN.</span>
        </Link>
        <Link to="/" className="text-sm font-medium text-neutral-600 hover:text-lime-600 transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Kembali
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="max-w-xl w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-4 tracking-tight">
              Analisis Kontrak Anda
            </h1>
            <p className="text-neutral-600">
              Unggah draft kontrak kerja Anda dan biarkan AI kami bekerja untuk melindungi hak Anda.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100 relative overflow-hidden">
            <form onSubmit={handleSubmit} className="relative z-10">
              {/* Drag & Drop Zone */}
              <div className="mb-8">
                <label className="group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-neutral-200 rounded-2xl hover:border-lime-400 hover:bg-lime-50/30 transition-all cursor-pointer overflow-hidden">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                      {file ? '📄' : '📤'}
                    </div>
                    <p className="mb-2 text-sm text-neutral-700 font-bold">
                      {file ? file.name : 'Klik untuk unggah atau drag and drop'}
                    </p>
                    <p className="text-xs text-neutral-500">PDF (Maksimal 5MB)</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {file && (
                    <div className="absolute inset-0 bg-lime-600/5 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-white px-4 py-2 rounded-full text-xs font-bold text-lime-700 shadow-sm border border-lime-100">
                        Ganti File
                      </span>
                    </div>
                  )}
                </label>
              </div>

              {/* File Info */}
              {file && (
                <div className="mb-8 flex items-center gap-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                  <div className="shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">📄</div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-neutral-900 truncate">{file.name}</p>
                    <p className="text-xs text-neutral-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="ml-auto text-neutral-400 hover:text-red-500 p-1 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-8 flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                  <div className="w-8 h-8 bg-white text-red-500 rounded-lg flex items-center justify-center text-sm shadow-sm">⚠️</div>
                  <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!file || uploading}
                className={`w-full relative overflow-hidden group py-4 px-6 rounded-2xl font-bold transition-all duration-300 shadow-lg cursor-pointer
                  ${!file || uploading
                    ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    : 'bg-lime-600 text-white hover:bg-lime-700 shadow-lime-600/20 active:scale-[0.98]'
                  }`}
              >
                <span className="relative z-10">
                  {uploading ? 'Sedang Menganalisis...' : 'Mulai Analisis Sekarang'}
                </span>
                {uploading && (
                  <div className="absolute inset-0 bg-lime-700 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
              </button>

              {/* Loading State */}
              {uploading && (
                <div className="mt-6 text-center">
                  <p className='text-sm text-neutral-500 animate-pulse'>
                    AI sedang memindai kontrak Anda...
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-2 uppercase tracking-widest font-bold">
                    Proses ini biasanya memakan waktu 15-40 detik
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Security Note */}
          <div className="mt-12 text-center text-xs text-neutral-400 font-medium max-w-sm mx-auto leading-relaxed">
            <span className="flex items-center justify-center gap-2 mb-1">
              <svg className="w-4 h-4 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Keamanan Terjamin
            </span>
            File Anda dienkripsi dan akan dihapus secara otomatis setelah analisis selesai.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-6 text-center">
        <p className="text-neutral-400 text-xs">
          © 2025 KontrakAman • Melindungi Hak Pekerja dengan AI.
        </p>
      </footer>
    </div>
  );
}

export default Upload;