import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='min-h-screen bg-neutral-50 font-sans selection:bg-lime-200'>

      {/* Hero Section */}
      <section className='relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white'>
        {/* Decorative background elements */}
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden -z-10'>
          <div className='absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-lime-100 rounded-full blur-3xl opacity-50 block'></div>
          <div className='absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-100 rounded-full blur-3xl opacity-50 block'></div>
        </div>

        <div className='container mx-auto px-6 text-center z-10'>
          <div className='inline-block px-4 py-1.5 my-6 text-sm font-medium tracking-wide text-lime-700 uppercase bg-lime-100/50 rounded-full border border-lime-200'>
            💡 AI-Powered Legal Analysis
          </div>

          <h1 className='text-5xl md:text-7xl font-extrabold text-neutral-900 mb-8 leading-tight tracking-tight'>
            Kontrak Kerja <span className='text-lime-600 relative inline-block'>
              Aman?
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-lime-300" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span><br />
            Cek Sekarang.
          </h1>

          <p className='text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed'>
            Jangan tandatangani apa pun sebelum Anda yakin. AI kami menganalisis kontrak dalam hitungan detik untuk melindungi hak Anda sebagai pekerja.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
            <Link
              to="/upload"
              className='group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-lime-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-600 hover:bg-lime-700 shadow-xl shadow-lime-600/20'
            >
              Cek Kontrak Gratis
              <span className='ml-2 group-hover:translate-x-1 transition-transform'>→</span>
            </Link>
            <a
              href="#problem"
              className='inline-flex items-center justify-center px-8 py-4 font-semibold text-neutral-700 transition-all duration-200 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50'
            >
              Pelajari Dulu
            </a>
          </div>

          <div className='flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-neutral-500'>
            <span className='flex items-center gap-2'>
              <svg className="w-5 h-5 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              100% Gratis
            </span>
            <span className='flex items-center gap-2'>
              <svg className="w-5 h-5 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Privasi Terjamin
            </span>
            <span className='flex items-center gap-2'>
              <svg className="w-5 h-5 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Hasil Instan
            </span>
          </div>
        </div>

        <a href="#problem" className='hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-400 hover:text-lime-600 transition-colors animate-bounce p-2'>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </a>
      </section>

      {/* Problem Section */}
      <section className='py-24 bg-neutral-50' id='problem'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold text-neutral-900 mb-4'>
                Terjebak Kontrak yang Tidak Adil?
              </h2>
              <p className='text-neutral-600 text-lg'>
                Banyak pekerja menghadapi masalah karena poin-poin yang sengaja dibuat membingungkan.
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-8'>
              <div className='bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow'>
                <div className='w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-2xl mb-6'>😰</div>
                <h3 className='text-xl font-bold text-neutral-900 mb-3'>Gaji Tidak Transparan</h3>
                <p className='text-neutral-600 text-sm leading-relaxed'>
                  Potongan misterius dan breakdown yang sengaja dibuat rumit untuk merugikan pekerja.
                </p>
              </div>

              <div className='bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow'>
                <div className='w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-2xl mb-6'>⏰</div>
                <h3 className='text-xl font-bold text-neutral-900 mb-3'>Eksploitasi Waktu</h3>
                <p className='text-neutral-600 text-sm leading-relaxed'>
                  Lembur tanpa kompensasi dengan dalih loyalitas atau jobdesk yang tidak berujung.
                </p>
              </div>

              <div className='bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow'>
                <div className='w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-6'>🚫</div>
                <h3 className='text-xl font-bold text-neutral-900 mb-3'>Klausul Jebakan</h3>
                <p className='text-neutral-600 text-sm leading-relaxed'>
                  Denda resign yang tidak masuk akal atau masa pemberitahuan yang mencekik karir Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className='py-24 bg-white relative overflow-hidden'>
        <div className='container mx-auto px-6'>
          <div className='max-w-5xl mx-auto'>
            <div className='grid lg:grid-cols-2 gap-16 items-center'>
              <div>
                <h2 className='text-3xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight'>
                  Lindungi Hak Anda dalam <span className='text-lime-600'>3 Langkah Mudah</span>
                </h2>
                <div className='space-y-8'>
                  {[
                    { step: '01', title: 'Upload Dokumen', desc: 'Unggah file kontrak kerja Anda dalam format PDF secara aman.' },
                    { step: '02', title: 'AI Menganalisis', desc: 'Sistem kami memindai pasal-pasal berdasarkan UU Ketenagakerjaan Indonesia.' },
                    { step: '03', title: 'Lihat Hasil', desc: 'Dapatkan skor risiko, poin red flag, dan saran perbaikan secara instan.' }
                  ].map((item, idx) => (
                    <div key={idx} className='flex gap-6 group'>
                      <div className='shrink-0 text-3xl font-black text-lime-100 group-hover:text-lime-500 transition-colors duration-300'>
                        {item.step}
                      </div>
                      <div>
                        <h4 className='text-xl font-bold text-neutral-900 mb-1'>{item.title}</h4>
                        <p className='text-neutral-600'>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='relative'>
                <div className='bg-lime-50 rounded-3xl p-8 border border-lime-100 relative z-10'>
                  <div className='space-y-4'>
                    <div className='h-8 bg-white rounded-lg w-3/4 animate-pulse'></div>
                    <div className='h-4 bg-lime-200/50 rounded w-full'></div>
                    <div className='h-4 bg-lime-200/50 rounded w-5/6'></div>
                    <div className='pt-6'>
                      <div className='text-xs font-bold text-lime-700 uppercase tracking-widest mb-2'>AI Analysis Result</div>
                      <div className='p-4 bg-white rounded-xl border border-lime-200 shadow-sm'>
                        <div className='flex justify-between items-center mb-2'>
                          <span className='font-bold text-red-500'>⚠️ High Risk Flag</span>
                          <span className='text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full'>Pasal 12.4</span>
                        </div>
                        <p className='text-xs text-neutral-600 italic'>"...potongan gaji tanpa dasar hukum yang jelas terdeteksi."</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative blob */}
                <div className='absolute -top-10 -right-10 w-64 h-64 bg-lime-100 rounded-full blur-3xl z-0 opacity-60'></div>
              </div>
            </div>

            <div className='text-center mt-20'>
              <Link
                to="/upload"
                className='inline-block bg-neutral-900 text-white font-bold px-10 py-4 rounded-xl hover:bg-neutral-800 transition-all shadow-lg hover:shadow-neutral-200 active:scale-95'
              >
                Mulai Analisis Sekarang
              </Link>
              <p className='mt-4 text-xs text-neutral-400 font-medium'>
                Informasi Anda aman. Kami tidak menyimpan atau menyebarkan dokumen Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-neutral-950 text-white py-16' >
        <div className='container mx-auto px-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-8 mb-12'>
            <div className='text-2xl font-black italic tracking-tighter'>
              KONTRAK<span className='text-lime-500'>AMAN.</span>
            </div>
            <div className='flex gap-8 text-neutral-400 text-sm font-medium'>
              <a href="https://andi-ramadhan.github.io/" target="_blank" className='hover:text-white transition-colors'>About Creator</a>
              <a href="#" className='hover:text-white transition-colors'>Support Us</a>
            </div>
          </div>

          <div className='pt-8 border-t border-neutral-800 text-center flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-neutral-500 text-sm'>
              © 2026 KontrakAman • Melindungi Hak Pekerja Indonesia dengan AI.
            </p>
            <div className='px-4 py-2 bg-neutral-900 rounded-lg text-[10px] text-neutral-400 max-w-md leading-relaxed text-left border border-neutral-800'>
              <span className='text-neutral-300 font-bold block mb-1'>Disclaimer:</span>
              Layanan ini adalah alat bantu berbasis AI dan bukan saran hukum resmi. Konsultasikan dengan profesional hukum untuk keputusan legal yang krusial.
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}