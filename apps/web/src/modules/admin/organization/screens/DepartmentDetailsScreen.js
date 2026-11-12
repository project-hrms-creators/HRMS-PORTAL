import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import AdminLayout from '../../components/AdminLayout';
import { useDepartments } from '../hooks/useDepartments';
import EmployeeInfoSection from '../../employee-management/components/EmployeeInfoSection';
import SkeletonDashboard from '../../components/SkeletonDashboard';
import { useAuthorization } from '@/core/rbac/hooks/useAuthorization';
import { ErrorMessage } from '@/shared/components/ErrorMessage';

export default function DepartmentDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {};

  const { department, isLoading, error, managers } = useDepartments(id);
  const { hasPermission } = useAuthorization();

  if (isLoading && !department) {
    return (
      <AdminLayout title="Department Details">
        <SkeletonDashboard />
      </AdminLayout>
    );
  }

  if (error || !department) {
    return (
      <AdminLayout title="Department Details">
        <ErrorMessage message={error || 'Department not found.'} />
      </AdminLayout>
    );
  }

  const manager = managers.find((m) => m.id === department.managerId);

  const deptData = [
    { label: 'Department Name', value: department.name },
    { label: 'Department Code', value: department.code },
    { label: 'Description', value: department.description },
    { label: 'Status', value: department.status },
    { label: 'Department Head', value: manager ? `${manager.firstName} ${manager.lastName}` : 'Unassigned' },
  ];

  const handleEdit = () => {
    navigation.navigate('AdminDepartmentForm', { id: department.id });
  };

  const canEdit = hasPermission('UPDATE_DEPARTMENT');

  return (
    <AdminLayout title={department.name}>
      <ScrollView contentContainerStyle={styles.container}>
        <EmployeeInfoSection title="Department Master Record" data={deptData} />

        {canEdit ? (
          <Button mode="contained" icon="pencil" onPress={handleEdit} style={styles.button}>
            Edit Department
          </Button>
        ) : null}
      </ScrollView>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    backgroundColor: '#3B82F6',
    marginTop: 16,
  },
});
