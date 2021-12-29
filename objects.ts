namespace objects {

    export function run() {
        basic.forever(setOffABunchOfRockets)
    }

    function setOffABunchOfRockets() {
        let rockets = [new simpleRocket(0), new simpleRocket(1), new simpleRocket(2), new simpleRocket(3), new simpleRocket(4)]
     
        rockets.forEach(function(rocket) {
            rocket.fire();
        })
    
    }


    class simpleRocket {

        _xPosition: number;

        constructor(xPosition: number) {
            this._xPosition = xPosition;
            this.reset();
        }

        reset() {
            led.plot(this._xPosition, 4)
            led.unplot(this._xPosition, 0)
        }

        fire() {
            for(let ypos = 4; ypos >= 0; ypos--) {
                led.unplot(this._xPosition, ypos+1)
                led.plot(this._xPosition, ypos);
                basic.pause(250);
            }
            basic.pause(1000);
            this.reset();
        }


    }
}
