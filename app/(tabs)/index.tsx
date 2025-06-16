import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText, ThemedView } from '@/components';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <ThemedView style={styles.content}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <ThemedText type="title" style={styles.greeting}>Good Morning!</ThemedText>
          <ThemedText style={styles.subtitle}>Ready for your next adventure?</ThemedText>
        </View>

        {/* Quick Actions - Future features */}
        <View style={styles.quickActionsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Actions</ThemedText>

          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} disabled>
              <ThemedText style={styles.actionIcon}>🗺️</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.actionTitle}>Plan Trip</ThemedText>
              <ThemedText style={styles.actionSubtitle}>Coming Soon</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} disabled>
              <ThemedText style={styles.actionIcon}>🤖</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.actionTitle}>AI Assistant</ThemedText>
              <ThemedText style={styles.actionSubtitle}>Coming Soon</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} disabled>
              <ThemedText style={styles.actionIcon}>📍</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.actionTitle}>Explore Nearby</ThemedText>
              <ThemedText style={styles.actionSubtitle}>Coming Soon</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} disabled>
              <ThemedText style={styles.actionIcon}>👥</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.actionTitle}>Group Trips</ThemedText>
              <ThemedText style={styles.actionSubtitle}>Coming Soon</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity Placeholder */}
        <View style={styles.recentSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Activity</ThemedText>
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyIcon}>✈️</ThemedText>
            <ThemedText style={styles.emptyTitle}>No trips yet</ThemedText>
            <ThemedText style={styles.emptyDescription}>
              Your travel history and saved places will appear here
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60, // Account for status bar
  },
  headerSection: {
    marginBottom: 32,
  },
  greeting: {
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    opacity: 0.6, // Disabled state
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  recentSection: {
    marginBottom: 32,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 12,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 20,
  },
});
