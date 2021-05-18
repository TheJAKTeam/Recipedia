import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import RecipeCard from '../../components/RecipeCard/RecipeCard'
import style from '../../commonStyles/RecipeBrowser.module.css'

const RecipeBook = () => {
  const [recipes, setRecipes] = useState([])
  const [recipesLoaded, setRecipesLoaded] = useState(false)

  useEffect(() => {
    const getSavedRecipes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/api/recipes/saved`,
        {
          credentials: 'include'
        }
      )

      // Get only the recipe IDs from the response
      const responseJson = await response.json()
      const savedRecipeIds = responseJson.map(
        savedRecipe => savedRecipe.recipeIdBase64
      )

      // Get the data for each saved recipe
      const savedRecipes = []
      let loadErrors = 0
      for (const id of savedRecipeIds) {
        try {
          const recipeDataResponse = await fetch(
            `${process.env.REACT_APP_BACKEND_DOMAIN}/api/recipes/${id}`
          )
          savedRecipes.push(await recipeDataResponse.json())
        } catch (err) {
          loadErrors++
          console.error('Could not get recipe data for recipe ID: ' + id)
        }
      }

      if (loadErrors > 0) {
        toast.error(
          `${loadErrors} recipe(s) failed to load due to the rate limiting of our free Edamam API plan. This should not happen with a paid Edamam API plan.`,
          {
            autoClose: 10000
          }
        )
      }

      setRecipes(savedRecipes)
      setRecipesLoaded(true)
    }

    getSavedRecipes()
  }, [])

  return (
    <div>
      <h1>My Recipe Book</h1>

      {recipesLoaded ? (
        <div className={style.recipes}>
          {recipes.map(recipe => (
            <RecipeCard
              id={recipe.uri}
              title={recipe.label}
              image={recipe.image}
              source={recipe.source}
              url={recipe.url}
              context='recipebook'
              recipes={recipes}
              setRecipes={setRecipes}
            />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default RecipeBook
