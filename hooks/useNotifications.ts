import { useEffect, useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_KEY = '@bloom:notifications_enabled';
const NOTIFICATION_ID = 'daily-vibe-check';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function useNotifications() {
  const scheduleVibeCheck = useCallback(async () => {
    // Get a random time between 10 AM and 9 PM
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0); // Start at 10 AM

    const randomMinutes = Math.floor(Math.random() * (11 * 60)); // Random minutes between 10 AM and 9 PM
    tomorrow.setMinutes(tomorrow.getMinutes() + randomMinutes);

    // Cancel any existing notifications
    await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_ID);

    // Schedule new notification
    await Notifications.scheduleNotificationAsync({
      identifier: NOTIFICATION_ID,
      content: {
        title: "time for a vibe check! ✨",
        body: "how are you feeling? tap to check in and track your mood",
        sound: true,
      },
      trigger: {
        date: tomorrow,
        repeats: true,
      },
    });
  }, []);

  const enableNotifications = useCallback(async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      return false;
    }

    await scheduleVibeCheck();
    await AsyncStorage.setItem(NOTIFICATION_KEY, 'true');
    return true;
  }, [scheduleVibeCheck]);

  const disableNotifications = useCallback(async () => {
    await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_ID);
    await AsyncStorage.setItem(NOTIFICATION_KEY, 'false');
  }, []);

  const isEnabled = useCallback(async () => {
    const enabled = await AsyncStorage.getItem(NOTIFICATION_KEY);
    return enabled === 'true';
  }, []);

  useEffect(() => {
    // Check if notifications were previously enabled
    const checkNotifications = async () => {
      const enabled = await isEnabled();
      if (enabled) {
        scheduleVibeCheck();
      }
    };

    checkNotifications();
  }, [isEnabled, scheduleVibeCheck]);

  return {
    enableNotifications,
    disableNotifications,
    isEnabled,
  };
}
