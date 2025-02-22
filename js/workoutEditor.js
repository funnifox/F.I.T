document.getElementById("addWorkout").addEventListener("click", addWorkout);
document.getElementById("addRest").addEventListener("click", addRest);

let i = 0

// card population
function addWorkout() {
    const workoutList = document.getElementById("workoutList");

    const workoutCard = document.createElement("div");
    workoutCard.classList.add("unit");

    workoutCard.innerHTML = `
    <div class="text-light" id="collaspe${i}">
        <input type="text" class="data h1 text-light border-0 exercise-name" placeholder="Exercise Name (reps)" style="background:transparent;width:100%;">
        <br><br>

        
        <input type="number" class="data h3 text-light border-0 exercise-time" style="background:transparent;width:15%;" placeholder="0" onchange="totalTime()"> S
        <br><br>


        <button class="btn bg-danger text-dark deleteWorkout" style="width:75%">Delete</button>
        <button class="btn bg-secondary-subtle text-dark" onclick="collaspe(${i})" style="width:20%">↥</button>
        <br><br>
    </div>
    <div class="collasped" id="collasped${i}">
        <button class="btn btn-outline-light text-light collapsed" onclick="collasped(${i})" style="width:100%;">⊹</button>
    </div>
    `;

    workoutList.appendChild(workoutCard);
    
    const exerciseInput = workoutCard.querySelector(".exercise-name");
    const collapsedButton = workoutCard.querySelector(".collapsed");

    exerciseInput.addEventListener("input", function () {
        collapsedButton.textContent = this.value
    });
    

    i++;

    workoutCard.querySelector(".deleteWorkout").addEventListener("click", () => {
        workoutCard.remove();
        totalTime();
    });
}
function addRest() {
    const workoutList = document.getElementById("workoutList");

    const workoutCard = document.createElement("div");
    workoutCard.classList.add("unit");

    workoutCard.innerHTML = `
    <div class="text-light" id="collaspe${i}">
    <p class="data text-center" style="color:#ffffff;font-size:250%;">REST</p>


        <input type="number" class="data h3 text-light border-0 rest-time" style="background:transparent;width:15%;" placeholder="0" min="0" onchange="totalTime()"> S
        <br><br>


        <button class="btn bg-danger text-dark deleteWorkout" style="width:75%">Delete</button>
        <button class="btn bg-secondary-subtle text-dark" onclick="collaspe(${i})" style="width:20%">↥</button>
        <br><br>
    </div>
    <div class="collasped" id="collasped${i}">
        <button class="btn btn-outline-light bg-danger text-light collapsed" onclick="collasped(${i})" style="width:100%;">⊘</button>
    </div>
    `;
    workoutList.appendChild(workoutCard);

    const restInput = workoutCard.querySelector(".rest-time");
    const collapsedButton = workoutCard.querySelector(".collapsed");

    restInput.addEventListener("input", function () {
        collapsedButton.textContent = `⊘ ${this.value}s ⊘`
    });

    i++


    workoutCard.querySelector(".deleteWorkout").addEventListener("click", () => {
        workoutCard.remove();
        totalTime();
    });
}

// collaspe and expand cards
function collaspe(i){
    document.getElementById(`collaspe${i}`).style.display = "none";
    document.getElementById(`collasped${i}`).style.display = "block";
}
function collasped(i){
    document.getElementById(`collaspe${i}`).style.display = "block";
    document.getElementById(`collasped${i}`).style.display = "none";
}

// time display
function totalTime() {
    let totalWorkoutTime = 0;
    let totalWorkTime = 0;
    let totalRestTime = 0;

    const workoutTime = document.querySelectorAll(".exercise-time");
    const restTime = document.querySelectorAll(".rest-time");

    workoutTime.forEach(input => {
        totalWorkTime += Number(input.value) || 0;
    });

    restTime.forEach(input => {
        totalRestTime += Number(input.value) || 0;
    });

    totalWorkoutTime = totalRestTime + totalWorkTime

    function timeFormat(i){
        let minutes = Math.floor(i / 60);
        let seconds = i % 60;

        return `[ ${minutes}:${seconds < 10 ? "0" : ""}${seconds}s ]`
    }
    
    

    function compare(restTime, totalTime) {
        const progressBarText = document.getElementById("conparetimeMove");
    
        // Avoid division by zero
        if (totalTime > 0) {
            const ratio = restTime / totalTime;
            const totalBars = 15;
            const filledBars = Math.floor(ratio * totalBars);
    
            let progressBarRed = '';
            let progressBarGrey = '';
    
            // Add hashes for the filled portion
            for (let i = 0; i < filledBars; i++) {
                progressBarRed += '#';
            }
    
            // Add underscores for the remaining portion
            for (let i = filledBars; i < totalBars; i++) {
                progressBarGrey += '_ ';
            }
    
        document.getElementById("conparetimeRest").innerHTML = progressBarRed;
        document.getElementById("conparetimeMove").innerHTML = progressBarGrey;
        }
    }
    compare(totalRestTime, totalWorkoutTime)

    document.getElementById("totalTime").innerHTML = timeFormat(totalWorkoutTime);
    document.getElementById("restime").innerHTML = timeFormat(totalRestTime);
    document.getElementById("workoutime").innerHTML = timeFormat(totalWorkTime);
}

function generateToken() {
    let workout = ""; 

    const data = document.querySelectorAll(".data"); 
    const title = document.querySelector(".title"); 
    
    workout += `title;${title.value};`
    data.forEach(input => {
        if (input.tagName === "INPUT" || input.tagName === "TEXTAREA") {
            workout += `${input.value};`;  
        } else {
            workout += `${input.innerText};`;  
        }
    });

    console.log(workout); 
}


// popup's
function openPopup(){
    document.getElementById(`overlay`).style.display = "block";
    document.getElementById(`popup`).style.display = "block";
}
function closePopup(){
    document.getElementById(`overlay`).style.display = "none";
    document.getElementById(`popup`).style.display = "none";
    document.getElementById(`tokenGenerationPopup`).style.display = "none";
}


function openTokenGeneration(){
    document.getElementById(`overlay`).style.display = "block";
    document.getElementById(`tokenGenerationPopup`).style.display = "block";
}