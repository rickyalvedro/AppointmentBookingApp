function saveToLocalStorage(event) {
  event.preventDefault();
  const name = event.target.username.value;
  const email = event.target.emailid.value;
  const phoneNumber = event.target.phonenumber.value;
  // localStorage.setItem("name", name);
  // localStorage.setItem("email", email);
  // localStorage.setItem("phoneNumber", phoneNumber);

  const obj = {
    name,
    email,
    phoneNumber,
  };

  axios
    .post(
      "https://crudcrud.com/api/cfc79f9330e04c10b04adae10101b629/appointmentData",
      obj
    )
    .then((response) => {
      showNewUserOnScreen(response.data);
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
    .get(
      "https://crudcrud.com/api/cfc79f9330e04c10b04adae10101b629/appointmentData"
    )
    .then((response) => {
      console.log(response);

      for (var i = 0; i < response.data.length; i++) {
        showNewUserOnScreen(response.data[i]);
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
  document.getElementById("emailid").value = "";
  document.getElementById("username").value = "";
  document.getElementById("ph_no").value = "";
  if (localStorage.getItem(user._id) !== null) {
    removeUserFromScreen(user._id);
  }

  const parentNode = document.getElementById("listOfUsers");
  const childHTML = `<li id=${user._id}> ${user.name} - ${user.email} 
                     <button onclick="deleteUser('${user._id}')"> Delete User </button>
                     <button onclick="editUserDetails('${user.email}','${user.name}','${user.phoneNumber}','${user._id}')"> Edit User </button>
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
      `https://crudcrud.com/api/cfc79f9330e04c10b04adae10101b629/appointmentData/${userID}`
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
  document.getElementById("emailid").value = emailId;
  document.getElementById("username").value = name;
  document.getElementById("ph_no").value = phoneNumber;
  deleteUser(userId);
}
