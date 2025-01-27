import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/theme';
import { useNotifications } from '../../hooks/useNotifications';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { enableNotifications, disableNotifications, isEnabled } = useNotifications();
  const [notificationsOn, setNotificationsOn] = useState(false);

  useEffect(() => {
    // Check initial notification state
    const checkNotificationState = async () => {
      const enabled = await isEnabled();
      setNotificationsOn(enabled);
    };
    checkNotificationState();
  }, [isEnabled]);

  const handleNotificationToggle = async (value: boolean) => {
    if (value) {
      const success = await enableNotifications();
      setNotificationsOn(success);
    } else {
      await disableNotifications();
      setNotificationsOn(false);
    }
  };

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
      marginBottom: 32,
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
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 16,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.text,
    },
    settingDescription: {
      fontSize: 14,
      color: colors.subtext,
      marginTop: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>settings</Text>
          <Text style={styles.subtitle}>customize your experience</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>Switch between light and dark themes</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Daily Vibe Check</Text>
              <Text style={styles.settingDescription}>Get a daily reminder between 10 AM - 9 PM</Text>
            </View>
            <Switch
              value={notificationsOn}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
