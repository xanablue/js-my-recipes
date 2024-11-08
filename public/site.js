
const recipeList = document.querySelector(".recipe-list")
const modal = document.getElementById("recipeModal")
const closeButton = document.querySelector(".close-button")

const modalElements = {
	title: document.getElementById('modalTitle'),
	prepTime: document.getElementById('modalPrepTime'),
	difficulty: document.getElementById('modalDifficulty'),
	instructions: document.getElementById('modalInstructions'),
	image: document.getElementById('modalImage')
}

const getRecipes = async () => {
	const response = await fetch('/api/v1/')
	return await response.json()
}

const getRecipe = async id => {
	const response = await fetch(`/api/v1/recipe/${id}`)
	return await response.json()
}

const showRecipeList = recipes => {
	recipes?.forEach(({id, title, image, prepTime, difficulty}) => {
		const recipeItem = document.createElement("div")
		recipeItem.className = "recipe-item"
		recipeItem.innerHTML = `
			<img src="${image}" alt="${title}">
			<h2>${title}</h2>
			<p><strong>Prep Time:</strong> ${prepTime} mins | <strong>Difficulty:</strong> ${difficulty}</p>
		`
		recipeItem.onclick = () => showRecipeDetails(id)
		recipeList.appendChild(recipeItem)
	})
}

const showRecipeDetails = async id => {

	const {title, image, instructions, ingredients, prepTime, difficulty} = await getRecipe(id)

	modalElements.title.textContent = title
	modalElements.prepTime.textContent = `${prepTime} mins`
	modalElements.difficulty.textContent = difficulty
	modalElements.instructions.textContent = instructions
	modalElements.image.src = image

	const ingredientsList = document.getElementById("modalIngredients")
	ingredientsList.innerHTML = ''
	ingredients.forEach(ingredient => {
		const li = document.createElement('li')
		li.textContent = ingredient
		ingredientsList.appendChild(li)
	})

	modal.style.display = 'flex'
}

closeButton.onclick = () => modal.style.display = 'none'

window.onclick = event => {
	if (event.target === modal) modal.style.display = 'none'
}


;(async () => {
	const recipes = await getRecipes()
	showRecipeList(recipes)
})()