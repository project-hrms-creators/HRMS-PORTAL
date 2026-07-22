import React from 'react';
import { View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AdminLayout from '../../components/AdminLayout';
import QuickActionCard from '../../components/QuickActionCard';
import SummaryCard from '../../components/SummaryCard';

export default function OrganizationOverviewScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  const handleNavigate = (route) => {
    navigation.navigate(route);
  };

  return (
    <AdminLayout title="Organization Management">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.summaryRow}>
          <SummaryCard title="Total Departments" value="4" icon="domain" iconBg="#EFF6FF" iconColor="#3B82F6" />
          <SummaryCard title="Designation Ranks" value="4" icon="briefcase-outline" iconBg="#E6F4EA" iconColor="#10B981" />
          <SummaryCard title="Operational Teams" value="3" icon="account-group-outline" iconBg="#FEF7E0" iconColor="#F59E0B" />
          <SummaryCard title="Office Locations" value="3" icon="map-marker-outline" iconBg="#FCE8E6" iconColor="#EF4444" />
        </View>

        <Text style={styles.sectionTitle}>Overview Operations</Text>
        <View style={[styles.grid, isLargeScreen && styles.gridLarge]}>
          <QuickActionCard label="Department Directory" icon="domain" onPress={() => handleNavigate('AdminDepartmentDirectory')} />
          <QuickActionCard label="Designation Ranks" icon="briefcase" onPress={() => handleNavigate('AdminDesignationDirectory')} />
          <QuickActionCard label="Operational Teams" icon="account-group" onPress={() => handleNavigate('AdminTeamDirectory')} />
          <QuickActionCard label="Office Locations" icon="map-marker" onPress={() => handleNavigate('AdminLocationDirectory')} />
          <QuickActionCard label="Organization Tree" icon="sitemap" onPress={() => handleNavigate('AdminOrganizationTree')} />
          <QuickActionCard label="Reporting Structure" icon="relation-many-to-many" onPress={() => handleNavigate('AdminReportingStructure')} />
        </View>
      </ScrollView>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'column',
    gap: 12,
  },
  gridLarge: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
