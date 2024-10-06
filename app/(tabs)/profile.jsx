import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, AppState, Dimensions, Modal, ScrollView } from 'react-native';
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

  const [editedInfo, setEditedInfo] = useState({ ...userInfo });

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
        if (sleepStartTime) {
          const now = new Date();
          const sleepTime = (now - sleepStartTime) / (1000 * 60 * 60);
          const newSleepData = [...sleepData, sleepTime];
          if (newSleepData.length > 7) newSleepData.shift();
          setSleepData(newSleepData);
          setUserInfo(prevInfo => ({ ...prevInfo, hoursOfSleep: sleepTime.toFixed(1) }));
          setSleepStartTime(null);
        }
      } else if (nextAppState === 'background') {
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
    setEditedInfo({ ...userInfo });
  };

  const handleSave = () => {
    setUserInfo({ ...userInfo, ...editedInfo });
    setIsEditing(false);
  };

  const handleImageChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setEditedInfo({ ...editedInfo, image: result.assets[0].uri });
    }
  };

  const handleSettingsPress = () => {
    setIsSettingsModalVisible(true);
    setEditedInfo({ ...userInfo });
  };

  const handleSaveSettings = () => {
    setUserInfo({ ...userInfo, ...editedInfo });
    setIsSettingsModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
        <Ionicons name="cog-outline" size={38} color="#000000" />
      </TouchableOpacity>

      <View style={[styles.profileHeader, { marginTop: 90 }]}>
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
              onChangeText={(text) => setEditedInfo({ ...editedInfo, name: text })}
            />
          ) : (
            <Text style={styles.name}>{userInfo.name}</Text>
          )}
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={editedInfo.age}
              onChangeText={(text) => setEditedInfo({ ...editedInfo, age: text })}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.age}>Age: {userInfo.age}</Text>
          )}
        </View>
        {!isEditing && (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="pencil-outline" size={24} color="#000000" />
          </TouchableOpacity>
        )}
      </View>

      {isEditing ? (
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={editedInfo.bio}
          onChangeText={(text) => setEditedInfo({ ...editedInfo, bio: text })}
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
          <Ionicons name="bed-outline" size={24} color="#000000" />
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
            width={Dimensions.get('window').width * 0.45}
            height={100}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
    <Ionicons name="heart-outline" size={24} color="#000000" />
    <Text style={styles.infoTitle}>State of Mind</Text>
  </View>
  <View style={styles.infoColumn}>
    <Text style={[styles.infoContent, { marginTop: 24, marginLeft:10 }]}>
      {userInfo.stateOfMind}
    </Text>
  </View>
</View>

      {/* Settings Modal */}
      <Modal
        animationType=""
        transparent={true}
        visible={isSettingsModalVisible}
        onRequestClose={() => setIsSettingsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Insurance Information</Text>

            <Text style={{ color: 'black', fontFamily: 'Nunito Sans' }}>Insurance Number:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insurance Number"
              placeholderTextColor="#a0a0a0"
              value={editedInfo.insuranceNumber}
              onChangeText={(text) => setEditedInfo({ ...editedInfo, insuranceNumber: text })}
            />

            <Text style={{ color: 'black', fontFamily: 'Nunito Sans' }}>Preferred Health Provider:</Text>
            <TextInput
              style={styles.input}
              placeholder="Preferred Health Provider"
              placeholderTextColor="#a0a0a0"
              value={editedInfo.preferredHealthProvider}
              onChangeText={(text) => setEditedInfo({ ...editedInfo, preferredHealthProvider: text })}
            />

            <Text style={{ color: 'black', fontFamily: 'Nunito Sans' }}>Emergency Contact:</Text>
            <TextInput
              style={styles.input}
              placeholder="Emergency Contact"
              placeholderTextColor="#a0a0a0"
              value={editedInfo.emergencyContact}
              onChangeText={(text) => setEditedInfo({ ...editedInfo, emergencyContact: text })}
            />

            <View style={styles.modalButtonContainer}>
              <Button title="Save Settings" onPress={handleSaveSettings} color="#4CAF50" />
              <Button title="Close" onPress={() => setIsSettingsModalVisible(false)} color="#FF5733" />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#e0d4c8',
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changeImageButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  changeImageText: {
    color: '#FFFFFF',
    fontFamily: 'Nunito Sans',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Nunito Sans',
    fontWeight: 'bold',
  },
  age: {
    fontSize: 16,
    fontFamily: 'Nunito Sans',
  },
  editButton: {
    padding: 10,
  },
  bio: {
    fontSize: 16,
    fontFamily: 'Nunito Sans',
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'Nunito Sans',
  },
  bioInput: {
    height: 80,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000', // Shadow for iOS
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
  },
  infoColumn: {
    flexDirection: 'column',
    
  },
  infoTitle: {
    fontSize: 18,
    fontFamily: 'Nunito Sans',
    fontWeight: 'bold',
  },
  infoContent: {
    fontSize: 16,
    fontFamily: 'Nunito Sans',
  },
  graphContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    position: 'absolute',
    right: 20,
    top: 50,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Nunito Sans',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Profile;