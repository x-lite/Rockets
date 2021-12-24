namespace functions {

    let i = 0
    let happyImg = images.iconImage(IconNames.Happy)
    let sadImg = images.iconImage(IconNames.Sad)
    let smallHeart = images.iconImage(IconNames.SmallHeart)
    let heart = images.iconImage(IconNames.Heart)
    let ghost = images.iconImage(IconNames.Ghost);

    let imgList = [happyImg, sadImg, smallHeart, heart, ghost]

    function loopThruImages() {
        imgList.forEach(function(i){
            i.showImage(0)
            basic.pause(500)
        })
    }

    export function run() {

       loopThruImages();
        
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


    function collection() {
        let list = [1, 5, 9]

        for(let r = 0; r < 10; r++) {
            
            let x = list.indexOf(r)
            
            if (x > 0) {
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

    function image() {

        input.onButtonPressed(Button.A, () => {
            sad();
        });
        input.onButtonPressed(Button.B, () => {
            happy();
        });

    }
}
