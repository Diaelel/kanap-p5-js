//Récupérer les infos stockés dans le localstorage
let panier = JSON.parse(localStorage.getItem("produit"));

//Afficher les éléments du panier
function afficherPanier() {
    //Si le panier est vide
    if (panier === null || panier.length == 0) {
        document.querySelector("#cartAndFormContainer > h1").textContent += " est vide";
    }
    // si un élément est dans le panier
    else {
        for (i = 0; i < panier.length; i++) {
            document.querySelector("#cart__items").innerHTML += `
    <article class="cart__item" data-id="${panier[i][0].idProduct}">
        <div class="cart__item__img">
            <img src="${panier[i][0].image}" alt="${panier[i][0].imageAlt}" />
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
                <h2>${panier[i][0].name}</h2>
                <p>${panier[i][0].price}</p>
                <p>Couleur: ${panier[i][0].choixOpt}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté :</p>
                    <input index="${[i]}" onchange="getNewQty(this)" id="cartQty" type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${panier[i][0].qty}" />
                </div>
                <div class="cart__item__content__settings__delete">
                    <p index="${[i]}" onclick="supprimerArticle(this)" class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>
    `;
        }
    }
}
afficherPanier();

// Supression de la ligne  au clic du bouton "supprimer"
function supprimerArticle(e) {
    let index = e.getAttribute("index");
    panier.splice(index, 1);
    localStorage.setItem("produit", JSON.stringify(panier));
    location.reload();
}

// Mise à jour des quantités et total prix si modification des valeures dans l'input
function getNewQty(e) {
    let index = e.getAttribute("index");
    let newQty = e.value;
    panier[index][0].qty = newQty;

    if (newQty == 0) {
        panier.splice(index, 1);
        localStorage.setItem("produit", JSON.stringify(panier));
        location.reload();
    } else {
        document.querySelector("#totalQuantity").innerHTML = totalQty();
        document.querySelector("#totalPrice").innerHTML = totalPrice();
        localStorage.setItem("produit", JSON.stringify(panier));
    }
}
// Calcul du prix total
function totalPrice() {
    let totalprix = 0;
    for (let i = 0; i < panier.length; i++) {
        let quantity = parseInt(panier[i][0].qty);
        let prix = parseInt(panier[i][0].price);
        totalprix += prix * quantity;
    }
    return totalprix;
}

// affichage du prix total
document.querySelector("#totalPrice").innerHTML = totalPrice();

// Calcul du total quantité(s)
function totalQty() {
    let totalqty = 0;
    for (let i = 0; i < panier.length; i++) {
        let quantity = parseInt(panier[i][0].qty);
        totalqty += quantity;
    }
    return totalqty;
}

// affichage du total quantités
document.querySelector("#totalQuantity").innerHTML = totalQty();

// Selection de la div contenant tout le formulaire
let formulaire = document.querySelector(".cart__order__form");

//Selection des éléments du formulaire
let firstName = formulaire.firstName;
let lastName = formulaire.lastName;
let address = formulaire.address;
let city = formulaire.city;
let email = formulaire.email;
let boutonCommander = formulaire.order;
console.log(boutonCommander);


//Déclaration des RegExp
let emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
let nameRegExp = /^[a-zA-Zéêëèîïâäçù ,'-]{0,20}$/;
let addressRegExp = /^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]+$/;

//Vérif. prénom
firstName.addEventListener("input", function () {
    verificationFirstName(firstName);
});

function verificationFirstName() {
    let testFirstName = nameRegExp.test(firstName.value);
    if (testFirstName == false) {
        firstName.nextElementSibling.innerHTML = `Ne peut contenir de chiffres ou de caractères spéciaux`;
        return false;
    } else {
        firstName.nextElementSibling.innerHTML = "";
        return true;
    }
}

//Vérif. nom de famille
lastName.addEventListener("input", function () {
    verificationLastName(lastName);
});

function verificationLastName() {
    let testlastName = nameRegExp.test(lastName.value);
    if (testlastName == false) {
        lastName.nextElementSibling.innerHTML = `Ne peut contenir de chiffres ou de caractères spéciaux`;
        return false;
    } else {
        lastName.nextElementSibling.innerHTML = "";
        return true;
    }
}

//Vérif. ville
city.addEventListener("input", function () {
    verificationCity(city);
});

function verificationCity() {
    let testCity = nameRegExp.test(city.value);
    if (testCity == false) {
        city.nextElementSibling.innerHTML = `Veuillez saisir un nom de ville valide !<br> NB : Ne doit pas contenir de chiffres`;
        return false;
    } else {
        city.nextElementSibling.innerHTML = "";
        return true;
    }
}

//Vérif. adresse
address.addEventListener("change", function () {
    verificationAddress(address);
});

function verificationAddress() {
    let testAddress = addressRegExp.test(address.value);
    if (testAddress == false) {
        address.nextElementSibling.innerHTML = `Veuillez saisir une adresse valide !<br> Exemple: <i>1 rue François</i>`;
        return false;
    } else {
        address.nextElementSibling.innerHTML = "";
        return true;
    }
}

//Vérif. e-mail
email.addEventListener("change", function () {
    verificationEmail(email);
});

function verificationEmail() {
    let testEmail = emailRegExp.test(email.value);
    if (testEmail == false && email.value != "") {
        email.nextElementSibling.innerHTML = "Veuillez saisir une adresse e-mail valide !";
        return false;
    } else {
        email.nextElementSibling.innerHTML = "";
        return true;
    }
}

// Envoie du formulaire au clique sur le bouton "commander"
boutonCommander.addEventListener("click", function (event) {
    event.preventDefault();
    //Si tous les éléments du formulaire sont OK
    if (verificationFirstName(firstName) && verificationLastName(lastName) && verificationCity(city) && verificationAddress(address) && verificationEmail(email)) {
        //Récup. ID des produits du panier (seul élément a devoir être envoyé vers le serveur)
        function recupIdProduct() {
            let idProduct = [];
            for (let i = 0; i < panier.length; i++) {
                id = panier[i][0].productID;
                idProduct.push(id);
            }
            return idProduct;
        }
        //Déclaration d'une variable contenant les ID
        let productID = recupIdProduct();

        //Création de l'objet commande (contenant les infos du client + id des produits commandés)
        let commande = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: productID,
        };

        // Création de l'entête de la requête
        let options = {
            method: "POST",
            body: JSON.stringify(commande),
            headers: { "Content-Type": "application/json" },
        };
        fetch("http://localhost:3000/api/products/order", options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                localStorage.clear();
                let orderId = data.orderId;
                // localStorage.setItem("idCommande", JSON.stringify(orderId));
                // document.location.href = `confirmation.html`;
                window.location.assign(`confirmation.html?orderId=${orderId}`);
            });
    }
});