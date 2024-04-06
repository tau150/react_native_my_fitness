import { Text, StyleSheet, View } from 'react-native';

interface Props {
  item: {
    label: string, kcal: number},
}

const FoodLogListItem = ({item}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.label}</Text>
        <Text style={styles.content}>{item.kcal} cal</Text>
      </View>
    </View>
  )
}

export default FoodLogListItem


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F8',
    padding: 10,
    borderRadius: 5,
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    gap: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  content: {
    color: 'dimgray'
  }
});
