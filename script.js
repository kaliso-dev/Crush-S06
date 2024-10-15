const couplesSpecifiques = [
    ["clément", "noah"],
    ["noah", "clément"],
    ["clément", "thomas"],
    ["thomas", "clément"],
    ["clément", "sofiene"],
    ["sofiene", "clément"],
    ["clément", "briac"],
    ["briac", "clément"],
    ["clément", "gabriel"],
    ["gabriel", "clément"],
    ["clément", "jules"],
    ["jules", "clément"],
    ["clément", "arthur"],
    ["arthur", "clément"],
    ["clément", "vadim"],
    ["vadim", "clément"],
    ["clément", "hyacinthe"],
    ["hyacinthe", "clément"],
    ["noah", "thomas"],
    ["thomas", "noah"],
    ["noah", "sofiene"],
    ["sofiene", "noah"],
    ["noah", "briac"],
    ["briac", "noah"],
    ["noah", "gabriel"],
    ["gabriel", "noah"],
    ["noah", "jules"],
    ["jules", "noah"],
    ["noah", "arthur"],
    ["arthur", "noah"],
    ["noah", "vadim"],
    ["vadim", "noah"],
    ["noah", "hyacinthe"],
    ["hyacinthe", "noah"],
    ["thomas", "sofiene"],
    ["sofiene", "thomas"],
    ["thomas", "briac"],
    ["briac", "thomas"],
    ["thomas", "gabriel"],
    ["gabriel", "thomas"],
    ["thomas", "jules"],
    ["jules", "thomas"],
    ["thomas", "arthur"],
    ["arthur", "thomas"],
    ["thomas", "vadim"],
    ["vadim", "thomas"],
    ["thomas", "hyacinthe"],
    ["hyacinthe", "thomas"],
    ["sofiene", "briac"],
    ["briac", "sofiene"],
    ["sofiene", "gabriel"],
    ["gabriel", "sofiene"],
    ["sofiene", "jules"],
    ["jules", "sofiene"],
    ["sofiene", "arthur"],
    ["arthur", "sofiene"],
    ["sofiene", "vadim"],
    ["vadim", "sofiene"],
    ["sofiene", "hyacinthe"],
    ["hyacinthe", "sofiene"],
    ["briac", "gabriel"],
    ["gabriel", "briac"],
    ["briac", "jules"],
    ["jules", "briac"],
    ["briac", "arthur"],
    ["arthur", "briac"],
    ["briac", "vadim"],
    ["vadim", "briac"],
    ["briac", "hyacinthe"],
    ["hyacinthe", "briac"],
    ["gabriel", "jules"],
    ["jules", "gabriel"],
    ["gabriel", "arthur"],
    ["arthur", "gabriel"],
    ["gabriel", "vadim"],
    ["vadim", "gabriel"],
    ["gabriel", "hyacinthe"],
    ["hyacinthe", "gabriel"],
    ["jules", "arthur"],
    ["arthur", "jules"],
    ["jules", "vadim"],
    ["vadim", "jules"],
    ["jules", "hyacinthe"],
    ["hyacinthe", "jules"],
    ["arthur", "vadim"],
    ["vadim", "arthur"],
    ["arthur", "hyacinthe"],
    ["hyacinthe", "arthur"],
    ["vadim", "hyacinthe"],
    ["hyacinthe", "vadim"],
    ["jules faure-cigagna", "susanne"],
    ["susanne", "jules faure-cigagna"],
    ["jules", "susanne"],
    ["susanne", "jules"],
    ["jules", "tecla"],
    ["tecla", "jules"],
    ["jules faure-cigagna", "tecla"],
    ["tecla", "jules faure-cigagna"],
    ["kakhi", "romy"],
    ["romy", "kakhi"],
    ["vadim", "adele"],
    ["adele", "vadim"]
];




// Fonction de hachage simple pour générer une valeur cohérente
function generateHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convertir en entier 32 bits
    }
    return Math.abs(hash);
}

function verifierCompatibilite() {
    let prenom1 = document.getElementById('prenom1').value.trim().toLowerCase();
    let prenom2 = document.getElementById('prenom2').value.trim().toLowerCase();

    if (!prenom1 || !prenom2) {
        document.getElementById('result').innerText = "Entrez deux prénoms !";
        return;
    }

    // Créer un tableau trié pour assurer la cohérence (indépendamment de l'ordre)
    const paire = [prenom1, prenom2].sort();

    // Vérifier si la paire est dans les couples spécifiques
    const estCoupleSpecifique = couplesSpecifiques.some(couple => {
        return couple[0] === paire[0] && couple[1] === paire[1];
    });

    let pourcentage;
    if (estCoupleSpecifique) {
        pourcentage = 100;  // 100% pour les couples spécifiques
    } else {
        // Générer une valeur de compatibilité basée sur le hachage
        const hash = generateHash(paire.join('-'));
        pourcentage = hash % 101;  // Pourcentage entre 0 et 100
    }

    // Messages basés sur le pourcentage
    let message;
    if (pourcentage < 20) {
        message = "Aïe, mieux vaut rester amis 😅";
    } else if (pourcentage < 50) {
        message = "Ça pourrait marcher avec un peu d'effort 🤔";
    } else if (pourcentage < 75) {
        message = "Belle alchimie, pourquoi pas ? 😏";
    } else {
        message = "Le couple parfait ! 😍";
    }

    // Mettre en majuscule la première lettre de chaque prénom
    const formatPrenom = (prenom) => prenom.charAt(0).toUpperCase() + prenom.slice(1);

    document.getElementById('result').innerText = `${formatPrenom(prenom1)} et ${formatPrenom(prenom2)} : ${pourcentage}% - ${message}`;
}
