import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeContext';

export default function ScreenLayout({ children, title, headerRight, headerLeft }) {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {title && (
        <View style={styles.header}>
          {headerLeft && <View style={styles.headerLeft}>{headerLeft}</View>}
          <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
          {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 2, // Ensures title remains centered
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8, // Space between header and content
  },
});
