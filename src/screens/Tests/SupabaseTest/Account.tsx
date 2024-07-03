/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {supabase} from '../../../lib/supabase';
import {StyleSheet, View, Alert, TextInput, Text} from 'react-native';
import {Session} from '@supabase/supabase-js';
import {CustomButton} from '../../../components/CustomButton';
import {FlashList} from '@shopify/flash-list';

export default function Account({session}: {session: Session}) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [users, setUsers] = useState<{id: string}[] | null>([]);

  useEffect(() => {
    if (session) {
      getProfile();
      getAllUsers();
    }
  }, [session]);

  const getAllUsers = async () => {
    const {data, error} = await supabase.from('profiles').select('id');
    if (error) {
      console.log('error', error.message);
    }
    setUsers(data ?? []);
  };

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) {
        throw new Error('No user on the session!');
      }

      const {data, error, status} = await supabase
        .from('profiles')
        .select('username, website, avatar_url')
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) {
        throw new Error('No user on the session!');
      }

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const {error} = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced]}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          value={session?.user?.email}
          editable={false}
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.text}>Username</Text>
        <TextInput
          placeholder=""
          value={username || ''}
          onChangeText={text => setUsername(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.text}>Website</Text>
        <TextInput
          placeholder=""
          value={website || ''}
          onChangeText={text => setWebsite(text)}
          style={styles.input}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <CustomButton
          label={loading ? 'Loading ...' : 'Update'}
          onPress={() =>
            updateProfile({username, website, avatar_url: avatarUrl})
          }
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <CustomButton
          label="Sign Out"
          onPress={() => supabase.auth.signOut()}
        />
      </View>
      <View style={{height: 200}}>
        <FlashList
          data={users}
          renderItem={({item}) => <Text>User ID: {item.id}</Text>}
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    width: '100%',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  text: {
    fontFamily: 'Poppins-Medium',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    padding: 15,
    fontFamily: 'Poppins-Regular',
  },
});
