import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://wbgoepenmgioyhzfnxhw.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZ29lcGVubWdpb3loemZueGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4ODkwNjIsImV4cCI6MjAzNTQ2NTA2Mn0.1_zl_lN4b0DnHNofAbnc56nZLQAbbnJwB-9ygUXT7pU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
