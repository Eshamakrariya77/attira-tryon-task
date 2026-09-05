import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';

// Mock Backend API Function (Simulating Gemini Call)
const callGeminiTryOnAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        tryOnImage: 'https://unsplash.com',
        stylingNote: 'This monochrome power suit maximizes your modern corporate look. Pair it with minimal silver accessories and black pumps for an elevated statement.'
      });
    }, 2000); // Simulated 2-second API loading delay
  });
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [stylingNote, setStylingNote] = useState<string | null>(null);

  const handleTryOn = async () => {
    setLoading(true);
    try {
      const response: any = await callGeminiTryOnAPI();
      if (response.success) {
        setResultImage(response.tryOnImage);
        setStylingNote(response.stylingNote);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong with Gemini API connection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>OUTFIT DETAIL</Text>
      </View>

      {/* Main Outfit Image Display */}
      <Image 
        source={{ uri: resultImage || 'https://unsplash.com' }} 
        style={styles.mainImage} 
      />

      {/* Outfit Information */}
      <View style={styles.infoSection}>
        <Text style={styles.brandText}>ATTIRA STYLING</Text>
        <Text style={styles.titleText}>MONOCHROME POWER</Text>
        <Text style={styles.descriptionText}>
          A sharp, structured blazer paired seamlessly with tailored trousers. Perfect for everyday office wear and high-impact impressions.
        </Text>
      </View>

      {/* Try-On Result & Styling Note Section */}
      {stylingNote && (
        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>✨ Gemini AI Styling Note:</Text>
          <Text style={styles.noteText}>{stylingNote}</Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.tryOnButton, loading && styles.disabledButton]} 
          onPress={handleTryOn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>TRY ON</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareText}>SHARE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  header: { paddingVertical: 20, alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', letterSpacing: 2 },
  mainImage: { width: '100%', height: 400, borderRadius: 12, backgroundColor: '#222' },
  infoSection: { marginVertical: 20 },
  brandText: { color: '#CCFF00', fontSize: 12, fontWeight: 'bold', marginBottom: 4 },
  titleText: { color: '#FFF', fontSize: 24, fontWeight: 'bold', letterSpacing: 1 },
  descriptionText: { color: '#AAA', fontSize: 14, marginTop: 8, lineHeight: 20 },
  noteContainer: { backgroundColor: '#222', padding: 16, borderRadius: 8, marginVertical: 10, borderWidth: 1, borderColor: '#CCFF00' },
  noteTitle: { color: '#CCFF00', fontWeight: 'bold', marginBottom: 6 },
  noteText: { color: '#FFF', fontSize: 14 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 40 },
  tryOnButton: { flex: 1, backgroundColor: '#CCFF00', paddingVertical: 16, borderRadius: 8, alignItems: 'center', marginRight: 10 },
  disabledButton: { backgroundColor: '#77aa00' },
  shareButton: { flex: 1, backgroundColor: 'transparent', paddingVertical: 16, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#FFF' },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  shareText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
