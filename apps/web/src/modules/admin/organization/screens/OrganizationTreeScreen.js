import React from 'react';
import { View, StyleSheet } from 'react-native';
import AdminLayout from '../../components/AdminLayout';
import { useHierarchy } from '../hooks/useHierarchy';
import OrganizationTree from '../components/OrganizationTree';
import SkeletonDashboard from '../../components/SkeletonDashboard';
import { ErrorMessage } from '@/shared/components/ErrorMessage';

export default function OrganizationTreeScreen() {
  const { hierarchy, isLoading, error } = useHierarchy();

  return (
    <AdminLayout title="Organization Hierarchy Tree">
      <View style={styles.container}>
        {error ? <ErrorMessage message={error} /> : null}

        {isLoading && !hierarchy ? (
          <SkeletonDashboard />
        ) : (
          <OrganizationTree rootNode={hierarchy} />
        )}
      </View>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
