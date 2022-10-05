//Afficer l'id commande 

//afficher le numéro de la commande via l'id orderId





//Afficher le numéro de la commande

let params = new URL(document.location).searchParams;
let orderId = params.get("orderId");


//Afficher l'id récupéré dans la page
document.getElementById("orderId").textContent = orderId;