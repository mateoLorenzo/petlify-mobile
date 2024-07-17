import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import {SUPABASE_ANON_KEY, SUPABASE_URL} from '@env';

console.log('values from supabase', SUPABASE_URL, SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
