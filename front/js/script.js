fetch("http://localhost:3000/api/products")
.then(response => (response.json()))
.then(products) => {
        const container = document.querySelector('.items');

    products.forEach (product) => {
        console.log(product);
    
        const elementString = <a href="./product.html?id=$(product.id)">
            <artcile>
                <img src= "${product.imageUrl}" alt ="" >
                    <h3 class= "productName">${product.name}</h3>
                </img>
            </artcile>
        </a>
    };

    container.innerHtml = continer.innerHtml + elementString;