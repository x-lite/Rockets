/**
 * Basic coding
 */
namespace basics {
    
    export function run() {

       
        //Light up an led to represent each rocket
        for (let rocketNumber = 0; rocketNumber < 5; rocketNumber++) {
            led.plot(rocketNumber, 4)
        }
        
        //Loop through each rocket
        for(let rocketNumber = 0; rocketNumber < 5; rocketNumber++) {

            //Move the rocket up from y=4 to y=0, 1 step at a time
            for (let ypos = 4; ypos >= 0; ypos--) {
                led.unplot(rocketNumber, ypos + 1)
                led.plot(rocketNumber, ypos);
                basic.pause(250);
            }

            if(rocketNumber == 0 || rocketNumber ==2 || rocketNumber ==4) {
                //Explode the rocket - part1
                led.plot(rocketNumber-1, 0);
                led.plot(rocketNumber, 0);
                led.plot(rocketNumber+1, 0);
                led.plot(rocketNumber, 1)


                basic.pause(250);

                //Explode the rocket - part2
                led.unplot(rocketNumber - 1, 0);
                led.unplot(rocketNumber, 0);
                led.unplot(rocketNumber + 1, 0);
                led.unplot(rocketNumber, 1)
            } else {
                //Some other type of explosion could go here
            }

            //Reset the rocket
            led.unplot(rocketNumber, 0)
            led.plot(rocketNumber, 4)

        }
    }

}
