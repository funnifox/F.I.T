function editProfile_open(i) {
    if (i == 'password'){
        document.getElementById("passwordParam").style.display = "block";
    }
    if (i == 'email'){
        document.getElementById("emailParam").style.display = "block";
    }
    if (i == 'username'){
        document.getElementById("usernameParam").style.display = "block";
    }
    if (i == 'passwordChk'){
        document.getElementById("passwordChk").style.display = "block";
    }
    document.getElementById("overlay").style.display = "block";
    document.getElementById("editProfile").style.display = "block";
}
function editProfile_close() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("editProfile").style.display = "none";
    document.getElementById("passwordParam").style.display = "none";
    document.getElementById("emailParam").style.display = "none";
    document.getElementById("usernameParam").style.display = "none";
    document.getElementById("passwordChk").style.display = "none";
}



function show(i){
  if (i == 'email'){
    getUserInfo(i)
  }
  if (i == 'password'){
    getUserInfo(i)
  }
}
function hide(i){
  document.getElementById(`show${i}`).style.display = "inline-block";
  document.getElementById(`hide${i}`).style.display = "none";
  if (i == 'email'){
    document.getElementById("email").innerHTML = '#############';
  }
  if (i == 'password'){
    document.getElementById("password").innerHTML = '########';
  }
}



function getUserInfo(i){
    editProfile_open('passwordChk')
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        if (responseStatus == 200) {
          warningCard.classList.add("d-none");
            editProfile_close('PasswordChk');
            if (i == 'email'){
                document.getElementById("email").innerHTML = responseData[0].email;
              }
            if (i == 'password'){
            document.getElementById("password").innerHTML = pswd;
            }
            document.getElementById(`show${i}`).style.display = "none";
            document.getElementById(`hide${i}`).style.display = "inline-block";
        } else {
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
        }
      };
    
      const editProfile = document.getElementById("editProfile");
    
      const warningCard = document.getElementById("warningCard");
      const warningText = document.getElementById("warningText");
    
      let pswd
      editProfile.onsubmit = function (event) {
          event.preventDefault();
      
          const password = document.getElementById("passwordChkImput").value;
          const data = {
              password: password
          };
  
          pswd = data.password
          // Perform request
          fetchMethod(currentUrl + `/api/users/${localStorage.getItem('username')}/${i}`, callback, "POST", data);
          // Reset the form fields
          editProfile.reset();
        }
}