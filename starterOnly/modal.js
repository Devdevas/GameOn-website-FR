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
//La fonction de validation du formulaire
function validate() {
  //Validation du prénom
  const prenom = document.getElementById("first");
  if (prenom.value.length < 2) {
    alert("Le champ Prénom a un minimum de 2 caractères !");
    return false;
  }
  //Validation du nom
  const nom = document.getElementById("last");
  if (nom.value.length < 2) {
    return false;
  }
  //Creation de la RegExp pour validation email
  const email = document.getElementById("email");
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let testEmail = emailRegExp.test(email.value);
  //L'email doit être valide
  if (testEmail == false) {
    return false;
  }
  //La date de naissance doit être fournie
  const birthdate = document.getElementById("birthdate");
  if (birthdate.value == 0) {
    return false;
  }
  //La quantité doit être une valeur numérique
  const quantity = document.getElementById("quantity");
  if (isNaN(quantity.value) || quantity.value == "") {
    return false;
  }
  //Un bouton radio doit être sélectionné
  const locationChecked = document.querySelector(
    'input[name="location"]:checked'
  );
  if (locationChecked == null) {
    return false;
  }
  //La case des conditions générales doit être cochée
  const conditionCase = document.getElementById("checkbox1");
  if (conditionCase.checked == false) {
    return false;
  }
  //Si tout les champs sont valides, le formulaire sera envoyé
}
