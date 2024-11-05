const products = [
    { "id": 1, "nom": "Smartphone", "coutant": 500, "prix_vente": 799, "quantite": 20 },
    { "id": 2, "nom": "Laptop", "coutant": 700, "prix_vente": 1100, "quantite": 15 },
    { "id": 3, "nom": "Wireless Earbuds", "coutant": 80, "prix_vente": 150, "quantite": 50 },
    { "id": 4, "nom": "Smartwatch", "coutant": 120, "prix_vente": 250, "quantite": 30 },
    { "id": 5, "nom": "Gaming Console", "coutant": 300, "prix_vente": 499, "quantite": 10 },
    { "id": 6, "nom": "Bluetooth Speaker", "coutant": 45, "prix_vente": 99, "quantite": 40 },
    { "id": 7, "nom": "Tablet", "coutant": 200, "prix_vente": 350, "quantite": 25 },
    { "id": 8, "nom": "External Hard Drive", "coutant": 60, "prix_vente": 120, "quantite": 35 },
    { "id": 9, "nom": "Digital Camera", "coutant": 800, "prix_vente": 1200, "quantite": 8 },
    { "id": 10, "nom": "Smart Home Hub", "coutant": 90, "prix_vente": 150, "quantite": 20 }
];


const ctx = document.getElementById('salesChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: products.map(product => product.nom),
        datasets: [
            {
                label: 'Sale Price ($)',
                data: products.map(product => product.prix_vente),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Quantity',
                data: products.map(product => product.quantité),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


// Calculating Sales Revenue and Profit
const labels = products.map(product => product.nom);
const salesRevenue = products.map(product => product.prix_vente * product.quantite);
const profit = products.map(product => (product.prix_vente - product.coutant) * product.quantite);

// Setting up the chart
const ctx2 = document.getElementById('profitSalesChart').getContext('2d');
const chart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Sales Revenue ($)',
                data: salesRevenue,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Profit ($)',
                data: profit,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += `$${context.parsed.y.toFixed(2)}`;
                        return label;
                    }
                }
            }
        }
    }
});
