import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotesPage = () => {
  const [userNotes, setUserNotes] = useState([]);
  const [aiNotes, setAiNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteBody, setNewNoteBody] = useState('');

  const addNote = () => {
    if (newNoteTitle.trim() !== '' && newNoteBody.trim() !== '') {
      setUserNotes([...userNotes, { title: newNoteTitle, body: newNoteBody }]);
      setNewNoteTitle('');
      setNewNoteBody('');
    }
  };

  const renderNote = ({ item }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteBody}>{item.body}</Text>
    </View>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#001F3F',
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
    color: '#ffffff',
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#002a54',
    borderRadius: 10,
    marginBottom: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#ffffff',
    paddingHorizontal: 10,
  },
  bodyInput: {
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#002a54',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
  },
  noteItem: {
    backgroundColor: '#002a54',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  noteBody: {
    fontSize: 14,
    color: '#a0a0a0',
    marginTop: 5,
  },
});

export default NotesPage;