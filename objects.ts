namespace objects {

    export function run() {
        setOffABunchOfRockets();
    }


    let lastTick = 0;

    function setOffABunchOfRockets() {
        let rockets = [new SimpleRocket(0, 250), new SimpleRocket(1, 400), new SimpleRocket(2, 800), new SimpleRocket(3, 0), new SimpleRocket(4, 600)]
        rockets.forEach(function(rocket) {
            rocket.fire();
        })

        basic.forever(function() {
           
            basic.pause(50)
            let delta = input.runningTime() - lastTick;
            lastTick = input.runningTime();

            rockets.forEach(function (rocket) {
                rocket.tick(new TickInfo(delta))
            })
        })
    }

    class SimpleRocket {

        _xPosition: number;
        _yPosition: number;
        _fired: boolean;
        _flying: boolean;
        _exploding: boolean;
        _timeSinceLastMove: number;
        _delayBetweenFrames: number;

        constructor(xPosition: number, delayBetweenFrames: number) {
            this._xPosition = xPosition;
            this._yPosition = 4;
            this._timeSinceLastMove = 0;
            this._delayBetweenFrames = delayBetweenFrames;
            this.reset();
        }

        tick(tick: TickInfo) {
            if(this._fired) {
                this.nextFiringStep(tick);
            }
        }

        nextFiringStep(tick: TickInfo) {
            if(this._flying) {
                this.nextFlyingFrame(tick);
            } else if(this._exploding) {
                this.nextExplodingFrame(tick);
            }
        }

        nextFlyingFrame(tick: TickInfo) {
            //Check if enough time has passed before we start another frame
            if (this._timeSinceLastMove + tick._delta < this._delayBetweenFrames) {
                this._timeSinceLastMove = this._timeSinceLastMove + tick._delta;
                return;
            }

            //reset the timer for next frame delay
            this._timeSinceLastMove = 0;

            //If rocket is still on screen then move up 1 position - else explode!
            if (this._yPosition >= 0) {
                this._yPosition--;
                led.unplot(this._xPosition, this._yPosition + 1)
                led.plot(this._xPosition, this._yPosition);
            } else {
                this._flying = false;
                this._exploding = true;
            }
        }

        _explosionPart1 = true;
        
        nextExplodingFrame(tick: TickInfo) {

            //Check if enough time has passed before we start another frame
            if (this._timeSinceLastMove + tick._delta < 250) {
                this._timeSinceLastMove = this._timeSinceLastMove + tick._delta;
                return;
            }

            //reset the timer for next frame delay
            this._timeSinceLastMove = 0;

            //Explode the rocket - part1
            if(this._explosionPart1) {
                led.plot(this._xPosition - 1, 0);
                led.plot(this._xPosition, 0);
                led.plot(this._xPosition + 1, 0);
                led.plot(this._xPosition, 1)
                this._explosionPart1 = false;
            } else {
                //Explode the rocket - part2
                led.unplot(this._xPosition - 1, 0);
                led.unplot(this._xPosition, 0);
                led.unplot(this._xPosition + 1, 0);
                led.unplot(this._xPosition, 1)
            }

        }

        reset() {
            this._flying = false;
            this._exploding = false;
            led.plot(this._xPosition, 4)
            led.unplot(this._xPosition, 0)
        }

        fire() {
            this._fired = true;
            this._flying = true;
        }

    }


    class Explosion {

    }

    
    class TickInfo {
        public _delta: number;

        constructor(delta: number) {
            this._delta = delta;
        }
    }

}
