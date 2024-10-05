import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Camera } from 'lucide-react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios'; // Import axios

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
        console.log("Post request")
        const response = await axios.post('http://10.206.39.61:5000/chat', {
            message: message,
        }, {
            headers: {
                'Content-Type': 'application/json', // Ensure this is set
            }
        });

        console.log("Post request Done")

        const botReply = response.data.reply; // Adjust according to your response
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
            <Camera color="#4a90e2" size={20} />
            <Text style={styles.cameraButtonText}>AR Assistant</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.chatContainer}>
          <View style={styles.backdrop}>
            <Text style={styles.backdropText}>Hotline: 9999999</Text>
            <Text style={styles.backdropText}>Emergency: 911</Text>
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
            <View style={styles.muteButtonText}>{!isMuted ? <FontAwesome name="microphone" size={24} color="white" /> : <FontAwesome name="microphone-slash" size={24} color="white" />}</View>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="#808080"
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
      backgroundColor: '#001F3F', // Same as other pages
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
      borderBottomColor: '#a0a0a0', // Similar to the border colors in other styles
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff', // Consistent text color
    },
    cameraButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 6,
      borderRadius: 16,
      backgroundColor: '#002a54', // Matches searchBarWrapper
    },
    cameraButtonText: {
      marginLeft: 4,
      fontSize: 12,
      color: '#a0a0a0', // Matches your search result type text color
    },
    backdrop: {
      padding: 16,
      margin: 16,
      backgroundColor: 'rgba(74, 144, 226, 0.1)', // Light backdrop for contrast
      borderRadius: 8,
      alignItems: 'center',
    },
    backdropText: {
      fontSize: 14,
      color: '#a0a0a0', // Light text for visibility
      marginBottom: 4,
    },
    chatContainer: {
      flex: 1,
      paddingHorizontal: 16,
    },
    userMessageContainer: {
      alignSelf: 'flex-end',
      marginBottom: 12,
      maxWidth: '80%',
    },
    botMessageContainer: {
      alignSelf: 'flex-start',
      marginBottom: 12,
      maxWidth: '80%',
    },
    userMessage: {
      backgroundColor: '#4CAF50', // Changed for a fresh look but still vibrant
      color: 'white',
      padding: 12,
      borderRadius: 16,
      fontSize: 14,
    },
    botMessage: {
      backgroundColor: '#002a54', // Matches your existing style
      color: '#ffffff', // Same as userMessage for consistency
      padding: 12,
      borderRadius: 16,
      fontSize: 14,
      borderWidth: 1,
      borderColor: '#a0a0a0', // Border matches other styles
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: '#a0a0a0',
      backgroundColor: '#002a54', // Consistent with your existing styles
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#a0a0a0', // Matches other input fields
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginHorizontal: 8,
      fontSize: 14,
      color: '#ffffff', // Keep text visible against dark background
    },
    muteButton: {
      padding: 8,
      borderRadius: 16,
      backgroundColor: '#002a54', // Consistent with button styles
    },
    sendButton: {
      padding: 8,
      borderRadius: 16,
      backgroundColor: '#4CAF50', // Matches your existing button color
    },
    sendButtonText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold', // Slightly stronger emphasis on text
    },
  });
  
export default HomeScreen;