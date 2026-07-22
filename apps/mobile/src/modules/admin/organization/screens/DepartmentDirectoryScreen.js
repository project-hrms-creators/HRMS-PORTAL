import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AdminLayout from '../../components/AdminLayout';
import { useDepartments } from '../hooks/useDepartments';
import DepartmentCard from '../components/DepartmentCard';
import OrganizationSearch from '../components/OrganizationSearch';
import OrganizationFilter from '../components/OrganizationFilter';
import SkeletonDashboard from '../../components/SkeletonDashboard';
import { useAuthorization } from '@/core/rbac/hooks/useAuthorization';
import { ErrorMessage } from '@/shared/components/ErrorMessage';

export default function DepartmentDirectoryScreen() {
  const navigation = useNavigation();
  const { hasPermission } = useAuthorization();
  const { departments, isLoading, error, filters, setFilters } = useDepartments();

  const handlePressItem = (id) => {
    navigation.navigate('AdminDepartmentDetails', { id });
  };

  const handleCreate = () => {
    navigation.navigate('AdminDepartmentForm');
  };

  const statusOptions = [
    { id: 'all', label: 'All Statuses' },
    { id: 'ACTIVE', label: 'Active' },
    { id: 'ARCHIVED', label: 'Archived' },
  ];

  const canCreate = hasPermission('CREATE_DEPARTMENT');

  return (
    <AdminLayout title="Departments">
      <View style={styles.container}>
        {error ? <ErrorMessage message={error} /> : null}

        <OrganizationSearch
          placeholder="Search departments by name or code..."
          value={filters.search}
          onChangeText={(search) => setFilters({ search })}
          onClear={() => setFilters({ search: '' })}
        />

        <OrganizationFilter
          label="Filter Status"
          selected={filters.status}
          onChange={(status) => setFilters({ status })}
          options={statusOptions}
        />

        {isLoading && departments.length === 0 ? (
          <SkeletonDashboard />
        ) : (
          <FlatList
            data={departments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DepartmentCard department={item} onPress={() => handlePressItem(item.id)} />
            )}
            contentContainerStyle={styles.list}
          />
        )}

        {canCreate ? (
          <FAB icon="plus" label="Add Department" style={styles.fab} color="#FFFFFF" onPress={handleCreate} />
        ) : null}
      </View>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#3B82F6',
  },
});
