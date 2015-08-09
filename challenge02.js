{
    init: function(elevators, floors) {

        // Hacemos una lista de plantas donde parar.
        var pararEn = new Array();
        // Si alguien pide subir al ascensor lo metemos en la lista donde parar.
        $.each(floors, function(i,floor) {
            floor.on("up_button_pressed",function(event){
                pararEn.push(floor.floorNum());
            });
            floor.on("down_button_pressed",function(event){
                pararEn.push(floor.floorNum());
            });
        });

        // Solo tenemos un ascensor
        var elevator = elevators[0];

        elevator.on("idle", function() {
            // Vamos desde las plantas en los extremos.
            if(elevator.currentFloor() === 0) {
                console.log("Subimos al último piso")
                elevator.goToFloor(floors.length);
            }
            else {
                console.log("Bajamos a la planta principal");
                elevator.goToFloor(0);
            }

        });
        // Almacenamos la lista de plantas donde quieren salirse
        elevator.on("floor_button_pressed", function(floorNum) {
            pararEn.push(floorNum);
        });

        // Cuando bajamos, comprobamos si la planta está en la lista donde parar.
        elevator.on("passing_floor", function(floorNum, direction){
            if (direction == "down") {
                if ($.inArray(floorNum, pararEn) > -1) {
                    elevator.goToFloor(floorNum,true);
                    console.log("Paramos en la planta " + floorNum + " " + pararEn);
                    arrayRemoveElement(pararEn,floorNum);
                    console.log("Paramos en la planta " + floorNum + " " + pararEn);
                }
            }
        });
        /**
         * Eliminamos elemento del array
         * Puede que haya más de un elemento igual por lo que llamamos a la función de manera recursiva.
         */
        function arrayRemoveElement(elements,element) {
          var index = $.inArray(element,elements);
          if (index > -1) {
            elements.splice(index, 1);
            arrayRemoveElement(elements,element);
          }
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
