import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';

export default function ManagerSelector({ managers = [], selectedId, onChange, label }) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.chipRow}>
        {managers.map((m) => (
          <Chip
            key={m.id}
            selected={selectedId === m.id}
            onPress={() => onChange(m.id)}
            style={styles.chip}
          >
            {m.firstName} {m.lastName}
          </Chip>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '600',
    marginBottom: 6,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#F3F4F6',
  },
});
