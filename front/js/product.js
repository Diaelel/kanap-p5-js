//Récupérer l'id depuis l'url
let params = new URL(document.location).searchParams;
let idProduct = params.get("id");

//Fetch des données par rapport à l'id récupéré dans l'url du produit
const fetchProductId = async function () {
    await fetch(`http://localhost:3000/api/products/${idProduct}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            produits = data;
        });
};

// Afficher les produits
const afficherLeProduit = async function () {
    await fetchProductId();
    let choixColor = document.querySelector("#colors");
    document.querySelector(".item__img").innerHTML = `<img src="${produits.imageUrl}" alt="${produits.altTxt}">`;
    document.getElementById("title").textContent = produits.name;
    document.getElementById("price").textContent = produits.price;
    document.getElementById("description").textContent = produits.description;
    produits.colors.forEach((option) => {
        choixColor.innerHTML += `<option value="${option}">${option}</option>`;
    });
};
afficherLeProduit();

//Selection du bouton ajouter au panier
let cartButton = document.getElementById("addToCart");

//Ajouter le produit au panier au clique
cartButton.addEventListener("click", function (e) {
    if (document.querySelector("#colors").value == "") {
        alert("Veuillez sélectionnez une couleur");
        e.preventDefault();
    } else {
        // Sélectionner des élements à mettre dans le panier
        let image = document.querySelector("body > main > div > section > article > div.item__img > img").src;
        let imageAlt = document.querySelector("body > main > div > section > article > div.item__img > img").alt;
        let name = document.getElementById("title").textContent;
        let price = document.getElementById("price").textContent + "€";
        let choixOpt = document.querySelector("#colors").value;
        let productID = idProduct;
        //transformation du type of qty
        let qty_chiffre = document.querySelector("#quantity").value;
        let qty = Number(qty_chiffre);


        //pour tester la boucle et l'arrêter
        let boucle = 0;

        // ajouter les éléments du panier dans un tableau
        let eltPanier = [{ image, imageAlt, name, price, choixOpt, qty, productID }];

        //Déclaration au format js de la clé produit stockée dans le local storage
        let panierToStock = JSON.parse(localStorage.getItem("produit"));

        //Si le localstorage est vide, créer le tableau, push le panier dedans et on stock dans le localStorage
        if (!panierToStock) {
            panierToStock = [];
            panierToStock.push(eltPanier);
            localStorage.setItem("produit", JSON.stringify(panierToStock));
        }
        //Avant le stockage dans le localstorage, on vérifie si le nom et option sont =, si = alors on incrémente la qty
        else {
            for (let i = 0; i < panierToStock.length; i++) {
                if (panierToStock[i][0].name === name && panierToStock[i][0].choixOpt === choixOpt) {
                    panierToStock[i][0].qty = Number(panierToStock[i][0].qty) + qty

                    boucle = 1;
                }
            }
            //Si pas égale, arrêter la boucle et on push le panier dans le localstorage
            if (boucle == 0) {
                panierToStock.push(eltPanier);
            }

            localStorage.setItem("produit", JSON.stringify(panierToStock));
        }

        if (qty > 1) {
            alert(`Vous avez ajouté ${qty} articles au panier`);
        } else if (qty == 1) {
            alert(`Vous avez ajouté ${qty} article au panier`);
        }
    }
});