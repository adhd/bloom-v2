import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/theme';

// Group timeline data by date
const timelineData = {
  'today': [
    {
      time: '2:30 PM',
      title: 'Afternoon Focus',
      description: 'Deep work session on the project',
      icon: '⚡️',
    },
    {
      time: '11:30 AM',
      title: 'Team Sync',
      description: 'Great collaboration with the team',
      icon: '🤝',
    },
    {
      time: '9:00 AM',
      title: 'Morning Check-in',
      description: 'Feeling energized after meditation',
      icon: '✨',
    },
  ],
  'yesterday': [
    {
      time: '4:30 PM',
      title: 'Evening Reflection',
      description: 'Wrapped up tasks for the day',
      icon: '😌',
    },
    {
      time: '1:00 PM',
      title: 'Lunch Break',
      description: 'Recharging with good food',
      icon: '🔋',
    },
  ],
  'friday': [
    {
      time: '3:00 PM',
      title: 'Creative Session',
      description: 'Brainstorming new ideas',
      icon: '💡',
    },
  ],
};

export default function HistoryScreen() {
  const { colors, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      padding: 24,
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
    },
    dateHeader: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 16,
      marginTop: 24,
    },
    timelineGroup: {
      marginBottom: 8,
    },
    timelineItem: {
      flexDirection: 'row',
      marginBottom: 24,
    },
    timeColumn: {
      width: 64,
      alignItems: 'center',
    },
    time: {
      fontSize: 14,
      color: colors.subtext,
      marginBottom: 4,
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.primary,
      marginVertical: 4,
    },
    line: {
      width: 2,
      flex: 1,
      backgroundColor: colors.border,
      alignSelf: 'center',
    },
    card: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginLeft: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.subtext,
      lineHeight: 20,
    },
    moodIcon: {
      position: 'absolute',
      top: 16,
      right: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>your timeline</Text>
          <Text style={styles.subtitle}>track your daily vibes</Text>
        </View>

        {Object.entries(timelineData).map(([date, items], dateIndex) => (
          <View key={date} style={styles.timelineGroup}>
            <Text style={styles.dateHeader}>{date}</Text>
            {items.map((item, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timeColumn}>
                  <Text style={styles.time}>{item.time}</Text>
                  <View style={styles.dot} />
                  {index < items.length - 1 && <View style={styles.line} />}
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                  <Text style={styles.moodIcon}>{item.icon}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
