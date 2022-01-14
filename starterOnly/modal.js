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
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form");

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

// Afficher le message d'erreur
let errorMessage = "";
function error(dataInput) {
  dataInput.dataset.errorVisible = "true";
  dataInput.dataset.error = errorMessage;
}
// Pas de message d'erreur
function noError(dataInput) {
  dataInput.dataset.errorVisible = "";
}

// Dom Elements(dataform)
const dataPrenom = document.querySelector(".dataPrenom");
const dataNom = document.querySelector(".dataNom");
const dataEmail = document.querySelector(".dataEmail");
const dataBirthdate = document.querySelector(".dataBirthdate");
const dataQuantity = document.querySelector(".dataQuantity");
const dataLocation = document.querySelector(".dataLocation");
const dataCondition = document.querySelector(".dataCondition");
// DOM Elements(inputs)
const prenom = document.getElementById("first");
const nom = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locations = document.querySelectorAll('input[name="location"]');
const conditionCase = document.getElementById("checkbox1");

//RegExp pour l'interdiction des nombres dans les champs (prénom et nom)
let stringRegExp = new RegExp("^[a-zA-Z]{2,}$");

//Validation du prénom
prenom.addEventListener("input", prenomValidate);
function prenomValidate() {
  if (!stringRegExp.test(prenom.value)) {
    errorMessage =
      "Veuillez entrer 2 caractères ou plus et le champ ne peut contenir de nombres.";
    error(dataPrenom);
    formValidity.prenomValue = "false";
  } else {
    noError(dataPrenom);
    formValidity.prenomValue = "true";
  }
}

//Validation du nom
nom.addEventListener("input", nomValidate);
function nomValidate() {
  if (!stringRegExp.test(nom.value)) {
    errorMessage =
      "Veuillez entrer 2 caractères ou plus, le champ ne peut pas contenir de nombres.";
    error(dataNom);
    formValidity.nomValue = "false";
  } else {
    noError(dataNom);
    formValidity.nomValue = "true";
  }
}

//Creation de la RegExp pour la validation de l'email
let emailRegExp = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);
//Validation de l'email
email.addEventListener("input", emailValidate);
function emailValidate() {
  if (!emailRegExp.test(email.value)) {
    errorMessage = "Veuillez entrer un email valide.";
    error(dataEmail);
    formValidity.emailValue = "false";
  } else {
    noError(dataEmail);
    formValidity.emailValue = "true";
  }
}

//Calculer l'age en comparant la date de naissance à la date d'aujourd'hui
const todayDate = new Date();
const birthdateValue = new Date(birthdate.value);
todayDate.setHours(0, 0, 0, 0);
const age = todayDate.getFullYear() - birthdateValue.getFullYear();
const month = todayDate.getMonth() - birthdateValue.getMonth();
const day = todayDate.getDate() - birthdateValue.getDate();
if (month < 0 || (month == 0 && day < 0)) {
  age--;
}

//Validation de la date de naissance (le champ ne peut être vide et il faut être majeur)
birthdate.addEventListener("input", birthValidate);
function birthValidate() {
  const todayDate = new Date();
  const entredBirthdate = new Date(birthdate.value);
  todayDate.setHours(0, 0, 0, 0);
  let age = todayDate.getFullYear() - entredBirthdate.getFullYear();
  const month = todayDate.getMonth() - entredBirthdate.getMonth();
  const day = todayDate.getDate() - entredBirthdate.getDate();
  if (month < 0 || (month == 0 && day < 0)) {
    age--;
  }
  if (!birthdate.value) {
    errorMessage = "Vous devez entrer votre date de naissance.";
    error(dataBirthdate);
    formValidity.birthdateValue = "false";
  } else if (age < 18) {
    errorMessage = "Vous devez avoir (18 ans) ou plus.";
    error(dataBirthdate);
    formValidity.birthdateValue = "false";
  } else {
    noError(dataBirthdate);
    formValidity.birthdateValue = "true";
  }
}

//La quantité doit être une valeur numérique et le champ ne peut être vide
quantity.addEventListener("input", quantityValidate);
function quantityValidate() {
  if (isNaN(quantity.value) || quantity.value == "") {
    errorMessage = "Une valeur numérique doit être saisie.";
    error(dataQuantity);
    formValidity.quantityValue = "false";
  } else {
    noError(dataQuantity);
    formValidity.quantityValue = "true";
  }
}

//Un bouton radio doit être sélectionné
for(let i = 0; i < locations.length; i++){
  locations[i].addEventListener("input", locationValidate);
}
function locationValidate() {
  for (const oneLocation of locations) {
    if (!oneLocation.checked) {
      errorMessage = "Vous devez choisir une option.";
      error(dataLocation);
      formValidity.locationValue = "false";
    } else {
    noError(dataLocation);
    formValidity.locationValue = "true";
      break;
    }
  }
}

//La case des conditions générales doit être cochée
conditionCase.addEventListener("input", conditionValidate);
function conditionValidate() {
  if (!conditionCase.checked) {
    errorMessage =
      "Vous devez vérifier que vous acceptez les termes et conditions.";
    error(dataCondition);
    formValidity.conditionValue = "false";
  } else {
    noError(dataCondition);
    formValidity.conditionValue = "true";
  }
}

//Cette objet nous permet de vérifier si tout les elements du tableau sont "true"
const formValidity = {
  prenomValue: "false",
  nomValue: "false",
  emailValue: "false",
  birthdateValue: "false",
  quantityValue: "false",
  locationValue: "false",
  conditionValue: "false",
}

//Fonction de validation du formulaire
form.addEventListener("submit", validate);
function validate(e) {
  e.preventDefault();

  prenomValidate();
  nomValidate();
  emailValidate();
  birthValidate();
  quantityValidate();
  locationValidate();
  conditionValidate();

  //Si tout les champs sont valides, afficher le message de remerciment
  if (Object.values(formValidity).every((element) => element === "true")) {
    form.style.display = "none";
    document.querySelector(".modal-body").innerHTML =
      '<div><div class="success-message">Merci pour<br/>votre inscription</div><input class="btn-submit" type="submit" class="button" value="Fermer"/></div>';
    document.querySelector(".btn-submit").addEventListener("click", closeModal);
  }
}
