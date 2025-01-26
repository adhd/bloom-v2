# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# bloom

**Simple energy pattern tracking app that reveals optimal times for different activities. Shows the gap between perceived and actual peak performance windows.**

## Core Problem

People schedule their most important tasks based on general advice ("morning person") or guesswork, leading to suboptimal performance and unnecessary struggle.

## Solution

Peak Time helps you identify your true peak performance windows by tracking your energy levels throughout the day. It provides insights into when you're most effective and helps you optimize your schedule accordingly.

## App Structure

Peak Time features a simple and intuitive tab-based navigation:

- **Today:** Log your morning and evening energy levels, track task completion, and input contextual data using emoji trackers.
- **Patterns:** View personalized insights about your energy trends and peak performance times.
- **Optimize:** (Future) Get actionable recommendations for schedule adjustments based on your energy patterns.
- **Settings:** Customize app preferences, including dark mode, tracker selection, and notification settings.

## Tech Stack

- Frontend: React Native + Expo
- Backend: Firebase (Authentication, Firestore)
- State Management: Zustand
- UI Library: Shadcn/ui
- Charts: Recharts (if needed)

## Key Features

- Morning & Evening Check-ins: Log energy levels and task completion.
- Interactive Notifications: Seamlessly input data with minimal friction.
- Pattern Recognition: Identify energy trends by time of day, day of week, and task correlation.
- Personalized Insights: Discover your actual peak performance times vs. perceived ones.
- Emoji-based Mood Tracking: Log additional contextual data for deeper insights.
- Calendar Integration (Future): Analyze energy patterns against your schedule.

## Development Setup

1.  Clone the repository.
2.  Install dependencies: `npm install` or `yarn install`.
3.  Set up Firebase project and configure environment variables.
4.  Run the development server: `npm run start` or `yarn start`.
