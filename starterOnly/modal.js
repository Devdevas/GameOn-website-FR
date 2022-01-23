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

// DOM Elements(inputs)
const prenom = document.getElementById("first");
const nom = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locations = document.querySelectorAll('input[name="location"]');
const location1 = document.getElementById("location1");
const conditionCase = document.getElementById("checkbox1");

// Afficher le message d'erreur
function error(input, message) {
  input.parentElement.dataset.errorVisible = true;
  input.parentElement.dataset.error = message;
}
// Pas de message d'erreur
function noError(input) {
  input.parentElement.dataset.errorVisible = false;
}

//Cet objet nous permet de vérifier si tout les elements du tableau sont "true"
const formValidity = {
  first: false,
  last: false,
  email: false,
  birthdate: false,
  quantity: false,
  location: false,
  cgu: false,
}

//RegExp pour l'interdiction des nombres dans les champs (prénom et nom)
let stringRegExp = new RegExp("^[a-zA-Z]{2,}$");
//Creation de la RegExp pour la validation de l'email
let emailRegExp = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);

//la fonction de validation des inputs
function inputValidity(input, condition, message) {
  const name = input.getAttribute("name");
  if (condition) {
    error(input, message);
    formValidity[name] = false;
  } else {
    noError(input);
    formValidity[name] = true;
  }
}

//Validation du prénom
prenom.addEventListener("input", prenomValidate);
function prenomValidate() {
  inputValidity(
    prenom,
    !stringRegExp.test(prenom.value),
    "Veuillez entrer 2 caractères ou plus (ne peut contenir de nombres)."
  );
}

//Validation du nom
nom.addEventListener("input", nomValidate);
function nomValidate() {
  inputValidity(
    nom,
    !stringRegExp.test(nom.value),
    "Veuillez entrer 2 caractères ou plus (ne peut contenir de nombres)."
  );
}

//Validation de l'email
email.addEventListener("input", emailValidate);
function emailValidate() {
  inputValidity(
    email,
    !emailRegExp.test(email.value),
    "Veuillez entrer un email valide."
  );
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
  inputValidity(
    birthdate,
    !birthdate.value || age < 18,
    "Le champ ne peut être vide (il faut avoir 18 ou plus)."
  );
}

//La quantité doit être une valeur numérique et le champ ne peut être vide
quantity.addEventListener("input", quantityValidate);
function quantityValidate() {
  inputValidity(
    quantity,
    isNaN(quantity.value) || quantity.value == "",
    "Une valeur numérique doit être saisie."
  );
}

//Un bouton radio doit être sélectionné
for (let i = 0; i < locations.length; i++) {
  locations[i].addEventListener("input", locationValidate);
}
function locationValidate() {
  for (const oneLocation of locations) {
    if (!oneLocation.checked) {
      error(location1, "Vous devez choisir une option.");
      formValidity.location = false;
    } else {
      noError(location1);
      formValidity.location = true;
      break;
    }
  }
}

//La case des conditions générales doit être cochée
conditionCase.addEventListener("input", conditionValidate);
function conditionValidate() {
  inputValidity(
    conditionCase,
    !conditionCase.checked,
    "Vous devez vérifier que vous acceptez les termes et conditions."
  );
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
  if (Object.values(formValidity).every((element) => element === true)) {
    form.style.display = "none";
    document.querySelector(".modal-body").innerHTML =
      '<div><div class="success-message">Merci pour<br/>votre inscription</div><input class="btn-submit" type="submit" class="button" value="Fermer"/></div>';
    document.querySelector(".btn-submit").addEventListener("click", closeModal);
  }
}
