import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Sample data for one-on-one sessions
const oneOnOneSessions = [
  { id: 1, therapist: 'Dr. Smith', specialization: 'Cognitive Behavioral Therapy', date: '2024-10-15', title: 'Stress Management', description: 'Learn techniques to manage daily stress.' },
  { id: 2, therapist: 'Emma Johnson', specialization: 'Mindfulness', date: '2024-10-16', title: 'Mindfulness Meditation', description: 'Introduction to mindfulness practices.' },
  { id: 3, therapist: 'Dr. Patel', specialization: 'Family Therapy', date: '2024-10-17', title: 'Improving Family Communication', description: 'Strategies for better family dynamics.' },
  { id: 4, therapist: 'Sarah Lee', specialization: 'Art Therapy', date: '2024-10-18', title: 'Expressive Art Session', description: 'Use art to explore emotions and self-expression.' },
  { id: 5, therapist: 'Dr. Rodriguez', specialization: 'Anxiety Disorders', date: '2024-10-19', title: 'Coping with Anxiety', description: 'Learn tools to manage anxiety symptoms.' },
  { id: 6, therapist: 'Michael Chen', specialization: 'Career Counseling', date: '2024-10-20', title: 'Career Transition Strategies', description: 'Guidance for career changes and growth.' },
  { id: 7, therapist: 'Dr. Nguyen', specialization: 'Trauma-Informed Therapy', date: '2024-10-21', title: 'Healing from Past Trauma', description: 'A safe space to address and process trauma.' },
];

// Sample data for community events
const communityEvents = [
  { id: 1, name: 'Mindful Mondays', description: 'Weekly group meditation session', date: '2024-10-14' },
  { id: 2, name: 'Anxiety Support Group', description: 'Share experiences and coping strategies', date: '2024-10-16' },
  { id: 3, name: 'Art Therapy Workshop', description: 'Express yourself through various art forms', date: '2024-10-18' },
  { id: 4, name: 'Yoga for Mental Health', description: 'Gentle yoga practice for stress relief', date: '2024-10-20' },
  { id: 5, name: 'Parenting Skills Seminar', description: 'Tips for positive parenting', date: '2024-10-22' },
  { id: 6, name: 'Career Networking Event', description: 'Connect with professionals in various fields', date: '2024-10-24' },
  { id: 7, name: 'Grief Support Circle', description: 'A safe space to share and heal', date: '2024-10-26' },
];

const RSVPModal = ({ isVisible, event, onClose, onRSVP }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const availableTimes = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{event?.name || event?.title}</Text>
          <Text style={styles.modalSubtitle}>Select a time:</Text>
          {availableTimes.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                selectedTime === time && styles.selectedTimeButton
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={styles.timeButtonText}>{time}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.rsvpButton}
            onPress={() => selectedTime && onRSVP(selectedTime)}
          >
            <Text style={styles.rsvpButtonText}>RSVP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const SuggestEventModal = ({ isVisible, onClose, onSuggest }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSuggest = () => {
    onSuggest({ name: eventName, description: eventDescription, date: eventDate });
    setEventName('');
    setEventDescription('');
    setEventDate('');
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Suggest an Event</Text>
          <TextInput
            style={styles.input}
            placeholder="Event Name"
            placeholderTextColor="#a0a0a0"
            value={eventName}
            onChangeText={setEventName}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Description"
            placeholderTextColor="#a0a0a0"
            value={eventDescription}
            onChangeText={setEventDescription}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Event Date (YYYY-MM-DD)"
            placeholderTextColor="#a0a0a0"
            value={eventDate}
            onChangeText={setEventDate}
          />
          <TouchableOpacity style={styles.suggestButton} onPress={handleSuggest}>
            <Text style={styles.suggestButtonText}>Suggest Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuggestModalVisible, setIsSuggestModalVisible] = useState(false);
  const [rsvpedEvents, setRsvpedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([
    ...oneOnOneSessions.map(session => ({
      id: `session-${session.id}`,
      name: session.title,
      therapist: session.therapist,
      type: 'session',
      ...session,
    })),
    ...communityEvents.map(event => ({
      id: `event-${event.id}`,
      type: 'event',
      ...event,
    })),
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredResults = allEvents.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.therapist && item.therapist.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(filteredResults);
  };

  const handleEventPress = (event) => {
    if (!rsvpedEvents.some(e => e.id === event.id)) {
      setSelectedEvent(event);
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  const handleRSVP = (time) => {
    const newRsvpEvent = {
      ...selectedEvent,
      rsvpTime: time,
    };
    setRsvpedEvents(prevEvents => [...prevEvents, newRsvpEvent]);
    setAllEvents(prevAllEvents => prevAllEvents.filter(e => e.id !== selectedEvent.id));
    console.log(`RSVP'd for ${selectedEvent?.name || selectedEvent?.title} at ${time}`);
    handleCloseModal();
  };

  const handleCancelRSVP = (eventId) => {
    const cancelledEvent = rsvpedEvents.find(e => e.id === eventId);
    setRsvpedEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    setAllEvents(prevAllEvents => [...prevAllEvents, {...cancelledEvent, rsvpTime: undefined}]);
    console.log(`Cancelled RSVP for event with ID: ${eventId}`);
  };

  const handleSuggestEvent = () => {
    setIsSuggestModalVisible(true);
  };

  const handleCloseSuggestModal = () => {
    setIsSuggestModalVisible(false);
  };

  const handleSuggestNewEvent = (newEvent) => {
    console.log('New event suggested:', newEvent);
    // Here you would typically send the new event data to your backend
    // and maybe add it to the allEvents list after approval
    setIsSuggestModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBarWrapper}>
          <Ionicons name="search" size={20} color="#a0a0a0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search events, therapists..."
            placeholderTextColor="#a0a0a0"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <ScrollView>
        {searchResults.length > 0 ? (
          <View style={styles.searchResultsContainer}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {searchResults.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => handleEventPress(item)}>
                <View style={styles.searchResultItem}>
                  <Text style={styles.searchResultName}>{item.name}</Text>
                  {item.therapist && <Text style={styles.searchResultTherapist}>{item.therapist}</Text>}
                  <Text style={styles.searchResultType}>{item.type}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <>
            <View style={styles.mapContainer}>
              <Text style={styles.mapPlaceholderText}>Map</Text>
              <Text style={styles.mapPlaceholderSubtext}>Events nearby</Text>
            </View>

            <Text style={styles.sectionTitle}>Explore one-on-ones</Text>
            <ScrollView horizontal style={styles.sessionsScrollView}>
              {allEvents.filter(event => event.type === 'session').map((session) => (
                <TouchableOpacity key={session.id} onPress={() => handleEventPress(session)}>
                  <View style={styles.sessionBox}>
                    <Image
                      source={{ uri: 'https://via.placeholder.com/180x120' }}
                      style={styles.therapistImage}
                    />
                    <Text style={styles.therapistName}>{session.therapist}</Text>
                    <Text style={styles.specialization}>{session.specialization}</Text>
                    <Text style={styles.sessionDate}>{session.date}</Text>
                    <Text style={styles.sessionTitle}>{session.title}</Text>
                    <Text style={styles.sessionDescription}>{session.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Explore communities</Text>
            <ScrollView horizontal style={styles.sessionsScrollView}>
              {allEvents.filter(event => event.type === 'event').map((event) => (
                <TouchableOpacity key={event.id} onPress={() => handleEventPress(event)}>
                  <View style={styles.eventBox}>
                    <Image
                      source={{ uri: 'https://via.placeholder.com/180x120' }}
                      style={styles.eventImage}
                    />
                    <Text style={styles.eventName}>{event.name}</Text>
                    <Text style={styles.eventDescription}>{event.description}</Text>
                    <Text style={styles.eventDate}>{event.date}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>RSVP'd Events</Text>
            <View style={styles.rsvpContainer}>
              {rsvpedEvents.map((event) => (
                <View key={event.id} style={styles.rsvpEventBox}>
                  <Text style={styles.rsvpEventName}>{event.name || event.title}</Text>
                  <Text style={styles.rsvpEventDate}>{event.date}</Text>
                  {event.rsvpTime && <Text style={styles.rsvpEventTime}>Time: {event.rsvpTime}</Text>}
                  <TouchableOpacity 
                    style={styles.cancelRSVPButton} 
                    onPress={() => handleCancelRSVP(event.id)}
                  >
                    <Text style={styles.cancelRSVPButtonText}>Cancel RSVP</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.suggestEventButton} onPress={handleSuggestEvent}>
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>

      <RSVPModal
        isVisible={isModalVisible}
        event={selectedEvent}
        onClose={handleCloseModal}
        onRSVP={handleRSVP}
      />

      <SuggestEventModal
        isVisible={isSuggestModalVisible}
        onClose={handleCloseSuggestModal}
        onSuggest={handleSuggestNewEvent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F',
  },
  searchContainer: {
    padding: 10,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#002a54',
    borderRadius: 10,
    borderColor: '#a0a0a0',
    borderWidth: 1,
  },
  searchIcon: {
    padding: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: '#ffffff',
    paddingHorizontal: 10,
  },
  searchResultsContainer: {
    padding: 10,
  },
  searchResultItem: {
    backgroundColor: '#002a54',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  searchResultTherapist: {
    fontSize: 14,
    color: '#a0a0a0',
    marginTop: 5,
  },
  searchResultType: {
    fontSize: 12,
    color: '#a0a0a0',
    marginTop: 5,
    fontStyle: 'italic',
  },
  mapContainer: {
    height: 150,
    backgroundColor: '#002a54',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapPlaceholderSubtext: {
    color: '#a0a0a0',
    fontSize: 14,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  sessionsScrollView: {
    paddingLeft: 10,
  },
  sessionBox: {
    width: 200,
    backgroundColor: '#002a54',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  therapistImage: {
    width: 180,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  therapistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  specialization: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 5,
  },
  sessionDate: {
    fontSize: 12,
    color: '#a0a0a0',
    marginTop: 5,
  },
  sessionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 5,
  },
  sessionDescription: {
    fontSize: 12,
    color: '#a0a0a0',
    marginTop: 5,
  },
  eventBox: {
    width: 200,
    backgroundColor: '#002a54',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  eventImage: {
    width: 180,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  eventDescription: {
    fontSize: 12,
    color: '#a0a0a0',
    marginTop: 5,
  },
  eventDate: {
    fontSize: 12,
    color: '#a0a0a0',
    marginTop: 5,
  },
  rsvpContainer: {
    padding: 10,
  },
  rsvpEventBox: {
    backgroundColor: '#002a54',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  rsvpEventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  rsvpEventDate: {
    fontSize: 14,
    color: '#a0a0a0',
    marginTop: 5,
  },
  rsvpEventTime: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 5,
  },
  cancelRSVPButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  cancelRSVPButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  suggestEventButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4CAF50',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#002a54',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    marginBottom: 10,
  },
  timeButton: {
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedTimeButton: {
    backgroundColor: '#4CAF50',
  },
  timeButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  rsvpButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  rsvpButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#a0a0a0',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#003366',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#ffffff',
  },
  suggestButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  suggestButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ExploreScreen;