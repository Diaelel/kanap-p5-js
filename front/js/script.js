//Recupération des données de l'API
const recupererLesProduits = async function () {
    await fetch("http://localhost:3000/api/products")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return (products = data);
        });
};

//Sélection élément HTML ou afficher produits
const productElt = document.querySelector("#items");

//Affichage des produits sur la page d'acceuil
async function afficherLesProduits() {
    await recupererLesProduits();
    products.forEach((product) => {
        productElt.innerHTML += `
            <a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}" />
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>  
            </article>
            </a>`;
    });
}
afficherLesProduits();