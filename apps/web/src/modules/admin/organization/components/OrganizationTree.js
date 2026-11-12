import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HierarchyNode from './HierarchyNode';

export default function OrganizationTree({ rootNode }) {
  const [expandedNodes, setExpandedNodes] = useState({});

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const renderNode = (node, level = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = !!expandedNodes[node.id];

    return (
      <View key={node.id}>
        <HierarchyNode
          label={node.label}
          subtitle={node.subtitle}
          level={level}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          onPress={() => toggleNode(node.id)}
        />
        {hasChildren && isExpanded ? (
          <View style={styles.childrenContainer}>
            {node.children.map((child) => renderNode(child, level + 1))}
          </View>
        ) : null}
      </View>
    );
  };

  if (!rootNode) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderNode(rootNode)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  childrenContainer: {
    position: 'relative',
  },
});
