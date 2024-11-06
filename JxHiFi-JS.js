// Tableau des produits dynamiques
const products = [
    { image: 'image1.jpg', description: 'Description du produit 1' },
    { image: 'image2.jpg', description: 'Description du produit 2' },
    { image: 'image3.jpg', description: 'Description du produit 3' }
    // Ajoutez d'autres produits ici
];

// Fonction pour remplir le tableau des produits
function loadProducts() {
    const tableBody = document.getElementById('productTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Vider le tableau pour réinitialiser

    products.forEach(product => {
        const row = document.createElement('tr');

        const imgCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.description;
        img.classList.add('img-fluid');
        imgCell.appendChild(img);

        const descCell = document.createElement('td');
        descCell.textContent = product.description;

        row.appendChild(imgCell);
        row.appendChild(descCell);
        tableBody.appendChild(row);
    });
}

// Charger les produits au chargement de la page
document.addEventListener('DOMContentLoaded', loadProducts);

document.getElementById('memeAdress').addEventListener('change', function() {
    var livraisonFields = document.getElementById('livraisonFields');
    livraisonFields.style.display = this.checked ? 'none' : 'block';
});