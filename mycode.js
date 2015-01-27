{
    init: function(elevators, floors) {
        var destinos = [];
        
        var elevator = elevators[0]; // Let's use the first elevator
        $.each(floors,function(i,floor){
            floor.on("up_button_pressed",function(event){
                if($.inArray(floor.floorNum(), destinos) === -1) destinos.push(floor.floorNum());
            });
            floor.on("down_button_pressed",function(event){
                if($.inArray(floor.floorNum(), destinos) === -1) destinos.push(floor.floorNum());
            });
        });
        
        elevator.on("idle", function() {
          
            while (destinos.length > 0) {
             elevator.goToFloor(destinos.pop());   
            }
            
        });
        elevator.on("floor_button_pressed", function(floorNum) { 
            if($.inArray(floorNum, destinos) === -1) destinos.push(floorNum);
        } );
        elevator.on("stopped_at_floor")
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
