document.addEventListener("DOMContentLoaded", function () {
    console.log(localStorage)
    document.getElementById("username").innerHTML = localStorage.getItem("username");
});

