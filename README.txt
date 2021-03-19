variables :
int pieceGrid[64]; //tableau des pièces sur chaque case de l'échiquier
int intGrid[64]; //tableau qui indique pour chaque case de l'échiquier si elle est occupée (blanc/noir) ou vide
int valueGrid[64]; //tableau qui indique pour chaque case de l'échiquier la valeur de la pièce qui l'occupe (0 si vide)
int savedGrids[4][64]; //mémorise les 4 derniers tours

int computeurIntelligence = 4; //niveau d'intelligence de l'IA adverse
int playerIntelligence = 4; //niveau de l'intelligence de l'IA joueur (si mode IA joueur activé)

fonctions :
void setGrid(int choice); //Permet de charger une grille de jeu prédéfinie
void printGrid(); //Permet de rafraichir l'affichage de la grille de jeu
bool playerPlay(); //Permet au joueur humain de jouer son tour
bool playerAIPlay(); //Permet à l'IA joueur de jouer son tour
bool computerPlay(); //Permet à l'adversaire de jouer
int isInList(int value, int myList[], int length); //Permet de retourner l'indice d'une valeur dans une liste, -1 si absente de la liste
void initList(int value, int myList[], int length);
void pieceRange(int pieceRepresentation, int pieceIndex, int moveRange[], int attackRange[], int mode); //Permet de déterminer la portée d'une pièce en déplacement et attaque
int choosePiece(int team); //Permet de cliquer sur la pièce à déplacer (si elle est de notre équipe)
int choosedestination(int myIndex, int destination); //Permet de choisir la case sur laquelle on a cliqué et sur laquelle on veut déplacer la pièce
void movePiece(int pieceIndex, int destination); //Permet de déplacer la pièce de sa case de départ à la case choisie
void save(); //Permet de sauvegarder la partie
void rememberGrids(); //???
void redo(); //Permet d'annuler son coup et de revenir une étape en arrière
bool play = true; //Permet de déterminer si on veut continuer à jouer
bool endGame = true; //Permet de déterminer si la partie en cours continue
