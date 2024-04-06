import {useState } from 'react';
import { StyleSheet, View, FlatList, TextInput, ActivityIndicator, Text, Button } from 'react-native';
import { gql, useLazyQuery } from "@apollo/client"
import { Ionicons } from '@expo/vector-icons';
import { Camera } from "expo-camera"
import FoodListItem from '../components/FoodListItem';

const query = gql`
  query search($ingr: String, $upc: String) {
    search(ingr: $ingr, upc: $upc) {
      hints {
        food {
          label
          nutrients {
            ENERC_KCAL
          }
          foodId
          brand
        }
      }
    }
  }
`

export default function SearchScreen() {

  const [search, setSearch] = useState('')
  const [scannerEnabled, setScannerEnabled] = useState(false)
  const [ runSearch, {data, loading, error} ] = useLazyQuery(query, {variables: {ingr: 'pizza'}})

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const performSearch = () => {
    runSearch({variables: {ingr: search}})
  }

  if(!permission?.granted){
    requestPermission()
  }

  if(error){
    return <Text>Failed to search</Text>
  }

  const items = data?.search?.hints || []

  if(scannerEnabled){
    return  (
      <View>
        <Camera style={{width: '100%', height: '100%'}} onBarCodeScanned={(data) => {
          setScannerEnabled(false)
          runSearch({variables: {upc: data.data}})
        }}/>
        <Ionicons onPress={ () => setScannerEnabled(false)} name="close" size={30} color="dimgray" style={{position: 'absolute', right: 10, top: 10}}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <TextInput style={styles.input} placeholder='Search...' value={search} onChangeText={setSearch} />
        <Ionicons onPress={ () => setScannerEnabled(true)} name="barcode-outline" size={32} color="dimgray" />
      </View>

      {search && <Button  title='Search' onPress={performSearch}/>}
      {loading && <ActivityIndicator />}
      <FlatList  ListEmptyComponent={() => <Text>Search a food</Text>   } contentContainerStyle={{gap: 5}} data={items} renderItem={({item}) => <FoodListItem item={item}/>  }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#F2F2F2',
    padding: 10,
    flex: 1,
    borderRadius: 20,
    marginBottom: 10
  }
});
