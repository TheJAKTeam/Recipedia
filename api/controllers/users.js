const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const router = express.Router();
const db = require("../models");
const {
  User,
  Diet,
  HealthLabel,
  CuisineType,
  MealType,
  DishType,
  ExcludedIngredient,
} = db;

/**
 * Logs a user into the application.
 *
 * @route POST /users/login/
 */
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

/**
 * Signs up a user for the application.
 *
 * @route POST /users/signup/
 */
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user in the database
  await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    hashedPassword: hashedPassword,
  });

  return res.sendStatus(200);
});

/**
 * Gets all of the recipe preferences for a user.
 *
 * @route GET /users/recipePreferences/
 */
router.get("/recipePreferences", async (req, res) => {
  const getNamesOnly = (type) => type.name;

  const preferences = {
    diet: await req.user.getDiets().map(getNamesOnly),
    health: await req.user.getHealthLabels().map(getNamesOnly),
    cuisineType: await req.user.getCuisineTypes().map(getNamesOnly),
    mealType: await req.user.getMealTypes().map(getNamesOnly),
    dishType: await req.user.getDishTypes().map(getNamesOnly),
    excluded: await req.user.getExcludedIngredients().map(getNamesOnly),
  };

  return res.json(preferences);
});

/**
 * Updates the recipe preferences for a user by type of preference.
 *
 * @route GET /users/recipePreferences/
 */
router.put("/recipePreferences", async (req, res) => {
  if (!req.isAuthenticated()) return res.sendStatus(403);

  const getSearchOptions = (name) => {
    return {
      where: {
        name: name,
      },
    };
  };

  const { type, preferenceNames } = req.body;
  const foundItems = [];

  switch (type) {
    case "diet":
      for (const name of preferenceNames) {
        let foundDiet = await Diet.findOne(getSearchOptions(name));
        if (foundDiet === null) foundDiet = await Diet.create({ name: name });
        foundItems.push(foundDiet);
      }

      await req.user.setDiets(foundItems);
      break;
    case "health":
      for (const name of preferenceNames) {
        let foundHealthLabel = await HealthLabel.findOne(
          getSearchOptions(name)
        );
        if (foundHealthLabel === null)
          foundHealthLabel = await HealthLabel.create({ name: name });
        foundItems.push(foundHealthLabel);
      }

      await req.user.setHealthLabels(foundItems);
      break;
    case "cuisineType":
      for (const name of preferenceNames) {
        let foundCuisineTypes = await CuisineType.findOne(
          getSearchOptions(name)
        );
        if (foundCuisineTypes === null)
          foundCuisineTypes = await CuisineType.create({ name: name });
        foundItems.push(foundCuisineTypes);
      }

      await req.user.setCuisineTypes(foundItems);
      break;
    case "mealType":
      for (const name of preferenceNames) {
        let foundMealTypes = await MealType.findOne(getSearchOptions(name));
        if (foundMealTypes === null)
          foundMealTypes = await MealType.create({ name: name });
        foundItems.push(foundMealTypes);
      }

      await req.user.setMealTypes(foundItems);
      break;
    case "dishType":
      for (const name of preferenceNames) {
        let foundDishTypes = await DishType.findOne(getSearchOptions(name));
        if (foundDishTypes === null)
          foundDishTypes = await DishType.create({ name: name });
        foundItems.push(foundDishTypes);
      }

      await req.user.setDishTypes(foundItems);
      break;
    case "excluded":
      for (const name of preferenceNames) {
        let foundExcludedIngredients = await ExcludedIngredient.findOne(
          getSearchOptions(name)
        );
        if (foundExcludedIngredients === null)
          foundExcludedIngredients = await ExcludedIngredient.create({
            name: name,
          });
        foundItems.push(foundExcludedIngredients);
      }

      await req.user.setExcludedIngredients(foundItems);
      break;
    default:
      return res.sendStatus(400);
  }

  return res.sendStatus(200);
});

module.exports = router;
