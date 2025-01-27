import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { Link, useRouter } from 'expo-router';
import { useTheme } from '../context/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 64;
const MIDDLE_BUTTON_SIZE = 44;
const CURVE_HEIGHT = 16;

function TabBarBackground({ isDark, colors }) {
  return (
    <View style={[styles.svgContainer, { backgroundColor: colors.background }]}>
      <Svg
        width={SCREEN_WIDTH}
        height={TAB_BAR_HEIGHT + CURVE_HEIGHT}
        style={styles.svg}
      >
        <Path
          d={`
            M 0 ${TAB_BAR_HEIGHT + CURVE_HEIGHT}
            L 0 ${CURVE_HEIGHT}
            C ${SCREEN_WIDTH * 0.1} ${CURVE_HEIGHT * 0.5}, ${SCREEN_WIDTH * 0.3} 0, ${SCREEN_WIDTH * 0.4} 0
            L ${SCREEN_WIDTH * 0.6} 0
            C ${SCREEN_WIDTH * 0.7} 0, ${SCREEN_WIDTH * 0.9} ${CURVE_HEIGHT * 0.5}, ${SCREEN_WIDTH} ${CURVE_HEIGHT}
            L ${SCREEN_WIDTH} ${TAB_BAR_HEIGHT + CURVE_HEIGHT}
            Z
          `}
          fill={isDark ? colors.card : "rgba(255, 255, 255, 0.98)"}
        />
      </Svg>
    </View>
  );
}

function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors, isDark } = useTheme();
  
  const getIcon = (routeName: string, isFocused: boolean) => {
    const icons = {
      history: 'clock-outline',
      patterns: 'chart-box-outline',
      insights: 'compass-outline',
      settings: 'cog',
    };
    
    return icons[routeName] || 'help-circle-outline';
  };

  const renderTab = (route, index) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel || options.title || route.name;
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        router.push(route.name);
      }
    };

    if (index === 2) { // Center tab
      return (
        <Pressable
          key={route.key}
          onPress={onPress}
          style={styles.tab}
        >
          <Text style={[styles.centerEmoji, { color: isFocused ? colors.primary : colors.subtext }]}>✨</Text>
        </Pressable>
      );
    }

    return (
      <Pressable
        key={route.key}
        onPress={onPress}
        style={styles.tab}
      >
        <MaterialCommunityIcons
          name={getIcon(route.name, isFocused)}
          size={24}
          color={isFocused ? colors.primary : colors.subtext}
        />
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <TabBarBackground isDark={isDark} colors={colors} />
      <View style={styles.content}>
        {state.routes.map((route, index) => renderTab(route, index))}
      </View>
    </View>
  );
}

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="history" />
      <Tabs.Screen name="patterns" />
      <Tabs.Screen name="mood" />
      <Tabs.Screen name="insights" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    height: TAB_BAR_HEIGHT + CURVE_HEIGHT,
    position: 'relative',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  svg: {
    position: 'absolute',
    bottom: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: TAB_BAR_HEIGHT,
    paddingHorizontal: 16,
    position: 'relative',
    zIndex: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: TAB_BAR_HEIGHT,
  },
  centerEmoji: {
    fontSize: 24,
  },
});
