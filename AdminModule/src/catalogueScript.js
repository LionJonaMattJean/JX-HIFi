const produitParPage=10;
let pageActive=1;
let produits=[];




async function loadData(){
    try{
        const reponse=await fetch('./src/data.json');
        produits=await reponse.json();

    }catch(error) {
        console.log("Erreur chargement donné: ",error);
    }
    afficherProduits();
    paginationSetup();
}

function afficherProduits(){
    const debut=(pageActive-1)*produitParPage;
    const fin=debut+produitParPage;
    const produitsAfficher=produits.slice(debut,fin);

    const $tableBody=$("#table-body");
    $tableBody.empty();
    produitsAfficher.forEach(produit =>{

        $tableBody.append(`      
            <tr>
                <td>${produit.id}</td>
                <td>${produit.nom}</td>
                <td>${produit.description}</td>
                <td>${produit.coutant}</td>
                <td>${produit.prix_vente}</td>
                <td>${produit.quantite}</td>
                <td>
                    <a  class="text-primary action-link " onclick="modifierProduit(${produit.id})">Modifier</a>&emsp; 
                    <a  class="text-primary action-link" onclick="voirDetails(${produit.id})">Details</a>  &emsp;
                    <a  class="text-primary action-link" onclick="supprimerProduit(${produit.id})">Supprimer</a>
                </td>
            </tr>
        `);
    });
}
function paginationSetup() {
    const totalPage=Math.ceil(produits.length/produitParPage);
    const $pagination=$('#pagination');

    $pagination.empty();

    for(let i=1;i<=totalPage;i++){
        const $pageProduit=$(`
            <li class="page-item ${i===pageActive? "active":""}">
                <a class="page-link" href="#">${i}</a>
            </li>
        `);

        $pageProduit.on("click",()=>{
            pageActive=i;
            afficherProduits();
            paginationSetup();
        });
        $pagination.append($pageProduit);
    }

}

function modifierProduit(id){
    const produit=produits.find(p=>p.id===id);
    if(produit){
        $("#ModifierTitre").text(produit.nom);
        $("#modalModifierBody").html(`
            <div class="row">
                <div class="col-md-4">
                     <img src="${produit.photo}" class="img-fluid" alt="${produit.nom}" width="400" height="300">
                </div>
                <div class="col-md-8">
                    <form id="modifierForm">
                        <div class="mb-3">
                            <label for="produitNom" class="form-label">Nom</label>
                            <input type="text" class="form-control" id="produitNom" value="${produit.nom}">
                        </div>
                        <div class="mb-3">
                            <label for="produitDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="produitDescription" rows="3">${produit.description}</textarea>
                        </div>
                        <div class="mb-3">
                            <label for="produitCoutant" class="form-label">Coûtant</label>
                            <input type="number" class="form-control" id="produitCoutant" value="${produit.coutant}">
                        </div>
                        <div class="mb-3">
                            <label for="produitPrixVente" class="form-label">Prix de vente</label>
                            <input type="number" class="form-control" id="produitPrixVente" value="${produit.prix_vente}">
                        </div>
                        <div class="mb-3">
                            <label for="produitQuantite" class="form-label">Quantité</label>
                            <input type="number" class="form-control" id="produitQuantite" value="${produit.quantite}">
                        </div>
                        <div class="mb-3">
                            <label for="produitPhoto" class="form-label">URL de l'image</label>
                            <input type="text" class="form-control" id="produitPhoto" value="${produit.photo}">
                        </div>
                        <button type="submit" class="btn btn-primary btn-save">Enregistrer</button>
                    </form>
                </div>
            </div>
        `);
        $("#modalModifier").modal("show");
    }else {
        console.error("Produit non trouvé: ",id);
    }
}
function voirDetails(id){
    const produit=produits.find(p=>p.id===id);
    if(produit){
       $("#detailTitre").text(produit.nom);
       $("#modalDetailBody").html(`
        <img src="${produit.photo}" class="img-fluid" alt="${produit.nom}"><br>
        <strong>Description :</strong> ${produit.description}<br>
        <strong>Coûtant :</strong> ${produit.coutant}<br>
        <strong>Prix de vente :</strong> ${produit.prix_vente}<br>
        <strong>Quantité :</strong> ${produit.quantite}
       `)
        $("#modalDetails").modal("show");
    }else {
        console.error("Produit non trouvé: ",id);
    }
}
function supprimerProduit(id){
    $("#modalDelete").modal("show");
}
document.addEventListener("DOMContentLoaded",loadData);