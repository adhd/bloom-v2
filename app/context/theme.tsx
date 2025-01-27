import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export const colors = {
  light: {
    background: '#fafafa',
    card: '#ffffff',
    text: '#1F2937',
    subtext: '#6B7280',
    primary: '#7C3AED',
    primaryLight: '#A78BFA',
    border: '#E2E8F0',
    switch: {
      track: {
        active: '#A78BFA',
        inactive: '#CBD5E1',
      },
      thumb: {
        active: '#7C3AED',
        inactive: '#F8FAFC',
      }
    }
  },
  dark: {
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    subtext: '#9CA3AF',
    primary: '#A78BFA',
    primaryLight: '#7C3AED',
    border: '#374151',
    switch: {
      track: {
        active: '#7C3AED',
        inactive: '#4B5563',
      },
      thumb: {
        active: '#A78BFA',
        inactive: '#9CA3AF',
      }
    }
  }
};

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof colors.light;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    // Load saved theme preference
    AsyncStorage.getItem('theme').then(theme => {
      if (theme) {
        setIsDark(theme === 'dark');
      }
    });
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    AsyncStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const value = {
    isDark,
    toggleTheme,
    colors: isDark ? colors.dark : colors.light,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
