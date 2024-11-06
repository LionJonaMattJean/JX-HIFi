const utilisateurParPage=10;
let pageActive=1;
let utilisateurs=[];




async function loadData(){
    try{
        const reponse=await fetch('./src/utilisateurs.json');
        utilisateurs=await reponse.json();

    }catch(error) {
        console.log("Erreur chargement donné: ",error);
    }
    afficherUtilisateurs();
    paginationSetup();
}

function afficherUtilisateurs(){
    const debut=(pageActive-1)*utilisateurParPage;
    const fin=debut+utilisateurParPage;
    const utilisateursAfficher=utilisateurs.slice(debut,fin);

    const $tableBody=$("#table-body");
    $tableBody.empty();
    utilisateursAfficher.forEach(utilisateur =>{

        $tableBody.append(`      
            <tr>
                <td>${utilisateur.id}</td>
                <td>${utilisateur.username}</td>
                <td>${utilisateur.nom}</td>
                <td>${utilisateur.prenom}</td>
                <td>${utilisateur.adresse}</td>
                <td>${utilisateur.ville}</td>
                <td>${utilisateur.codepostal}</td>
                 <td>${utilisateur.email}</td>
                <td>${utilisateur.phone}</td>
               
                
                <td>
                    <a  class="text-primary action-link " onclick="modifierUtilisateur(${utilisateur.id})">Modifier</a>&emsp; 
                    <a  class="text-primary action-link" onclick="voirDetails(${utilisateur.id})">Details</a>  &emsp;
                    <a  class="text-primary action-link" onclick="supprimerUtilisateur(${utilisateur.id})">Supprimer</a>
                </td>
            </tr>
        `);
    });
}
function paginationSetup() {
    const totalPage=Math.ceil(utilisateurs.length/utilisateurParPage);
    const $pagination=$('#pagination');

    $pagination.empty();

    for(let i=1;i<=totalPage;i++){
        const $pageutilisateur=$(`
            <li class="page-item ${i===pageActive? "active":""}">
                <a class="page-link" href="#">${i}</a>
            </li>
        `);

        $pageutilisateur.on("click",()=>{
            pageActive=i;
            afficherUtilisateurs();
            paginationSetup();
        });
        $pagination.append($pageutilisateur);
    }

}

function modifierUtilisateur(id){
    const utilisateur=utilisateurs.find(p=>p.id===id);
    if(utilisateur){
        $("#ModifierTitre").text(utilisateur.nom);
        $("#modalModifierBody").html(`
                
                <div class="col-md-8">
                    <form id="modifierForm">
                    <div class="mb-3">
                            <label for="utilisateurUser" class="form-label">Nom Utilisateur</label>
                            <input type="text" class="form-control" id="utilisateurUser" value="${utilisateur.username}">
                    </div>
                        <div class="mb-3">
                            <label for="utilisateurNom" class="form-label">Nom</label>
                            <input type="text" class="form-control" id="utilisateurNom" value="${utilisateur.nom}">
                        </div>
                        <div class="mb-3">
                            <label for="utilisateurPrenom" class="form-label">Prenom</label>
                            <input type="text" class="form-control" id="utilisateurPrenom" value="${utilisateur.prenom}"></input>
                        </div>
                        <div class="mb-3">
                            <label for="utilisateurAdresse" class="form-label">Adresse</label>
                            <input type="text" class="form-control" id="utilisateurAdresse" value="${utilisateur.adresse}">
                        </div>
                        <div class="mb-3">
                            <label for="utilisateurProvince" class="form-label">Province</label>
                            <input type="text" class="form-control" id="utilisateurProvince" value="${utilisateur.province}">
                        </div>
                        <div class="mb-3">
                            <label for="utilisateurCode" class="form-label">Code Postal</label>
                            <input type="text" class="form-control" id="utilisateurCode" value="${utilisateur.codepostal}">
                        </div>
                        <div class="mb-3">
                            <label for="utilisateurPays" class="form-label">Pays</label>
                            <input type="text" class="form-control" id="utilisateurPays" value="${utilisateur.pays}">
                        </div>
                           <div class="mb-3">
                            <label for="utilisateurEmail" class="form-label">Email</label>
                            <input type="text" class="form-control" id="utilisateurEmail" value="${utilisateur.email}">
                        </div>
                         <div class="mb-3">
                            <label for="utilisateurPhone" class="form-label">Téléphone</label>
                            <input type="text" class="form-control" id="utilisateurPhone" value="${utilisateur.phone}">
                        </div>
                        <div class="d-flex">
                        <button type="submit" class="btn btn-primary btn-save">Enregistrer</button>
                        <button type="button" class="btn btn-warning ms-auto" data-bs-dismiss="modal">Reinitialiser mot de passe </button>
                        </div>
                    </form>
                </div>
           
        `);
        $("#modalModifier").modal("show");
    }else {
        console.error("utilisateur non trouvé: ",id);
    }
}
function voirDetails(id){
    const utilisateur=utilisateurs.find(p=>p.id===id);
    if(utilisateur){
        $("#detailTitre").text(utilisateur.nom);
        $("#modalDetailBody").html(`
       <strong>Nom d'utilisateur :</strong> ${utilisateur.username}<br>
        <strong>Nom :</strong> ${utilisateur.nom}<br>
        <strong>Prénom :</strong> ${utilisateur.prenom}<br>
        <strong>Adresse :</strong> ${utilisateur.adresse}<br>
        <strong>Ville :</strong> ${utilisateur.ville}<br>
        <strong>Province :</strong> ${utilisateur.province}<br>
        <strong>Code Postal :</strong> ${utilisateur.codepostal}<br>
        <strong>Pays :</strong> ${utilisateur.pays}<br>
        <strong>Email :</strong> ${utilisateur.email}<br>
        <strong>Téléphone :</strong> ${utilisateur.phone}<br>
        
       `)
        $("#modalDetails").modal("show");
    }else {
        console.error("utilisateur non trouvé: ",id);
    }
}
function supprimerUtilisateur(id){
    $("#modalDelete").modal("show");
}
document.addEventListener("DOMContentLoaded",loadData);


