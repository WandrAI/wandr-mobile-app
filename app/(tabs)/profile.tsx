import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'tamagui';
import { StyledView, StyledText, IconSymbol } from '@/components';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <StyledView style={styles.content}>
        {/* Header Section */}
        <StyledView style={styles.headerSection}>
          <StyledView style={styles.avatarContainer}>
            <StyledText style={styles.avatarText}>🧳</StyledText>
          </StyledView>
          <StyledText type="title" style={styles.userName}>Travel Explorer</StyledText>
          <StyledText style={styles.userSubtitle}>Ready for your next adventure</StyledText>
        </StyledView>

        {/* Travel Stats */}
        <StyledView style={styles.statsSection}>
          <StyledText type="subtitle" style={styles.sectionTitle}>Travel Stats</StyledText>
          <StyledView style={styles.statsGrid}>
            <StyledView style={styles.statCard}>
              <StyledText style={styles.statNumber}>0</StyledText>
              <StyledText style={styles.statLabel}>Countries</StyledText>
            </StyledView>
            <StyledView style={styles.statCard}>
              <StyledText style={styles.statNumber}>0</StyledText>
              <StyledText style={styles.statLabel}>Cities</StyledText>
            </StyledView>
            <StyledView style={styles.statCard}>
              <StyledText style={styles.statNumber}>0</StyledText>
              <StyledText style={styles.statLabel}>Trips</StyledText>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Settings Menu */}
        <StyledView style={styles.menuSection}>
          <StyledText type="subtitle" style={styles.sectionTitle}>Settings</StyledText>
          
          <TouchableOpacity style={styles.menuItem} disabled>
            <StyledView style={styles.menuItemContent}>
              <StyledText style={styles.menuIcon}>✈️</StyledText>
              <StyledView style={styles.menuItemText}>
                <StyledText type="defaultSemiBold">Travel Preferences</StyledText>
                <StyledText style={styles.menuItemSubtitle}>Destinations, activities, budget</StyledText>
              </StyledView>
            </StyledView>
            <StyledText style={styles.comingSoon}>Coming Soon</StyledText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} disabled>
            <StyledView style={styles.menuItemContent}>
              <StyledText style={styles.menuIcon}>🔔</StyledText>
              <StyledView style={styles.menuItemText}>
                <StyledText type="defaultSemiBold">Notifications</StyledText>
                <StyledText style={styles.menuItemSubtitle}>Travel alerts and updates</StyledText>
              </StyledView>
            </StyledView>
            <StyledText style={styles.comingSoon}>Coming Soon</StyledText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} disabled>
            <StyledView style={styles.menuItemContent}>
              <StyledText style={styles.menuIcon}>🌍</StyledText>
              <StyledView style={styles.menuItemText}>
                <StyledText type="defaultSemiBold">Language & Region</StyledText>
                <StyledText style={styles.menuItemSubtitle}>Localization settings</StyledText>
              </StyledView>
            </StyledView>
            <StyledText style={styles.comingSoon}>Coming Soon</StyledText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} disabled>
            <StyledView style={styles.menuItemContent}>
              <StyledText style={styles.menuIcon}>🔒</StyledText>
              <StyledView style={styles.menuItemText}>
                <StyledText type="defaultSemiBold">Privacy & Security</StyledText>
                <StyledText style={styles.menuItemSubtitle}>Account protection</StyledText>
              </StyledView>
            </StyledView>
            <StyledText style={styles.comingSoon}>Coming Soon</StyledText>
          </TouchableOpacity>
        </StyledView>

        {/* App Info */}
        <StyledView style={styles.infoSection}>
          <StyledText style={styles.appVersion}>Wandr v1.0.0</StyledText>
          <StyledText style={styles.buildInfo}>Build: Phase 1 Foundation</StyledText>
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
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  userName: {
    fontSize: 24,
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  menuSection: {
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
    borderRadius: 12,
    marginBottom: 8,
    opacity: 0.6, // Disabled state
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  menuItemText: {
    flex: 1,
  },
  menuItemSubtitle: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  comingSoon: {
    fontSize: 12,
    opacity: 0.5,
    fontStyle: 'italic',
  },
  infoSection: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  appVersion: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  buildInfo: {
    fontSize: 12,
    opacity: 0.6,
  },
}); 