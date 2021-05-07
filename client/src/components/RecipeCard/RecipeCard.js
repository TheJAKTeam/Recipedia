import React from "react";

import style from "./RecipeCard.module.css";

/**
 * A card with a brief representation of a recipe.
 *
 * @param {string} title
 * @param {string} source
 * @param {string} image
 * @param {string} url
 * @returns {JSX.Element}
 */
const RecipeCard = ({ title, source, image, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={style.recipeCard}
    >
      <article>
        <div className={style.cardImage}>
          <img className={style.image} src={image} alt={title} />
        </div>

        <div className={style.cardText}>
          <h3>{title}</h3>
          <p>{source}</p>
        </div>
      </article>
    </a>
  );
};

export default RecipeCard;
