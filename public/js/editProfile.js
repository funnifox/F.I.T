document.addEventListener("DOMContentLoaded", function () {
// spawn desc
  const callback1 = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    document.getElementById("description").innerHTML = responseData[0].description;
  };

  fetchMethod(currentUrl + `/api/users/${localStorage.getItem('username')}/desc`, callback1, "GET", null);





  // save desc
  const textarea = document.getElementById("description");
    const button = document.getElementById("descBtn");

    textarea.addEventListener("input", function () {
        // Enable the button if textarea is not empty
        if (textarea.value.trim() !== "") {
            button.removeAttribute("disabled");
        } else {
            button.setAttribute("disabled", "true");
        }
    });

  const callback2 = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
  };

  const desc = document.getElementById("desc");
  desc.onsubmit = function (event) {
    event.preventDefault();
    const description = document.getElementById("description").value;

    const data = {
      description: description
    };

    fetchMethod(currentUrl + `/api/users/${localStorage.getItem('username')}`, callback2, "PATCH", data);
  };
});








function editProfile_open(i, origin) {
  let validIds = ['password', 'email', 'username'];
  if (validIds.includes(i)) {
    document.getElementById(`section-${i}`).style.display = "block";
    document.getElementById(`back-${i}`).style.display = "block";
  } else if (i === 'passwordChk') {
    document.getElementById(`section-${i}`).style.display = "block";
    if (origin && validIds.includes(origin)) {
      document.getElementById(`back-${origin}`).style.display = "block";
    }
  }

  document.getElementById("overlay").style.display = "block";
  document.getElementById("editProfile").style.display = "block";
}

function editProfile_close() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("editProfile").style.display = "none";
  document.getElementById("section-password").style.display = "none";
  document.getElementById("section-email").style.display = "none";
  document.getElementById("section-username").style.display = "none";
  document.getElementById("section-passwordChk").style.display = "none";
  document.getElementById("back-username").style.display = "none";
  document.getElementById("back-email").style.display = "none";
  document.getElementById("back-password").style.display = "none";
  const editProfile = document.getElementById("editProfile");
  warningCard.classList.add("d-none");
  editProfile.reset()
}

function show(i) {
  let validIds = ['password', 'email'];
  if (validIds.includes(i)) {
    getUserInfo(i)
  }
}

function hide(i) {
  document.getElementById(`show-${i}`).style.display = "inline-block";
  document.getElementById(`hide-${i}`).style.display = "none";
  let validIds = ['password', 'email'];
  if (validIds.includes(i)) {
    document.getElementById(`text-${i}`).innerHTML = '########';
  }
}

function getUserInfo(i) {
  editProfile_open('passwordChk');

  const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      if (responseStatus == 200) {
          warningCard.classList.add("d-none");
          editProfile_close();
          if (i == 'email') {
              document.getElementById("text-email").innerHTML = responseData[0].email;
          }
          if (i == 'password') {
              document.getElementById("text-password").innerHTML = pswd;
          }
          document.getElementById(`show-${i}`).style.display = "none";
          document.getElementById(`hide-${i}`).style.display = "inline-block";
      } else {
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
      }
  };

  const editProfile = document.getElementById("editProfile");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  
  let pswd;
  editProfile.onsubmit = function (event) {
      event.preventDefault();

      const password = document.getElementById("input-passwordChk").value;
      const data = {
        password: password
      };

      pswd = data.password;
      fetchMethod(currentUrl + `/api/users/${localStorage.getItem('username')}/${i}`, callback, "POST", data);
      editProfile.reset();
  };
}

function patchUserInfo(i) {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    if (responseStatus == 200) {
        warningCard.classList.add("d-none");
        editProfile_close();
        if (i == 'username') {
          localStorage.setItem('username', change)
        }
        location.reload()
    } else {
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.message;
    }
  };

  const editProfile = document.getElementById("editProfile");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  let pswd;
  let change;

  const changed = document.getElementById(`input-${i}`).value
  if (changed === '') {
    warningCard.classList.remove("d-none");
    warningText.innerText = 'Inputs cannot be empty';
  } else {
    if (i === 'password') {
      const confirmPassword = document.getElementById("input-confirm-password").value;
      if (confirmPassword === '') {
        warningCard.classList.remove("d-none");
        warningText.innerText = 'Please confirm your password';
        return;
      }
      if (changed !== confirmPassword) {
        warningCard.classList.remove("d-none");
        warningText.innerText = 'Passwords do not match';
        return;
      }
    }
      editProfile_close();
    editProfile_open('passwordChk', i);
  }
  
  editProfile.onsubmit = function (event) {
    event.preventDefault();
    const password = document.getElementById("input-passwordChk").value;

    const data = {
      password: password,
      changed: changed
    };

    pswd = data.password;
    change = data.changed;
    fetchMethod(currentUrl + `/api/users/${localStorage.getItem('username')}/${i}`, callback, "PATCH", data);
    editProfile.reset();
  };
}

function chkAllowRename(event, i) {
  event.preventDefault(); 

  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");
  const username = document.getElementById("input-username").value;

  if (username ==''){
    warningCard.classList.remove("d-none");
    warningText.innerText = 'inputs cannot be empty';
  }
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);

    if (responseStatus === 200) {
      warningCard.classList.add("d-none");
      patchUserInfo(i);
    } else {
      warningCard.classList.remove("d-none");
      warningText.innerText = responseData.message;
    }
  };

  fetchMethod(`${currentUrl}/api/users/${username}`, callback, "GET", null);
}

function desc(){
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
  };

  const desc = document.getElementById("desc");
  desc.onsubmit = function (event) {
    event.preventDefault();
    const description = document.getElementById("description").value;

    const data = {
      description: description
    };

    fetchMethod(currentUrl + `/api/users/${localStorage.getItem('username')}`, callback, "PATCH", data);
    editProfile.reset();
  };
}