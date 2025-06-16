import { StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';

import { StyledText, StyledView } from '@/components';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <StyledView style={styles.content}>
        {/* Header Section */}
        <StyledView style={styles.headerSection}>
          <StyledText type="title" style={styles.greeting}>Good Morning!</StyledText>
          <StyledText style={styles.subtitle}>Ready for your next adventure?</StyledText>
        </StyledView>

        {/* Quick Actions - Future features */}
        <StyledView style={styles.quickActionsSection}>
          <StyledText type="subtitle" style={styles.sectionTitle}>Quick Actions</StyledText>

          <StyledView style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} disabled>
              <StyledText style={styles.actionIcon}>🗺️</StyledText>
              <StyledText type="defaultSemiBold" style={styles.actionTitle}>Plan Trip</StyledText>
              <StyledText style={styles.actionSubtitle}>Phase 2</StyledText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, styles.activeCard]} 
              onPress={() => router.push('/ai')}
            >
              <StyledText style={styles.actionIcon}>🤖</StyledText>
              <StyledText type="defaultSemiBold" style={styles.actionTitle}>AI Assistant</StyledText>
              <StyledText style={styles.actionSubtitle}>Explore Preview</StyledText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} disabled>
              <StyledText style={styles.actionIcon}>📍</StyledText>
              <StyledText type="defaultSemiBold" style={styles.actionTitle}>Explore Nearby</StyledText>
              <StyledText style={styles.actionSubtitle}>Phase 2</StyledText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, styles.activeCard]} 
              onPress={() => router.push('/social')}
            >
              <StyledText style={styles.actionIcon}>👥</StyledText>
              <StyledText type="defaultSemiBold" style={styles.actionTitle}>Group Trips</StyledText>
              <StyledText style={styles.actionSubtitle}>Explore Preview</StyledText>
            </TouchableOpacity>
          </StyledView>
        </StyledView>

        {/* Recent Activity Placeholder */}
        <StyledView style={styles.recentSection}>
          <StyledText type="subtitle" style={styles.sectionTitle}>Recent Activity</StyledText>
          <StyledView style={styles.emptyState}>
            <StyledText style={styles.emptyIcon}>✈️</StyledText>
            <StyledText style={styles.emptyTitle}>No trips yet</StyledText>
            <StyledText style={styles.emptyDescription}>
              Your travel history and saved places will appear here
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
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
  activeCard: {
    opacity: 1, // Active state
    backgroundColor: 'rgba(0, 122, 255, 0.15)',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
    lineHeight: 30, // Explicit line height to prevent top clipping
    textAlignVertical: 'center', // Center icon vertically
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
    lineHeight: 40, // Explicit line height to prevent top clipping
    textAlignVertical: 'center', // Center icon vertically
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
