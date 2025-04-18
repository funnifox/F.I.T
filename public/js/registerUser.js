document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
  
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = document.getElementById("input-username").value;
      const email = document.getElementById("input-email").value;
      const password = document.getElementById("input-password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
  
      // Perform signup logic
      if (password === confirmPassword) {
        // Passwords match, proceed with signup
        console.log("Signup successful");
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);
        warningCard.classList.add("d-none");
  
        const data = {
          username: username,
          email: email,
          password: password,
        };
  
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 200) {
            // Check if signup was successful
            if (responseData.token) {
              // Store the token in session storage
              sessionStorage.setItem("token", responseData.token);
              // Redirect or perform further actions for logged-in user
              window.location.href = "login.html";
            }
          } else {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message;
          }
        };
  
        // Perform signup request
        fetchMethod(currentUrl + "/api/userAdmn/register", callback, "POST", data);
  
        // Reset the form fields
        signupForm.reset();
      } else {
        // Passwords do not match, handle error
        warningCard.classList.remove("d-none");
        warningText.innerText = "Passwords do not match";
      }
    });
  });












  function chkAllowRename(event, i) {
    event.preventDefault(); 
  
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const username = document.getElementById("input-username").value;
    const input = document.getElementById(`input-${i}`);
    if (!input.checkValidity()) {
      input.reportValidity(); 
      return;
    }
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
  
      if (responseStatus === 200) {
        warningCard.classList.add("d-none");
        register_open('username','email')
      } else {
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.message;
      }
    };
  
    fetchMethod(`${currentUrl}/api/users/${username}`, callback, "GET", null);
  }


  function register_open(prev,i) {
    warningCard.classList.add("d-none");
    const input = document.getElementById(`input-${prev}`);
    if (!input.checkValidity()) {
      input.reportValidity(); 
      return;
    }else{
        document.getElementById(`display-${prev}`).innerHTML = input.value;
        let validIds = ['password', 'email', 'username','confirm'];
      if (validIds.includes(i)) {
        register_close()
        document.getElementById(`section-${i}`).style.display = "block";
      }
    }
  }
  
  function register_close() {
    document.getElementById("section-password").style.display = "none";
    document.getElementById("section-email").style.display = "none";
    document.getElementById("section-username").style.display = "none";
  }