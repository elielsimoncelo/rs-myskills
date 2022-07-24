import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('');

  function handleAddNewSkill() {
    const value: string = newSkill.trim();
    setNewSkill(value);

    if (!value || value === '') {
      return;
    }

    if (mySkills.find(it => it.name === value)) {
      return;
    }

    const data = {
      id: value,
      name: value
    }

    console.log(data);

    setMySkills([...mySkills, data]);
  }

  function handleRemoveSkill(id: string) {
    const skill = mySkills.filter(it => it.id === id)
    const skills = mySkills.filter(it => it.id !== id);
    setMySkills(skills);
    setNewSkill(!skill ? '' : skill[0]?.name);
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Eliel</Text>

      <Text style={styles.greetings}>{greeting}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor={'#555'}
        onChangeText={setNewSkill}
      />

      <Button title="Add" onPress={handleAddNewSkill} />

      <Text style={[styles.title, {marginVertical: 40}]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
        <SkillCard
          skill={item.name}
          onPress={() => handleRemoveSkill(item.id)}
        />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 12 : 10,
    marginTop: 20,
    borderRadius: 7
  },
  greetings: {
    color: '#FFF'
  },
});
