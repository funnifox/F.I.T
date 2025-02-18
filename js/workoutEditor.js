document.getElementById("addWorkout").addEventListener("click", addWorkout);

function addWorkout() {
    const workoutList = document.getElementById("workoutList");

    const workoutCard = document.createElement("div");
    workoutCard.classList.add("unit");

    workoutCard.innerHTML = `
    <div class="container bg-body-secondary">
        <input type="text" class="h1" placeholder="Exercise Name">
        <textarea rows="4"></textarea>
        <button class="deleteWorkout">Delete</button>
    </div>
    `;
    workoutList.appendChild(workoutCard);

    // document.querySelectorAll(".unit").length

    workoutCard.querySelector(".deleteWorkout").addEventListener("click", () => {
        workoutCard.remove();
    });
}


