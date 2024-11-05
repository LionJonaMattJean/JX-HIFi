document.addEventListener("DOMContentLoaded", function () {
    // Récupération des éléments
    const lessBtn = document.querySelector(".lessQty");
    const plusBtn = document.querySelector(".plusQty");
    const qtyInput = document.querySelector(".txtQty");

    // Gestionnaire de clic pour le bouton "lessQty"
    lessBtn.addEventListener("click", function () {
        let currentQty = parseInt(qtyInput.value);
        if (currentQty > 1) { // Empêche d'aller en dessous de 1
            qtyInput.value = currentQty - 1;
        }
    });

    // Gestionnaire de clic pour le bouton "plusQty"
    plusBtn.addEventListener("click", function () {
        let currentQty = parseInt(qtyInput.value);
        qtyInput.value = currentQty + 1;
    });
});