import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, AppState, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LineChart } from 'react-native-chart-kit';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [sleepStartTime, setSleepStartTime] = useState(null);
  const [sleepData, setSleepData] = useState([]);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    age: '30',
    bio: 'I love exploring new things and meeting new people!',
    image: 'https://via.placeholder.com/150',
    hoursOfSleep: '0',
    stateOfMind: 'Feeling good today!',
    insuranceNumber: '123456789',
    preferredHealthProvider: 'ABC Health',
    emergencyContact: 'Jane Doe: 555-1234'
  });

  const [editedInfo, setEditedInfo] = useState({...userInfo});

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // App has come to the foreground
        if (sleepStartTime) {
          const now = new Date();
          const sleepTime = (now - sleepStartTime) / (1000 * 60 * 60); // Convert to hours
          const newSleepData = [...sleepData, sleepTime];
          if (newSleepData.length > 7) newSleepData.shift(); // Keep only last 7 days
          setSleepData(newSleepData);
          setUserInfo(prevInfo => ({...prevInfo, hoursOfSleep: sleepTime.toFixed(1)}));
          setSleepStartTime(null);
        }
      } else if (nextAppState === 'background') {
        // App has gone to the background
        setSleepStartTime(new Date());
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, sleepStartTime]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo({...userInfo});
  };

  const handleSave = () => {
    setUserInfo({...userInfo, ...editedInfo});
    setIsEditing(false);
    // Here you would typically send the updated userInfo to your backend
  };

  const handleImageChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setEditedInfo({...editedInfo, image: result.assets[0].uri});
    }
  };

  const handleSettingsPress = () => {
    setIsSettingsModalVisible(true);
    setEditedInfo({...userInfo});
  };

  const handleSaveSettings = () => {
    setUserInfo({...userInfo, ...editedInfo});
    setIsSettingsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
        <Ionicons name="cog-outline" size={38} color="#ffffff" />
      </TouchableOpacity>

      <View style={styles.profileHeader}>
        <View>
          <Image source={{ uri: isEditing ? editedInfo.image : userInfo.image }} style={styles.profileImage} />
          {isEditing && (
            <TouchableOpacity style={styles.changeImageButton} onPress={handleImageChange}>
              <Text style={styles.changeImageText}>Change Image</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.profileInfo}>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={editedInfo.name}
              onChangeText={(text) => setEditedInfo({...editedInfo, name: text})}
            />
          ) : (
            <Text style={styles.name}>{userInfo.name}</Text>
          )}
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={editedInfo.age}
              onChangeText={(text) => setEditedInfo({...editedInfo, age: text})}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.age}>Age: {userInfo.age}</Text>
          )}
        </View>
        {!isEditing && (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="pencil-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>

      {isEditing ? (
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={editedInfo.bio}
          onChangeText={(text) => setEditedInfo({...editedInfo, bio: text})}
          multiline
        />
      ) : (
        <Text style={styles.bio}>{userInfo.bio}</Text>
      )}

      {isEditing && (
        <Button title="Save" onPress={handleSave} color="#4CAF50" />
      )}

      <View style={styles.infoBox}>
        <View style={styles.infoColumn}>
          <Ionicons name="bed-outline" size={24} color="#ffffff" />
          <Text style={styles.infoTitle}>Hours of Sleep</Text>
          <Text style={styles.infoContent}>{userInfo.hoursOfSleep} hours</Text>
        </View>
        <View style={styles.graphContainer}>
          <LineChart
            data={{
              labels: sleepData.length ? sleepData.map((_, index) => `Day ${index + 1}`) : ['', '', '', '', '', '', ''],
              datasets: [{
                data: sleepData.length ? sleepData : [0, 0, 0, 0, 0, 0, 0]
              }]
            }}
            width={Dimensions.get('window').width * 0.5}
            height={100}
            chartConfig={{
              backgroundColor: '#002a54',
              backgroundGradientFrom: '#002a54',
              backgroundGradientTo: '#002a54',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "3",
                strokeWidth: "1",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            withVerticalLines={false}
            withHorizontalLines={false}
          />
        </View>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoColumn}>
          <Ionicons name="heart-outline" size={24} color="#ffffff" />
          <Text style={styles.infoTitle}>State of Mind</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoContent}>{userInfo.stateOfMind}</Text>
        </View>
      </View>

      {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSettingsModalVisible}
        onRequestClose={() => setIsSettingsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Insurance Information</Text>
            
            {/* Insurance Number */}
            <Text style={{ color: 'white' }}>Insurance Number:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insurance Number"
              placeholderTextColor="#a0a0a0"
              value={editedInfo.insuranceNumber}
              onChangeText={(text) => setEditedInfo({...editedInfo, insuranceNumber: text})}
            />
            <></>
            {/* Preferred Health Provider */}
            <Text style={{ color: 'white' }}>Preferred Health Provider:</Text>
            <TextInput
              style={styles.input}
              placeholder="Preferred Health Provider"
              placeholderTextColor="#a0a0a0"
              value={editedInfo.preferredHealthProvider}
              onChangeText={(text) => setEditedInfo({...editedInfo, preferredHealthProvider: text})}
            />
            <></>
            {/* Emergency Contact */}
            <Text style={{ color: 'white' }}>Emergency Contact:</Text>
            <TextInput
              style={styles.input}
              placeholder="Emergency Contact"
              placeholderTextColor="#a0a0a0"
              value={editedInfo.emergencyContact}
              onChangeText={(text) => setEditedInfo({...editedInfo, emergencyContact: text})}
            />

            {/* Save and Cancel Buttons */}
            <Button title="Save" onPress={handleSaveSettings} color="#4CAF50" />
            <Button title="Cancel" onPress={() => setIsSettingsModalVisible(false)} color="#f44336" />
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F',
    padding: 20,
  },
  
settingsButton:{
   position:'absolute',
   top :40,
   right :20,
   zIndex :1,
},

profileHeader:{
   flexDirection:'row',
   alignItems:'center',
   marginBottom :20,
   marginTop :60,
},

profileImage:{
   width :100,
   height :100,
   borderRadius :50,
},

changeImageButton:{
   backgroundColor:'#4CAF50',
   padding :5,
   borderRadius :5,
   marginTop :5,
   alignItems:'center'
},

changeImageText:{
   color:'#ffffff',
   fontSize :12
},

profileInfo:{
   marginLeft :20,
   flex :1
},

name:{
   color:'#ffffff',
   fontSize :24,
   fontWeight:'bold'
},

age:{
   color:'#a0a0a0',
   fontSize :16
},

editButton:{
   padding :10
},

bio:{
   color:'#ffffff',
   fontSize :16,
   marginBottom :20
},

infoBox:{
   backgroundColor:'#002a54',
   borderRadius :10,
   padding :15,
   marginBottom :15,
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems:'center'
},

infoColumn:{
   alignItems:'flex-start', 
   flex :1 
},

infoTitle:{
   color:'#a0a0a0',
   fontSize :14,
   marginTop :5 
},

infoContent:{
   color:'#ffffff',
   fontSize :18 
},

input:{
   backgroundColor:'#003366',
   borderRadius :5,
   padding :10,
   marginBottom :10,
   color:'#ffffff'
},

bioInput:{
   height :100,
   textAlignVertical:'top'
},

graphContainer:{
     flexDirection:'row', 
     justifyContent:'flex-end'
},

modalContainer:{
     flex :1,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'rgba(0 ,0 ,0 ,0.5)'
},

modalContent:{
     backgroundColor:'#002a54', 
     borderRadius :10 ,
     padding :20 ,
     width :'80%'
},

modalTitle:{
     fontSize :20 ,
     fontWeight:'bold' ,
     color:'#ffffff' ,
     marginBottom :20 ,
     textAlign:'center'
}

});

export default Profile;