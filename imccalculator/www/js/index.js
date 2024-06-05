function calculerImc() {
    const poids = document.getElementById('poids').value;
    const taille = document.getElementById('taille').value;

    if (poids && taille) {
        const imc = poids / Math.pow(taille, 2);
        let message = 'Vous êtes en état ';

        if (imc < 16.5) {
            message += 'de dénutrition';
        }
        else if (imc >= 16.5 && imc < 18.5) {
            message += 'de maigreur';
        }
        else if (imc >= 18.5 && imc < 25) {
            message = 'Vous avez un poids normal';
        }
        else if (imc >= 25 && imc < 30) {
            message += 'de surpoids';
        }
        else if (imc >= 30 && imc < 35) {
            message += 'd\'obésité modérée';
        }
        else if (imc >= 35 && imc < 40) {
            message += 'd\'obésité sévère';
        }
        else {
            message += 'd\'obésité morbide ou massive';
        }

        const interpretation = document.getElementById('interpretation');
        interpretation.innerHTML = `Votre IMC est : ${imc.toFixed(2)}<hr>${message}`;
        interpretation.parentNode.hidden = false;
    } else {
        alert("Veuillez entrer votre poids et taille.");
    }
}
