AFRAME.registerComponent('programmer_component', {
  schema: {
    events: {type: 'array', default: ['click','mouseenter']},
    count: {type: 'number', default: 0},
    list: {type: 'array', default: []},
  },

  init: function () {
    var self = this;

    this.eventProgrammerHandlerMouseEnter = function () {
    	let box = document.createElement('a-box');
      this.sceneEl.appendChild(box);
      let current_list = this.getAttribute('programmer_component').list;
      let num = this.getAttribute('programmer_component').count;
      let pos = this.getAttribute("position");
      let pos_x = pos.x + 2;
      let pos_y = pos.y;
      let incremento = 1;
      let instruction_id = "instruction" + num;

      current_list[num] = instruction_id;
      if(num !== 0){
        pos_y += num + incremento*num;
      }
      num += incremento;
      this.setAttribute('programmer_component', {count: num});
      this.setAttribute('programmer_component', {list: current_list});
      box.setAttribute('position',{x:pos_x,y:pos_y,z:pos.z});
      box.setAttribute('id',instruction_id);
      box.setAttribute('instruction_component', {event: 'click'});
    };

    this.eventProgrammerHandlerClick = function () {
      let current_list = this.getAttribute('programmer_component').list;
      let mobile = document.getElementById('mobile');
      let instruction = "";

      for (let id of current_list) {
        instruction = document.getElementById(id);
        instruction.emit('click');
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

AFRAME.registerComponent('instruction_component', {
  schema: {
    event: {type: 'string', default: ''},
  },

  init: function () {
    var self = this;

    this.eventInstructionHandlerClick = function () {
      let mobile = document.getElementById('mobile');
      let pos = mobile.getAttribute("position");

      mobile.setAttribute('position',{x:pos.x,y:pos.y+1,z:pos.z});
    };
  },

  update: function(oldData) {
    var data = this.data;
    var el = this.el;
    
    if(!oldData.event){  //The first time we call update, oldData hasn't got any attribute
      el.addEventListener(data.event, this.eventInstructionHandlerClick);
    }
  },
});

AFRAME.registerComponent('mobile_component', {
  
  update: function(oldData) {
    console.log("Estoy en el update de mobile_component");
  },
});




