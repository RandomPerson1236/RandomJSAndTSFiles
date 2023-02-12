/* HTML CODE:

    <h1>Video Game JS</h1>
    <canvas id="game-window"
    style="border: 2px black solid; background-color: hsl(215, 33%, 14%);"
    width="500" height="450">
    Your browser does not support canvas.
    </canvas>

    <p style="font-size: 2rem;" id="death-counter">Deaths: 0</p>
    <p style="font-size: 1rem;" id="pos-text">position: </p>

    <script type="module">
        import setWindow from './javascripts/game.js';

        setWindow().game({ collision: true, staywithinblock: true });
    </script>
    
*/

"use strict";

export default function setWindow(){

    const $window = document.getElementById("game-window");

    const c2d = $window.getContext('2d');

    function game( { collision, staywithinblock } = { } ){

        let $pos = { x: 20, y: 20 };

        let deaths = 0;

        window.addEventListener('keydown', e => { keyState[e.keyCode] = true });
        window.addEventListener('keyup', e => { keyState[e.keyCode] = false });

        let keyState = { };
        let collidables = [ ];

        class BuildBasic{
            constructor( canvasContext, { color, posX, posY, width, height } = { }, tag ){

                this.canvasContext = canvasContext;

                this.width = width;
                this.height = height;
                this.posX = posX;
                this.posY = posY;
                this.color = color;
                this.tag = tag ? tag : undefined;

                canvasContext.fillStyle = color;
                canvasContext.fillRect(posX, posY, width, height)
            }

            draw(){
                c2d.beginPath();
                this.canvasContext.fillStyle = this.color;
                this.canvasContext.fillRect(this.posX, this.posY, this.width, this.height)
                c2d.fill();
            }
        }

        let collect = true;
        function base(){
            const enemy = new BuildBasic(c2d, { color: 'red', posX: 450, posY: 200, width: 50, height: 50}, 'Enemy');
            const enemy2 = new BuildBasic(c2d, { color: 'red', posX: 0, posY: 200, width: 350, height: 50}, 'Enemy');

            enemy.draw(); enemy2.draw();

            if (collect) {
                collidables.push(enemy, enemy2);
                collect = false;
            }
        }

        (function update(){

            c2d.clearRect(0, 0, $window.clientWidth, $window.clientHeight);

            const player = new BuildBasic(c2d, { color: 'skyblue', posX: $pos.x, posY: $pos.y, width: 50, height: 50}, 'Player');
            player.draw();

            base();

            if(keyState[37]) $pos.x-=1; //left
            if(keyState[39]) $pos.x+=1; //right
            if(keyState[40]) $pos.y+=1; //down
            if(keyState[38]) $pos.y-=1; //up

            if (staywithinblock){
                if ($pos.y > $window.clientHeight - 50) $pos.y = $window.clientHeight - 50;
                else if ($pos.y < 0) $pos.y = 0;

                if ($pos.x > $window.clientWidth - 50) $pos.x = $window.clientWidth - 50;
                else if ($pos.x < 0) $pos.x = 0;
            }

            collidables.forEach(h=>{
                if (collision){
                    if ($pos.x + 50 >= h.posX && 
                        $pos.x <= h.posX + h.width && 
                        $pos.y + 50 >= h.posY && 
                        $pos.y <= h.posY + h.height)
                        { 
                            $pos.y = 20; 
                            $pos.x = 20; 
    
                            deaths++;
                            document.getElementById('death-counter').textContent = `Deaths: ${deaths}`;
                        }
                }
            })
            document.getElementById('pos-text').textContent = `pos{ X:${$pos.x} Y:${$pos.y}}`;

            requestAnimationFrame(update);
        })();
    }
    
    return { game };

}