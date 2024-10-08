import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';  // Import axios
import {FLASK_API_ENDPOINT} from '@env';
import { useFocusEffect } from '@react-navigation/native';

const sampleActivities = [
  { id: '1', text: 'Pet a dog', completed: true, notes: '' },
  { id: '2', text: 'Go for a walk', completed: false, notes: '' },
  { id: '3', text: 'Read a book', completed: false, notes: '' },
];

const initialAISuggestions = [
  'Try a new recipe',
  'Learn a musical instrument',
];

const ActivityItem = ({ activity, onToggle, onUpdateNotes }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.searchResultItem}>
      <View style={styles.activityHeader}>
        <TouchableOpacity onPress={() => onToggle(activity.id)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, activity.completed && styles.checkboxChecked]}>
            {activity.completed && <Feather name="check" size={16} color="#ffffff" />}
          </View>
        </TouchableOpacity>
        <Text style={[styles.searchResultName, activity.completed && styles.completedText]}>
          {activity.text}
        </Text>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
      {isOpen && (
        <TextInput
          style={styles.notesInput}
          value={activity.notes}
          onChangeText={(text) => onUpdateNotes(activity.id, text)}
          placeholder="Add notes..."
          placeholderTextColor="#a0a0a0"
          multiline
        />
      )}
    </View>
  );
};

const ActivitiesPage = () => {
  const [activities, setActivities] = useState(sampleActivities);
  const [aiSuggestions, setAiSuggestions] = useState(initialAISuggestions);
  const [newActivity, setNewActivity] = useState('');

  useFocusEffect(
    useCallback(() => {
        fetchActivities();
    },[])
  );

  const fetchActivities = async () => {
    try {
      const response = await axios.get(FLASK_API_ENDPOINT + '/activities');
      const suggestedActivity = response.data.activity;

      if (suggestedActivity) {
        setAiSuggestions((prev) => [...prev, suggestedActivity]);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const handleToggle = (id) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, completed: !activity.completed } : activity
    ));
  };

  const handleUpdateNotes = (id, notes) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, notes } : activity
    ));
  };

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setActivities([...activities, { 
        id: String(activities.length + 1), 
        text: newActivity, 
        completed: false, 
        notes: '' 
      }]);
      setNewActivity('');
    }
  };

  const handleAddAISuggestion = (suggestion) => {
    setActivities([...activities, {
      id: String(activities.length + 1),
      text: suggestion,
      completed: false,
      notes: ''
    }]);
    setAiSuggestions(aiSuggestions.filter(item => item !== suggestion));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBarWrapper}>
        <Feather name="search" size={20} color="#ffffff" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search activities..."
          placeholderTextColor="#a0a0a0"
        />
      </View>

      <Text style={styles.sectionTitle}>Activities</Text>

      <FlatList
        data={activities}
        renderItem={({ item }) => (
          <ActivityItem
            activity={item}
            onToggle={handleToggle}
            onUpdateNotes={handleUpdateNotes}
          />
        )}
        keyExtractor={item => item.id}
      />

      <Text style={styles.sectionTitle}>Suggested Activities</Text>
      {aiSuggestions.map((suggestion, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleAddAISuggestion(suggestion)}
          style={styles.aiSuggestionItem}
        >
          <Text style={styles.aiSuggestionText}>{suggestion}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.addActivityContainer}>
        <TextInput
          style={styles.addActivityInput}
          value={newActivity}
          onChangeText={setNewActivity}
          placeholder="Add an activity..."
          placeholderTextColor="#a0a0a0"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddActivity}>
          <Feather name="plus" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e0d4c8',
    },
    searchBarWrapper: {
      marginTop: 56.6,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      borderColor: '#a0a0a0',
      borderWidth: 1,
      margin: 10,
    },
    searchIcon: {
      padding: 10,
      color: '#a0a0a0',
    },
    searchBar: {
      flex: 1,
      height: 40,
      color: '#ffffff',
      paddingHorizontal: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Nunito Sans',
      color: '#000000',
      marginLeft: 10,
      marginTop: 20,
      marginBottom: 10,
    },
    searchResultItem: {
      backgroundColor: '#5e4d43',
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 10,
      marginBottom: 10,
  
      shadowColor: '#000', 
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,   
  
      elevation: 5,
    },
    activityHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    checkboxContainer: {
      marginRight: 10,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: '#000000',
      borderColor: '#4CAF50',
    },
    searchResultName: {
      flex: 1,
      fontSize: 16,
      color: '#000000',
      fontFamily: 'Nunito Sans',
      fontWeight: 'bold',
      color: '#ffffff',
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: '#a0a0a0',
    },
    notesInput: {
      backgroundColor: '#5e4d43',
      borderRadius: 5,
      fontFamily: 'Nunito Sans',
      padding: 10,
      marginTop: 10,
      color: '#ffffff',
    },
    aiSuggestionItem: {
      backgroundColor: '#5e4d43',
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 10,
      marginBottom: 10,
    },
    aiSuggestionText: {
      fontSize: 16,
      color: '#ffffff',
      fontFamily: 'Nunito Sans',
    },
    addActivityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
      marginBottom: 20,
  
      shadowColor: '#000000',
      shadowOffset: {
        width: 3,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.5,
      
      elevation: 5,
    },
    addActivityInput: {
      flex: 1,
      height: 40,
      fontFamily: 'Nunito Sans',
      backgroundColor: '#5e4d43',
      borderRadius: 10,
      paddingHorizontal: 10,
      marginRight: 10,
      color: '#ffffff',
    },
    addButton: {
      backgroundColor: '#4CAF50',
      width: 40,
      height: 40,
      borderRadius: 20,
      fontFamily: 'Nunito Sans',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default ActivitiesPage;
