document.addEventListener("DOMContentLoaded", function () {
    const usernameElements = document.querySelectorAll(".username");
    const storedUsername = localStorage.getItem("username");

    usernameElements.forEach(i => {
        i.innerHTML = storedUsername;
    });
});
