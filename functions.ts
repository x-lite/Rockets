namespace functions {

    let i = 0
    let happyImg = images.iconImage(IconNames.Happy)
    let sadImg = images.iconImage(IconNames.Sad)
    let smallHeart = images.iconImage(IconNames.SmallHeart)
    let heart = images.iconImage(IconNames.Heart)
    let ghost = images.iconImage(IconNames.Ghost);

    let imgList = [ghost, heart, happyImg, sadImg, smallHeart]



    export function run() {

       //drawDiagonal();
       loopThruImages();
       //ifElse()
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


    function loopThruImages() {
        imgList.forEach(function (i) {
            i.showImage(0)
            basic.pause(500)
        })
    }
    
    function ifElse() {
        let list = [1, 5, 9]

        for(let r = 0; r < 10; r++) {
            
            let x = list.indexOf(r)
            
            if (x >= 0) {
                happy();
            } else {
                sad();
            }
            basic.pause(1000);
        }   
    }



    function happy() {
        happyImg.showImage(0);
    }

    function sad() {
        sadImg.showImage(0);
    }

    function setupButtons() {

        input.onButtonPressed(Button.A, () => {
            sad();
        });
        input.onButtonPressed(Button.B, () => {
            happy();
        });

    }
}
