/**
 * Basic coding
 */
namespace basics {
    
    export function run() {

        // led.plot(0, 0)
        // led.plot(1, 1)
        // led.plot(2, 2)
        // led.plot(3, 3)
        // led.plot(4, 4)

        // led.plot(4, 0)
        // led.plot(3, 1)
        // led.plot(2, 2)
        // led.plot(1, 3)
        // led.plot(0, 4)

        // Using a for loop
        for(let x = 0; x < 5; x++) {
            if(x!=2) {
                led.plot(x, x)
                led.plot(x, 4-x)
                basic.pause(2000)
            }
        }

    }

}
