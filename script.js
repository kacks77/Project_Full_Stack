const recipeList = document.getElementById('recipe-list');
const searchInput = document.getElementById('search');
let recipes = [];


async function fetchRecipes() {
    try {
        const response = await fetch('https://dummyjson.com/recipes');
        const data = await response.json();
        console.log('Fetched Recipes:', data); 
        recipes = data.recipes; 
        displayRecipes(recipes); 
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}


function displayRecipes(recipes) {
    recipeList.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Preparation hardness:</strong> ${recipe.difficulty}</p>
            <p><strong>Cook Time:</strong> ${recipe.cookTimeMinutes} mins</p>
            <p><strong>Calories:</strong> ${recipe.caloriesPerServing} kcal</p>
            <p><strong>Ingredients:</strong></p>
            <ul class="ingredients">${recipe.ingredients.slice(0,3).join(', ')}</ul>
            <p><strong>Rating:</strong> ${recipe.rating} (${recipe.reviewCount} reviews)</p>
        </div>
    `).join('');
}


searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query)
    );
    displayRecipes(filteredRecipes);
});


fetchRecipes();
