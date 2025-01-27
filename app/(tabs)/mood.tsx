import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../context/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SPRING_CONFIG = {
  damping: 20,
  mass: 1,
  stiffness: 200,
};

const MOODS = [
  { emoji: '✨', label: 'amazing', color: '#8B5CF6', gradient: ['#C4B5FD', '#8B5CF6'] },
  { emoji: '⚡️', label: 'energized', color: '#7C3AED', gradient: ['#A78BFA', '#7C3AED'] },
  { emoji: '😌', label: 'calm', color: '#2DD4BF', gradient: ['#5EEAD4', '#2DD4BF'] },
  { emoji: '🧘', label: 'balanced', color: '#4F46E5', gradient: ['#818CF8', '#4F46E5'] },
  { emoji: '😊', label: 'happy', color: '#3B82F6', gradient: ['#93C5FD', '#3B82F6'] },
  { emoji: '😝', label: 'playful', color: '#EC4899', gradient: ['#F9A8D4', '#EC4899'] },
  { emoji: '😐', label: 'meh', color: '#F59E0B', gradient: ['#FCD34D', '#F59E0B'] },
  { emoji: '😢', label: 'sad', color: '#6B7280', gradient: ['#9CA3AF', '#6B7280'] },
  { emoji: '😤', label: 'frustrated', color: '#EF4444', gradient: ['#FCA5A5', '#EF4444'] },
  { emoji: '😴', label: 'tired', color: '#DC2626', gradient: ['#EF4444', '#DC2626'] },
];

const ACTIVITIES = [
  '💼 hustling',
  '🛋️ chillin\'',
  '🎮 gaming',
  '💬 socializing',
  '📚 grindin\'',
  '🎧 vibing',
  '🏃‍♀️ exercising',
  '🎨 creative flow',
  '☁️ daydreaming'
];

export default function MoodScreen() {
  const { colors, isDark } = useTheme();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const insets = useSafeAreaInsets();
  
  // Reanimated setup
  const translateY = useSharedValue(SCREEN_HEIGHT);

  const resetPopup = useCallback(() => {
    setSelectedMood(null);
    setNote('');
    setSelectedActivities([]);
  }, []);

  // Gesture setup
  const gesture = Gesture.Pan()
    .onStart(() => {
      translateY.value = translateY.value; // Capture current position
    })
    .onUpdate((event) => {
      if (event.translationY > 0) { // Only allow downward movement
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > 100 || event.velocityY > 500) {
        // Dismiss if dragged down enough or with enough velocity
        translateY.value = withSpring(SCREEN_HEIGHT, SPRING_CONFIG, () => {
          runOnJS(resetPopup)();
        });
      } else {
        // Snap back to original position
        translateY.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const showPopup = useCallback(() => {
    translateY.value = SCREEN_HEIGHT;
    translateY.value = withSpring(0, SPRING_CONFIG);
  }, []);

  const handleMoodSelect = useCallback((index: number) => {
    setSelectedMood(index);
    showPopup();
  }, [showPopup]);

  const toggleActivity = useCallback((activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
      paddingTop: 12,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 18,
      color: colors.subtext,
      marginBottom: 32,
    },
    moodGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -8,
    },
    moodItem: {
      width: '50%',
      padding: 8,
    },
    moodButton: {
      backgroundColor: isDark ? colors.card : '#ffffff',
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDark ? colors.border : colors.card,
      shadowColor: colors.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: isDark ? 0.1 : 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    moodButtonPressed: {
      transform: [{ scale: 0.95 }],
    },
    moodButtonSelected: {
      backgroundColor: colors.primary + '20',
      borderColor: colors.primary,
    },
    emoji: {
      fontSize: 32,
      marginBottom: 12,
    },
    label: {
      fontSize: 14,
      color: colors.text,
      opacity: isDark ? 0.9 : 1,
    },
    labelSelected: {
      color: colors.primary,
      fontWeight: '600',
    },
    popupContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
    },
    popupContent: {
      backgroundColor: isDark ? colors.card : 'rgba(255, 255, 255, 0.9)',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
      paddingTop: 12,
    },
    pullBar: {
      width: 36,
      height: 4,
      backgroundColor: '#CBD5E1',
      borderRadius: 2,
      alignSelf: 'center',
      marginBottom: 16,
    },
    popupScroll: {
      maxHeight: SCREEN_HEIGHT * 0.7,
    },
    popupTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    activitiesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
      gap: 8,
    },
    activityChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: isDark ? colors.background : colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: isDark ? colors.border : 'transparent',
    },
    activityChipSelected: {
      backgroundColor: colors.primary + '20',
      borderColor: colors.primary,
    },
    activityText: {
      fontSize: 14,
      color: colors.text,
    },
    activityTextSelected: {
      color: '#fff',
    },
    noteInput: {
      backgroundColor: isDark ? colors.background : colors.card,
      borderRadius: 16,
      padding: 16,
      fontSize: 16,
      color: colors.text,
      minHeight: 100,
      textAlignVertical: 'top',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: isDark ? colors.border : 'transparent',
    },
    saveButton: {
      backgroundColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      borderRadius: 16,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <Text style={styles.title}>vibe check ✨</Text>
          <Text style={styles.subtitle}>tap to set your mood</Text>
          
          <View style={styles.moodGrid}>
            {MOODS.map((mood, index) => (
              <View key={index} style={styles.moodItem}>
                <Pressable
                  style={[
                    styles.moodButton,
                    selectedMood === index && styles.moodButtonSelected,
                  ]}
                  onPress={() => handleMoodSelect(index)}
                >
                  <Text style={styles.emoji}>{mood.emoji}</Text>
                  <Text style={[
                    styles.label,
                    selectedMood === index && styles.labelSelected,
                  ]}>
                    {mood.label}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {selectedMood !== null && (
        <Animated.View style={[styles.popupContainer, rStyle]}>
          <GestureDetector gesture={gesture}>
            <BlurView intensity={70} style={[styles.popupContent, { paddingBottom: insets.bottom + 20 }]}>
              <View style={styles.pullBar} />
              
              <Text style={styles.popupTitle}>what are you up to?</Text>
              <ScrollView 
                style={styles.popupScroll} 
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                <View style={styles.activitiesContainer}>
                  {ACTIVITIES.map((activity) => (
                    <Pressable
                      key={activity}
                      style={[
                        styles.activityChip,
                        selectedActivities.includes(activity) && styles.activityChipSelected
                      ]}
                      onPress={() => toggleActivity(activity)}
                    >
                      <Text style={[
                        styles.activityText,
                        selectedActivities.includes(activity) && styles.activityTextSelected
                      ]}>
                        {activity}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={styles.popupTitle}>add a note</Text>
                <TextInput
                  style={styles.noteInput}
                  placeholder="what's on your mind?"
                  placeholderTextColor="#94A3B8"
                  value={note}
                  onChangeText={setNote}
                  multiline
                  maxLength={280}
                />

                <Pressable 
                  style={styles.saveButton}
                  onPress={() => {
                    translateY.value = withSpring(SCREEN_HEIGHT, SPRING_CONFIG, () => {
                      runOnJS(resetPopup)();
                    });
                  }}
                >
                  <MaterialCommunityIcons name="check" size={24} color="#fff" />
                  <Text style={styles.saveButtonText}>save mood</Text>
                </Pressable>
              </ScrollView>
            </BlurView>
          </GestureDetector>
        </Animated.View>
      )}
    </GestureHandlerRootView>
  );
}
