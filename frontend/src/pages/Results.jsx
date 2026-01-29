import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Results() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalysis();
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get(`/api/analysis/${id}`);
      setData(response.data.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Gagal memuat hasil analisis');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center font-sans selection:bg-lime-200">
        <div className="text-center">
          <div className="relative size-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-lime-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-neutral-900 font-bold text-lg mb-1">Menganalisis Kontrak...</p>
          <p className="text-neutral-500 text-sm">Menghitung skor risiko berdasarkan UU Ketenagakerjaan</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 font-sans selection:bg-lime-200">
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-neutral-200/50 max-w-md w-full text-center border border-neutral-100">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Terjadi Kesalahan</h2>
          <p className="text-neutral-600 mb-8">{error}</p>
          <Link
            to="/upload"
            className="inline-flex items-center justify-center w-full py-3 px-6 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-all"
          >
            ← Kembali ke Upload
          </Link>
        </div>
      </div>
    );
  }

  const analysis = data.ai_analysis;
  const riskScore = analysis.risk_score;

  const getRiskColor = (score) => {
    if (score >= 7) return 'text-red-500 bg-red-50 border-red-100';
    if (score >= 4) return 'text-orange-500 bg-orange-50 border-orange-100';
    return 'text-lime-600 bg-lime-50 border-lime-100';
  };

  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-red-900 text-white';
      case 'high': return 'bg-red-100 text-red-700 border border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-700 border border-orange-200';
      default: return 'bg-neutral-100 text-neutral-700 border border-neutral-200';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans selection:bg-lime-200 pb-20">

      {/* Top Navigation */}
      <header className="bg-white border-b border-neutral-100 sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-black italic tracking-tighter text-neutral-900">
            KONTRAK<span className='text-lime-600'>AMAN.</span>
          </Link>
          <Link to="/upload" className="text-sm font-bold text-lime-600 hover:text-lime-700 flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Analisis Baru
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-12">
        <div className="max-w-4xl mx-auto">

          {/* Hero Results */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 tracking-tight mb-2">
                  Hasil <span className="text-lime-600">Analisis.</span>
                </h1>
                <p className="text-neutral-500 font-medium">Dokumen: <span className="text-neutral-900">{data.file_name}</span></p>
              </div>
              <div className={`px-6 py-3 rounded-2xl border flex items-center gap-4 ${getRiskColor(riskScore)}`}>
                <div className="text-xs font-black uppercase tracking-widest opacity-70">Skor Risiko</div>
                <div className="text-4xl font-black">{riskScore}<span className="text-xl opacity-50">/10</span></div>
              </div>
            </div>

            {/* Progress Bar Score */}
            <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden flex">
              <div className={`h-full transition-all duration-1000 ease-out ${riskScore >= 7 ? 'bg-red-500' : riskScore >= 4 ? 'bg-orange-500' : 'bg-lime-500'}`} style={{ width: `${riskScore * 10}%` }}></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">

              {/* Summary Section */}
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-lime-100 text-lime-600 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-tight">Ringkasan Eksekutif</h2>
                </div>
                <p className="text-neutral-700 leading-relaxed text-lg">
                  {analysis.summary}
                </p>
                <div className="mt-8 pt-8 border-t border-neutral-50 flex items-center justify-between text-sm">
                  <span className="text-neutral-500 font-medium italic">Tipe Kontrak Terdeteksi:</span>
                  <span className="px-3 py-1 bg-neutral-100 text-neutral-900 rounded-full font-bold">{analysis.contract_type || 'Umum'}</span>
                </div>
              </section>

              {/* Red Flags Section */}
              {analysis.red_flags?.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-xl font-bold text-red-600 uppercase tracking-tight">⚠️ Red Flags ({analysis.red_flags.length})</h2>
                    <span className="text-xs font-bold text-neutral-400">Harap Tinjau Kembali</span>
                  </div>

                  <div className="space-y-6">
                    {analysis.red_flags.map((flag, i) => (
                      <div key={i} className="group bg-white p-6 rounded-3xl border border-red-50 hover:border-red-200 transition-all shadow-sm">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-lg ${getSeverityStyle(flag.severity)}`}>
                            {flag.severity}
                          </span>
                          <span className="text-xs font-bold text-neutral-400 py-1 px-3 bg-neutral-50 rounded-lg">{flag.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-red-600 transition-colors">
                          {flag.issue}
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                          {flag.detail}
                        </p>
                        <div className="p-4 bg-lime-50 rounded-2xl border border-lime-100">
                          <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span className="text-xs font-bold text-lime-700 uppercase tracking-wider">Rekomendasi AI</span>
                          </div>
                          <p className="text-sm font-medium text-neutral-800">{flag.recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Green Flags Section */}
              {analysis.green_flags?.length > 0 && (
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                  <h2 className="text-xl font-bold text-lime-600 uppercase tracking-tight mb-6">✅ Poin Positif ({analysis.green_flags.length})</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {analysis.green_flags.map((flag, i) => (
                      <div key={i} className="flex gap-3 items-start p-3 bg-lime-50/30 rounded-2xl border border-lime-100/50">
                        <svg className="w-5 h-5 text-lime-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="text-sm font-medium text-neutral-700 leading-tight">{flag}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar / Recommendations */}
            <div className="space-y-8">
              {/* Actions Card */}
              {analysis.key_actions?.length > 0 && (
                <section className="bg-neutral-900 text-white p-8 rounded-3xl shadow-xl shadow-neutral-200">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-6 bg-lime-500 block rounded-full"></span>
                    Langkah Selanjutnya
                  </h2>
                  <div className="space-y-6">
                    {analysis.key_actions.map((action, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="shrink-0 w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center text-xs font-bold text-lime-500">
                          {i + 1}
                        </div>
                        <p className="text-sm text-neutral-300 leading-relaxed pt-1">{action}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Analysis Info Card */}
              <section className="bg-white p-6 rounded-3xl border border-neutral-100">
                <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-6">Meta Info</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500">Analysis ID</span>
                    <code className="bg-neutral-50 px-2 py-1 rounded font-mono text-neutral-900">{data.id.slice(0, 8)}...</code>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500">Waktu Proses</span>
                    <span className="font-bold text-neutral-900">{data.processing_time_ms}ms</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500">Tgl Analisis</span>
                    <span className="font-bold text-neutral-900">{new Date(data.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </section>

              {/* Disclaimer */}
              <div className="p-6 bg-neutral-900/5 rounded-3xl border border-neutral-200/50">
                <p className="text-[10px] text-neutral-500 leading-relaxed">
                  <span className="font-black text-neutral-900 block mb-1 underline decoration-lime-500/50">DISCLAIMER:</span>
                  Hasil analisis ini dihasilkan oleh Kecerdasan Buatan (AI) untuk tujuan informasi saja dan tidak bisa dianggap sebagai saran hukum profesional. Hasil mungkin mengandung ketidakakuratan. Harap konsultasikan dengan ahli hukum berlisensi sebelum mengambil keputusan hukum apa pun.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}

export default Results;