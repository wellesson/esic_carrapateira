
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ucxrxyrojmeerwdbwqnh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjeHJ4eXJvam1lZXJ3ZGJ3cW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTI1MDksImV4cCI6MjA2MzMyODUwOX0.BBAZCwDMOFsvfBTVLm2J_YL_rPKBo25tlE8haci8jAI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
