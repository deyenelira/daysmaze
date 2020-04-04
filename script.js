(function() {
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");
    var dX1 = 0,
        dX2 = 0,
        dX3 = 0,
        dX4 = 0,
        dX5 = 0,
        dmY = 0;
    var walls = [];

    var WIDTH = cnv.width,
        HEIGHT = cnv.height;

    var tileSize = 64;
    var tileSrcSize = 120;

    var img = new Image();
    img.src = "img/maze1.png";
    /*img.addEventListener("load", function() {
        alert("lembre-se, coletar a quantidade errada prende você pra sempre aqui!");
        requestAnimationFrame(loop, cnv);
    }, false);
*/
    var char = new Image();
    char.src = "img/luiz.png";

    var chave = new Image();
    chave.src = "img/moeda.png";

    var moeda = new Image();
    moeda.src = "img/chavinha.png";

    var door = new Image();
    door.src = "img/porta.png";

    var red = new Image();
    red.src = "img/red.png";

    var blue = new Image();
    blue.src = "img/blue.png";

    var gameOver = new Image();
    gameOver.src = "img/gameOver.jpg";

    var mImage = new Image();
    mImage.src = "img/fireball.png";

    var monster1 = {
        x: tileSize,
        y: tileSize * 9,
        width: 64,
        height: 64,
        speed: 2,
        srcX: 0,
        srcY: 0,
        countMonst: 0,
    }
    var monster2 = {
        x: tileSize * 19,
        y: tileSize * 3,
        width: 64,
        height: 64,
        speed: 2,
        srcX: 0,
        srcY: 0,
        countMonst: 0,
    }
    var monster3 = {
        x: tileSize * 15,
        y: tileSize * 9,
        width: 64,
        height: 64,
        speed: 2,
        srcX: 0,
        srcY: 0,
        countMonst: 0,
    }
    var monster4 = {
        x: tileSize * 7,
        y: tileSize * 16,
        width: 64,
        height: 64,
        speed: 2,
        srcX: 0,
        srcY: 0,
        countMonst: 0,
    }
    var monster5 = {
        x: tileSize * 32,
        y: tileSize * 17,
        width: 64,
        height: 64,
        speed: 2,
        srcX: 0,
        srcY: 0,
        countMonst: 0,
    }

    var keysCaught = 0;
    var moedasCaught = 0;
    var player = {
        x: tileSize + 2,
        y: tileSize + 2,
        width: 64,
        height: 64,
        speed: 4,
        srcX: 0,
        srcY: 0,
        countAnim: 0,
    }
    var flag = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true, true, true
    ];

    var LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40;
    var mvLeft = mvRight = mvDown = mvUp = false;
    var startButton = false,
        finishButton = false,
        gameOverButton = false;
    var maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    var T_WIDTH = maze[0].length * tileSize;
    var T_HEIGHT = maze.length * tileSize;

    for (var i in maze) {
        for (var j in maze[i]) {
            var tile = maze[i][j];
            if (tile === 1) {
                var wall = {
                    x: tileSize * j,
                    y: tileSize * i,
                    width: tileSize,
                    height: tileSize,
                }
                walls.push(wall);
            }
        }
    }

    var cam = {
        x: 0,
        y: 0,
        width: WIDTH,
        height: HEIGHT,
        innerLeftBoundary: function() {
            return this.x + (this.width * 0.25);
        },
        innerTopBoundary: function() {
            return this.y + (this.height * 0.25);
        },
        innerRightBoundary: function() {
            return this.x + (this.width * 0.75);
        },
        innerBottomBoundary: function() {
            return this.y + (this.height * 0.75);
        }
    }

    function blockRectangle(player, wall) {
        var distX = (player.x + player.width / 2) - (wall.x + wall.width / 2);
        var distY = (player.y + player.height / 2) - (wall.y + wall.height / 2);

        var sumWidth = (player.width + wall.width) / 2;
        var sumHeight = (player.height + wall.height) / 2;

        if (Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight) {
            var overlapX = sumWidth - Math.abs(distX);
            var overlapY = sumHeight - Math.abs(distY);

            if (overlapX > overlapY) {
                player.y = distY > 0 ? player.y + overlapY : player.y - overlapY;
            } else {
                player.x = distX > 0 ? player.x + overlapX : player.x - overlapX;
            }
        }
    }

    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);

    var startImage = new Image();
    startImage.src = "img/menuGame .jpg";
    window.addEventListener("click", function start() {
        if (!gameOverButton) {
            startButton = true;
        }
    }, false);

    var finishImage = new Image();
    finishImage.src = "img/wins.jpg";

    function keydownHandler(e) {
        var key = e.keyCode;
        switch (key) {
            case LEFT:
                mvLeft = true;
                break;
            case RIGHT:
                mvRight = true;
                break;
            case UP:
                mvUp = true;
                break;
            case DOWN:
                mvDown = true;
                break;
        }
    }

    function keyupHandler(e) {
        var key = e.keyCode;
        switch (key) {
            case LEFT:
                mvLeft = false;
                break;
            case RIGHT:
                mvRight = false;
                break;
            case UP:
                mvUp = false;
                break;
            case DOWN:
                mvDown = false;
                break;
        }
    }
    var flag1 = true,
        flag2 = true,
        flag3 = true,
        flag4 = true,
        flag5 = true,
        size = 32,
        teste = 0;

    function update() {

        if (dX1 < size * 7 && flag1) {
            monster1.x += monster1.speed;
        } else if (dX1 == size * 7) {
            dX1 = 0;
            if (flag1) {
                flag1 = false;
                monster1.srcY = monster1.height * 1;
            } else {
                flag1 = true;
                monster1.srcY = monster1.height * 0;
            }
        } else if (dX1 < size * 7 && !flag1) {
            monster1.x -= monster1.speed;
        }
        dX1++;
        if (player.x <= monster1.x + 45 && monster1.x <= player.x + 45 && player.y <= monster1.y + 45 && monster1.y <= player.y + 45) {
            finishButton = false;
            startButton = false;
            gameOverButton = true;
        }
        //opa
        if (dX2 < size * 5 && flag2) {
            monster2.x += monster2.speed;
        } else if (dX2 == size * 5) {
            dX2 = 0;
            if (flag2) {
                flag2 = false;
                monster2.srcY = monster2.height * 1;
            } else {
                flag2 = true;
                monster2.srcY = monster2.height * 0;
            }
        } else if (dX2 < size * 5 && !flag2) {
            monster2.x -= monster2.speed;
        }
        dX2++;
        if (player.x <= monster2.x + 45 && monster2.x <= player.x + 45 && player.y <= monster2.y + 45 && monster2.y <= player.y + 45) {
            finishButton = false;
            startButton = false;
            gameOverButton = true;
        }
        //opa
        if (dX3 < size * 12 && flag3) {
            monster3.x += monster3.speed;
        } else if (dX3 == size * 12) {
            dX3 = 0;
            if (flag3) {
                flag3 = false;
                monster3.srcY = monster3.height * 1;
            } else {
                flag3 = true;
                monster3.srcY = monster3.height * 0;
            }
        } else if (dX3 < size * 12 && !flag3) {
            monster3.x -= monster3.speed;
        }
        dX3++;
        if (player.x <= monster3.x + 45 && monster3.x <= player.x + 45 && player.y <= monster3.y + 45 && monster3.y <= player.y + 45) {
            finishButton = false;
            startButton = false;
            gameOverButton = true;
        }
        //opa
        if (dX4 < size * 17 && flag4) {
            monster4.x += monster4.speed;
        } else if (dX4 == size * 17) {
            dX4 = 0;
            if (flag4) {
                flag4 = false;
                monster4.srcY = monster4.height * 1;
            } else {
                flag4 = true;
                monster4.srcY = monster4.height * 0;
            }
        } else if (dX4 < size * 17 && !flag4) {
            monster4.x -= monster4.speed;
        }
        dX4++;
        if (player.x <= monster4.x + 45 && monster4.x <= player.x + 45 && player.y <= monster4.y + 45 && monster4.y <= player.y + 45) {
            finishButton = false;
            startButton = false;
            gameOverButton = true;
        }
        if (dX5 < size * 5 && flag5) {
            monster5.x += monster5.speed;
        } else if (dX5 == size * 5) {
            dX5 = 0;
            if (flag5) {
                flag5 = false;
                monster5.srcY = monster5.height * 1;
            } else {
                flag5 = true;
                monster5.srcY = monster5.height * 0;
            }
        } else if (dX5 < size * 5 && !flag5) {
            monster5.x -= monster5.speed;
        }
        dX5++;
        if (player.x <= monster5.x + 45 && monster5.x <= player.x + 45 && player.y <= monster5.y + 45 && monster5.y <= player.y + 45) {
            finishButton = false;
            startButton = false;
            gameOverButton = true;
        }
        //opa

        if (mvLeft && !mvRight) {
            player.x -= player.speed;
            player.srcY = player.height * 1;
        } else if (mvRight && !mvLeft) {
            player.x += player.speed;
            player.srcY = player.height * 2;
        }
        if (mvUp && !mvDown) {
            player.y -= player.speed;
            player.srcY = player.width * 3;
        } else if (!mvUp && mvDown) {
            player.y += player.speed;
            player.srcY = player.width * 0;
        }

        if (mvLeft || mvRight || mvUp || mvDown) {
            player.countAnim++;
            if (player.countAnim >= 10) {
                player.countAnim = 0;
            }
            player.srcX = Math.floor(player.countAnim / 6) * player.height;
        } else {
            player.srcX = 0;
            player.countAnim = 0;
        }

        for (var i in walls) {
            var wall = walls[i];
            blockRectangle(player, wall);
        }

        var dX = 9,
            dY = 5;
        for (var i = 0; i < 9; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 1, dY = 5;
        for (var i = 9; i < 12; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dY++;
        }
        dX = 1, dY = 3;
        for (var i = 12; i < 17; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 15, dY = 2;
        for (var i = 17; i < 21; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 21, dY = 5;
        for (var i = 21; i < 25; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 21, dY = 6;
        for (var i = 25; i < 29; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 21, dY = 7;
        for (var i = 29; i < 33; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 27, dY = 1;
        for (var i = 33; i < 38; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 37, dY = 4;
        for (var i = 38; i < 44; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dY++;
        }
        dX = 29, dY = 7;
        for (var i = 44; i < 48; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 29, dY = 8;
        for (var i = 48; i < 52; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 29, dY = 9;
        for (var i = 52; i < 56; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 1, dY = 11;
        for (var i = 56; i < 64; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dY++;
        }
        dX = 7, dY = 17;
        for (var i = 64; i < 68; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 7, dY = 18;
        for (var i = 68; i < 73; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 13, dY = 11;
        for (var i = 73; i < 79; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 13, dY = 18;
        for (var i = 79; i < 88; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 26, dY = 15;
        for (var i = 88; i < 91; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dY++;
        }
        dX = 27, dY = 15;
        for (var i = 91; i < 94; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dY++;
        }
        dX = 32, dY = 11;
        for (var i = 94; i < 100; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 32, dY = 12;
        for (var i = 100; i < 106; i++) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                if (flag[i]) {
                    keysCaught++;
                    flag[i] = false;
                }
            }
            dX++;
        }
        dX = 6, dY = 2;
        if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
            if (flag[107]) {
                player.speed = 8;
                flag[107] = false;
                flag[108] = false;
            }
        }
        dX = 8, dY = 2;
        if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
            if (flag[108]) {
                flag[107] = false;
                flag[108] = false;
            }
        }

        dX = 37, dY = 18;
        if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
            if (flag[106]) {
                moedasCaught = 1;
                flag[106] = false;
            }
        }
        dX = 37, dY = 2;
        if (moedasCaught) {
            if (player.x <= tileSize * dX + 45 && tileSize * dX <= player.x + 45 && player.y <= tileSize * dY + 45 && tileSize * dY <= player.y + 45) {
                startButton = false;
                finishButton = true;
            }
        }
        if (player.x < cam.innerLeftBoundary()) {
            cam.x = player.x - (cam.width * 0.25);
        }
        if (player.y < cam.innerTopBoundary()) {
            cam.y = player.y - (cam.height * 0.25);
        }
        if (player.x + player.width > cam.innerRightBoundary()) {
            cam.x = player.x + player.width - (cam.width * 0.75);
        }
        if (player.y + player.height > cam.innerBottomBoundary()) {
            cam.y = player.y + player.height - (cam.height * 0.75);
        }
        cam.x = Math.max(0, Math.min(T_WIDTH - cam.width, cam.x));
        cam.y = Math.max(0, Math.min(T_HEIGHT - cam.height, cam.y));
    }



    function render() {

        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.save();

        ctx.drawImage(startImage, 0, 0);
        if (finishButton) {
            ctx.drawImage(finishImage, 0, 0);
        } else
        if (startButton) {
            ctx.translate(-cam.x, -cam.y);
            for (var i in maze) {
                for (var j in maze[i]) {
                    var tile = maze[i][j];

                    var x = j * tileSize;
                    var y = i * tileSize;

                    ctx.drawImage(
                        img,
                        tile * tileSrcSize,
                        0, tileSrcSize, tileSrcSize, x, y,
                        tileSize, tileSize
                    );
                }

            }
            var dX = 9,
                dY = 5;
            for (var i = 0; i < 9; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 1, dY = 5;
            for (var i = 9; i < 12; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dY++;
            }
            dX = 1, dY = 3;
            for (var i = 12; i < 17; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 15, dY = 2;
            for (var i = 17; i < 21; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 21, dY = 5;
            for (var i = 21; i < 25; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 21, dY = 6;
            for (var i = 25; i < 29; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 21, dY = 7;
            for (var i = 29; i < 33; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 27, dY = 1;
            for (var i = 33; i < 38; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 37, dY = 4;
            for (var i = 38; i < 44; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dY++;
            }
            dX = 29, dY = 7;
            for (var i = 44; i < 48; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 29, dY = 8;
            for (var i = 48; i < 52; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 29, dY = 9;
            for (var i = 52; i < 56; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 1, dY = 11;
            for (var i = 56; i < 64; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dY++;
            }
            dX = 7, dY = 17;
            for (var i = 64; i < 68; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 7, dY = 18;
            for (var i = 68; i < 73; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 13, dY = 11;
            for (var i = 73; i < 79; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 13, dY = 18;
            for (var i = 79; i < 88; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 26, dY = 15;
            for (var i = 88; i < 91; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dY++;
            }
            dX = 27, dY = 15;
            for (var i = 91; i < 94; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dY++;
            }
            dX = 32, dY = 11;
            for (var i = 94; i < 100; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 32, dY = 12;
            for (var i = 100; i < 106; i++) {
                if (flag[i]) {
                    ctx.drawImage(chave, tileSize * dX, tileSize * dY);
                }
                dX++;
            }
            dX = 6, dY = 2;
            if (flag[107]) ctx.drawImage(red, tileSize * dX, tileSize * dY);
            dX = 8, dY = 2;
            if (flag[108]) ctx.drawImage(blue, tileSize * dX, tileSize * dY);

            if (keysCaught == 28) {
                if (flag[106]) {
                    ctx.drawImage(moeda, tileSize * 37, tileSize * 18);
                }
            }
            if (moedasCaught) {
                ctx.drawImage(door, tileSize * 37, tileSize * 2);
            }

            //dX = 2, dY = 9;
            ctx.drawImage(
                mImage,
                monster1.srcX, monster1.srcY, monster1.width, monster1.height,
                monster1.x, monster1.y, monster1.width, monster1.height
            );
            ctx.drawImage(
                mImage,
                monster2.srcX, monster2.srcY, monster2.width, monster2.height,
                monster2.x, monster2.y, monster2.width, monster2.height
            );
            ctx.drawImage(
                mImage,
                monster3.srcX, monster3.srcY, monster3.width, monster3.height,
                monster3.x, monster3.y, monster3.width, monster3.height
            );
            ctx.drawImage(
                mImage,
                monster4.srcX, monster4.srcY, monster4.width, monster4.height,
                monster4.x, monster4.y, monster4.width, monster4.height
            );
            ctx.drawImage(
                mImage,
                monster5.srcX, monster5.srcY, monster5.width, monster5.height,
                monster5.x, monster5.y, monster5.width, monster5.height
            );

            ctx.drawImage(
                char,
                player.srcX, player.srcY, player.width, player.height,
                player.x, player.y, player.width, player.height
            );

            ctx.restore();
            ctx.fillStyle = "rgb(250, 250, 250";
            ctx.font = "24px Helvetica";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("Moedas coletadas: " + keysCaught, 0, 0);
        } else if (gameOverButton) {
            ctx.drawImage(gameOver, 0, 0);
        }


    }

    function loop() {
        update();
        render();
        requestAnimationFrame(loop, cnv);
    }

    requestAnimationFrame(loop, cnv);

}());