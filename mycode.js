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

              elevator.on("idle", function(){
                if (elevator.getPressedFloors().length > 0) {
                  elevator.goToFloor(elevator.getPressedFloors()[0]);
                }
                else {
                  console.log("sin destinos");
                  if (quierenSubir.length > 0)elevator.goToFloor(quierenSubir[0]);
                  else if if (quierenBajar.length > 0)elevator.goToFloor(quierenBajar[0]);
                  else elevator.goToFloor(0);
                }
              });

              elevator.on("passing_floor", function(floorNum, direction){
                if (elevator.loadFactor() < 1) {
                  if (direction == "up") {
                    if ($.inArray(floorNum, quierenSubir)) {
                      console.log("decido parar en " + floorNum);
                      elevator.goToFloor(floorNum);
                      arrayRemoveElement(quierenSubir,floorNum);
                      arrayRemoveElement(quierenBajar,floorNum);
                    }
                  }
                  if (direction == "down") {
                    if ($.inArray(floorNum, quierenBajar)) {
                      console.log("decido parar en " + floorNum);
                      elevator.goToFloor(floorNum);
                    }
                  }
                }
              });
              /*
              elevator.on("floor_button_pressed", function(floorNum){
                  console.log("piden ir a " + floorNum);
              });
              //*/
          });
          //*
          function arrayRemoveElement(elements,element) {

            var index = $.inArray(element,elements);

            if (index > -1) {
              console.log("elemento a borrar encontrado");
              elements.splice(index, 1);
            }

          }
          //*/
      },
      update: function(dt, elevators, floors) {
          // We normally don't need to do anything here
      }
  }
