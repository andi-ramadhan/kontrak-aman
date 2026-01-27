import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function uploadPDF(buffer, fileName) {
  try {
    const timestamp = Date.now();
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `${timestamp}-${sanitizedName}`;

    const { data, error } = await supabase.storage
      .from('contracts')
      .upload(storagePath, buffer, {
        contentType: 'application/pdf',
        upsert: false
      });
    
      if (error) throw error;

      console.log('📤 Uploaded to storage:', storagePath);
      return storagePath;

  } catch (error) {
    console.error('Storage upload error:', error);
    throw new Error(`Failed to upload PDF: ${error.message}`);
  }
}

export async function saveAnalysis(data) {
  try {
    const record = {
      file_name: data.fileName,
      file_size: data.fileSize,
      file_url: data.fileUrl,
      contract_type: data.analysis.contract_type,
      risk_score: data.analysis.risk_score,
      ai_analysis: data.analysis,
      processing_time_ms: data.processingTime,
      status: 'completed'
    };

    const { data: result, error } = await supabase
      .from('contract_analyses')
      .insert(record)
      .select()
      .single();

    if (error) throw error;

    console.log('💾 Saved to database:', result.id);
    return result;

  } catch (error) {
    console.error('Database save error:', error);
    throw new Error(`Failed to save analysis: ${error.message}`);
  }
}

export async function getAnalysis(id) {
  try {
    const { data, error } = await supabase
      .from('contract_analyses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Analysis not found');

    return data;

  } catch (error) {
    console.error('Database fetch error:', error);
    throw new Error(`Failed to fetch analysis: ${error.message}`);
  }
}

export async function getRecentAnalyses(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('contract_analyses')
      .select('id, created_at, risk_score, contract_type')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];

  } catch (error) {
    console.error('Database fetch error:', error);
    return [];
  }
}