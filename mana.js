function Mana() {
    this.values = [0, 0, 0, 0, 0]


    this.add = function (nb, type) {
        this.values[type] += nb;
    }

    
    this.show = function () {
        strokeWeight(1);
        stroke(0);
        textAlign(LEFT, CENTER);
        imageMode(CENTER);
        for (var i = 0; i < 5; i++) {
            noTint();
            image(img_mana[i], i * (boardW/5) + 20, 60/100*boardW, 25, 25)
            text(" : " + this.values[i], 35 + (boardW/5) * i, 60/100*boardW);
        }
        imageMode(CORNER);
    }
}