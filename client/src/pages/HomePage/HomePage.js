import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import RecipeCard from "../../components/RecipeCard/RecipeCard";
import style from "./HomePage.module.css";

const HomePage = () => {
  const { register, handleSubmit } = useForm();

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/api/recipes`
      );

      setRecipes(await response.json());
    };

    getData();
  }, []);

  const searchRecipes = (data) => {
    console.log(data);
  };

  return (
    <div>
      <section className={style.homeSection}>
        <h2>Search Recipes</h2>
        <form onSubmit={handleSubmit(searchRecipes)}>
          <input
            className={"form-control"}
            placeholder="What's cooking?"
            {...register("query")}
            required
          />
        </form>
      </section>

      <section className={style.homeSection}>
        <h2>Featured Recipes</h2>
        <div className={style.recipes}>
          {recipes.map((recipe) => (
            <RecipeCard
              title={recipe.label}
              image={recipe.image}
              source={recipe.source}
              url={recipe.url}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
