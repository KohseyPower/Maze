// Fonction qui initialise les cellules dans la grilles
function créerGrille(x) {
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < x; j++) {
            let cellule = document.createElement("div");
            cellule.classList.add("cellule");
            cellule.classList.add("cellLigne" + i);
            cellule.classList.add("cellColonne" + j);
            cellule.classList.add("nonVisitée");
            document.querySelector(".grille").appendChild(cellule);
        };
    };
};

//fonction qui crée le labyrinthe (Recursive implementation Depth-first Search)

function voisinsNonVisitésCondition(cellule, ligne, colonne, max) {
    let arrV = [];
    // Selecteurs des voisins autour de la cellule donné en argument
    let colonneDroit = colonne + 1;
    if (colonneDroit >= 0 && colonneDroit < max) {
        let voisinDroit = document.querySelector(".cellLigne" + ligne + ".cellColonne" + colonneDroit);
        arrV.push(voisinDroit);
    }
    let ligneBas = ligne + 1;
    if (ligneBas >= 0 && ligneBas < max) {
        let voisinBas = document.querySelector(".cellLigne" + ligneBas + ".cellColonne" + colonne);
        arrV.push(voisinBas);
    }
    let colonneGauche = colonne - 1;
    if (colonneGauche >= 0 && colonneGauche < max) {
        let voisinGauche = document.querySelector(".cellLigne" + ligne + ".cellColonne" + colonneGauche);
        arrV.push(voisinGauche);
    }
    let ligneHaut = ligne - 1;
    if (ligneHaut >= 0 && ligneHaut < max) {
        let voisinHaut = document.querySelector(".cellLigne" + ligneHaut + ".cellColonne" + colonne);
        arrV.push(voisinHaut);
    }

    if (arrV.length > 0) {
        for (let v of arrV) {
            for (let e of v.classList) {
                if (e === "nonVisitée") {
                    return true;
                }
            }
        }
    }


    return false;


}

function voisinsNonVisités(cellule, ligne, colonne, max) {
    let arrV = [];
    // Selecteurs des voisins autour de la cellule donné en argument
    let colonneDroit = colonne + 1;
    if (colonneDroit >= 0 && colonneDroit < max) {
        let voisinDroit = document.querySelector(".cellLigne" + ligne + ".cellColonne" + colonneDroit);
        arrV.push(voisinDroit);
    }
    let ligneBas = ligne + 1;
    if (ligneBas >= 0 && ligneBas < max) {
        let voisinBas = document.querySelector(".cellLigne" + ligneBas + ".cellColonne" + colonne);
        arrV.push(voisinBas);
    }
    let colonneGauche = colonne - 1;
    if (colonneGauche >= 0 && colonneGauche < max) {
        let voisinGauche = document.querySelector(".cellLigne" + ligne + ".cellColonne" + colonneGauche);
        arrV.push(voisinGauche);
    }
    let ligneHaut = ligne - 1;
    if (ligneHaut >= 0 && ligneHaut < max) {
        let voisinHaut = document.querySelector(".cellLigne" + ligneHaut + ".cellColonne" + colonne);
        arrV.push(voisinHaut);
    }



    let listeV = [];

    for (let v of arrV) {
        for (let e of v.classList) {
            if (e === "nonVisitée") {
                listeV.push(v);
            }
        }
    }

    return listeV;


}

function enleverMurs(celActuelle, celVoisine, numeroLigneA, numeroColonneA) {
    let numeroLigneV;
    let numeroColonneV;
    // récupère la ligne et la colonne du voisin
    for (let e of celActuelle.classList) {
        for (let v of celVoisine.classList) {
            //regarde les classes qui se matchent
            if (e === v) {
                //regarde si c'est une classe cellLigne[nombre] ou cellColonne[nombre]
                if (/^cellLigne\d+$/.test(e) === true) {
                    // la cellule actuelle et sa voisine son sur la meme ligne
                    numeroLigneV = parseInt(e.substr(9));
                    numeroColonneV;

                    //recherche du numeroColone Voisin
                    for (let f of celVoisine.classList) {
                        if (/^cellColonne\d+$/.test(f) === true) {
                            numeroColonneV = parseInt(f.substr(11));
                        }
                    }



                    // regarde si c'est un voisin du dessous ou du dessus

                }

                if (/^cellColonne\d+$/.test(e) === true) {
                    // la cellule actuelle et sa voisine son sur la meme colonne
                    numeroColonneV = parseInt(e.substr(11));
                    numeroLigneV;

                    //recherche du numeroLigne Voisin
                    for (let f of celVoisine.classList) {
                        if (/^cellLigne\d+$/.test(f) === true) {
                            numeroLigneV = parseInt(f.substr(9));
                        }
                    }


                }
            }
        }
    }
    /*
    console.log("Information celActuelle : ");
    console.log(numeroLigneA);
    console.log(numeroColonneA);
    console.log("Information celVoisine : ");
    console.log(numeroLigneV);
    console.log(numeroColonneV);*/
    // Détruisons le mur
    if (numeroLigneA === numeroLigneV) {
        if (numeroColonneA < numeroColonneV) {
            celActuelle.style.borderRight = "none";
            celVoisine.style.borderLeft = "none";
        } else {
            celActuelle.style.borderLeft = "none";
            celVoisine.style.borderRight = "none";
        }
    } else {
        if (numeroLigneA < numeroLigneV) {
            celActuelle.style.borderBottom = "none";
            celVoisine.style.borderTop = "none";
        } else {
            celActuelle.style.borderTop = "none";
            celVoisine.style.borderBottom = "none";
        }
    }
}

function presenceCelluleNonVisitée() {
    let arrCells = document.querySelectorAll(".grille > .cellule");
    for (e of arrCells) {
        for (c of e.classList) {
            if (c === "nonVisitée") {
                return true;
            }
        }
    }
    return false;
}

function miseAJourLigne(cell, ligne) {
    for (e of cell.classList) {
        if (/^cellLigne\d+$/.test(e) === true) {
            return parseInt(e.substr(9));
        }
    }
}

function miseAJourColonne(cell, colonne) {
    for (e of cell.classList) {
        if (/^cellColonne\d+$/.test(e) === true) {
            return parseInt(e.substr(11));
        }
    }
}

let ligneActuelle = 0;
let colonneActuelle = 0;

function labyrinthe(x) {
    let pile = [];
    let celluleActuelle = document.querySelector(".cellLigne" + ligneActuelle + ".cellColonne" + colonneActuelle);
    celluleActuelle.classList.remove("nonVisitée");
    while (presenceCelluleNonVisitée() === true) {

        //tant que toutes les cellules n'ont pas encore été visitées
        if (voisinsNonVisitésCondition(celluleActuelle, ligneActuelle, colonneActuelle, x) === true) {
            listeVoisins = voisinsNonVisités(celluleActuelle, ligneActuelle, colonneActuelle, x);
            randomVoisin = listeVoisins[Math.floor(Math.random() * listeVoisins.length)];
            // enlève les murs entre la cellule actuelle et sa voisine
            enleverMurs(celluleActuelle, randomVoisin, ligneActuelle, colonneActuelle);
            // met dans la pile le voisin
            pile.push(randomVoisin);
            //le voisin est la cellule actuelle
            celluleActuelle = randomVoisin;

            //la cellule Actuelle est visitée
            celluleActuelle.classList.remove("nonVisitée");

            //mettre à jour les valeurs de ligneActuelle et colonneActuelle
            ligneActuelle = miseAJourLigne(celluleActuelle, ligneActuelle);
            colonneActuelle = miseAJourColonne(celluleActuelle, colonneActuelle);

        } else if (pile.length > 0) {
            // enleve le dernier element de la pile
            pile.pop();
            // faire le dernier element de la pile la cellule actuelle
            celluleActuelle = pile[pile.length - 1];
            //mettre à jour les valeurs de ligneActuelle et colonneActuelle
            ligneActuelle = miseAJourLigne(celluleActuelle, ligneActuelle);
            colonneActuelle = miseAJourColonne(celluleActuelle, colonneActuelle);
        }
    }

}

function réinitialiser() {
    let arrCells = document.querySelectorAll(".grille > .cellule");

    for (e of arrCells) {
        // remet la classe nonVisitée à toutes les cellules de la grille
        e.classList.add("nonVisitée");
        // remet toutes les bordures de la cellule
        e.style.border = "0.12rem solid black";
    }
}


const LONGUEURE = 16;
window.onload = function() {
    créerGrille(LONGUEURE);
    labyrinthe(LONGUEURE);
}

document.querySelector(".générer").addEventListener('click', (event) => {
    réinitialiser();
    labyrinthe(LONGUEURE);
});