import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  const API_KEY = '9c7b888b98e74dc583a5c83d8fd1b65b'

  const searchRecipes = async () => {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${API_KEY}`);
    const data = await response.json();
    setRecipes(data.results);
  };
  

  return (
    <View>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Buscar recetas"
      />
      <Button title="Buscar" onPress={searchRecipes} />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            {}
          </View>
        )}
      />
    </View>
  );
};

export default App;
