function userDetails(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const phoneNumber = event.target.phoneNumber.value;
  // localStorage.setItem("name", name);
  // localStorage.setItem("email", email);
  // localStorage.setItem("phoneNumber", phoneNumber);

  const obj = {
    name,
    email,
    phoneNumber,
  };

  axios
    .post("http://localhost:3000/user/add-user", obj)
    .then((response) => {
      showNewUserOnScreen(response.data.newUserDetail);
      // console.log(response);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4> Something ent wrong </h4>";
      console.log(err);
    });

  // localStorage.setItem(obj.email, JSON.stringify(obj));
  // showNewUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/user/get-users")
    .then((response) => {
      console.log(response);

      for (var i = 0; i < response.data.allUsers.length; i++) {
        showNewUserOnScreen(response.data.allUsers[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // const localStorageObj = localStorage;
  // const localstoragekeys = Object.keys(localStorageObj);

  // for (var i = 0; i < localstoragekeys.length; i++) {
  //   const key = localstoragekeys[i];
  //   const userDetailsString = localStorageObj[key];
  //   const userDetailsObj = JSON.parse(userDetailsString);
  //   showNewUserOnScreen(userDetailsObj);
  // }
});

function showNewUserOnScreen(user) {
  document.getElementById("email").value = "";
  document.getElementById("name").value = "";
  document.getElementById("phoneNumber").value = "";
  if (localStorage.getItem(user.id) !== null) {
    removeUserFromScreen(user.id);
  }

  const parentNode = document.getElementById("listOfUsers");
  const childHTML = `<li id=${user.id}> ${user.name} - ${user.email} 
                     <button onclick="deleteUser('${user.id}')"> Delete User </button>
                     <button onclick="editUserDetails('${user.email}','${user.name}','${user.phoneNumber}','${user.id}')"> Edit User </button>
                     </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("listOfUsers");
  const childNodeToBeDeleted = document.getElementById(userId);

  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}

function deleteUser(userID) {
  axios
    .delete(
      `http://localhost:3000/user/delete-user/${userID}`
    )
    .then((response) => {
      removeUserFromScreen(userID);
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log(emailId);
  // localStorage.removeItem(emailId);
  // removeUserFromScreen(emailId);
}

function editUserDetails(emailId, name, phoneNumber, userId) {
  document.getElementById("email").value = emailId;
  document.getElementById("name").value = name;
  document.getElementById("phoneNumber").value = phoneNumber;
  deleteUser(userId);
}
