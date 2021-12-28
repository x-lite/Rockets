namespace objects {

    export function run() {
        setOffABunchOfRockets();
    }


    /**
     *    Main run codde
     * 
     * 
     */
    let lastTick = 0;

    function setOffABunchOfRockets() {
        let rockets = [
            new SimpleRocket(0, new FlightAnimation(250), new SimpleExplosion(250)),
            new SimpleRocket(1, new FlightAnimation(500), new SimpleExplosion(100)),
            new SimpleRocket(2, new FlightAnimation(300), new SimpleExplosion(400)),
            new SimpleRocket(3, new FlightAnimation(100), new SimpleExplosion(600)),
            new SimpleRocket(4, new FlightAnimation(800), new SimpleExplosion(200))
        ]

        rockets.forEach(function (rocket) {
            rocket.fire();
        })

        basic.forever(function () {

            basic.pause(50)
            let delta = input.runningTime() - lastTick;
            lastTick = input.runningTime();

            rockets.forEach(function (rocket) {
                rocket.tick(new TickInfo(delta))
            })
        })
    }

    /**
     * TickInfo
     * 
     */
    class TickInfo {
        public _delta: number;

        constructor(delta: number) {
            this._delta = delta;
        }
    }


    /**
     *    Animation (Abstract)
     * 
     * 
     */
    class Animation {

        _timeSinceLastFrame: number = 0;
        _inProgress: boolean;
        _delayBetweenFrames: number;
        _xPosition: number;
        _yPosition: number;

        constructor(delayBetweenFrames: number) {
            this._delayBetweenFrames = delayBetweenFrames;
            this._inProgress = false;
        }

        tick(tick: TickInfo) {
            if (this.readyForNextFrame(tick)) {
                this.nextFrame();
            }
        }

        begin(xPosition: number, yPosition: number) {
            this._inProgress = true;
            this._xPosition = xPosition;
            this._yPosition = yPosition;
        }

        inProgress(): boolean {
            return this._inProgress;
        }

        readyForNextFrame(tick: TickInfo): boolean {
            if (this._timeSinceLastFrame + tick._delta < this._delayBetweenFrames) {
                this._timeSinceLastFrame = this._timeSinceLastFrame + tick._delta;
                return false;
            } else {
                this._timeSinceLastFrame = 0;
                return true;
            }

        }

        nextFrame() {
            //no op
        }

        animationComplete() {
            this._inProgress = false;
        }

    }

    /**
     * 
     *    Explsion
     * 
     */
    class SimpleExplosion extends Animation {

        _explosionPart1: boolean = true;
        _numberOfFlashes: number = 0;

        constructor(delayBetweenFrames: number) {
            super(delayBetweenFrames);
        }


        nextFrame() {

            //Explode the rocket - part1
            if (this._explosionPart1) {
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
                this._numberOfFlashes++;
                this._explosionPart1 = true;
            }
            if(this._numberOfFlashes > 3) {
                this.animationComplete();
            }
        }
    }//SimpleExplosion

    /**
     * 
     *      FlightAnimation
     * 
     * 
     * 
     */
    class FlightAnimation extends Animation {

        constructor(delayBetweenFrames: number) {
            super(delayBetweenFrames);
        }

        nextFrame() {
            //If rocket is still on screen then move up 1 position - else explode!
            if (this._yPosition >= 0) {
                this._yPosition--;
                led.unplot(this._xPosition, this._yPosition + 1)
                led.plot(this._xPosition, this._yPosition);
            } else {
                this.animationComplete();
            }
        }
    }//FlightAnimation

    /**
     * 
     *  SimpleRocket
     * 
     * 
     */
    class SimpleRocket {

        _xPosition: number;
        _yPosition: number;
        _fired: boolean;
        _exploding: boolean;
        _timeSinceLastMove: number;
        _delayBetweenFrames: number;

        _flightAnimation: Animation;
        _explosionAnimation: Animation;

        constructor(xPosition: number, flightAnimation: Animation, explosionAnimation: Animation) {
            this._xPosition = xPosition;
            this._yPosition = 4;       
            this._flightAnimation = flightAnimation;
            this._explosionAnimation = explosionAnimation;
            this.reset();
        }

        tick(tick: TickInfo) {
            if(this._fired) {
                if(this._flightAnimation.inProgress()) {
                    this._flightAnimation.tick(tick);
                } else {
                    if (this._explosionAnimation.inProgress()) {
                        this._explosionAnimation.tick(tick);
                    } else {
                        this._explosionAnimation.begin (this._xPosition, this._yPosition);
                    }
                }
            }
        }

        reset() {
            this._fired = false;
            this._exploding = false;
            led.plot(this._xPosition, 4)
            led.unplot(this._xPosition, 0)
        }

        fire() {
            this._fired = true;
            this._flightAnimation.begin(this._xPosition, this._yPosition);
        }

    }//SimpleRocket


}
