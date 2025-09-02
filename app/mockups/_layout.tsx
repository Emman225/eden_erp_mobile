import { Stack } from 'expo-router';

export default function MockupsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardScreen" />
      <Stack.Screen name="EventsScreen" />
      <Stack.Screen name="MediaLibraryScreen" />
      <Stack.Screen name="CommunityScreen" />
      <Stack.Screen name="TasksScreen" />
      <Stack.Screen name="ProfileScreen" />
      <Stack.Screen name="PresenceScreen" />
      <Stack.Screen name="GroupsScreen" />
      <Stack.Screen name="SupportScreen" />
      <Stack.Screen name="DonationsScreen" />
    </Stack>
  );
}