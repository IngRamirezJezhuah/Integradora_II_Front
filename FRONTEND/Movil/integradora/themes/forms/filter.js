import { StyleSheet } from 'react-native';

export const filterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    marginBottom: 12,
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  active: {
    backgroundColor: '#DA0C15',
  },
  inactive: {
    backgroundColor: '#F0F0F0',
  },
  textActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textInactive: {
    color: '#888',
  },
});
