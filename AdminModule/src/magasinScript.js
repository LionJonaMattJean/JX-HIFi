const magasinParPage=10;
let pageActive=1;
let magasins=[];




async function loadData(){
    try{
        const reponse=await fetch('./src/datamagasin.json');
        magasins=await reponse.json();

    }catch(error) {
        console.log("Erreur chargement donné: ",error);
    }
    affichermagasins();
    paginationSetup();
}

function affichermagasins(){
    const debut=(pageActive-1)*magasinParPage;
    const fin=debut+magasinParPage;
    const magasinsAfficher=magasins.slice(debut,fin);

    const $tableBody=$("#table-body");
    $tableBody.empty();
    magasinsAfficher.forEach(magasin =>{

        $tableBody.append(`      
            <tr>
                <td>${magasin.IDMagasin}</td>
                <td>${magasin.NomDuMagasin}</td>
                <td>${magasin.NomDuProprietaire}</td>
                <td>${magasin.NomDuGerant}</td>
                <td>${magasin.Adresse}</td>
                <td>${magasin.Ville}</td>
                <td>${magasin.CodePostal}</td>
                 <td>${magasin.Email}</td>
                <td>${magasin.Telephone}</td>
               
                
                <td>
                    <a  class="text-primary action-link " onclick="modifiermagasin(${magasin.id})">Modifier</a>&emsp; 
                    <a  class="text-primary action-link" onclick="voirDetails(${magasin.id})">Details</a>  &emsp;
                    <a  class="text-primary action-link" onclick="supprimermagasin(${magasin.id})">Supprimer</a>
                </td>
            </tr>
        `);
    });
}
function paginationSetup() {
    const totalPage=Math.ceil(magasins.length/magasinParPage);
    const $pagination=$('#pagination');

    $pagination.empty();

    for(let i=1;i<=totalPage;i++){
        const $pagemagasin=$(`
            <li class="page-item ${i===pageActive? "active":""}">
                <a class="page-link" href="#">${i}</a>
            </li>
        `);

        $pagemagasin.on("click",()=>{
            pageActive=i;
            affichermagasins();
            paginationSetup();
        });
        $pagination.append($pagemagasin);
    }

}

function modifiermagasin(id){
    const magasin=magasins.find(p=>p.id===id);
    if(magasin){
        $("#ModifierTitre").text(magasin.NomDuMagasin);
        $("#modalModifierBody").html(`
                
                <div class="col-md-8">
                    <form id="modifierForm">
                    <div class="mb-3">
                            <label for="magasinNom" class="form-label">Nom magasin</label>
                            <input type="text" class="form-control" id="magasinNom" value="${magasin.NomDuMagasin}">
                    </div>
                        <div class="mb-3">
                            <label for="magasinProprietaire" class="form-label">Nom du Proprietaire</label>
                            <input type="text" class="form-control" id="magasinProprietaire" value="${magasin.NomDuProprietaire}">
                        </div>
                        <div class="mb-3">
                            <label for="magasinGerant" class="form-label">Nom du Gerant</label>
                            <input type="text" class="form-control" id="magasinGerant" value="${magasin.NomDuGerant}">
                        </div>
                        <div class="mb-3">
                            <label for="magasinAdresse" class="form-label">Adresse</label>
                            <input type="text" class="form-control" id="magasinAdresse" value="${magasin.Adresse}">
                        </div>
                        <div class="mb-3">
                            <label for="magasinVille" class="form-label">Ville</label>
                            <input type="text" class="form-control" id="magasinVille" value="${magasin.Ville}">
                        </div>
                        <div class="mb-3">
                            <label for="magasinCode" class="form-label">Code Postal</label>
                            <input type="text" class="form-control" id="magasinCode" value="${magasin.CodePostal}">
                        </div>
                        
                        <div class="mb-3">
                            <label for="magasinEmail" class="form-label">Email</label>
                            <input type="text" class="form-control" id="magasinEmail" value="${magasin.Email}">
                        </div>
                         <div class="mb-3">
                            <label for="magasinPhone" class="form-label">Téléphone</label>
                            <input type="text" class="form-control" id="magasinPhone" value="${magasin.Telephone}">
                        </div>
                        <div class="d-flex">
                        <button type="submit" class="btn btn-primary btn-save">Enregistrer</button>
                        
                        </div>
                    </form>
                </div>
           
        `);
        $("#modalModifier").modal("show");
    }else {
        console.error("magasin non trouvé: ",id);
    }
}
function voirDetails(id){
    const magasin=magasins.find(p=>p.id===id);
    if(magasin){
        $("#detailTitre").text(magasin.NomDuMagasin);
        $("#modalDetailBody").html(`
        <strong>Nom du magasin :</strong> ${magasin.NomDuMagasin}<br>
        <strong>Nom du propriétaire :</strong> ${magasin.NomDuProprietaire}<br>
        <strong>Nom du gérant :</strong> ${magasin.NomDuGerant}<br>
        <strong>Adresse :</strong> ${magasin.Adresse}<br>
        <strong>Ville :</strong> ${magasin.Ville}<br>
        
        <strong>Code Postal :</strong> ${magasin.CodePostal}<br>
       
        <strong>Email :</strong> ${magasin.Email}<br>
        <strong>Téléphone :</strong> ${magasin.Telephone}<br>
        
       `)
        $("#modalDetails").modal("show");
    }else {
        console.error("magasin non trouvé: ",id);
    }
}
function supprimermagasin(id){
    $("#modalDelete").modal("show");
}
document.addEventListener("DOMContentLoaded",loadData);


