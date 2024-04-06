import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native'
import { Link } from 'expo-router'
import { gql, useQuery } from "@apollo/client"
import dayjs from "dayjs"
import FoodLogListItem from '../components/FoodLogListItem'

const query = gql`
  query foodLogsByDate($date: Date!, $user_id: String!) {
    foodLogsByDate(date: $date, user_id: $user_id) {
      food_id
      user_id
      created_at
      label
      kcal
      id
    }
  }
`

export default function HomeScreen(){

  const { data, loading, error } = useQuery(query, {variables : { date: dayjs().format('YYYY-MM-DD'), user_id: "santi"}})

  if(loading){
    return <ActivityIndicator />
  }

  if(error){
    return <Text>Failed to fetch data</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>Calories</Text>
        <Text> 1770 - 360 = 1692</Text>
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>Today's logged food</Text>
        <Link href="/search" asChild>
          <Button title='ADD FOOD' />
        </Link>
      </View>
      <FlatList
        data={data.foodLogsByDate}
        contentContainerStyle={{gap: 5}}
        renderItem={({item}) => <FoodLogListItem item={item}/> }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    gap: 10
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'dimgray'
  }
});