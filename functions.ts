namespace functions {

    let i = 0

    export function run() {

        drawLine();
        

    }


    function drawLine() {
        basic.pause(300)
        led.toggle(0, i)
        i++
        if(i > 4)i=0;
    }
}
