import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button, Text, Chip } from 'react-native-paper';
import AdminLayout from '../../components/AdminLayout';
import { departmentSchema } from '../validation/orgSchema';
import { useDepartments } from '../hooks/useDepartments';
import { useOrganization } from '../hooks/useOrganization';
import { TextInput } from '@/shared/components/TextInput';
import SkeletonDashboard from '../../components/SkeletonDashboard';
import { ErrorMessage } from '@/shared/components/ErrorMessage';

export default function DepartmentFormScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {};

  const isEditMode = !!id;
  const { department, isLoading: isFetching, managers, departments } = useDepartments(id);
  const { saveDepartment, isLoading: isSaving, error } = useOrganization();

  const defaultValues = {
    name: '',
    code: '',
    description: '',
    managerId: '',
    parentDepartmentId: '',
    status: 'ACTIVE',
  };

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isEditMode && department) {
      reset({
        name: department.name,
        code: department.code,
        description: department.description || '',
        managerId: department.managerId || '',
        parentDepartmentId: department.parentDepartmentId || '',
        status: department.status || 'ACTIVE',
      });
    }
  }, [isEditMode, department, reset]);

  const onSubmit = async (values) => {
    try {
      await saveDepartment(id, values);
      navigation.navigate('AdminDepartmentDirectory');
    } catch {
      // Handled in store
    }
  };

  if (isFetching && !department) {
    return (
      <AdminLayout title={isEditMode ? 'Edit Department' : 'Add Department'}>
        <SkeletonDashboard />
      </AdminLayout>
    );
  }

  const statuses = [
    { id: 'ACTIVE', label: 'Active' },
    { id: 'ARCHIVED', label: 'Archived' },
  ];

  return (
    <AdminLayout title={isEditMode ? 'Edit Department' : 'Add Department'}>
      <ScrollView contentContainerStyle={styles.container}>
        {error ? <ErrorMessage message={error} /> : null}

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput label="Department Name" value={value} onChangeText={onChange} error={errors.name?.message} />
          )}
        />

        <Controller
          control={control}
          name="code"
          render={({ field: { onChange, value } }) => (
            <TextInput label="Department Code" value={value} onChangeText={onChange} error={errors.code?.message} autoCapitalize="characters" />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextInput label="Description" value={value} onChangeText={onChange} error={errors.description?.message} />
          )}
        />

        <Text style={styles.fieldLabel}>Department Head</Text>
        <Controller
          control={control}
          name="managerId"
          render={({ field: { onChange, value } }) => (
            <View style={styles.chipRow}>
              <Chip selected={value === ''} onPress={() => onChange('')} style={styles.chip}>
                Unassigned
              </Chip>
              {managers.map((m) => (
                <Chip key={m.id} selected={value === m.id} onPress={() => onChange(m.id)} style={styles.chip}>
                  {m.firstName} {m.lastName}
                </Chip>
              ))}
            </View>
          )}
        />

        <Text style={styles.fieldLabel}>Parent Department</Text>
        <Controller
          control={control}
          name="parentDepartmentId"
          render={({ field: { onChange, value } }) => (
            <View style={styles.chipRow}>
              <Chip selected={value === ''} onPress={() => onChange('')} style={styles.chip}>
                None
              </Chip>
              {departments
                .filter((d) => d.id !== id)
                .map((d) => (
                  <Chip key={d.id} selected={value === d.id} onPress={() => onChange(d.id)} style={styles.chip}>
                    {d.name}
                  </Chip>
                ))}
            </View>
          )}
        />

        {isEditMode ? (
          <>
            <Text style={styles.fieldLabel}>Status</Text>
            <Controller
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => (
                <View style={styles.chipRow}>
                  {statuses.map((s) => (
                    <Chip key={s.id} selected={value === s.id} onPress={() => onChange(s.id)} style={styles.chip}>
                      {s.label}
                    </Chip>
                  ))}
                </View>
              )}
            />
            {errors.status ? <Text style={styles.errorText}>{errors.status.message}</Text> : null}
          </>
        ) : null}

        <Button mode="contained" onPress={handleSubmit(onSubmit)} loading={isSaving} style={styles.submitButton}>
          Save Department
        </Button>
      </ScrollView>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  fieldLabel: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  chip: {
    backgroundColor: '#F3F4F6',
  },
  errorText: {
    fontSize: 11,
    color: '#EF4444',
    marginTop: 4,
    fontWeight: '500',
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: '#3B82F6',
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 32,
  },
});
