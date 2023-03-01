let  userName = document.getElementById("userName") ,
     userAge = document.getElementById("userAge") ,
     userEmail = document.getElementById("userEmail") ,
     userEducation = document.getElementById("userEducation") ,
     userCountry = document.getElementById("userCountry") ,
     userNameAlert = document.getElementById("userNameAlert") ,
     userAgeAlert = document.getElementById("userAgeAlert") ,
     userEmailAlert = document.getElementById("userEmailAlert") ,
     userEducationAlert = document.getElementById("userEducationAlert") ,
     userCountryAlert = document.getElementById("userCountryAlert") ;
let mainBtn = document.getElementById("mainBtn");
let mainIndex=0; 


let userContainer;
if(userContainer= JSON.parse(localStorage.getItem("myData")) == null) {
    userContainer = [];
} else {
    userContainer= JSON.parse(localStorage.getItem("myData"));
    displayUsers();
}


function addUser() {
    if(mainBtn.innerHTML == "Update") {
        mainBtn.innerHTML="Add User";
        mainBtn.classList.replace("btn-outline-success","btn-outline-primary");
        if(validateUserName()==true && validateUserAge()==true && validateUserAge()==true && validateUserEmail()==true  && validateUserEducation()==true && validateUserCountry()==true) { 
            let user  = {
            name:   userName.value,
            age:  userAge.value,
            email:   userEmail.value,
            education:    userEducation.value,
            country:    userCountry.value
    
            }
    
            userContainer.splice(mainIndex,1,user);
        }
    } else {
    
            if(validateUserName()==true && validateUserAge()==true && validateUserAge()==true && validateUserEmail()==true  && validateUserEducation()==true && validateUserCountry()==true) {   
    
                let user  = {
                    name:   userName.value,
                    age:  userAge.value,
                    email:   userEmail.value,
                    education:    userEducation.value,
                    country:    userCountry.value
            
                    }
    
                userContainer.push(user);
            }
    
            
            
        }
    
    localStorage.setItem("myData" , JSON.stringify(userContainer));
    clearForm();
    displayUsers();
}  


function clearForm() {
    userName.value = "";
    userAge.value = "";
    userEmail.value = "";
    userEducation.value  = "default";
    userCountry.value  = "default";
}


function displayUsers() {
    let storage = "";
    for(let i=0; i < userContainer.length; i++) {
        storage += `<tr>
                        <td>${i+1}</td>
                        <td>${userContainer[i].name}</td>
                        <td>${userContainer[i].age}</td>
                        <td>${userContainer[i].email}</td>
                        <td>${userContainer[i].education}</td>
                        <td>${userContainer[i].country}</td>
                        <td><button onclick="updateUser(${i})" class="btn btn-outline-warning">update</button></td>
                        <td><button onclick="deleteUser(${i})" class="btn btn-outline-danger">delete</button></td>
                     </tr>`
    }

    document.getElementById("tableBody").innerHTML = storage ;
}


function deleteUser(userIndex) {
    userContainer.splice(userIndex,1);
    localStorage.setItem("myData" , JSON.stringify(userContainer));
    displayUsers();
}


function updateUser(userIndex) {
        userName.value = userContainer[userIndex].name;
        userAge.value = userContainer[userIndex].age;
        userEmail.value = userContainer[userIndex].email;
        userEducation.value = userContainer[userIndex].education,
        userCountry.value = userContainer[userIndex].country;
        mainBtn.innerHTML = "Update";
        mainBtn.classList.replace("btn-outline-primary","btn-outline-success");
        mainIndex=userIndex;
    }



function searchUser(searchTerm) {
    let storage = ``;
    for(let i=0; i<userContainer.length; i++) {
        if(userContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true || userContainer[i].country.toLowerCase().includes(searchTerm.toLowerCase()) == true ) {
            storage += `<tr>
                        <td>${i+1}</td>
                        <td>${userContainer[i].name}</td>
                        <td>${userContainer[i].age}</td>
                        <td>${userContainer[i].email}</td>
                        <td>${userContainer[i].education}</td>
                        <td>${userContainer[i].country}</td>
                        <td><button onclick="updateUser(${i})" class="btn btn-outline-warning">update</button></td>
                        <td><button onclick="deleteUser(${i})" class="btn btn-outline-danger">delete</button></td>
                     </tr>`
        } 
    }
    document.getElementById("tableBody").innerHTML = storage ;
}


function validateUserName () {
    let regex = /^[A-Z][a-z]{1,}$/;
    if(regex.test(userName.value) == true) {
        userName.classList.add("is-valid");
        userName.classList.remove("is-invalid");
        userNameAlert.classList.replace("d-block" , "d-none");
        return true;
        
    } else {
        userName.classList.add("is-invalid");
        userName.classList.remove("is-valid");
        userNameAlert.classList.replace("d-none" , "d-block");
        return false ;
    }
}


function validateUserAge () {
    let regex=/^([1-9][8-9]|[2-9][0-9]|[1][0-1][0-9]|120)$/;
    if(regex.test(userAge.value) == true) {
        userAge.classList.add("is-valid");
        userAge.classList.remove("is-invalid");
        userAgeAlert.classList.replace("d-block" , "d-none");
        return true;
        
    } else {
        userAge.classList.add("is-invalid");
        userAge.classList.remove("is-valid");
        userAgeAlert.classList.replace("d-none" , "d-block");
        return false ;
    }
}


function validateUserEmail () {
    let regex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(regex.test(userEmail.value) == true) {
        userEmail.classList.add("is-valid");
        userEmail.classList.remove("is-invalid");
        userEmailAlert.classList.replace("d-block" , "d-none");
        return true;
        
    } else {
        userEmail.classList.add("is-invalid");
        userEmail.classList.remove("is-valid");
        userEmailAlert.classList.replace("d-none" , "d-block");
        return false ;
    }
}


function validateUserEducation () {
    if(userEducation.value == "default") {
        userEducation.classList.add("is-invalid");
        userEducation.classList.remove("is-valid");
        userEducationAlert.classList.replace("d-none" , "d-block");
        return false ;
        
    } else {
        userEducation.classList.add("is-valid");
        userEducation.classList.remove("is-invalid");
        userEducationAlert.classList.replace("d-block" , "d-none");
        return true;
        
    }
}


function validateUserCountry () {
    if(userCountry.value == "default") {
        userCountry.classList.add("is-invalid");
        userCountry.classList.remove("is-valid");
        userCountryAlert.classList.replace("d-none" , "d-block");
        return false ;
        
    } else {
        userCountry.classList.add("is-valid");
        userCountry.classList.remove("is-invalid");
        userCountryAlert.classList.replace("d-block" , "d-none");
        return true;
        
    }
}

userName.addEventListener("keyup" , validateUserName);
userAge.addEventListener("keyup" , validateUserAge);
userEmail.addEventListener("keyup" , validateUserEmail);
userEducation.addEventListener("blur" , validateUserEducation);
userCountry.addEventListener("blur" , validateUserCountry);