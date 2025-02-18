document.getElementById("addWorkout").addEventListener("click", addWorkout);
document.getElementById("addRest").addEventListener("click", addRest);

let i = 0
function addWorkout() {
    const workoutList = document.getElementById("workoutList");

    const workoutCard = document.createElement("div");
    workoutCard.classList.add("unit");

    workoutCard.innerHTML = `
    <div class="container${i}" id="collaspe${i}">
        <bigNumb>${i}</bigNumb>
        <input type="text" class="h1 text-light border-0 exercise-name" placeholder="Exercise Name (reps)" style="background:transparent;width:100%;">
        <br><br>
        <input type="text" style="background:transparent;width:30%;" class="h3 text-light border-0 exercise-time" placeholder="mm:ss" minlength="5" oninput="formatTimeInput(this)">
        <br><br>
        <button class="btn bg-danger text-dark deleteWorkout" style="width:75%">Delete</button>
        <button class="btn bg-secondary-subtle text-dark" onclick="collaspe(${i})" style="width:20%">↥</button>
        <br><br>
    </div>
    <div class="collasped" id="collasped${i}">
        <button class="btn btn-outline-light text-light collapsed" onclick="collasped(${i})" style="width:100%;">${i}</button>
    </div>
    `;

    workoutList.appendChild(workoutCard);
    
    const exerciseInput = workoutCard.querySelector(".exercise-name");
    const collapsedButton = workoutCard.querySelector(".collapsed");

    exerciseInput.addEventListener("input", function () {
        collapsedButton.textContent = this.value.trim();
    });
    

    i++;

    workoutCard.querySelector(".deleteWorkout").addEventListener("click", () => {
        workoutCard.remove();
    });
}


function addRest() {
    const workoutList = document.getElementById("workoutList");

    const workoutCard = document.createElement("div");
    workoutCard.classList.add("unit");

    workoutCard.innerHTML = `
    <div class="container${i} text-center" id="collaspe${i}">
    <p style="color:#ffffff;font-size:400%;">REST</p>
        <input type="text" style="background:transparent;width:40%;font-size:200%;" class="rest text-light border-0" placeholder="mm:ss" maxlength="5" oninput="formatTimeInput(this)">
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

    const restInput = workoutCard.querySelector(".rest");
    const collapsedButton = workoutCard.querySelector(".collapsed");

    restInput.addEventListener("input", function () {
        collapsedButton.textContent = `⊘ ${this.value} ⊘`
    });

    i++


    workoutCard.querySelector(".deleteWorkout").addEventListener("click", () => {
        workoutCard.remove();
    });
}


function collaspe(i){
    document.getElementById(`collaspe${i}`).style.display = "none";
    document.getElementById(`collasped${i}`).style.display = "block";
}
function collasped(i){
    document.getElementById(`collaspe${i}`).style.display = "block";
    document.getElementById(`collasped${i}`).style.display = "none";
}


function formatTimeInput(input) {
    let value = input.value.replace(/[^0-9:]/g, '');
    
    if (value.length > 5) {
        value = value.slice(0, 5);
    }
    
    let parts = value.split(':');
    let minutes = parts[0] ? parts[0].slice(0, 2) : '';
    let seconds = parts[1] ? parts[1].slice(0, 2) : '';
    
    if (seconds && parseInt(seconds) > 59) {
        seconds = '59';
    }
    
    if (minutes.length === 2 && !value.includes(':')) {
        value = minutes + ':';
    } else if (seconds) {
        value = minutes + ':' + seconds;
    } else {
        value = minutes;
    }
    
    input.value = value;
}