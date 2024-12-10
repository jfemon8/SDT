document.getElementById("submit-search").addEventListener("click", (e) => {
    e.preventDefault();
    const inputValue = document.getElementById("search").value.trim();

    const searchPhrase = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(inputValue)}`;

    fetch(searchPhrase)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            if (data.meals) {
                displayData(data.meals);
            } else {
                console.error("No meals found.");
                document.getElementById("search-results").innerHTML = `<p>No results found for "${inputValue}".</p>`;
            }
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
        });
});

const displayData = (meals) => {
    const container = document.getElementById("search-results");
    container.innerHTML = "";

    meals.forEach((meal) => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
        <div onclick="viewData('${meal.idMeal}')" id="details" class="details">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100px; height: auto;">
            <h5>${meal.strMeal}</h5>
            <p>Category: ${meal.strCategory}<br>Area: ${meal.strArea}</p>
        </a>
        `;
        container.appendChild(div);
    });
};


const viewData = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((mealtData) => {
            const mealContainer = document.getElementById("individual-details");
            mealContainer.innerHTML = "";

            const div = document.createElement("div");
            div.classList.add("singleCard");
            const meal = mealtData.meals[0];

            let ingredientsList = "";
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];

                if (ingredient && ingredient.trim()) {
                    ingredientsList += `<li>${measure ? measure : ""} ${ingredient}</li>`;
                }
            }

            div.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100px; height: auto;">
            <h5>${meal.strMeal}</h5>
            <p>Category: ${meal.strCategory}<br>Area: ${meal.strArea}</p>

            <h6>Ingredients</h6>
            ${ingredientsList}

            <p class="des">${meal.strInstructions}</p>
            <a href="${meal.strYoutube}" target="_blank"><button class="btn btn-info">Video Instructions</button></a>
        `

            mealContainer.appendChild(div);
        });
};
