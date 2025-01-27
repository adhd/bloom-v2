import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING = 24;

const patterns = {
  topMoods: [
    { emoji: '✨', label: 'amazing', count: 12 },
    { emoji: '😌', label: 'calm', count: 8 },
    { emoji: '⚡️', label: 'energized', count: 7 },
  ],
  peakHours: [
    { time: '9 AM', emoji: '✨', label: 'most energized' },
    { time: '3 PM', emoji: '😴', label: 'afternoon slump' },
    { time: '8 PM', emoji: '😌', label: 'most relaxed' },
  ],
  weeklyHighlights: [
    { day: 'monday', emoji: '🎯', note: 'most productive day' },
    { day: 'wednesday', emoji: '🧘', note: 'best mood overall' },
    { day: 'sunday', emoji: '🌅', note: 'most calm & relaxed' },
  ],
  activities: [
    { emoji: '📚', label: 'reading', impact: 'positive' },
    { emoji: '🏃‍♂️', label: 'exercise', impact: 'positive' },
    { emoji: '📱', label: 'social media', impact: 'negative' },
  ]
};

export default function PatternsScreen() {
  const { colors, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: PADDING,
    },
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.subtext,
      marginBottom: 24,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    lastRow: {
      marginBottom: 0,
    },
    emoji: {
      fontSize: 24,
      marginRight: 12,
    },
    moodCount: {
      position: 'absolute',
      right: 20,
      fontSize: 15,
      color: colors.primary,
      fontWeight: '600',
    },
    textContent: {
      flex: 1,
    },
    label: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
      marginBottom: 2,
    },
    sublabel: {
      fontSize: 14,
      color: colors.subtext,
    },
    timeCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginRight: 12,
      borderWidth: 1,
      borderColor: colors.border,
      width: (SCREEN_WIDTH - PADDING * 2 - 24) / 3,
    },
    timeText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      marginTop: 8,
      marginBottom: 4,
    },
    scrollRow: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    highlight: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    highlightDay: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      textTransform: 'capitalize',
      marginBottom: 4,
    },
    activityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activityLabel: {
      fontSize: 15,
      color: colors.text,
      marginLeft: 12,
    },
    impactTag: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    impactText: {
      fontSize: 13,
      fontWeight: '500',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>your vibe map</Text>
          <Text style={styles.subtitle}>discover your patterns</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>top moods this week</Text>
          <View style={styles.card}>
            {patterns.topMoods.map((mood, index) => (
              <View key={index} style={[styles.row, index === patterns.topMoods.length - 1 && styles.lastRow]}>
                <Text style={styles.emoji}>{mood.emoji}</Text>
                <Text style={styles.label}>{mood.label}</Text>
                <Text style={styles.moodCount}>{mood.count}x</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>daily rhythm</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.scrollRow}>
              {patterns.peakHours.map((time, index) => (
                <View key={index} style={styles.timeCard}>
                  <Text style={styles.emoji}>{time.emoji}</Text>
                  <Text style={styles.timeText}>{time.time}</Text>
                  <Text style={styles.sublabel}>{time.label}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>weekly highlights</Text>
          {patterns.weeklyHighlights.map((highlight, index) => (
            <View key={index} style={styles.highlight}>
              <View style={styles.textContent}>
                <Text style={styles.highlightDay}>{highlight.day}</Text>
                <Text style={styles.sublabel}>{highlight.note}</Text>
              </View>
              <Text style={styles.emoji}>{highlight.emoji}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>mood boosters & drainers</Text>
          {patterns.activities.map((activity, index) => (
            <View key={index} style={styles.activityRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.emoji}>{activity.emoji}</Text>
                <Text style={styles.activityLabel}>{activity.label}</Text>
              </View>
              <View style={[
                styles.impactTag,
                { backgroundColor: activity.impact === 'positive' ? '#DCF7E3' : '#FFE4E4' }
              ]}>
                <Text style={[
                  styles.impactText,
                  { color: activity.impact === 'positive' ? '#059669' : '#DC2626' }
                ]}>
                  {activity.impact === 'positive' ? '+ve' : '-ve'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
