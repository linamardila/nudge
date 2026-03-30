import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Input } from '@rneui/themed';

const DEFAULT_TASKS = [
  { key: '1', description: 'Grocery Run', completed: false },
  { key: '2', description: 'Meal Prep', completed: false },
  { key: '3', description: 'Study Notes', completed: true },
  { key: '4', description: 'Water Plants', completed: true },
];

const Checkbox = ({ checked, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.checkbox, checked && styles.checkboxChecked]}>
    {checked && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
);

export default function App() {
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [inputText, setInputText] = useState('');

  const toggleTask = (key) => {
    setTasks(prev =>
      prev.map(task =>
        task.key === key ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (inputText.trim() === '') return;
    const newTask = {
      key: Date.now().toString(),
      description: inputText.trim(),
      completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
    setInputText('');
  };

  const deleteTask = (key) => {
    setTasks(prev => prev.filter(task => task.key !== key));
  };

  const inProgress = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);
  const displayData = [
    { key: 'header-progress', type: 'header', label: 'In Progress' },
    ...inProgress.map(t => ({ ...t, type: 'task' })),
    { key: 'header-completed', type: 'header', label: 'Completed' },
    ...completed.map(t => ({ ...t, type: 'task' })),
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return <Text style={styles.sectionHeader}>{item.label}</Text>;
    }

    return (
      <View style={styles.taskCard}>
        <Checkbox
          checked={item.completed}
          onPress={() => toggleTask(item.key)}
        />
        <View style={styles.taskText}>
          <Text
            style={[
              styles.taskTitle,
              item.completed && {
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
                color: '#aaa',
              },
            ]}
          >
            {item.description}
          </Text>
        </View>
        <TouchableOpacity onPress={() => deleteTask(item.key)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.logo}>nudge</Text>
        <Text style={styles.greeting}>Hello!</Text>
        <Text style={styles.userName}>Laila Rodriguez</Text>
      </View>

      <FlatList
        data={displayData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.inputRow}>
        <Input
          containerStyle={{ flex: 1, paddingHorizontal: 0 }}
          inputStyle={{ color: '#333', fontSize: 15 }}
          inputContainerStyle={styles.inputContainer}
          placeholder="Add a new task..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#e8eeff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 8,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a6e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  greeting: {
    fontSize: 14,
    color: '#555',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a6e',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a6e',
    marginTop: 20,
    marginBottom: 8,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1a1a6e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#1a1a6e',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  taskText: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a6e',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    gap: 10,
  },
  inputContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderBottomWidth: 0,
    paddingHorizontal: 12,
  },
  addButton: {
    backgroundColor: '#1a1a6e',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#ffe5e5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  deleteText: {
    color: '#e53935',
    fontSize: 14,
    fontWeight: '700',
  },
});