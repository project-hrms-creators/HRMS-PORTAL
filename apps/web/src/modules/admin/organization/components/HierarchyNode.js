import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Avatar } from 'react-native-paper';

export default function HierarchyNode({ label, subtitle, level = 0, hasChildren, isExpanded, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.container, { marginLeft: level * 16 }]}
      onPress={onPress}
      disabled={!hasChildren}
    >
      <View style={styles.lineIndicator}>
        {level > 0 ? <View style={styles.horizontalLine} /> : null}
      </View>
      <View style={styles.card}>
        {hasChildren ? (
          <Avatar.Icon
            size={24}
            icon={isExpanded ? 'chevron-down' : 'chevron-right'}
            style={styles.chevron}
            color="#4B5563"
          />
        ) : (
          <View style={styles.dot} />
        )}
        <View style={styles.info}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  lineIndicator: {
    width: 12,
    alignItems: 'flex-start',
  },
  horizontalLine: {
    width: 12,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 8,
    flex: 1,
  },
  chevron: {
    backgroundColor: 'transparent',
    marginRight: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
    marginLeft: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
});
