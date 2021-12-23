namespace functions {

    let i = 0

    export function run() {

       image();
        
    }

    export function drawDiagonal() {

        led.plot(0, 0)
        led.plot(1, 1)
        led.plot(2, 2)
        led.plot(3, 3)
        led.plot(4, 4)

    }
    
    export function drawLine() {
        basic.pause(300)
        led.toggle(i, i)
        i++
        if(i > 4)i=0;
    }

    function image() {

        let iamHappy = images.iconImage(IconNames.Happy)
        let iamSad = images.iconImage(IconNames.Sad)

        input.onButtonPressed(Button.A, () => {
            iamHappy.showImage(0);
        });
        input.onButtonPressed(Button.B, () => {
            iamSad.showImage(0);
        });

    }
}
