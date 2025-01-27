import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 8;
const GRID_PADDING = 24;
const AVAILABLE_WIDTH = SCREEN_WIDTH - (GRID_PADDING * 2);
const SMALL_CARD_WIDTH = (AVAILABLE_WIDTH - CARD_MARGIN * 2) / 2;
const LARGE_CARD_WIDTH = AVAILABLE_WIDTH;

const insights = [
  {
    title: "main character energy ",
    description: "you're crushing it! your vibe has been consistently high this week. whatever you're doing, keep that energy!",
    gradient: ['#C4B5FD', '#8B5CF6'],
    stats: "mood up 23% from last week",
    size: 'large',
    height: 200,
  },
  {
    title: "bestie check ",
    description: "noticed you've been in your feels lately. remember: it's okay to not be okay.",
    gradient: ['#93C5FD', '#3B82F6'],
    stats: "3 reflective moments today",
    size: 'small',
    height: 160,
  },
  {
    title: "productivity queen ",
    description: "your focus game is strong! you've had 5 deep work sessions this week.",
    gradient: ['#6EE7B7', '#3B82F6'],
    stats: "2 hour flow state achieved",
    size: 'small',
    height: 160,
  },
  {
    title: "spill the tea ",
    description: "your journaling streak is giving! keep documenting those thoughts, future you will thank you.",
    gradient: ['#F9A8D4', '#EC4899'],
    stats: "7 day journaling streak",
    size: 'small',
    height: 180,
  },
  {
    title: "self care > everything else ",
    description: "friendly reminder to drink water, touch grass, and take those mental health breaks. you're doing amazing!",
    gradient: ['#FDE68A', '#F59E0B'],
    stats: "2 wellness breaks today",
    size: 'small',
    height: 180,
  },
  {
    title: "vibe check passed ",
    description: "your energy has been immaculate lately! whatever playlist you're on, it's working bestie.",
    gradient: ['#A7F3D0', '#059669'],
    stats: "positive vibes up 30%",
    size: 'large',
    height: 180,
  }
];

export default function InsightsScreen() {
  const { colors, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      paddingTop: 24,
    },
    header: {
      paddingHorizontal: 24,
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
    grid: {
      paddingHorizontal: GRID_PADDING,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: CARD_MARGIN,
    },
    cardWrapper: {
      marginBottom: CARD_MARGIN,
    },
    largeCard: {
      width: LARGE_CARD_WIDTH,
    },
    smallCard: {
      width: SMALL_CARD_WIDTH,
    },
    cardContent: {
      borderRadius: 24,
      padding: 20,
      overflow: 'hidden',
      position: 'relative',
    },
    cardOverlay: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.7,
    },
    cardBody: {
      flex: 1,
      justifyContent: 'space-between',
    },
    cardHeader: {
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#fff',
      marginBottom: 8,
      textShadowColor: 'rgba(0,0,0,0.1)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    cardDescription: {
      fontSize: 14,
      color: '#fff',
      lineHeight: 20,
      textShadowColor: 'rgba(0,0,0,0.1)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    cardStats: {
      fontSize: 13,
      color: '#fff',
      fontWeight: '600',
      opacity: 0.9,
      textShadowColor: 'rgba(0,0,0,0.1)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
      marginTop: 12,
    },
    decorativeCircle: {
      position: 'absolute',
      borderRadius: 100,
      backgroundColor: 'rgba(255,255,255,0.15)',
    },
  });

  const renderCard = (insight, index) => {
    const isLarge = insight.size === 'large';
    
    return (
      <View key={index} style={[
        styles.cardWrapper,
        isLarge ? styles.largeCard : styles.smallCard,
      ]}>
        <Pressable>
          <LinearGradient
            colors={insight.gradient}
            style={[styles.cardContent, { height: insight.height }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Decorative circles */}
            <View style={[styles.decorativeCircle, {
              width: isLarge ? 120 : 80,
              height: isLarge ? 120 : 80,
              top: -20,
              right: -20,
            }]} />
            <View style={[styles.decorativeCircle, {
              width: isLarge ? 60 : 40,
              height: isLarge ? 60 : 40,
              bottom: -10,
              left: -10,
            }]} />
            
            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{insight.title}</Text>
                <Text style={styles.cardDescription}>{insight.description}</Text>
              </View>
              <Text style={styles.cardStats}>{insight.stats}</Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>your insights</Text>
          <Text style={styles.subtitle}>weekly vibe report </Text>
        </View>
        
        <View style={styles.grid}>
          {insights.map((insight, index) => renderCard(insight, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
