const express = require("express");
const fetch = require("node-fetch");
const queryString = require("query-string");
const sample = require("lodash/sample");

const router = express.Router();
const db = require("../models");
const { SavedRecipe } = db;

/**
 * Returns an array of recipes from the Edamam API based on various search options.
 *
 * @route GET /recipes/
 */
router.get("/", async (req, res) => {
  let {
    query,
    page,
    diet,
    calories,
    health,
    cuisineType,
    dishType,
    mealType,
    excluded,
  } = req.query;

  const getNamesOnly = (type) => type.name;

  // Load user recipe preferences for authenticated users for non-overridden query params and format into original
  // query param format (comma separated)
  if (req.isAuthenticated()) {
    if (diet === undefined) {
      const userDiets = await req.user.getDiets().map(getNamesOnly);
      if (userDiets.length > 0) diet = userDiets.join();
    }

    if (health === undefined) {
      const userHealthLabels = await req.user
        .getHealthLabels()
        .map(getNamesOnly);
      if (userHealthLabels.length > 0) health = userHealthLabels.join();
    }

    if (cuisineType === undefined) {
      const userCuisineTypes = await req.user
        .getCuisineTypes()
        .map(getNamesOnly);
      if (userCuisineTypes.length > 0) cuisineType = userCuisineTypes.join();
    }

    if (mealType === undefined) {
      const userMealTypes = await req.user.getMealTypes().map(getNamesOnly);
      if (userMealTypes.length > 0) mealType = userMealTypes.join();
    }

    if (dishType === undefined) {
      const userDishTypes = await req.user.getDishTypes().map(getNamesOnly);
      if (userDishTypes.length > 0) mealType = userDishTypes.join();
    }

    if (excluded === undefined) {
      const userExcludedIngredients = await req.user
        .getExcludedIngredients()
        .map(getNamesOnly);
      if (userExcludedIngredients.length > 0)
        excluded = userExcludedIngredients.join();
    }
  }

  // Validate positive pagination range
  if (page && page < 1) {
    return res.sendStatus(400);
  }

  // Set a default random search query if none was provided
  let searchQuery = query;
  if (searchQuery === undefined) {
    const featuredSearchQueries = [
      "chicken",
      "fish",
      "veggie",
      "spicy",
      "sweet",
      "beef",
      "meat",
      "savory",
      "cake",
      "bread",
    ];

    searchQuery = sample(featuredSearchQueries);
  }

  // Construct search params and stringify for the request
  const searchParams = {
    app_id: process.env.EDAMAM_APP_ID,
    app_key: process.env.EDAMAM_APP_KEY,
    q: searchQuery,
    from: page ? 10 * (page - 1) : undefined,
    calories: calories,
    diet: diet ? diet.split(",") : undefined,
    health: health ? health.split(",") : undefined,
    cuisineType: cuisineType ? cuisineType.split(",") : undefined,
    dishType: dishType ? dishType.split(",") : undefined,
    mealType: mealType ? mealType.split(",") : undefined,
    excluded: excluded ? excluded.split(",") : undefined,
  };
  const stringifiedSearchParams = queryString.stringify(searchParams, {
    arrayFormat: "none",
  });

  // Send the search request to the Edamam API
  try {
    const searchResponse = await fetch(
      `https://api.edamam.com/search?${stringifiedSearchParams}`
    );
    const searchResponseJson = await searchResponse.json();
    const searchResults = searchResponseJson.hits.map((hit) => hit.recipe);

    // Send search results back to the client
    return res.json(searchResults);
  } catch (e) {
    // Return 502 Bad Gateway if the Edamam API returns an error
    return res.sendStatus(502);
  }
});

/**
 * Returns an array with the user's saved recipes in their recipe book.
 *
 * @route GET /recipes/saved/
 */
router.get("/saved", async (req, res) => {
  if (!req.isAuthenticated()) return res.sendStatus(403);
  return res.json(await req.user.getSavedRecipes());
});

/**
 * Accepts a Base64 encoded recipe ID and returns the data for it.
 *
 * @route GET /recipes/:recipeId/
 */
router.get("/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;
  const decodedRecipeId = Buffer.from(recipeId, "base64");

  // Construct request params for getting individual recipe data
  const requestParams = {
    app_id: process.env.EDAMAM_APP_ID,
    app_key: process.env.EDAMAM_APP_KEY,
    r: decodedRecipeId,
  };
  const stringifiedRequestParams = queryString.stringify(requestParams);

  // Send the request
  try {
    const response = await fetch(
      `https://api.edamam.com/search?${stringifiedRequestParams}`
    );
    // The response is a single JSON object in an array
    const responseJson = await response.json();

    // Return 404 Not Found if recipe was found with the provided ID
    if (responseJson.length < 1) return res.sendStatus(404);

    // Send just the single result back to the client if a recipe was found
    return res.json(responseJson[0]);
  } catch (e) {
    // Return 502 Bad Gateway if the Edamam API returns an error
    return res.sendStatus(502);
  }
});

/**
 * Saves a Base64 encoded recipe ID to the user's recipe book.
 *
 * @route POST /recipes/:recipeId/save/
 */
router.post("/:recipeId/save", async (req, res) => {
  if (!req.isAuthenticated()) return res.sendStatus(403);

  const recipeId = req.params.recipeId;

  // Try to find an existing saved recipe and create it if none was found
  let recipe = await SavedRecipe.findOne({
    where: { recipeIdBase64: recipeId },
  });
  if (recipe === null) {
    recipe = await SavedRecipe.create({
      recipeIdBase64: recipeId,
    });
  }

  // Save the recipe in the user's recipe book
  await req.user.addSavedRecipe(recipe);

  return res.sendStatus(200);
});

/**
 * Removes a Base64 encoded recipe ID from the user's recipe book.
 *
 * @route DELETE /recipes/:recipeId/save/
 */
router.delete("/:recipeId/save", async (req, res) => {
  if (!req.isAuthenticated()) return res.sendStatus(403);
  const recipeId = req.params.recipeId;

  // Find and remove the recipe in the user's recipe book
  const foundRecipe = await req.user.getSavedRecipes({
    where: { recipeIdBase64: recipeId },
  });
  await req.user.removeSavedRecipe(foundRecipe);

  return res.sendStatus(200);
});

module.exports = router;
