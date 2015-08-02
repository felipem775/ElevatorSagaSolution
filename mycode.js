  {
    init: function(elevators, floors) {

        // Configuramos eventos para cada planta
        var quierenSubir = new Array();
        var quierenBajar = new Array();
        $.each(floors, function(i,floor) {
            floor.on("up_button_pressed",function(event){
              console.log("pulsado subir desde " +  floor.floorNum());
                if($.inArray(floor.floorNum(), quierenSubir) === -1) quierenSubir.push(floor.floorNum());
            });
            floor.on("down_button_pressed",function(event){
              console.log("pulsado bajar desde " +  floor.floorNum());
                if($.inArray(floor.floorNum(), quierenBajar) === -1) quierenBajar.push(floor.floorNum());
            });
        });
        // Configuramos ascensores
        $.each(elevators,function(i,elevator){
            elevator.destinos = new Array();
            elevator.on("idle", function(){
              if (elevator.destinos.length > 0) {
                console.log("con destinos");
                console.log(elevator.getPressedFloors());
                  elevator.goToFloor(elevator.destinos.pop());
              }
              else {
                console.log("sin destinos");
                elevator.goToFloor(0); // ToDo: Buscar planta desde dónde han llamado
              }
            });
            elevator.on("passing_floor", function(floorNum, direction){
              console.log("antes de pasar por " + floorNum);
              if (direction == "up"){
                if ($.inArray(floorNum, quierenSubir)) {
                  console.log("decido parar");
                  elevator.goToFloor(floorNum);
                }
              }
              if (direction == "down"){
                if ($.inArray(floorNum, quierenBajar)) {
                  console.log("decido parar");
                  elevator.goToFloor(floorNum);
                }
              }
            });
            elevator.on("floor_button_pressed", function(floorNum){
                console.log("piden ir a " + floorNum);
                elevator.destinos.push(floorNum);
            });
        });

    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
