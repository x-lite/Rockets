namespace objects {

    export function run() {
        //runMyFirstObject();
        //setOffASingleRocket();
        basic.forever(setOffABunchOfRockets)
    }


    function runMyFirstObject() {
        let myObject = new myFirstObject();
        myObject.drawDiagonal();
    }

    function setOffASingleRocket() {
        let rocket = new simpleRocket(0, "SIMPLE");
        rocket.fire();
    }

    function setOffABunchOfRockets() {
        let rockets = [new simpleRocket(0, "COMPLEX"), new simpleRocket(1, "SIMPLE"), new simpleRocket(2, "COMPLEX"), new simpleRocket(3, "SIMPLE"), new simpleRocket(4, "SIMPLE")]
     
        rockets.forEach(function(rocket) {
            rocket.fire();
        })
    
    }

    class myFirstObject {

        //i = 0;
        constructor() {
        }

        drawDiagonal() {
            functions.drawDiagonal();
        }
           
    }

    class simpleRocket {

        _xPosition: number;
        _explosionType: string;

        constructor(xPosition: number, explosionType: string) {
            this._xPosition = xPosition;
            this._explosionType = explosionType;
            this.reset();
        }

        reset() {
            led.plot(this._xPosition, 4)
            led.unplot(this._xPosition, 0)
        }

        fire() {
            this.flyUp();
            this.explode();
            basic.pause(250);
            this.reset();
        }

        flyUp() {
            for (let ypos = 4; ypos >= 0; ypos--) {
                led.unplot(this._xPosition, ypos + 1)
                led.plot(this._xPosition, ypos);
                basic.pause(250);
            }
        }

        explode() {
            if(this._explosionType=="SIMPLE") this.simpleExplosion();
            if(this._explosionType=="COMPLEX") this.complexExplosion();
        }

        simpleExplosion() {
            //Explode the rocket - part1
            led.plot(this._xPosition - 1, 0);
            led.plot(this._xPosition, 0);
            led.plot(this._xPosition + 1, 0);
            led.plot(this._xPosition, 1)


            basic.pause(250);

            //Explode the rocket - part2
            led.unplot(this._xPosition - 1, 0);
            led.unplot(this._xPosition, 0);
            led.unplot(this._xPosition + 1, 0);
            led.unplot(this._xPosition, 1)
        }

        complexExplosion() {
            this.simpleExplosion();
            basic.pause(100);
            this.simpleExplosion();
            basic.pause(100);
            this.simpleExplosion();
        }


    }
}
