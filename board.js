function Board() {
    this.values = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ];
    
    this.previous = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ];
    
    this.disappearing = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ];
    
    this.tinting = [
        [100,100,100,100,100,100,100,100,100],
        [100,100,100,100,100,100,100,100,100],
        [100,100,100,100,100,100,100,100,100],
        [100,100,100,100,100,100,100,100,100],
        [100,100,100,100,100,100,100,100,100]
    ];


    this.randomize = function () {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 9; j++) {
                this.values[i][j] = Math.floor(Math.random() * Math.floor(5));
                this.previous[i][j] = this.values[i][j];
            }
        }
    }

    
    this.show = function () {
        imageMode(CENTER);
        
        strokeWeight(2);
        // FIRST ROW
        for (var j = 0; j < 9; j++) {
                if (disappearing == 0) {
                    this.previous[0][j] = this.values[0][j];
                }
            tint(100, 80);
            image(img_mana_b[this.previous[0][j]], j*(boardW/9)+(boardW/18), boardW/18, (boardW/9)-4, (boardW/9)-4)
        }
        
        // OTHER ROWS
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 9; j++) {        
                var decal = 0;
                noTint();
                if ((cell_row_blocked == "NO" && j == cell_column_clicked) || (cell_column_blocked == "NO" && i == cell_row_clicked)) {
                    decal = 4;
                } else if (mouseIsPressed){
                    tint(50, 70);
                }
                
                if (disappearing == 0) {
                    this.previous[i][j] = this.values[i][j];
                }
                
                if (this.disappearing[i][j] == 1) {
                    this.tinting[i][j] -= 10;
                    if (this.tinting[i][j] <= 0) {
                        this.tinting[i][j] = 100;
                        this.disappearing[i][j] = 0;
                        disappearing = 0;
                    }
                }
                
                if (disappearing == 0) {
                    this.previous[i][j] = this.values[i][j];
                }
                
                tint(100, this.tinting[i][j]);
                image(img_mana[this.previous[i][j]], j*(boardW/9)+(boardW/18), i*(boardW/9)+(boardW/18), ((boardW/9)-4+decal)*this.tinting[i][j]/100, ((boardW/9)-4+decal)*this.tinting[i][j]/100)
            }
        }
    }
    
    
    this.move = function (x, y, dir) {
        switch (dir) {
            case "RIGHT" :
                this.values[x].unshift(this.values[x][8]);
                this.values[x].pop();
                break;
            case "LEFT" :
                this.values[x].push(this.values[x][0]);
                this.values[x].shift();
                break;
            case "DOWN" :
                var temp = this.values[4][y];
                for (var i = 4; i > 1; i--)  {
                    this.values[i][y] = this.values[i-1][y];
                }
                this.values[1][y] = temp;
                break;
            case "UP" :
                var temp = this.values[1][y];
                for (var i = 1; i < 4; i++)  {
                    this.values[i][y] = this.values[i+1][y];
                }
                this.values[4][y] = temp;
                break;
            default :

        }
    }
    
    
    this.check = function () {
        // Check vertical
        for (var j = 0; j < 9; j++) {
            if(this.values[1][j] == this.values[2][j] && this.values[2][j] == this.values[3][j] && this.values[3][j] == this.values[4][j] && disappearing == 0) {
                
                mana.add(4, this.values[1][j]);
                
                disappearing = 1;
                this.disappearing[1][j] = 1;
                this.disappearing[2][j] = 1;
                this.disappearing[3][j] = 1;
                this.disappearing[4][j] = 1;
                
                this.values[4][j] = this.values[0][j];
                for (var k = 0; k < 4; k++) {this.values[k][j] = Math.floor(Math.random() * Math.floor(5))};
            }
        }
        // Check horizontal
        // Check 7
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 3; j++) {
                if(this.values[i][j] == this.values[i][j+1] && this.values[i][j+1] == this.values[i][j+2] && this.values[i][j+2] == this.values[i][j+3] && this.values[i][j+3] == this.values[i][j+4] && this.values[i][j+4] == this.values[i][j+5] && this.values[i][j+5] == this.values[i][j+6] && disappearing == 0) {
                    
                    mana.add(7, this.values[i][j]);
                    
                    disappearing = 1;
                    this.disappearing[i][j] = 1;
                    this.disappearing[i][j+1] = 1;
                    this.disappearing[i][j+2] = 1;
                    this.disappearing[i][j+3] = 1;
                    this.disappearing[i][j+4] = 1;
                    this.disappearing[i][j+5] = 1;
                    this.disappearing[i][j+6] = 1;
                    
                    for (var k = 0; k < 7; k++) {
                        for (var l = i; l > 0;l--) {
                            this.values[l][j+k] = this.values[l-1][j+k];
                        }
                        this.values[0][j+k] = Math.floor(Math.random() * Math.floor(5));
                    }
                }
            }
        }
        // Check 6
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 4; j++) {
                if(this.values[i][j] == this.values[i][j+1] && this.values[i][j+1] == this.values[i][j+2] && this.values[i][j+2] == this.values[i][j+3] && this.values[i][j+3] == this.values[i][j+4] && this.values[i][j+4] == this.values[i][j+5] && disappearing == 0) {
                    
                    mana.add(6, this.values[i][j]);
                    
                    disappearing = 1;
                    this.disappearing[i][j] = 1;
                    this.disappearing[i][j+1] = 1;
                    this.disappearing[i][j+2] = 1;
                    this.disappearing[i][j+3] = 1;
                    this.disappearing[i][j+4] = 1;
                    this.disappearing[i][j+5] = 1;
                    
                    for (var k = 0; k < 6; k++) {
                        for (var l = i; l > 0;l--) {
                            this.values[l][j+k] = this.values[l-1][j+k];
                        }
                        this.values[0][j+k] = Math.floor(Math.random() * Math.floor(5));
                    }
                }
            }
        }
        // Check 5
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                if(this.values[i][j] == this.values[i][j+1] && this.values[i][j+1] == this.values[i][j+2] && this.values[i][j+2] == this.values[i][j+3] && this.values[i][j+3] == this.values[i][j+4] && disappearing == 0) {
                    
                    mana.add(5, this.values[i][j]);
                    
                    disappearing = 1;
                    this.disappearing[i][j] = 1;
                    this.disappearing[i][j+1] = 1;
                    this.disappearing[i][j+2] = 1;
                    this.disappearing[i][j+3] = 1;
                    this.disappearing[i][j+4] = 1;
                    
                    for (var k = 0; k < 5; k++) {
                        for (var l = i; l > 0;l--) {
                            this.values[l][j+k] = this.values[l-1][j+k];
                        }
                        this.values[0][j+k] = Math.floor(Math.random() * Math.floor(5));
                    }
                }
            }
        }
        // Check 4
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                if(this.values[i][j] == this.values[i][j+1] && this.values[i][j+1] == this.values[i][j+2] && this.values[i][j+2] == this.values[i][j+3] && disappearing == 0) {
                    
                    mana.add(4, this.values[i][j]);
                    
                    disappearing = 1;
                    this.disappearing[i][j] = 1;
                    this.disappearing[i][j+1] = 1;
                    this.disappearing[i][j+2] = 1;
                    this.disappearing[i][j+3] = 1;
                    
                    for (var k = 0; k < 4; k++) {
                        for (var l = i; l > 0;l--) {
                            this.values[l][j+k] = this.values[l-1][j+k];
                        }
                        this.values[0][j+k] = Math.floor(Math.random() * Math.floor(5));
                    }
                }
            }
        }
    }
}