import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';

export default function ReportingCard({ label, name, email, role }) {
  const initials = name ? `${name.charAt(0)}` : '?';

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Avatar.Text size={36} label={initials.toUpperCase()} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.name}>{name}</Text>
          {email ? <Text style={styles.email}>{email}</Text> : null}
          {role ? <Text style={styles.role}>{role}</Text> : null}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 0,
    marginBottom: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    backgroundColor: '#3B82F6',
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 2,
  },
  email: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 1,
  },
  role: {
    fontSize: 11,
    color: '#4B5563',
    marginTop: 1,
  },
});
