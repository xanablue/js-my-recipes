// Xana Navoichick - Exam 3

const router = require('express').Router()
const recipes = require('../../../data/recipes.json')

// route 1 - get recipe
router.get('/', (request, response) => {
    // grab properties
    const recipeList = recipes.map(({ id, title, image, prepTime, difficulty }) => {
        return { id, title, image, prepTime, difficulty }
    })
    // send response
    response.send(recipeList)
})

// route 2 - post recipe
router.post('/recipe/add', (request, response) => {
    // grab properties
    const { title, image, ingredients, instructions, prepTime, difficulty } = request.body
    // assign ID
    const newId = recipes.length + 1
    // add new recipe
    const newRecipe = { id: newId, title, image, ingredients, instructions, prepTime, difficulty }
    // push to list
    recipes.push(newRecipe)
    // send response
    response.json(newRecipe)
})

// route 3 - get recipe by id
router.get('/recipe/:id', (request, response) => {
    // grab ID
    const { id } = request.params
    // parse ID
    const recipeId = parseInt(id)
    // find ID
    const found = recipes.find(rec => rec.id === recipeId)
    // send recipe
    if (found) {
        response.send(found)
    }
})

module.exports = router