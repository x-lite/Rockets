namespace objects {

    export function run() {
        let myObject = new myFirstObject();
        myObject.drawDiagonal();
    }


    class myFirstObject {

        //i = 0;
        constructor() {
        }

        drawDiagonal() {
            functions.drawDiagonal();
        }
           
    }

}
