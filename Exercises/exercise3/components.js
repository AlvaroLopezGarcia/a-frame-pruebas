AFRAME.registerComponent('programming-enviroment', {
  
  update: function(oldData) {
    console.log("Estoy en el update de programming-enviroment");
  },
});

AFRAME.registerComponent('programmer_component', {
  schema: {
    events: {type: 'array', default: ['click','mouseenter']},
    count: {type: 'number', default: 0},
  },

  init: function () {
    var self = this;

    let box = document.createElement('a-box');
    document.getElementById("programmer").appendChild(box);
    box.setAttribute('position',{x:0.5,y:0.5,z:-6});
    box.setAttribute('width',"1");
    box.setAttribute('height',"1");
    box.setAttribute('depth',"1.7");
    box.setAttribute('color',"brown");

    this.eventProgrammerHandlerMouseEnter = function () {
    	let box = document.createElement('a-box');
      document.getElementById("instructions").appendChild(box);
      let num = this.getAttribute('programmer_component').count;
      let pos = this.children[2].getAttribute("position");
      let pos_x = pos.x + 2;
      let pos_y = pos.y;
      let incremento = 1;
      let instruction_id = "instruction" + num;

      if(num !== 0){
        pos_y += num + incremento*num;
      }
      num += incremento;
      this.setAttribute('programmer_component', {count: num});
      box.setAttribute('position',{x:pos_x,y:pos_y,z:pos.z});
      box.setAttribute('id',instruction_id);
      box.setAttribute('instruction_component', {event: 'run'});
    };

    //Finds all the mobiles with a specific program id
    this.eventProgrammerHandlerClick = function () {
      //In this exercise we only have ONE mobile
      let mobile = document.getElementById("mobile");
      let program_id = mobile.getAttribute("mobile_component").program;  //id of the program that uses this mobile

      if(this.getAttribute('id') === program_id){
          mobile.emit('mousedown');
      }
    };

  },

  update: function(oldData) {
  	var el = this.el;
  	var data = this.data;
  	
  	if(! oldData.events){  //The first time we call update, oldData hasn't got any attribute
		  el.addEventListener(data.events[0], this.eventProgrammerHandlerClick);
      el.addEventListener(data.events[1],this.eventProgrammerHandlerMouseEnter);
  	}
  },
});

AFRAME.registerComponent('mobile_component', {
  schema: {
    event: {type: 'string', default: 'mousedown'},
    program: {type: 'string', default: ''},
  },

  init: function(){
    var self = this;

    this.eventMobileHandlerMouseDown = function (){
      let program_id = this.getAttribute("mobile_component").program;
      let instructions = document.getElementById(program_id).children[1].children;

      for (let instruction of instructions) {
        instruction.emit('run');
      }
    };
  },

  update: function(oldData) {
    var data = this.data;
    var el = this.el;
    
    if(!oldData.event){  //The first time we call update, oldData hasn't got any attribute
      el.addEventListener(data.event, this.eventMobileHandlerMouseDown);
    }
  },
});

AFRAME.registerComponent('instruction_component', {
  schema: {
    event: {type: 'string', default: ''},
  },

  init: function () {
    var self = this;

    ////In this exercise we only have ONE mobile 
    this.eventInstructionHandlerRun = function () {
      let program_id = this.parentNode.parentNode.getAttribute("id");
      let mobile = document.getElementById('mobile');
      let pos = {};

      if (program_id===mobile.getAttribute("mobile_component").program){
        pos = mobile.getAttribute("position");
        mobile.setAttribute('position',{x:pos.x,y:pos.y+1,z:pos.z});
      }      
    };
  },

  update: function(oldData) {
    var data = this.data;
    var el = this.el;
    
    if(!oldData.event){  //The first time we call update, oldData hasn't got any attribute
      el.addEventListener(data.event, this.eventInstructionHandlerRun);
    }
  },

});

AFRAME.registerComponent('instructions', {

  update: function(oldData) {
    console.log("Estoy en el update de instructions");
  },
});
