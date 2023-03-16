let boxContainer = document.getElementById('boxContainer'),
    addButton = document.getElementById('addButton'),
    userName = document.getElementById('userName'),
    userAge = document.getElementById('userAge'),
    userEmail = document.getElementById('userEmail'),
    userEducation = document.getElementById('userEducation'),
    userCountry = document.getElementById('userCountry'),
    saveButton = document.getElementById('saveBtn'),
    cancelButton = document.getElementById('cancelBtn'),
    userNameAlert = document.getElementById('userNameAlert'),
    userAgeAlert = document.getElementById('userAgeAlert'),
    userEmailAlert = document.getElementById('userEmailAlert'),
    userEducationAlert = document.getElementById('userEducationAlert'),
    userCountryAlert = document.getElementById('userCountryAlert');

let mainIndex=0;

let userContainer = [];
if(userContainer = JSON.parse(localStorage.getItem("myData")) == null){
    userContainer = [];
} else {
    userContainer=JSON.parse(localStorage.getItem("myData"));
    displayUser();
}

function addUsers() {
    if(saveButton.innerHTML == "Update") {
        if(validateUserName() == true && validateUserAge() == true && validateUserEmail() == true && validateUserEducation() == true && validateUserCountry() == true) {

            let user = {
                name: userName.value,
                age: userAge.value,
                email: userEmail.value,
                education: userEducation.value,
                country: userCountry.value
            }
        
            userContainer.splice(mainIndex,1,user);
        }
        

    } else {

        if(validateUserName() == true && validateUserAge() == true && validateUserEmail() == true && validateUserEducation() == true && validateUserCountry() == true) {

            let user = {
                name: userName.value,
                age: userAge.value,
                email: userEmail.value,
                education: userEducation.value,
                country: userCountry.value
            }
            userContainer.push(user);
        }

    }
    
    localStorage.setItem("myData", JSON.stringify(userContainer));
    clearUser()
    displayUser();
}

function displayUser() {
    let storage='';
    for(let i=0; i<userContainer.length; i++) {
        storage += `
            <tr>
                <td>${i+1}</td>
                <td>${userContainer[i].name}</td>
                <td>${userContainer[i].age}</td>
                <td>${userContainer[i].email}</td>
                <td>${userContainer[i].education}</td>
                <td>${userContainer[i].country}</td>
                <td>
                    <span class="edit" onclick="editUser(${i})"><i class="fa-solid fa-pen"></i></span>
                    <span class="delete" onclick="deleteUser(${i})"><i class="fa-solid fa-trash"></i></span>
                </td>
            </tr>`
    }
    document.getElementById('tableBody').innerHTML = storage;
}

function clearUser() {
    userName.value = "";
    userAge.value = "";
    userEmail.value = "" ;
    userEducation.value = "default" ;
    userCountry.value = "default" ;
    userName.classList.remove("is-invalid");
    userName.classList.remove("is-valid");
    userAge.classList.remove("is-invalid");
    userAge.classList.remove("is-valid");
    userEmail.classList.remove("is-invalid");
    userEmail.classList.remove("is-valid");
    userEducation.classList.remove("is-invalid");
    userEducation.classList.remove("is-valid");
    userCountry.classList.remove("is-invalid");
    userCountry.classList.remove("is-valid");
    saveButton.innerHTML = 'Save';
    saveButton.disabled = true;
}

function deleteUser(userIndex) {
    userContainer.splice(userIndex,1);
    localStorage.setItem("myData", JSON.stringify(userContainer));
    displayUser();
}

function editUser(userIndex) {
    boxContainer.style.display = 'flex';
    userName.value = userContainer[userIndex].name;
    userAge.value = userContainer[userIndex].age;
    userEmail.value = userContainer[userIndex].email;
    userEducation.value = userContainer[userIndex].education;
    userCountry.value = userContainer[userIndex].country;
    saveButton.innerHTML = "Update";
    mainIndex = userIndex;
    validateUserName();
    validateUserAge();
    validateUserEmail();
    validateUserEducation();
    validateUserCountry();
}

function validateUserName() {
    let regex = /^([A-Z][a-z]{2,}(\s)?)+$/;
    if(regex.test(userName.value) == true) {
        userName.classList.add("is-valid");
        userName.classList.remove("is-invalid");
        userNameAlert.style.display='none';
        toggleSaveBtn()
        return true;
        
    } else {
        userName.classList.add("is-invalid");
        userName.classList.remove("is-valid");
        userNameAlert.style.display='block';
        toggleSaveBtn()
        return false ;
    }
}


function validateUserAge() {
    let regex = /^([1-9][8-9]|[2-9][0-9]|[1][0-1][0-9]|120)$/;
    if(regex.test(userAge.value) == true) {
        userAge.classList.add("is-valid");
        userAge.classList.remove("is-invalid");
        userAgeAlert.style.display='none';
        toggleSaveBtn()
        return true;
    } else {
        userAge.classList.add("is-invalid");
        userAge.classList.remove("is-valid");
        userAgeAlert.style.display='block';
        toggleSaveBtn()
        return false;
    }
}

function validateUserEmail() {
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(regex.test(userEmail.value) == true) {
        userEmail.classList.add("is-valid");
        userEmail.classList.remove("is-invalid");
        userEmailAlert.style.display='none';
        toggleSaveBtn()
        return true;
    } else {
        userEmail.classList.add("is-invalid");
        userEmail.classList.remove("is-valid");
        userEmailAlert.style.display='block';
        toggleSaveBtn()
        return false;
    }
}

function validateUserEducation() {
    if(userEducation.value == "default") {
        userEducation.classList.add("is-invalid");
        userEducation.classList.remove("is-valid");
        userEducationAlert.style.display='block';
        toggleSaveBtn()
        return false;
    } else {
        userEducation.classList.add("is-valid");
        userEducation.classList.remove("is-invalid");
        userEducationAlert.style.display='none';
        toggleSaveBtn()
        return true;
    }
}



function validateUserCountry() {
    if(userCountry.value == "default") {
        userCountry.classList.add("is-invalid");
        userCountry.classList.remove("is-valid");
        userCountryAlert.style.display='block';
        toggleSaveBtn()
        return false;
    } else {
        userCountry.classList.add("is-valid");
        userCountry.classList.remove("is-invalid");
        userCountryAlert.style.display='none';
        toggleSaveBtn()
        return true;
    }
}


function toggleSaveBtn() {
    if(userName.classList.contains("is-valid") &&
     userAge.classList.contains("is-valid") && 
     userEmail.classList.contains("is-valid") &&
     userEducation.classList.contains("is-valid") &&
     userCountry.classList.contains("is-valid")) {
        saveButton.disabled = false;
     } else {
        saveButton.disabled = true;
     }
}

userName.addEventListener('keyup' , validateUserName);
userAge.addEventListener('keyup' , validateUserAge);
userEmail.addEventListener('keyup' , validateUserEmail);
userEducation.addEventListener('blur' , validateUserEducation);
userCountry.addEventListener('blur' , validateUserCountry);

addButton.addEventListener('click', function() {
    boxContainer.style.display='flex';
})

saveButton.addEventListener('click', function() {
    boxContainer.style.display='none';
    addUsers()
    localStorage.setItem("myData", JSON.stringify(userContainer));
    displayUser();
    clearUser()
})

cancelButton.addEventListener('click', function() {
    boxContainer.style.display='none';
})