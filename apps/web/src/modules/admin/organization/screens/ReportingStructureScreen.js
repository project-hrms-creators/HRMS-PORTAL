import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AdminLayout from '../../components/AdminLayout';
import ReportingCard from '../components/ReportingCard';
import { useDepartments } from '../hooks/useDepartments';
import SkeletonDashboard from '../../components/SkeletonDashboard';
import { ErrorMessage } from '@/shared/components/ErrorMessage';

export default function ReportingStructureScreen() {
  const { managers, isLoading, error } = useDepartments();

  return (
    <AdminLayout title="Reporting Structures">
      <ScrollView contentContainerStyle={styles.container}>
        {error ? <ErrorMessage message={error} /> : null}

        {isLoading && managers.length === 0 ? (
          <SkeletonDashboard />
        ) : (
          <View>
            <ReportingCard label="Executive Head" name="Sanjay Kumar" email="sanjay.kumar@company.com" role="VP of Engineering" />
            <View style={styles.childChain}>
              <ReportingCard label="Direct Report" name="Aarav Patel" email="aarav.patel@company.com" role="Senior Software Engineer" />
              <ReportingCard label="Direct Report" name="Vikram Singh" email="vikram.singh@company.com" role="Product Manager" />
            </View>

            <ReportingCard label="Executive Head" name="Kriti Sen" email="kriti.sen@company.com" role="VP of Human Resources" />
            <View style={styles.childChain}>
              <ReportingCard label="Direct Report" name="Priya Sharma" email="priya.sharma@company.com" role="HR Specialist" />
            </View>
          </View>
        )}
      </ScrollView>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  childChain: {
    marginLeft: 24,
    borderLeftWidth: 2,
    borderLeftColor: '#E5E7EB',
    paddingLeft: 12,
    marginBottom: 16,
  },
});
