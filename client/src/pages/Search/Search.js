import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import queryString from "query-string";

import RecipeCard from "../../components/RecipeCard/RecipeCard";
import searchStyle from "./Search.module.css";
import recipeBrowserStyle from "../../commonStyles/RecipeBrowser.module.css";

const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      query: queryString.parse(location.search).query,
    },
  });

  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [recipesLoaded, setRecipesLoaded] = useState(false);

  const sendSearchRequest = async (searchQuery) => {
    setRecipesLoaded(false);

    const requestParams = {
      query: searchQuery,
      page: page,
    };
    const stringifiedRequestParams = "?" + queryString.stringify(requestParams);

    history.replace(`/search${stringifiedRequestParams}`);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_DOMAIN}/api/recipes${stringifiedRequestParams}`,
      {
        credentials: "include",
      }
    );

    setRecipes(await response.json());
    setRecipesLoaded(true);
  };

  useEffect(() => {
    sendSearchRequest(queryString.parse(location.search).query);
  }, [page]);

  const submitSearch = (data) => {
    sendSearchRequest(data.query);
    setPage(1);
  };

  return (
    <div>
      <h1>Search Recipes</h1>
      <form onSubmit={handleSubmit(submitSearch)}>
        <input
          className={"form-control"}
          placeholder="What's cooking?"
          {...register("query")}
          required
        />
      </form>

      {recipesLoaded ? (
        <>
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

          <p>Currently on Page {page}</p>

          <div className={searchStyle.pageButtons}>
            <button
              className="btn btn-secondary"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              Previous Page
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setPage(page + 1)}
            >
              Next Page
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Search;
