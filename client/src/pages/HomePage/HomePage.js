import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import RecipeCard from "../../components/RecipeCard/RecipeCard";
import homeStyle from "./HomePage.module.css";
import recipeBrowserStyle from "../../commonStyles/RecipeBrowser.module.css";

const HomePage = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const [recipes, setRecipes] = useState([]);
  const [recipesLoaded, setRecipesLoaded] = useState(false);

  useEffect(() => {
    const getFeaturedRecipes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/api/recipes`,
        {
          credentials: "include",
        }
      );

      setRecipes(await response.json());
      setRecipesLoaded(true);
    };

    getFeaturedRecipes();
  }, []);

  const searchRecipes = (data) => {
    history.push(`/search?query=${data.query}`);
  };

  return (
    <div>
      <h1 className={homeStyle.font}>welcome to recipedia!</h1>

      <section className={homeStyle.homeSection}>
        <h2 className={`text-left ${homeStyle.font}`} >search recipes</h2>
        <form onSubmit={handleSubmit(searchRecipes)}>
          <input
            className={`form-control ${homeStyle.searchBar}`}
            placeholder="what's cooking?"
            {...register("query")}
            required
          />
        </form>
      </section>

      <section className={homeStyle.homeSection}>
        <h2 className={`text-left ${homeStyle.font}`}>featured recipes</h2>
        {recipesLoaded ? (
          <div className={recipeBrowserStyle.recipes}>
            {recipes.map((recipe) => (
              <RecipeCard
                id={recipe.uri}
                title={recipe.label}
                image={recipe.image}
                source={recipe.source}
                url={recipe.url}
                context="browser"
                recipes={recipes}
                setRecipes={setRecipes}
              />
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
