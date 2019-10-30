/**
	Cambia la posicíon de la plataforma
**/
AFRAME.registerComponent('path-rotation', {
  schema: {
    event: {type: 'string', default: 'mouseenter'},
    position_name: {type: 'string', default: 'Up'},
  },

  init: function () {
    var self = this;

    this.eventHandlerMouseEnter = function () {
    	let ejeX = this.getAttribute("rotation").x;

    	if(ejeX===0){
    		this.setAttribute("rotation",{x:-90,y:0,z:0});
    		this.setAttribute("path-rotation",{position_name: 'Down'});
    	}else{
    		this.setAttribute("rotation",{x:0,y:0,z:0});
        this.setAttribute("path-rotation",{position_name: 'Up'});
    	}
    };
  },

  update: function(oldData) {
  	var data = this.data;
  	var el = this.el;
  	
  	if(! oldData.event){  //The first time we call update, oldData hasn't got any attribute
		  el.addEventListener(data.event, this.eventHandlerMouseEnter);
  	}
  },
});

AFRAME.registerComponent('door_component', {
  schema: {
    door_state: {type: 'string', default: 'Closed'},
  },

  update: function(oldData) {
  	console.log("Estoy en el update de door-component");
  },
});

AFRAME.registerComponent('clickable', {
  schema: {
    event: {type: 'string', default: 'click'}, //No lo uso
  },

  init: function () {
    var self = this;

    this.eventHandlerClick = function () {
    	let door = document.getElementById('door');
    	let rotation_Y = door.getAttribute("rotation").y;

    	if(rotation_Y === 0){
    		door.setAttribute("position",{x:-3,y:2,z:-5});
    		door.setAttribute("rotation",{x:0,y:90,z:0});
    		door.setAttribute('door_component', {door_state: 'Opened'});
    	}else{
    		door.setAttribute("position",{x:-2,y:2,z:-6});
    		door.setAttribute("rotation",{x:0,y:0,z:0});
    		door.setAttribute('door_component', {door_state: 'Closed'});
    	}
    };
  },

  update: function(oldData) {
  	var el = this.el;
  	var data = this.data;
  	
  	if(! oldData.event){  //The first time we call update, oldData hasn't got any attribute
		  el.addEventListener(data.event, this.eventHandlerClick);
  	}
  },
});





