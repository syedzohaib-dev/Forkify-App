const imageDisplay = document.querySelector(".imageDisplay");
const searchBar = document.querySelector(".searchBar");
const searchBtn = document.querySelector(".searchBtn");
const recipe = document.querySelector(".recipe");

async function checkForRecipes(item) {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search="${item}`);
    const data = await response.json();

    // Clear previous content
    imageDisplay.innerHTML = "";

    for (let i = 0; i < 17; i++) {
        const recipeContainer = document.createElement("div"); // Create a container for each recipe
        const imgElement = document.createElement("img");
        const titleElement = document.createElement("h3");

        // Set the attributes and content
        imgElement.src = data.data.recipes[i].image_url;
        imgElement.alt = "Recipe Image";
        titleElement.textContent = data.data.recipes[i].title;

        // Append the image and title to the recipe container
        recipeContainer.appendChild(imgElement);
        recipeContainer.appendChild(titleElement);

        // Append the recipe container to the imageDisplay container
        imageDisplay.appendChild(recipeContainer);

        // Add click event listener to each image
        imgElement.addEventListener("click", async () => {
            const recipeId = data.data.recipes[i].id;
            console.log("Clicked Recipe ID:", recipeId); // Log the recipe ID to ensure the click event is firing

            // Fetch recipe details using the ID
            const recipeResponse = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`);
            const recipeData = await recipeResponse.json();

            // Display detailed recipe information
            recipe.innerHTML = `
             <img src="${recipeData.data.recipe.image_url}" style="width:600px; height:50%;" alt="Recipe Image">
                <h2>${recipeData.data.recipe.title}</h2>
                <p><strong>Publisher:</strong> ${recipeData.data.recipe.publisher}</p>
                <p><i class="fa-regular fa-clock"></i><strong> Cooking Time:</strong> ${recipeData.data.recipe.cooking_time} minutes</p>
                <p><i class="fa-solid fa-person"></i><strong> Servings:</strong> ${recipeData.data.recipe.servings}</p>
                <p style="color:orange;"><strong>RECIPE INGREDIENTS: </strong></p>
                <ul class="ingredients-list">
                    ${recipeData.data.recipe.ingredients.map(ingredient => `
                        <li><i class="fa fa-check"></i> ${ingredient.quantity || ''} ${ingredient.unit || ''} ${ingredient.description}</li>
                    `).join('')}
                </ul>
            `;
        });
    }
}

searchBtn.addEventListener("click", () => {
    checkForRecipes(searchBar.value);
});
