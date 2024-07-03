import React from 'react';
import {StyleSheet, View} from 'react-native';
import Auth from './Auth';
import {useState, useEffect} from 'react';
import {Session} from '@supabase/supabase-js';
import {supabase} from '../../../lib/supabase';
import Account from './Account';

const SupabaseTestScreen = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={styles.container}>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SupabaseTestScreen;
