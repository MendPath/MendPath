import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Svg, { Path } from "react-native-svg";
import { Divider } from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';
import MapMarker from '../../assets/images/map-marker-512.png';
import Therapist1 from '../../assets/images/therapists/img-2ZibbluvM4H7rwVUPHOES.jpeg'; 
import Therapist2 from '../../assets/images/therapists/img-BVXM0oudhxeE2PiD6e14T.jpeg'; 
import Therapist3 from '../../assets/images/therapists/img-e2ABt3yLalc57BmBmqsfs.jpeg'; 
import Therapist4 from '../../assets/images/therapists/img-N4CIUFObLZ8mTmu5vKBBp.jpeg'; 
import Therapist5 from '../../assets/images/therapists/img-Iikck1XKBNeLNCkuayy6R.jpeg'; 
import Therapist6 from '../../assets/images/therapists/img-o5nZrAitPG3bnmjtThBdk.jpeg'; 
import Therapist7 from '../../assets/images/therapists/img-JLvqswiu6qKrMsyAFb4ls.jpeg'; 
import Event1 from '../../assets/images/events/img-QuzpxSLjO7dyLWvbcro2z.jpg';
import Event2 from '../../assets/images/events/img-eANdhtr1XlsVXLRgXHuCD.jpg';
import Event3 from '../../assets/images/events/img-n9Yec9cwBd7g6ukmse1TR.jpg';
import Event4 from '../../assets/images/events/img-Vhajq3dLCiqMHTDFMIG9F.jpg';
import Event5 from '../../assets/images/events/img-AeZDTJqqF2IHWo55iF3eW.jpg';
import Event6 from '../../assets/images/events/img-KBGkeLnexo0kGJnXVQLxs.jpg';
import Event7 from '../../assets/images/events/img-BGFZMJ9EVffEcEabRBQii.jpg';

// Sample data for one-on-one sessions
const therapistImages = [
  Therapist1, Therapist2, Therapist3, Therapist4, Therapist5, Therapist6, Therapist7
];
const eventImages = [
  Event1, Event2, Event3, Event4, Event5, Event6, Event7
];
const oneOnOneSessions = [
  { id: 1, therapist: 'Dr. Smith', image:Therapist1, lat: 40.828182012, lng: -73.9220888077, specialization: 'Cognitive Behavioral Therapy', date: '2024-10-15', title: 'Stress Management', description: `Meeting Dr. Smith is an opportunity to gain practical tools for managing stress in your day-to-day life. Specializing in Cognitive Behavioral Therapy (CBT), he focuses on identifying patterns of thinking that might be contributing to your stress, and helps you learn strategies to break those cycles. His sessions are approachable and solution-oriented, offering you tangible techniques to handle the pressures of work, relationships, and personal challenges. Whether you're new to therapy or looking for new ways to manage stress, Dr. Smith’s calm, supportive nature creates a space where you can explore and practice these techniques confidently.` },
  { id: 2, therapist: 'Emma Johnson', image:Therapist2, lat: 40.7175315979, lng: -73.9639877878, specialization: 'Mindfulness', date: '2024-10-16', title: 'Mindfulness Meditation', description: `Emma Johnson welcomes you into a serene and centered environment where mindfulness becomes more than just a concept. Specializing in mindfulness meditation, she introduces you to simple, yet effective practices that help reduce stress and increase awareness. Emma is passionate about helping you reconnect with the present moment, allowing you to experience more peace in your life. Her sessions offer an excellent introduction to mindfulness, providing guidance that’s easy to follow and integrate into your daily routine.` },
  { id: 3, therapist: 'Dr. Patel', image:Therapist3, lat:40.660209732, lng: -73.8450758953, specialization: 'Family Therapy', date: '2024-10-17', title: 'Improving Family Communication', description: `Dr. Patel brings a compassionate, thoughtful approach to family therapy, making his sessions feel like a safe space for everyone involved. He specializes in improving family communication, offering strategies to navigate conflicts, strengthen relationships, and enhance overall family dynamics. With a focus on understanding each family member’s perspective, Dr. Patel works with you to build healthier communication patterns that promote connection and understanding. Whether your family is dealing with specific issues or simply looking to improve your relationships, Dr. Patel’s sessions provide valuable tools for fostering a stronger, more supportive family environment.` },
  { id: 4, therapist: 'Sarah Lee', image:Therapist4, lat: 40.6953915987, lng: -73.9672889631, specialization: 'Art Therapy', date: '2024-10-18', title: 'Expressive Art Session', description: `Sarah Lee’s art therapy sessions invite you to explore your emotions through creative expression. With a gentle, supportive presence, Sarah guides you in using art as a tool for self-discovery and emotional healing. Whether you're new to art therapy or experienced, her sessions provide a non-judgmental space where you can express yourself freely, using creative mediums to better understand your inner world. Sarah believes in the power of art to unlock deeper emotions and help you process them in a healthy, transformative way.` },
  { id: 5, therapist: 'Dr. Rodriguez', image:Therapist5, lat: 40.6175018012, lng: -73.8755551462, specialization: 'Anxiety Disorders', date: '2024-10-19', title: 'Coping with Anxiety', description: `Dr. Rodriguez creates a welcoming and supportive environment for those seeking relief from anxiety. Specializing in anxiety disorders, he focuses on helping you develop effective tools to manage symptoms and regain control over your life. In his sessions, Dr. Rodriguez offers practical, easy-to-apply strategies for dealing with anxious thoughts and feelings, tailored to your individual needs. His calm demeanor makes it easy to feel at ease, and he works with you to ensure that you leave each session with a greater sense of understanding and control over your anxiety.` },
  { id: 6, therapist: 'Michael Chen', image:Therapist6, lat:40.6547895849, lng: -73.8077262033, specialization: 'Career Counseling', date: '2024-10-20', title: 'Career Transition Strategies', description: `Michael Chen is dedicated to helping individuals navigate career transitions with confidence and clarity. Whether you’re contemplating a career change or seeking growth in your current role, Michael offers thoughtful guidance and practical strategies for taking the next steps. His career counseling sessions focus on understanding your strengths, values, and goals, helping you create a clear roadmap for your future. With Michael’s supportive approach, you’ll feel empowered to make informed decisions and pursue opportunities that align with your passions and long-term career aspirations.` },
  { id: 7, therapist: 'Dr. Nguyen', image:Therapist7, lat: 40.8328186857, lng:-73.9474398361, specialization: 'Trauma-Informed Therapy', date: '2024-10-21', title: 'Healing from Past Trauma', description: `Dr. Nguyen offers a compassionate and supportive space for those healing from past trauma. Specializing in trauma-informed therapy, she helps you process difficult experiences in a way that feels safe and empowering. Dr. Nguyen’s approach is gentle and understanding, recognizing the unique nature of each person’s journey. Her sessions focus on helping you work through trauma at your own pace, offering tools for healing and emotional resilience. With her guidance, you’ll find a space where you can begin to rebuild and move forward with greater peace and confidence.` },
];

// Sample data for community events
const communityEvents = [
  { id: 1, name: 'Mindful Mondays', lat:40.6516163278, lng:-73.8647886065,shortDescription: 'Weekly group meditation session',  description: `Kick off your week with a sense of calm and clarity by joining Mindful Mondays, a weekly group meditation session designed to help you center your mind and body. Whether you’re new to mindfulness or a seasoned meditator, this event provides a welcoming space to explore mindful breathing, relaxation techniques, and mental stillness. Led by experienced practitioners, you’ll be guided through exercises that aim to reduce stress and enhance your overall well-being. Taking just a little time each Monday to reset and focus can have lasting benefits throughout the week, making Mindful Mondays a perfect addition to your self-care routine.`, date: '2024-10-14' },
  { id: 2, name: 'Anxiety Support Group', lat: 40.7999420078, lng:-73.9089181724, shortDescription: 'Share experiences and coping strategies', description: `Dealing with anxiety can feel isolating, but you don’t have to face it alone. The Anxiety Support Group is a safe and supportive environment where participants are encouraged to share their experiences and learn from one another. Together, you’ll explore different coping strategies, practical tools, and techniques that have helped others manage their anxiety. This group fosters a sense of community and understanding, offering you the chance to connect with others who truly understand what you’re going through. It’s a great place to find encouragement, support, and new perspectives in managing anxiety.`, date: '2024-10-16' },
  { id: 3, name: 'Art Therapy Workshop', lat: 40.6985685797, lng: -73.8479296843, shortDescription: 'Express yourself through various art forms', description: `Unlock your creativity and explore your emotions through art in this Art Therapy Workshop. Open to all skill levels, this workshop offers a unique opportunity to express yourself through different artistic mediums like painting, drawing, and collage. Led by a skilled art therapist, the session will guide you through creative exercises that help you tap into your feelings and gain deeper self-awareness. No prior art experience is necessary—this workshop is more about the process of self-expression than the final product. By the end, you’ll leave feeling refreshed, inspired, and with a new understanding of how art can help in emotional healing.`, date: '2024-10-18' },
  { id: 4, name: 'Yoga for Mental Health', lat:40.7988059051, lng:-73.8451867698,  shortDescription: 'Gentle yoga practice for stress relief', description: `Take a step toward balance and relaxation with Yoga for Mental Health, a gentle yoga practice designed specifically for stress relief and mental well-being. Whether you're new to yoga or an experienced practitioner, this session offers a welcoming space to unwind both your body and mind. You’ll be guided through gentle stretches, breathing exercises, and mindfulness techniques that help alleviate tension and promote inner calm. By focusing on the connection between movement and breath, this yoga practice can provide a powerful tool for managing stress, anxiety, and overall mental health. It’s a peaceful way to recharge and reset.`, date: '2024-10-20' },
  { id: 5, name: 'Parenting Skills Seminar', lat: 40.6991834984, lng: -73.87727812, shortDescription: 'Tips for positive parenting', description: `Parenting comes with its own set of challenges, but the Parenting Skills Seminar offers practical tips and strategies to help you foster a positive and nurturing environment at home. Led by experts in child development, this seminar focuses on effective communication, discipline, and emotional support, providing you with the tools you need to navigate the ups and downs of parenthood. Whether you’re a new parent or have years of experience, the seminar is packed with valuable insights to improve your relationship with your children and promote their emotional well-being. It’s a great opportunity to gain new perspectives and strengthen your parenting skills.`, date: '2024-10-22' },
  { id: 6, name: 'Career Networking Event', lat:40.7390409145, lng: -73.9310058871, shortDescription: 'Connect with professionals in various fields', description: `Looking to expand your professional connections? The Career Networking Event is the perfect opportunity to meet and engage with professionals across various fields. Whether you're actively seeking a new job, exploring career transitions, or simply interested in expanding your network, this event provides a relaxed and open environment for meaningful conversations. You’ll have the chance to exchange ideas, learn from others' experiences, and potentially discover new career opportunities. Bring your questions, your curiosity, and an open mind—this event could be the key to unlocking the next step in your career journey.`, date: '2024-10-24' },
  { id: 7, name: 'Grief Support Circle', lat: 40.7551667072, lng:-73.8342115959, shortDescription: 'A safe space to share and heal', description: `The Grief Support Circle offers a compassionate and understanding space for those experiencing loss. In this supportive group, participants are invited to share their stories and emotions at their own pace, providing a safe outlet for processing grief. Whether you're facing the recent loss of a loved one or grappling with ongoing feelings of sorrow, this circle is designed to foster healing through connection. Facilitated by a compassionate leader, the group emphasizes shared experiences, empathy, and emotional support, helping you feel less alone in your journey. This circle is a comforting way to process grief while surrounded by others who understand.`, date: '2024-10-26' },
];

const dateToDate = (date) =>{
  newDate = new Date(Date.parse(date));
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  dateReturn = dayNames[newDate.getDay()] + ', ' + monthNames[newDate.getMonth()] + ' ' + (newDate.getDate()+1).toString();
  return dateReturn;
}
const dateToShortDate = (date) =>{
  newDate = new Date(Date.parse(date));
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  dateReturn = dayNames[newDate.getDay()] + ', ' + monthNames[newDate.getMonth()] + ' ' + (newDate.getDate()+1).toString();
  return dateReturn;
}
const SvgComponentBack = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    height={24}
    fill="#e8eaed"
    viewBox="0 -960 960 960"
    {...props}
  >
    <Path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
  </Svg>
)
const SvgComponentCalendar = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    height={24}
    fill="#e8eaed"
    viewBox="0 -960 960 960"
    {...props}
  >
    <Path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
  </Svg>
)

const RSVPModal = ({ isVisible, event, therapist, onClose, onRSVP }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const availableTimes = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];
  profileImg = null;
  if(therapist)
    profileImg = Image.resolveAssetSource(therapistImages[therapist?.id-1]).uri;
  else if (event) profileImg = Image.resolveAssetSource(eventImages[event?.id-1]).uri;
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
        <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <SvgComponentBack />
          </TouchableOpacity>
        <ScrollView style={styles.modalContent}>
          <View style={styles.modalInnerContent}>
          {profileImg && <Image
            source={{uri:profileImg}}
            style={styles.therapistImageModal}
          />}
          <Text style={styles.modalTitle}>{therapist?.therapist || event?.name || event?.title}</Text>
          {therapist?.specialization && <Text style={styles.modalSubtitle}>{therapist?.specialization}</Text>}
          <View style={styles.timesViewer}>
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
          </View>
          <View style={styles.modalDate}>
            <SvgComponentCalendar style={styles.modalDateSvg} />
            <Text style={styles.modalSubtitleBold}>{therapist?.date && dateToDate(therapist?.date) || event?.date && dateToDate(event?.date)}</Text>
          </View>
          <Divider />
          <Text style={styles.modalAbout}>About</Text>
          <Text style={styles.modalAboutContent}>{therapist?.description || event?.description}</Text>
          </View>
          <View style={styles.mapContainerModal}>
            <MapView style={styles.map} initialRegion={{
                  latitude: therapist?.lat||event?.lat,
                  longitude: therapist?.lng||event?.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
              <Marker
                coordinate={{latitude: therapist?.lat||event?.lat, longitude: therapist?.lng||event?.lng}}
                image={MapMarker}
                />
              </MapView>
          </View>
          <View style={styles.endOfModal} />
        </ScrollView>
        <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={styles.rsvpButton}
              onPress={() => selectedTime && onRSVP(selectedTime)}
            >
              <Text style={styles.rsvpButtonText}>RSVP</Text>
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
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <SvgComponentBack />
          </TouchableOpacity>
        <View style={styles.modalContent}>
        <View style={styles.modalInnerContent}>
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
        </View>
        </View>
      </View>
    </Modal>
  );
};

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
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
    if(event.type==='session'){
      setSelectedTherapist(event);
      setSelectedEvent(null);
      setIsModalVisible(true);
    }
    else {
      setSelectedEvent(event);
      setSelectedTherapist(null);
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  const handleRSVP = (time) => {
    const newRsvpEvent = {
      ...selectedEvent||selectedTherapist,
      rsvpTime: time,
    };
    if(selectedEvent){
      setRsvpedEvents(prevEvents => [...prevEvents, newRsvpEvent]);
      setAllEvents(prevAllEvents => prevAllEvents.filter(e => e.id !== selectedEvent.id));
      console.log(`RSVP'd for ${selectedEvent?.name} at ${time}`);
    }
    else{
      setRsvpedEvents(prevEvents => [...prevEvents, newRsvpEvent]);
      setAllEvents(prevAllEvents => prevAllEvents.filter(e => e.id !== selectedTherapist.id));
      console.log(`RSVP'd for ${selectedTherapist?.therapist} at ${time}`);
    }
    handleCloseModal();
  };

  const handleCancelRSVP = (eventId) => {
    const cancelledEvent = rsvpedEvents.find(e => e.id === eventId);
    if(cancelledEvent.therapist){
      setRsvpedEvents(prevEvents => prevEvents.filter(event => event.therapist !== cancelledEvent.therapist));
      setAllEvents(prevAllEvents => [...prevAllEvents, {...cancelledEvent, rsvpTime: undefined}]);
    }
    else{
      setRsvpedEvents(prevEvents => prevEvents.filter(event => event.name !== cancelledEvent.name));
      setAllEvents(prevAllEvents => [...prevAllEvents, {...cancelledEvent, rsvpTime: undefined}]);
    }
    
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
          <Feather name="search" size={20} color="#ffffff" style={styles.searchIcon} />
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
            <MapView style={styles.map} initialRegion={{
                  latitude: 40.816357,
                  longitude: -73.962898,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
              <Marker
                coordinate={{latitude: 40.816357, longitude: -73.962898}}
                image={MapMarker}
                />
                </MapView>
          </View>

          <Text style={styles.sectionTitle}>RSVP'd Events</Text>
            <View style={styles.rsvpContainer}>
              {rsvpedEvents.map((event) => (
                <View key={event.id} style={styles.rsvpEventBox}>
                  <Text style={styles.rsvpEventName}>{event.therapist || event.name}</Text>
                  <Text style={styles.rsvpEventDate}>{dateToShortDate(event.date)}</Text>
                  {event.rsvpTime && <Text style={styles.rsvpEventTime}>{event.rsvpTime}</Text>}
                  <TouchableOpacity 
                    style={styles.cancelRSVPButton} 
                    onPress={() => handleCancelRSVP(event.id)}
                  >
                    <Text style={styles.cancelRSVPButtonText}>Cancel RSVP</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Explore one-on-ones</Text>
            <ScrollView horizontal style={styles.sessionsScrollView}>
              {allEvents.filter(event => event.type === 'session').map((session) => (
                <TouchableOpacity key={session.id} onPress={() => handleEventPress(session)}>
                  <View style={styles.sessionBox}>
                      <Image
                        source={{uri: Image.resolveAssetSource(therapistImages[session.id-1]).uri}}
                        style={styles.therapistImage}
                      />
                    <View style={styles.sessionInnerBox}>
                      <Text style={styles.therapistName}>{session.therapist}</Text>
                      <Text style={styles.specialization}>{session.specialization}</Text>
                      <Text style={styles.sessionDate}>{dateToShortDate(session.date)}</Text>
                    </View>
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
                      source={{ uri: Image.resolveAssetSource(eventImages[event.id-1]).uri }}
                        style={styles.therapistImage}
                      />
                    <View style={styles.eventInnerBox}>
                      <Text style={styles.eventName}>{event.name}</Text>
                      <Text style={styles.eventDescription}>{event.shortDescription}</Text>
                      <Text style={styles.eventDate}>{dateToShortDate(event.date)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            
          </>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.suggestEventButton} onPress={handleSuggestEvent}>
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>

      <RSVPModal
        isVisible={isModalVisible}
        event={selectedEvent}
        therapist={selectedTherapist}
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
    backgroundColor: '#e0d4c8',
  },
  searchContainer: {
    padding: 10,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#a0a0a0',
    borderWidth: 1,
  },
  modalAbout:{
    color:'white',
    fontSize:20,
    fontFamily:'Nunito Sans',
    fontWeight:'bold',
    paddingTop:30
  },
  modalAboutContent:{
    color:'white',
    fontSize: 17,
    fontFamily:'Nunito Sans',

    lineHeight:28,
    paddingTop:15,
  },
  endOfModal:{
    marginBottom:200
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
  searchResultsContainer: {
    padding: 10,
  },
  searchResultItem: {
    backgroundColor: '#5e4d43',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  searchResultName: {
    fontSize: 16,
    fontFamily:'Nunito Sans',

    fontWeight: 'bold',
    color: '#ffffff',
  },
  searchResultTherapist: {
    fontSize: 14,
    color: '#a0a0a0',
    fontFamily:'Nunito Sans',

    marginTop: 5,
  },
  searchResultType: {
    fontSize: 12,
    color: '#a0a0a0',
    marginTop: 5,
    fontFamily:'Nunito Sans',

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
  mapContainerModal:{
    height: 200,
    backgroundColor: '#002a54',
    margin: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map:{
    borderRadius: 10,
    width:'100%',
    height:'100%'
  },
  mapPlaceholderText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily:'Nunito Sans',

    fontWeight: 'bold',
  },
  mapPlaceholderSubtext: {
    color: '#a0a0a0',
    fontSize: 14,
    fontFamily:'Nunito Sans',

    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily:'Nunito Sans',

    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  sessionsScrollView: {
    paddingLeft: 10,
  },
  sessionBox: {
    width: 260,
    shadowColor: '#000000', // Shadow for iOS
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    backgroundColor: '#5e4d43',
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    height:280,
  },
  sessionInnerBox: {
    padding:15,
  },
  therapistImage: {
    width: 260,
    height: 170,
    borderTopStartRadius:8,
    borderTopEndRadius:8
  },
  therapistImageModal: {
    width: '100%',
    height: 260,
    borderRadius: 10,
    marginBottom: 10,
  },
  therapistName: {
    fontSize: 18,
    fontFamily:'Nunito Sans',

    fontWeight: 'bold',
    color: '#ffffff',
  },
  specialization: {
    fontSize: 16,
    paddingTop:5,
    fontFamily:'Nunito Sans',

    color: '#a0a0a0',
    marginBottom: 5,
  },
  sessionDate: {
    fontSize: 12,
    fontFamily:'Nunito Sans',

    color: '#a0a0a0',
    marginTop: 5,
  },
  sessionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily:'Nunito Sans',

    color: '#ffffff',
    marginTop: 5,
  },
  sessionDescription: {
    fontSize: 12,
    color: '#a0a0a0',
    fontFamily:'Nunito Sans',

    marginTop: 5,
  },
  eventBox: {
    width: 260,
    height:280,
    shadowColor: '#000000', // Shadow for iOS
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    backgroundColor: '#5e4d43',
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  eventInnerBox:{
    padding:20
  },
  eventImage: {
    width: 260,
    height: 150,
    borderTopStartRadius:8,
    borderTopEndRadius:8
  },
  eventName: {
    fontSize: 16,
    fontFamily:'Nunito Sans',

    fontWeight: 'bold',
    color: '#ffffff',
  },
  eventDescription: {
    fontSize: 12,
    fontFamily:'Nunito Sans',

    color: '#a0a0a0',
    marginTop: 5,
  },
  eventDate: {
    fontSize: 12,
    fontFamily:'Nunito Sans',

    color: '#a0a0a0',
    marginTop: 5,
  },
  rsvpContainer: {
    padding: 10,
  },
  rsvpEventBox: {
    backgroundColor: '#5e4d43',
    shadowColor: '#000000', // Shadow for iOS
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  rsvpEventName: {
    fontSize: 16,
    fontFamily:'Nunito Sans',

    fontWeight: 'bold',
    color: '#ffffff',
  },
  rsvpEventDate: {
    fontSize: 14,
    fontFamily:'Nunito Sans',

    color: '#a0a0a0',
    marginTop: 5,
  },
  rsvpEventTime: {
    fontSize: 12,
    color: '#4CAF50',
    fontFamily:'Nunito Sans',

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
    fontFamily:'Nunito Sans',

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
    paddingTop:100,
    shadowColor: '#000000', // Shadow for iOS
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    backgroundColor: '#5e4d43',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  modalInnerContent: {
    padding:25
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily:'Nunito Sans',

    color: '#ffffff',
    marginBottom: 10,
  },
  modalDate:{
    display:'flex',
    flexDirection:'row',
    fontFamily:'Nunito Sans',

    paddingTop:10,
    paddingBottom:10
  },
  modalDateSvg:{
    width: 40
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    fontFamily:'Nunito Sans',

    marginBottom: 10,
  },
  modalSubtitleBold: {
    fontSize: 16,
    fontFamily:'Nunito Sans',

    color: '#ffffff',
    marginBottom: 10,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    display:'flex',
    flexDirection:'row',
    width: '120%',
    justifyContent:'center',
    padding:35,
    paddingTop:15,
    marginLeft:0,
    backgroundColor:'#5e4d43'
  },
  timesViewer: {
    display:'flex',
    flexDirection:'row'
  },
  timeButton: {
    backgroundColor: '#303030',
    padding: 10,
    marginRight:5,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedTimeButton: {
    backgroundColor: '#9c8b81',
  },
  timeButtonText: {
    color: '#ffffff',
    fontFamily:'Nunito Sans',

    textAlign: 'center',
  },
  rsvpButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    paddingLeft:45,
    paddingRight:45,
    borderRadius: 10
  },
  rsvpButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontFamily:'Nunito Sans',

    fontWeight: 'bold',
    fontSize:16
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    marginTop:50,
    width:'100%',
    paddingRight:'80%',
  },
  closeButtonText: {
    color: '#a0a0a0',
    fontFamily:'Nunito Sans',

    textAlign: 'center',
  },
  input: {
    backgroundColor: '#3b3735',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#ffffff',
  },
  suggestButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  suggestButtonText: {
    color: '#ffffff',
    fontFamily:'Nunito Sans',

    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ExploreScreen;