import { Text, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { gql, useMutation } from "@apollo/client";
import { useRouter } from 'expo-router';


interface Props {
  item: {
    food : { label: string, brand: string, nutrients: { ENERC_KCAL: number } },
  }
}

const mutation = gql`
  mutation MyMutation(
    $food_id: String!
    $kcal: Int!
    $label: String!
    $user_id: String!
  ) {
    insertFood_log(
      food_id: $food_id
      kcal: $kcal
      label: $label
      user_id: $user_id
    ) {
      created_at
      food_id
      id
      kcal
      label
      user_id
    }
  }
`

const FoodListItem = ({item}: Props) => {
  const router = useRouter()
  const [logFood] = useMutation(mutation, {
    refetchQueries: ['foodLogsByDate']
  })

  const onPlusPress = () => {
    logFood({
      variables: {
        food_id: item.food.label,
        kcal: item.food.nutrients.ENERC_KCAL,
        label: item.food.label,
        user_id: 'santi'
      }
    })

    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.food.label}</Text>
        <Text style={styles.content}>{item.food.nutrients.ENERC_KCAL} cal, {item.food.brand}</Text>
      </View>
      <AntDesign name="pluscircleo" size={24} color="royalblue" onPress={onPlusPress} />
    </View>
  )
}

export default FoodListItem

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
