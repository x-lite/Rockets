namespace functions {

    let i = 0

    export function run() {

        diagonal();
        

    }

    function diagonal() {

        led.plot(0, 0)
        led.plot(1, 1)
        led.plot(2, 2)
        led.plot(3, 3)
        led.plot(4, 4)

    }

    
    function drawLine() {
        basic.pause(300)
        led.toggle(i, i)
        i++
        if(i > 4)i=0;
    }
}
