import React, {useEffect, useState} from "react"; 
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "b4fcc1ef";
  const APP_KEY = "1ab95ad0d60a68dacbc5ae6e6c93a00b";

  //create a state set it to an array of objects
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');//only when we hit search then can we search for data

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    //access the target from this event
    setSearch(e.target.value);
    //console.log(search);
  }
  //search on the form submit
  const getSearch = e => {
    e.preventDefault(); //stop the page refresh
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      
        <form onSubmit={getSearch} className="seach-form">
          <input 
          className="search-bar" 
          type="text" 
          value={search} 
          onChange = {updateSearch} 
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>

        <div className={recipes}>
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
        </div>
      
    </div>
  );
};


export default App;
