const catParPage=10;
let pageActive=1;
let category=[];




async function loadData(){
    try{
        const reponse=await fetch('./src/datacategorie.json');
        category=await reponse.json();

    }catch(error) {
        console.log("Erreur chargement donné: ",error);
    }
    afficherCategory();
   paginationSetup();
}

function afficherCategory(){
    const debut=(pageActive-1)*catParPage;
    const fin=debut+catParPage;
    const catAfficher=category.slice(debut,fin);

    const $tableBody=$("#table-body");
    $tableBody.empty();
    catAfficher.forEach(cat =>{

        $tableBody.append(`      
            <tr>
                <td>${cat.id}</td>
                <td>${cat.departement}</td>
                
                <td>
                    <a  class="text-primary action-link " onclick="modifierCat(${cat.id})">Modifier</a>&emsp; 
                    <a  class="text-primary action-link" onclick="voirDetails(${cat.id})">Details</a>  &emsp;
                    <a  class="text-primary action-link" onclick="supprimerCat(${cat.id})">Supprimer</a>
                </td>
            </tr>
        `);
    });
}
function paginationSetup() {
    const totalPage=Math.ceil(category.length/catParPage);
    const $pagination=$('#pagination');

    $pagination.empty();

    for(let i=1;i<=totalPage;i++){
        const $pageCat=$(`
            <li class="page-item ${i===pageActive? "active":""}">
                <a class="page-link" href="#">${i}</a>
            </li>
        `);

        $pageCat.on("click",()=>{
            pageActive=i;
            afficherCategory();
            paginationSetup();
        });
        $pagination.append($pageCat);
    }

}

function modifierCat(id){
    const cat=category.find(p=>p.id===id);
    if(cat){
        $("#ModifierTitre").text(cat.departement);
        $("#modalModifierBody").html(`
            <div class="row">
                <div class="col-md-4">
                     <img src="${cat.photo}" class="img-fluid" alt="${cat.departement}" width="400" height="300">
                </div>
                <div class="col-md-8">
                    <form id="modifierForm">
                        <div class="mb-3">
                            <label for="produitNom" class="form-label">Nom du Departement</label>
                            <input type="text" class="form-control" id="produitNom" value="${cat.departement}">
                        </div>
                        
                        <div class="mb-3">
                            <label for="produitPhoto" class="form-label">URL de l'image</label>
                            <input type="text" class="form-control" id="produitPhoto" value="${cat.photo}">
                        </div>
                        <button type="submit" class="btn btn-primary btn-save">Enregistrer</button>
                    </form>
                </div>
            </div>
        `);
        $("#modalModifier").modal("show");
    }else {
        console.error("Categorie non trouvé: ",id);
    }
}
function voirDetails(id){
    const cat=category.find(p=>p.id===id);
    if(cat){
        $("#detailTitre").text(cat.departement);
        $("#modalDetailBody").html(`
        <img src="${cat.photo}" class="img-fluid" alt="${cat.departement}"><br>
        <strong>Departement :</strong> ${cat.departement}<br>
      
       `)
        $("#modalDetails").modal("show");
    }else {
        console.error("Produit non trouvé: ",id);
    }
}
function supprimerCat(id){
    $("#modalDelete").modal("show");
}
document.addEventListener("DOMContentLoaded",loadData);