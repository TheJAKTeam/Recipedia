import React from 'react'

import { isUserLoggedIn } from '../../util/auth'
import style from './RecipeCard.module.css'
import { toast } from 'react-toastify'

/**
 * A card with a brief representation of a recipe.
 *
 * @param {string} id
 * @param {string} title
 * @param {string} source
 * @param {string} image
 * @param {string} url
 * @param {string} context One of recipebook or browser
 * @returns {JSX.Element}
 */
const RecipeCard = ({
  id,
  title,
  source,
  image,
  url,
  context,
  recipes,
  setRecipes
}) => {
  const saveRecipe = async e => {
    e.preventDefault()

    try {
      const encodedId = btoa(id)

      await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/api/recipes/${encodedId}/save`,
        {
          method: 'POST',
          credentials: 'include'
        }
      )

      toast.success(`"${title}" has been saved to your recipe book.`)
    } catch (err) {
      toast.error(
        'An error occurred while saving this recipe. Please try again.'
      )
    }
  }

  const unsaveRecipe = async e => {
    e.preventDefault()

    try {
      const encodedId = btoa(id)

      await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/api/recipes/${encodedId}/save`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      )

      // Remove recipe from array
      setRecipes(recipes.filter(recipe => recipe.uri !== id))

      toast.success(`"${title}" has been removed from your recipe book.`)
    } catch (err) {
      toast.error(
        'An error occurred while removing this recipe from your recipe book. Please try again.'
      )
    }
  }

  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className={style.recipeCard}
    >
      <article>
        <div className={style.cardImage}>
          <img className={style.image} src={image} alt={title} />
        </div>

        <div className={style.cardText}>
          <h3>{title}</h3>
          <p>{source}</p>

          {isUserLoggedIn() && (
            <>
              {context === 'browser' ? (
                <button 
                  className={`btn btn-primary ${style.btnCustom}`}
                  onClick={saveRecipe}>
                  save recipe
                </button>
              ) : (
                <button 
                  className='btn btn-danger'
                  onClick={unsaveRecipe}>
                  unsave recipe
                </button>
              )}
            </>
          )}
        </div>
      </article>
    </a>
  )
}

export default RecipeCard
