var GRIDSIZE = 60 // nombre de cellules par Lignes/Colonnes

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function init(){
    //initialise le tableau qui contient chaque élément
    var tab = new Array(GRIDSIZE);
    var NBAdj = new Array(GRIDSIZE);
    for (var i = 0; i < tab.length; i++) {
        tab[i] = new Array(GRIDSIZE);
        NBAdj[i] = new Array(GRIDSIZE);
        for (var j = 0; j < tab[i].length; j++) {
            tab[i][j] = 0;
        }
    }

    //choisis aléatoirement le pattern de début
    loadPattern(getRandomInt(4), tab)

    //initialise le Canvas
    var golCanvas = document.getElementById('golCanvas')
    if (golCanvas.getContext) {
        var canvas = golCanvas.getContext('2d')
    }
    canvas.sqrSize = golCanvas.width/GRIDSIZE

    //répete la fonction toute les 100 millisecondes
    setInterval(updateCanvas, 100, canvas, tab, NBAdj)
}

function updateCanvas(canvas, tab, NBAdj){
    //calcul la position de chaque case
    updatePos(tab, NBAdj)

    //efface le contenu du canvas
    canvas.clearRect(0, 0, canvas.sqrSize * GRIDSIZE, canvas.sqrSize * GRIDSIZE)
    
    //affiche chaque case
    draw(canvas, tab)

}

function updatePos(tab, NBAdj){
    //calcul le nombre de cases adjacentes pour chaque case
    for (var i = 0; i < tab.length; i++) {
        for (var j = 0; j < tab[i].length; j++) {
            NBAdj[i][j] = NbCasesAdj(i,j,tab);
        }
    }

    //calcul l'état de chaque cellule
    for (var i = 0; i < tab.length; i++) {
        for (var j = 0; j < tab[i].length; j++) {
            if(tab[i][j]==1){
                switch(NBAdj[i][j]){
                    case 2:
                    case 3:
                        tab[i][j] = 1
                        break
                    default:
                        tab[i][j] = 0
                }
            }
            if(tab[i][j]==0){
                tab[i][j] = NBAdj[i][j] == 3 ? 1 : 0;
            }
        }
    }
}

//Est vrai si les coordonées sont dans la grille
function IsInRange (ligne, colonne) 
{
	return (ligne<GRIDSIZE) && (colonne<GRIDSIZE) && (colonne>0) && (ligne>0)
}

//retourne le nombre de cases adjacentes vivantes
function NbCasesAdj (ligne,colonne,tab)
{
	var t=0
	if (IsInRange(ligne+1,colonne+1) && tab[ligne+1][colonne+1])
		t++
	if (IsInRange(ligne+1,colonne) && tab[ligne+1][colonne])
		t++
	if (IsInRange(ligne+1,colonne-1) && tab[ligne+1][colonne-1])
		t++
	if (IsInRange(ligne-1,colonne+1) && tab[ligne-1][colonne+1])
		t++
	if (IsInRange(ligne-1,colonne) && tab[ligne-1][colonne])
		t++
	if (IsInRange(ligne-1,colonne-1) && tab[ligne-1][colonne-1])
		t++
	if (IsInRange(ligne,colonne+1) && tab[ligne][colonne+1])
		t++
	if (IsInRange(ligne,colonne-1) && tab[ligne][colonne-1])
		t++
	return t
}

//pour chaque cellules affiche si elle sont en vie un rectangle
function draw(canvas, tab){
    for(var x = 0; x < GRIDSIZE; x++){
        for(var y  = 0; y < GRIDSIZE; y++){
            if(tab[x][y])
                roundedRectangle(canvas, x, y)
        }
    }
}

//Permet d'afficher un rectangle arrondi aux coordonées X et Y
//avec un taille définie par le nombre de cellule et la taille du canvas  
function roundedRectangle(context, x, y)
{
	x *= context.sqrSize
	y *= context.sqrSize
    w = context.sqrSize
    h = w
    var mx = x + w / 2;
    var my = y + h / 2
    context.beginPath()
    context.strokeStyle='rgb(' + (x*120/255) + ',' + (y*120/255) + ',' + (1000 - (x + y)*240/255) + ')' 
    context.lineWidth="3"
    context.moveTo(x,my)
    context.quadraticCurveTo(x, y, mx, y)
    context.quadraticCurveTo(x+w, y, x+w, my)
    context.quadraticCurveTo(x+w, y+h, mx, y+h)
    context.quadraticCurveTo(x, y+h, x, my)
    context.stroke()
}


//les différents pattern qui peuvent être choisis au chargement de la page
function loadPattern(forme, tab){
    if(forme==0){
        tab[GRIDSIZE/2-1][GRIDSIZE/2-1] = 1
        tab[GRIDSIZE/2-1][GRIDSIZE/2+1] = 1
        tab[GRIDSIZE/2][GRIDSIZE/2-1] = 1
        tab[GRIDSIZE/2][GRIDSIZE/2+1] = 1
        tab[GRIDSIZE/2+1][GRIDSIZE/2] = 1
        tab[GRIDSIZE/2+1][GRIDSIZE/2-1] = 1
        tab[GRIDSIZE/2+1][GRIDSIZE/2+1] = 1
    }

    //Pattern aléatoire
    if(forme==1){
        for(var x = 0; x < GRIDSIZE; x++){
            for(var y  = 0; y < GRIDSIZE; y++){
                tab[x][y] = getRandomInt(2)
            }
        }
    } 

    if(forme == 2){
        tab[GRIDSIZE/2 + 2][GRIDSIZE/2 + 3] = 1
        tab[GRIDSIZE/2 + 1][GRIDSIZE/2 + 4] = 1
        tab[GRIDSIZE/2 + 1][GRIDSIZE/2 + 5] = 1
        tab[GRIDSIZE/2 + 1][GRIDSIZE/2 + 6] = 1
        tab[GRIDSIZE/2 + 2][GRIDSIZE/2 + 6] = 1
        tab[GRIDSIZE/2 + 3][GRIDSIZE/2 + 5] = 1
        tab[GRIDSIZE/2 + 3][GRIDSIZE/2 + 4] = 1
        tab[GRIDSIZE/2 + 4][GRIDSIZE/2 + 4] = 1
        
        tab[GRIDSIZE/2 + 3][GRIDSIZE/2 - 2] = 1
        tab[GRIDSIZE/2 + 4][GRIDSIZE/2 - 1] = 1
        tab[GRIDSIZE/2 + 5][GRIDSIZE/2 - 1] = 1
        tab[GRIDSIZE/2 + 6][GRIDSIZE/2 - 1] = 1
        tab[GRIDSIZE/2 + 6][GRIDSIZE/2 - 2] = 1
        tab[GRIDSIZE/2 + 5][GRIDSIZE/2 - 3] = 1
        tab[GRIDSIZE/2 + 4][GRIDSIZE/2 - 3] = 1
        tab[GRIDSIZE/2 + 4][GRIDSIZE/2 - 4] = 1
        
        tab[GRIDSIZE/2 - 2][GRIDSIZE/2 - 3] = 1
        tab[GRIDSIZE/2 - 1][GRIDSIZE/2 - 4] = 1
        tab[GRIDSIZE/2 - 1][GRIDSIZE/2 - 5] = 1
        tab[GRIDSIZE/2 - 1][GRIDSIZE/2 - 6] = 1
        tab[GRIDSIZE/2 - 2][GRIDSIZE/2 - 6] = 1
        tab[GRIDSIZE/2 - 3][GRIDSIZE/2 - 5] = 1
        tab[GRIDSIZE/2 - 3][GRIDSIZE/2 - 4] = 1
        tab[GRIDSIZE/2 - 4][GRIDSIZE/2 - 4] = 1
        
        tab[GRIDSIZE/2 - 3][GRIDSIZE/2 + 2] = 1
        tab[GRIDSIZE/2 - 4][GRIDSIZE/2 + 1] = 1
        tab[GRIDSIZE/2 - 5][GRIDSIZE/2 + 1] = 1
        tab[GRIDSIZE/2 - 6][GRIDSIZE/2 + 1] = 1
        tab[GRIDSIZE/2 - 6][GRIDSIZE/2 + 2] = 1
        tab[GRIDSIZE/2 - 5][GRIDSIZE/2 + 3] = 1
        tab[GRIDSIZE/2 - 4][GRIDSIZE/2 + 3] = 1
        tab[GRIDSIZE/2 - 4][GRIDSIZE/2 + 4] = 1
    }

    if(forme == 3){
    	tab[GRIDSIZE/2 - 1][GRIDSIZE/2 + 3] = 1
    	tab[GRIDSIZE/2][GRIDSIZE/2 + 3] = 1
    	tab[GRIDSIZE/2 + 1][GRIDSIZE/2 + 3] = 1
    	tab[GRIDSIZE/2 + 2][GRIDSIZE/2 + 3] = 1
    	tab[GRIDSIZE/2 + 3][GRIDSIZE/2 + 3] = 1
    	tab[GRIDSIZE/2 + 4][GRIDSIZE/2 + 3] = 1
    	tab[GRIDSIZE/2 - 1][GRIDSIZE/2 + 4] = 1
    	tab[GRIDSIZE/2][GRIDSIZE/2 + 4] = 1
    	tab[GRIDSIZE/2 + 1][GRIDSIZE/2 + 4] = 1
    	tab[GRIDSIZE/2 + 2][GRIDSIZE/2 + 4] = 1
    	tab[GRIDSIZE/2 + 3][GRIDSIZE/2 + 4] = 1
    	tab[GRIDSIZE/2 + 4][GRIDSIZE/2 + 4] = 1

    	tab[GRIDSIZE/2 + 3][GRIDSIZE/2 + 1] = 1
    	tab[GRIDSIZE/2 + 3][GRIDSIZE/2] = 1
    	tab[GRIDSIZE/2 + 3][GRIDSIZE/2 - 1] = 1
    	tab[GRIDSIZE/2 + 3][GRIDSIZE/2 - 2] = 1
    	tab[GRIDSIZE/2 + 3][GRIDSIZE/2 - 3] = 1
    	tab[GRIDSIZE/2 + 3][GRIDSIZE/2 - 4] = 1
    	tab[GRIDSIZE/2 + 4][GRIDSIZE/2 + 1] = 1
    	tab[GRIDSIZE/2 + 4][GRIDSIZE/2] = 1
    	tab[GRIDSIZE/2 + 4][GRIDSIZE/2 - 1] = 1
    	tab[GRIDSIZE/2 + 4][GRIDSIZE/2 - 2] = 1
    	tab[GRIDSIZE/2 + 4][GRIDSIZE/2 - 3] = 1
    	tab[GRIDSIZE/2 + 4][GRIDSIZE/2 - 4] = 1

    	tab[GRIDSIZE/2 + 1][GRIDSIZE/2 - 3] = 1
    	tab[GRIDSIZE/2][GRIDSIZE/2 - 3] = 1
    	tab[GRIDSIZE/2 - 1][GRIDSIZE/2 - 3] = 1
    	tab[GRIDSIZE/2 - 2][GRIDSIZE/2 - 3] = 1
    	tab[GRIDSIZE/2 - 3][GRIDSIZE/2 - 3] = 1
    	tab[GRIDSIZE/2 - 4][GRIDSIZE/2 - 3] = 1
    	tab[GRIDSIZE/2 + 1][GRIDSIZE/2 - 4] = 1
    	tab[GRIDSIZE/2][GRIDSIZE/2 - 4] = 1
    	tab[GRIDSIZE/2 - 1][GRIDSIZE/2 - 4] = 1
    	tab[GRIDSIZE/2 - 2][GRIDSIZE/2 - 4] = 1
    	tab[GRIDSIZE/2 - 3][GRIDSIZE/2 - 4] = 1
    	tab[GRIDSIZE/2 - 4][GRIDSIZE/2 - 4] = 1

    	tab[GRIDSIZE/2 - 3][GRIDSIZE/2 - 1] = 1
    	tab[GRIDSIZE/2 - 3][GRIDSIZE/2] = 1
    	tab[GRIDSIZE/2 - 3][GRIDSIZE/2 + 1] = 1
    	tab[GRIDSIZE/2 - 3][GRIDSIZE/2 + 2] = 1
    	tab[GRIDSIZE/2 - 3][GRIDSIZE/2 + 3] = 1
    	tab[GRIDSIZE/2 - 3][GRIDSIZE/2 + 4] = 1
    	tab[GRIDSIZE/2 - 4][GRIDSIZE/2 - 1] = 1
    	tab[GRIDSIZE/2 - 4][GRIDSIZE/2] = 1
    	tab[GRIDSIZE/2 - 4][GRIDSIZE/2 + 1] = 1
    	tab[GRIDSIZE/2 - 4][GRIDSIZE/2 + 2] = 1
    	tab[GRIDSIZE/2 - 4][GRIDSIZE/2 + 3] = 1
    	tab[GRIDSIZE/2 - 4][GRIDSIZE/2 + 4] = 1
    }
}
