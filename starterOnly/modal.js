function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const dataPrenom = document.querySelector(".dataPrenom");
const dataNom = document.querySelector(".dataNom");
const dataEmail = document.querySelector(".dataEmail");
const dataBirthdate = document.querySelector(".dataBirthdate");
const dataQuantity = document.querySelector(".dataQuantity");
const dataLocation = document.querySelector(".dataLocation");
const dataCondition = document.querySelector(".dataCondition");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Show error message
let errorMessage = "";
function error(dataInput) {
  dataInput.dataset.errorVisible = "true";
  dataInput.dataset.error = errorMessage;
}
// No error message
function noError(dataInput) {
  dataInput.dataset.errorVisible = "";
}
//Validate form function
function validate() {

  // DOM Elements(input)
  const prenom = document.getElementById("first");
  const nom = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const locationChecked = document.querySelector('input[name="location"]:checked');
  const conditionCase = document.getElementById("checkbox1");

  //Validation du prénom
  if (prenom.value.length < 2) {
    errorMessage = "Veuillez entrer 2 caractères ou plus pour le champ du Prénom.";
    error(dataPrenom);
    return false;
  } else {
    noError(dataPrenom);
  }

  //Validation du nom
  if (nom.value.length < 2) {
    errorMessage = "Veuillez entrer 2 caractères ou plus pour le champ du Nom.";
    error(dataNom);
    return false;
  } else {
    noError(dataNom);
  }

  //Creation de la RegExp pour validation email
  let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
  let testEmail = emailRegExp.test(email.value);
  //L'email doit être valide
  if (testEmail == false) {
    errorMessage = "Veuillez entrer un email valide.";
    error(dataEmail);
    return false;
  } else {
    noError(dataEmail);
  }

  //La date de naissance doit être fournie
  if (birthdate.value == 0) {
    errorMessage = "Vous devez entrer votre date de naissance.";
    error(dataBirthdate);
    return false;
  } else {
    noError(dataBirthdate);
  }

  //La quantité doit être une valeur numérique
  if (isNaN(quantity.value) || quantity.value == "") {
    errorMessage = "Veuillez remplir ce champ.";
    error(dataQuantity);
    return false;
  } else {
    noError(dataQuantity);
  }

  //Un bouton radio doit être sélectionné
  if (locationChecked == null) {
    errorMessage = "Vous devez choisir une option.";
    error(dataLocation);
    return false;
  } else {
    noError(dataLocation);
  }

  //La case des conditions générales doit être cochée
  if (conditionCase.checked == false) {
    errorMessage = "Vous devez vérifier que vous acceptez les termes et conditions.";
    error(dataCondition);
    return false;
  } else {
    noError(dataCondition);
  }

  //Si tout les champs sont valides, le formulaire sera envoyé
}
