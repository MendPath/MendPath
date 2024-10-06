import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import { Camera } from 'lucide-react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { FLASK_API_ENDPOINT } from '@env';

const HomeScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { text: 'Welcome to MendPath. How can I assist you today?', sender: 'bot' },
  ]);
  const [isMuted, setIsMuted] = useState(false);

  const sendMessage = async () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { text: message, sender: 'user' }]);
      setMessage('');

      try {
        const response = await axios.post(FLASK_API_ENDPOINT + '/chat', {
          message: message,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const botReply = response.data.response;
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { text: botReply, sender: 'bot' },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.header}>
          <Text style={styles.title}>MendPath</Text>
          <TouchableOpacity style={styles.cameraButton}>
            <Camera color="#3d3d3d" size={20} />
            <Text style={styles.cameraButtonText}>AR Assistant</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.chatContainer}>
          <View style={styles.backdrop}>
            <Text style={styles.backdropText}>Hotline: <Text style={styles.brightText}>9999999</Text></Text>
            <Text style={styles.backdropText}>Emergency: <Text style={styles.brightText}>911</Text></Text>
          </View>
          {chatHistory.map((chat, index) => (
            <View key={index} style={chat.sender === 'user' ? styles.userMessageContainer : styles.botMessageContainer}>
              <Text style={chat.sender === 'user' ? styles.userMessage : styles.botMessage}>
                {chat.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.muteButton} onPress={() => setIsMuted(!isMuted)}>
            <View style={styles.muteButtonText}>
              {!isMuted ? (
                <FontAwesome name="microphone" size={24} color="black" />
              ) : (
                <FontAwesome name="microphone-slash" size={24} color="black" />
              )}
            </View>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="#333131"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0d4c8', // Set your desired background color
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
  },
  title: {
    fontSize: 24,
   

    fontWeight: '600',
    color: '#000000', // Use a dark color that fits your color scheme
    fontFamily: 'Helvetica Neue',
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(94, 77, 67, 0.2)',
  },
  cameraButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#000000', // Change this to fit your scheme
    fontFamily: 'Courier',
  },
  backdrop: {
    padding: 16,
    margin: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust to fit your desired color
    borderRadius: 12,
    alignItems: 'center',
  },
  backdropText: {
    fontSize: 16,
    color: '#000000', // Adjust to your color scheme
    marginBottom: 4,
    fontFamily: 'Avenir',
  },
  brightText: {
    color: '#FF0000', // Brighter color for hotline and emergency numbers
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    marginBottom: 12,
    borderRadius: 20,
    maxWidth: '80%',
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    maxWidth: '80%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  userMessage: {
    backgroundColor: '#fcf3eb', // Adjust this to your color scheme
    color: '#000000', // Dark color for user message
    padding: 12,
    borderRadius: 20,
    fontSize: 16,
    fontFamily: 'Courier',
  },
  botMessage: {
    backgroundColor: '#ffffff', // Adjust to your desired color
    color: '#000000', // Dark color for bot message
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: 'Courier',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 8,
    fontSize: 16,
    fontFamily: 'courier',

    color: '#000000', // Adjust to your color scheme
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  muteButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(94, 77, 67, 0.2)',
  },
  sendButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(94, 77, 67, 0.2)',
  },
  sendButtonText: {
    color: '#000000', // Adjust to your color scheme
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Courier new',
  },
});

export default HomeScreen;