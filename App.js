// Import necessary libraries
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Add or update a task
  const handleAddOrUpdateTask = () => {
    if (task.trim() === '') return;

    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = task;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setTask('');
  };

  // Edit a task
  const handleEditTask = (index) => {
    setTask(tasks[index]);
    setEditingIndex(index);
  };

  // Delete a task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dynamic To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: editingIndex !== null ? '#F39C12' : '#27AE60' }]}
          onPress={handleAddOrUpdateTask}
        >
          <Text style={styles.addButtonText}>{editingIndex !== null ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.taskItem,
              {
                backgroundColor: '#FFFFFF',
                borderLeftColor: index % 2 === 0 ? '#3498DB' : '#9B59B6',
                borderLeftWidth: 5,
              },
            ]}
          >
            <Text style={styles.taskText}>{item}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.editButton, { backgroundColor: '#2980B9' }]}
                onPress={() => handleEditTask(index)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.deleteButton, { backgroundColor: '#C0392B' }]}
                onPress={() => handleDeleteTask(index)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F6F3',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1A5276',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#AED6F1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  addButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#D6EAF8',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#34495E',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
