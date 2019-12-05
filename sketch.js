var boardW;
var board, mana;
var colormap = [0, 20, 40, 60, 80];
var img_mana = [];
var img_mana_b = [];

var cell_row_clicked = undefined;
var cell_column_clicked = undefined;
var cell_row_dragged = undefined;
var cell_column_dragged = undefined;
var cell_row_clicked_ini = undefined;
var cell_column_clicked_ini = undefined;
var cell_row_blocked = "NO";
var cell_column_blocked = "NO";

var nb_moves = 0;
var disappearing = 0;


function preload() {
    spritesheet = loadImage("Ressources/spritesheet.png");
    spritesheet_b = loadImage("Ressources/spritesheet_b.png");
}


function setup() {
    createCanvas(windowWidth, windowWidth, P2D);
    boardW = windowWidth / 3;
    
    for (var i = 0; i < 5; i++) {
        img_mana[i] = spritesheet.get(200 * i, 0, 200, 200);
        img_mana_b[i] = spritesheet_b.get(200 * i, 0, 200, 200);
    }
    colorMode(HSB, 100);
    board = new Board();
    mana = new Mana();
    board.randomize();
}


function draw() {
    background(100);
    board.show();
    mana.show();
    fill(0);
    textSize(16);
    textAlign(CENTER,  CENTER)
    text("Moves = " + nb_moves, boardW/2, 70/100*boardW);
    if (!mouseIsPressed && disappearing == 0){board.check()};
}



function mousePressed() {
    if (disappearing == 0) {
        cell_row_clicked = floor(mouseY / (boardW/9));
        cell_row_clicked_ini = cell_row_clicked;
    
        cell_column_clicked = floor(mouseX / (boardW/9));
        cell_column_clicked_ini = cell_column_clicked;
    }
}

function mouseDragged() {
    if (disappearing == 0) {
        cell_row_dragged = floor(mouseY / (boardW/9));
        cell_column_dragged = floor(mouseX / (boardW/9));
        if (cell_row_dragged < cell_row_clicked && cell_row_blocked == "NO") {
            board.move(cell_row_clicked, cell_column_clicked, "UP");
            cell_row_clicked = cell_row_dragged;
            cell_column_blocked = "YES";
        } else if (cell_row_dragged > cell_row_clicked && cell_row_blocked == "NO") {
            board.move(cell_row_clicked, cell_column_clicked, "DOWN");
            cell_row_clicked = cell_row_dragged;
            cell_column_blocked = "YES";
        } else if (cell_column_dragged < cell_column_clicked && cell_column_blocked == "NO") {
            board.move(cell_row_clicked, cell_column_clicked, "LEFT");
            cell_column_clicked = cell_column_dragged;
            cell_row_blocked = "YES";
        } else if (cell_column_dragged > cell_column_clicked && cell_column_blocked == "NO") {
            board.move(cell_row_clicked, cell_column_clicked, "RIGHT");
            cell_column_clicked = cell_column_dragged;
            cell_row_blocked = "YES";
        }
    
        if (cell_row_dragged == cell_row_clicked_ini && cell_column_dragged == cell_column_clicked_ini) {
            cell_row_blocked = "NO";
            cell_column_blocked = "NO";
        }
    }
}

function mouseReleased() {
    if (disappearing == 0) {
        if (cell_row_dragged != undefined && (cell_row_dragged != cell_row_clicked_ini || cell_column_dragged != cell_column_clicked_ini)) {nb_moves++}
        cell_row_blocked = "NO";
        cell_column_blocked = "NO";
        cell_row_clicked = undefined;
        cell_column_clicked = undefined;
        cell_row_dragged = undefined;
        cell_column_dragged = undefined;
        cell_row_clicked_ini = undefined;
        cell_column_clicked_ini = undefined;
    }
}