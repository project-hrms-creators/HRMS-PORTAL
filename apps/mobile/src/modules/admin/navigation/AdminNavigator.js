import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../dashboard/DashboardScreen';
import {
  AdminAttendance,
  AdminLeave,
  AdminReports,
  AdminAnnouncements,
  AdminSettings,
} from '../screens/Placeholders';
import EmployeeDirectoryScreen from '../employee-management/screens/EmployeeDirectoryScreen';
import EmployeeDetailsScreen from '../employee-management/screens/EmployeeDetailsScreen';
import AddEmployeeScreen from '../employee-management/screens/AddEmployeeScreen';
import EditEmployeeScreen from '../employee-management/screens/EditEmployeeScreen';
import OrganizationOverviewScreen from '../organization/screens/OrganizationOverviewScreen';
import DepartmentDirectoryScreen from '../organization/screens/DepartmentDirectoryScreen';
import DepartmentDetailsScreen from '../organization/screens/DepartmentDetailsScreen';
import DepartmentFormScreen from '../organization/screens/DepartmentFormScreen';
import DesignationDirectoryScreen from '../organization/screens/DesignationDirectoryScreen';
import DesignationDetailsScreen from '../organization/screens/DesignationDetailsScreen';
import DesignationFormScreen from '../organization/screens/DesignationFormScreen';
import TeamDirectoryScreen from '../organization/screens/TeamDirectoryScreen';
import LocationDirectoryScreen from '../organization/screens/LocationDirectoryScreen';
import OrganizationTreeScreen from '../organization/screens/OrganizationTreeScreen';
import ReportingStructureScreen from '../organization/screens/ReportingStructureScreen';
import { PermissionGuard } from '@/core/rbac/guards/PermissionGuard';

const Stack = createNativeStackNavigator();

const ProtectedEmployeeDirectory = () => (
  <PermissionGuard requiredPermissions="VIEW_EMPLOYEE">
    <EmployeeDirectoryScreen />
  </PermissionGuard>
);

const ProtectedEmployeeDetails = () => (
  <PermissionGuard requiredPermissions="VIEW_EMPLOYEE">
    <EmployeeDetailsScreen />
  </PermissionGuard>
);

const ProtectedAddEmployee = () => (
  <PermissionGuard requiredPermissions="CREATE_EMPLOYEE">
    <AddEmployeeScreen />
  </PermissionGuard>
);

const ProtectedEditEmployee = () => (
  <PermissionGuard requiredPermissions="UPDATE_EMPLOYEE">
    <EditEmployeeScreen />
  </PermissionGuard>
);

const ProtectedOrgOverview = () => (
  <PermissionGuard requiredPermissions="VIEW_DEPARTMENTS">
    <OrganizationOverviewScreen />
  </PermissionGuard>
);

const ProtectedDeptDirectory = () => (
  <PermissionGuard requiredPermissions="VIEW_DEPARTMENTS">
    <DepartmentDirectoryScreen />
  </PermissionGuard>
);

const ProtectedDeptDetails = () => (
  <PermissionGuard requiredPermissions="VIEW_DEPARTMENTS">
    <DepartmentDetailsScreen />
  </PermissionGuard>
);

const ProtectedDeptForm = () => (
  <PermissionGuard requiredPermissions="CREATE_DEPARTMENT">
    <DepartmentFormScreen />
  </PermissionGuard>
);

const ProtectedDesigDirectory = () => (
  <PermissionGuard requiredPermissions="VIEW_DESIGNATIONS">
    <DesignationDirectoryScreen />
  </PermissionGuard>
);

const ProtectedDesigDetails = () => (
  <PermissionGuard requiredPermissions="VIEW_DESIGNATIONS">
    <DesignationDetailsScreen />
  </PermissionGuard>
);

const ProtectedDesigForm = () => (
  <PermissionGuard requiredPermissions="CREATE_DESIGNATION">
    <DesignationFormScreen />
  </PermissionGuard>
);

const ProtectedTeamDirectory = () => (
  <PermissionGuard requiredPermissions="VIEW_DEPARTMENTS">
    <TeamDirectoryScreen />
  </PermissionGuard>
);

const ProtectedLocationDirectory = () => (
  <PermissionGuard requiredPermissions="VIEW_DEPARTMENTS">
    <LocationDirectoryScreen />
  </PermissionGuard>
);

const ProtectedOrgTree = () => (
  <PermissionGuard requiredPermissions="VIEW_DEPARTMENTS">
    <OrganizationTreeScreen />
  </PermissionGuard>
);

const ProtectedReportingStructure = () => (
  <PermissionGuard requiredPermissions="VIEW_DEPARTMENTS">
    <ReportingStructureScreen />
  </PermissionGuard>
);

export default function AdminNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminDashboard" component={DashboardScreen} />
      <Stack.Screen name="AdminEmployeeManagement" component={ProtectedEmployeeDirectory} />
      <Stack.Screen name="AdminEmployeeDetails" component={ProtectedEmployeeDetails} />
      <Stack.Screen name="AdminAddEmployee" component={ProtectedAddEmployee} />
      <Stack.Screen name="AdminEditEmployee" component={ProtectedEditEmployee} />

      <Stack.Screen name="AdminDepartments" component={ProtectedOrgOverview} />
      <Stack.Screen name="AdminDepartmentDirectory" component={ProtectedDeptDirectory} />
      <Stack.Screen name="AdminDepartmentDetails" component={ProtectedDeptDetails} />
      <Stack.Screen name="AdminDepartmentForm" component={ProtectedDeptForm} />
      <Stack.Screen name="AdminDesignationDirectory" component={ProtectedDesigDirectory} />
      <Stack.Screen name="AdminDesignationDetails" component={ProtectedDesigDetails} />
      <Stack.Screen name="AdminDesignationForm" component={ProtectedDesigForm} />
      <Stack.Screen name="AdminTeamDirectory" component={ProtectedTeamDirectory} />
      <Stack.Screen name="AdminLocationDirectory" component={ProtectedLocationDirectory} />
      <Stack.Screen name="AdminOrganizationTree" component={ProtectedOrgTree} />
      <Stack.Screen name="AdminReportingStructure" component={ProtectedReportingStructure} />

      <Stack.Screen name="AdminAttendance" component={AdminAttendance} />
      <Stack.Screen name="AdminLeave" component={AdminLeave} />
      <Stack.Screen name="AdminReports" component={AdminReports} />
      <Stack.Screen name="AdminAnnouncements" component={AdminAnnouncements} />
      <Stack.Screen name="AdminSettings" component={AdminSettings} />
    </Stack.Navigator>
  );
}
