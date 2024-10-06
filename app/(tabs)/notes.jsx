import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'; // Import axios
import { FLASK_API_ENDPOINT } from '@env';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const NotesPage = () => {
  const [userNotes, setUserNotes] = useState([]);
  const [aiNotes, setAiNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteBody, setNewNoteBody] = useState('');

  // Add a user note to the list
  const addNote = () => {
    if (newNoteTitle.trim() !== '' && newNoteBody.trim() !== '') {
      setUserNotes([...userNotes, { title: newNoteTitle, body: newNoteBody }]);
      setNewNoteTitle('');
      setNewNoteBody('');
    }
  };

  // Function to render each note
  const renderNote = ({ item }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteBody}>{item.body}</Text>
    </View>
  );

  // Function to get AI notes from the Flask API
  const getNote = async () => {
    try {
      console.log("Fetching AI notes...");
      const response = await axios.get(`${FLASK_API_ENDPOINT}/notes`);
      console.log(response.data.response);
      setAiNotes([{ title: "AI Notes", body: response.data.response }]); // Adjust AI notes formatting if needed
    } catch (error) {
      console.log("Error fetching AI notes", error);
    }
  };

  // Fetch AI notes whenever the page comes into focus
  useFocusEffect(
    useCallback(() => {
      getNote();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.pageHeading}>Notes</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.searchBarWrapper}>
            <Ionicons name="create-outline" size={24} color="#a0a0a0" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Note Title"
              placeholderTextColor="#a0a0a0"
              value={newNoteTitle}
              onChangeText={setNewNoteTitle}
            />
          </View>
          <TextInput
            style={[styles.input, styles.bodyInput]}
            placeholder="Note Body"
            placeholderTextColor="#a0a0a0"
            value={newNoteBody}
            onChangeText={setNewNoteBody}
            multiline
          />
          <TouchableOpacity style={styles.addButton} onPress={addNote}>
            <Text style={styles.addButtonText}>Add Note</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Your Notes</Text>
        <FlatList
          data={userNotes}
          renderItem={renderNote}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>AI Generated Notes</Text>
        <FlatList
          data={aiNotes}
          renderItem={renderNote}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotesPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e0d4c8',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  pageHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#262626',
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#B0A54F',
    borderWidth: 1,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#262626',
    paddingHorizontal: 10,
  },
  bodyInput: {
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#B0A54F',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#5e4d43',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5, // Shadow for Android
  },
  addButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#262626',
    marginTop: 20,
    marginBottom: 10,
  },
  noteItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderColor: '#B0A54F',
    borderWidth: 1,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5, // Shadow for Android
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262626',
  },
  noteBody: {
    fontSize: 14,
    color: '#333',
  },
});
