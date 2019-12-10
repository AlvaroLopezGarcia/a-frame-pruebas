AFRAME.registerComponent('programming-enviroment', {
  
  update: function(oldData) {
    console.log("Estoy en el update de programming-enviroment");
  },
});

AFRAME.registerComponent('programmer_component', {
  schema: {
    event: {type: 'string', default: 'click'},
    count: {type: 'number', default: 0},
  },

  init: function () {
    var self = this;

    let box = document.createElement('a-box');
    document.getElementById("programmer").appendChild(box);
    box.setAttribute('position',{x:0.5,y:0.5,z:-6});
    box.setAttribute('color',"brown");
    box.setAttribute('geometry', {width: '1',height: "1",depth: "1.7"});
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
      let instructions = document.getElementById(program_id).children[5].children;

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
    type: {type: 'string', default: ''},
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
        if(this.getAttribute("instruction_component").type === 'Up'){
          mobile.setAttribute('position',{x:pos.x,y:pos.y+1,z:pos.z});
        }else{
          mobile.setAttribute('position',{x:pos.x,y:pos.y-1,z:pos.z});
        }
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

AFRAME.registerComponent('button', {
  schema: {
    text: {type: 'string', default: ''},
  },

  init: function () {
    var self = this;
 
    this.eventButtonHandlerUp = function () {
      //e.stopPropagation();
      let box = document.createElement('a-box');
      document.getElementById("instructions").appendChild(box);
      let programmer = document.getElementById("programmer");
      let num = programmer.getAttribute('programmer_component').count;
      let pos = programmer.children[6].getAttribute("position");
      let pos_x = pos.x + 2;
      let pos_y = pos.y;
      let incremento = 1;
      let instruction_id = "instruction" + num;

      if(num !== 0){
        pos_y += num + incremento*num;
      }
      num += incremento;
      programmer.setAttribute('programmer_component', {count: num});
      box.setAttribute('position',{x:pos_x,y:pos_y,z:pos.z});
      box.setAttribute('id',instruction_id);
      box.setAttribute('instruction_component', {event: 'run',type:'Up'});
    };

    this.eventButtonHandlerDown = function () {
      //e.stopPropagation();
      let box = document.createElement('a-box');
      document.getElementById("instructions").appendChild(box);
      let programmer = document.getElementById("programmer");
      let num = programmer.getAttribute('programmer_component').count;
      let pos = programmer.children[6].getAttribute("position");
      let pos_x = pos.x + 2;
      let pos_y = pos.y;
      let incremento = 1;
      let instruction_id = "instruction" + num;

      if(num !== 0){
        pos_y += num + incremento*num;
      }
      num += incremento;
      programmer.setAttribute('programmer_component', {count: num});
      box.setAttribute('position',{x:pos_x,y:pos_y,z:pos.z});
      box.setAttribute('id',instruction_id);
      box.setAttribute('instruction_component', {event: 'run',type:'Down'});
    };

    //Finds all the mobiles with a specific program id
    this.eventButtonHandlerRun = function () {
      //In this exercise we only have ONE mobile
      let mobile = document.getElementById("mobile");
      let program_id = mobile.getAttribute("mobile_component").program;  //id of the program that uses this mobile
      let program = this.parentNode.getAttribute('id');

      if(program === program_id){
        mobile.emit('mousedown');
      }
    };

    this.eventButtonHandlerDelete = function () {
      let instructions = document.getElementById("programmer").children[5];
      let child = instructions.lastElementChild;

      while (child) { 
        instructions.removeChild(child); 
        child = instructions.lastElementChild; 
      }
    };

    if(this.data.text === 'Up'){
      this.el.addEventListener("click", this.eventButtonHandlerUp);
    }else if(this.data.text === 'Down'){
      this.el.addEventListener("click", this.eventButtonHandlerDown);
    }else if(this.data.text === 'Run'){
      this.el.addEventListener("click", this.eventButtonHandlerRun);
    }else if(this.data.text === 'Delete'){
      this.el.addEventListener("click", this.eventButtonHandlerDelete);
    }
    
  },
});
