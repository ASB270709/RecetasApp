
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const App = () => {
  const [term, setTerm] = useState('');
  const [recipes] = useState([]);
  const [selectedRecipe] = useState(null);

  const API_KEY = '9c7b888b98e74dc583a5c83d8fd1b65b'; 

  const searchRecipes = async () => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${term}`);
      //Para comprobar las recetas recibidas atraves de la consola
      /*console.log('Response Data:', response.data); 
      setRecipes(response.data.results);*/
    } catch (error) {
      console.error('Error:', error); 
    }
  };

  const getRecipeDetails = async (id) => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
     //Para comprobar los datos que llegan de la consulta
     /* console.log('Detalles:', response.data); 
      setSelectedRecipe(response.data);*/
    } catch (error) {
      console.error('Error:', error); 
    }
  };
  
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 50, backgroundColor: 'gray' }}
        value={term}
        onChangeText={setTerm}
        placeholder="Buscar recetas (Solo en Inglés)"
      />
      <Button
        title="Buscar"
        onPress={searchRecipes}
      />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 18 }} onPress={() => getRecipeDetails(item.id)}>{item.title}</Text>
          </View>
        )}
      />
      {selectedRecipe && (
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', borderColor:'gray', borderWidth: 1 }}>{selectedRecipe.title}</Text>
          <Text style={{ fontSize: 16, borderColor:'gray', borderWidth: 1 }}>Ingredientes:</Text>
          {selectedRecipe.extendedIngredients.map((ingredient, index) => (
            <Text key={index}>{ingredient.original}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default App;
