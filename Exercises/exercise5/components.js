AFRAME.registerComponent('programming-enviroment', {
  
  init: function(oldData) {
    var self = this;
    let text = document.createElement('a-text');
    let programmerEntity = document.createElement('a-entity');
    let programmerBox = document.createElement('a-box');
    let upEntity = document.createElement('a-entity');
    let upBox = document.createElement('a-box');
    let downEntity = document.createElement('a-entity');
    let downBox = document.createElement('a-box');
    let leftEntity = document.createElement('a-entity');
    let leftBox = document.createElement('a-box');
    let rightEntity = document.createElement('a-entity');
    let rightBox = document.createElement('a-box');
    let deleteInstructEntity = document.createElement('a-entity');
    let deleteInstructBox = document.createElement('a-box');
    let deleteProgEntity = document.createElement('a-entity');
    let deleteProgBox = document.createElement('a-box');
    let runEntity = document.createElement('a-entity');
    let runBox = document.createElement('a-box');
    let resetEntity = document.createElement('a-entity');
    let resetBox = document.createElement('a-box');
    let instructionsEntity = document.createElement('a-entity');


    document.getElementById('programming-enviroment').appendChild(programmerEntity);
    programmerEntity.appendChild(text);
    programmerEntity.setAttribute('programmer_component', {count: 0});
    programmerEntity.setAttribute('id','programmer');

    text.setAttribute('position',{x:-0.6,y:4.25,z:-5.6});
    text.setAttribute('rotation',{x:0,y:0,z:0});
    text.setAttribute('scale',{x:2.5,y:2,z:0.5});
    text.setAttribute('text',{value: 'PROGRAMMER',color: 'white',width: '7'});

    //Button Up
    programmerEntity.appendChild(upEntity);
    upEntity.appendChild(upBox);
    upEntity.setAttribute('button',{text:'Up'});
    upBox.setAttribute('position',{x:-0.25,y:3.25,z:-5.45});
    upBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    upBox.setAttribute('src',"#up_button");

    //Button Down
    programmerEntity.appendChild(downEntity);
    downEntity.appendChild(downBox);
    downEntity.setAttribute('button',{text:'Down'});
    downBox.setAttribute('position',{x:1.25,y:3.25,z:-5.45});
    downBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    downBox.setAttribute('src',"#down_button");

    //Button Left
    programmerEntity.appendChild(leftEntity);
    leftEntity.appendChild(leftBox);
    leftEntity.setAttribute('button',{text:'Left'});
    leftBox.setAttribute('position',{x:-0.25,y:2,z:-5.45});
    leftBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    leftBox.setAttribute('src',"#left_button");

    //Button Right
    programmerEntity.appendChild(rightEntity);
    rightEntity.appendChild(rightBox);
    rightEntity.setAttribute('button',{text:'Right'});
    rightBox.setAttribute('position',{x:1.25,y:2,z:-5.45});
    rightBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    rightBox.setAttribute('src',"#right_button");

    //Button Delete Instructions
    programmerEntity.appendChild(deleteInstructEntity);
    deleteInstructEntity.appendChild(deleteInstructBox);
    deleteInstructEntity.setAttribute('button',{text:'Delete Instructions'});
    deleteInstructBox.setAttribute('position',{x:3,y:3.25,z:-5.45});
    deleteInstructBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    deleteInstructBox.setAttribute('src',"#delete_instructions_button");

    //Button Delete Program
    programmerEntity.appendChild(deleteProgEntity);
    deleteProgEntity.appendChild(deleteProgBox);
    deleteProgEntity.setAttribute('button',{text:'Delete Program'});
    deleteProgBox.setAttribute('position',{x:4.5,y:3.25,z:-5.45});
    deleteProgBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    deleteProgBox.setAttribute('src',"#delete_program_button");


    //Button Run
    programmerEntity.appendChild(runEntity);
    runEntity.appendChild(runBox);
    runEntity.setAttribute('button',{text:'Run'});
    runBox.setAttribute('position',{x:3,y:2,z:-5.45});
    runBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    runBox.setAttribute('src',"#run_button");

    //Button Reset
    programmerEntity.appendChild(resetEntity);
    resetEntity.appendChild(resetBox);
    resetEntity.setAttribute('button',{text:'Reset'});
    resetBox.setAttribute('position',{x:4.5,y:2,z:-5.45});
    resetBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    resetBox.setAttribute('src',"#reset_button");

    //Instructions
    programmerEntity.appendChild(instructionsEntity);
    instructionsEntity.setAttribute('instructions');
    instructionsEntity.setAttribute('id','instructions');

    programmerEntity.appendChild(programmerBox);
    programmerBox.setAttribute('position',{x:2.1,y:3,z:-5.85});
    programmerBox.setAttribute('color',"brown");
    programmerBox.setAttribute('geometry', {width: '6',height: "3.5",depth: "0.5"});
  },
});

AFRAME.registerComponent('programmer_component', {
  schema: {
    count: {type: 'number', default: 0},
  },
});

AFRAME.registerComponent('mobile_component', {
  schema: {
    event: {type: 'string', default: 'mousedown'},
    program: {type: 'string', default: ''},
    position: {type: 'array', default: []},
  },

  init: function(){
    var self = this;
    let pos = this.el.getAttribute('position');

    this.el.addEventListener(this.data.event, this.eventMobileHandlerMouseDown);
    this.el.setAttribute('mobile_component',{position: [pos.x,pos.y,pos.z]});
  },

  eventMobileHandlerMouseDown: function (){
    let program_id = this.getAttribute("mobile_component").program;
    let instructions = document.getElementById(program_id).children[9].children;

    for (let instruction of instructions) {
      instruction.emit('run');
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

    this.el.addEventListener(this.data.event, this.eventInstructionHandlerRun);
  },

  ////In this exercise we only have ONE mobile 
  eventInstructionHandlerRun: function () {
    let program_id = this.parentNode.parentNode.getAttribute("id");
    let mobile = document.getElementById('mobile');
    let pos = {};

    if (program_id===mobile.getAttribute("mobile_component").program){
      pos = mobile.getAttribute("position");
      if(this.getAttribute("instruction_component").type === 'Up'){
        mobile.setAttribute('position',{x:pos.x,y:pos.y+1,z:pos.z});
      }else if(this.getAttribute("instruction_component").type === 'Down') {
        mobile.setAttribute('position',{x:pos.x,y:pos.y-1,z:pos.z});
      }else if(this.getAttribute("instruction_component").type === 'Left'){
        mobile.setAttribute('position',{x:pos.x-1,y:pos.y,z:pos.z});
      }else if(this.getAttribute("instruction_component").type === 'Right'){
        mobile.setAttribute('position',{x:pos.x+1,y:pos.y,z:pos.z});
      }
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
 
    if(this.data.text === 'Up'){
      this.el.addEventListener("click", this.eventButtonHandlerUp);
    }else if(this.data.text === 'Down'){
      this.el.addEventListener("click", this.eventButtonHandlerDown);
    }else if(this.data.text === 'Left'){
      this.el.addEventListener("click", this.eventButtonHandlerLeft);
    }else if(this.data.text === 'Right'){
      this.el.addEventListener("click", this.eventButtonHandlerRight);
    }else if(this.data.text === 'Run'){
      this.el.addEventListener("click", this.eventButtonHandlerRun);
    }else if(this.data.text === 'Delete Instructions'){
      this.el.addEventListener("click", this.eventButtonHandlerDeleteInstructions);
    }else if(this.data.text === 'Delete Program'){
      this.el.addEventListener("click", this.eventButtonHandlerDeleteProgram);
    }else if(this.data.text === 'Reset'){
      this.el.addEventListener("click",this.eventButtonHandlerReset);
    }
  },

  eventButtonHandlerUp: function () {
    //e.stopPropagation();
    let instruction = document.createElement('a-entity');
    let box = document.createElement('a-box');
    let programmer = this.parentNode;
    let num = programmer.getAttribute('programmer_component').count;
    let pos = programmer.children[10].getAttribute("position");
    let pos_x = pos.x + 5;
    let pos_y = pos.y;
    let incremento = 1;
    let instruction_id = "instruction" + num;

    document.getElementById("instructions").appendChild(instruction);
    instruction.appendChild(box);
    if(num !== 0){
      pos_y += 0.55*num;
    }
    num += incremento;
    programmer.setAttribute('programmer_component', {count: num});
    box.setAttribute('position',{x:pos_x,y:pos_y,z:pos.z});
    box.setAttribute('geometry', {width: '1',height: "0.5",depth: "0.5"});
    box.setAttribute('src',"#up_instruction");
    instruction.setAttribute('id',instruction_id);
    instruction.setAttribute('instruction_component', {event: 'run',type:'Up'});
  },

  eventButtonHandlerDown: function () {
    //e.stopPropagation();
    let instruction = document.createElement('a-entity');
    let box = document.createElement('a-box');
    let programmer = this.parentNode;
    let num = programmer.getAttribute('programmer_component').count;
    let pos = programmer.children[10].getAttribute("position");
    let pos_x = pos.x + 5;
    let pos_y = pos.y;
    let incremento = 1;
    let instruction_id = "instruction" + num;

    document.getElementById("instructions").appendChild(instruction);
    instruction.appendChild(box);
    if(num !== 0){
      pos_y += 0.55*num;
    }
    num += incremento;
    programmer.setAttribute('programmer_component', {count: num});
    box.setAttribute('position',{x:pos_x,y:pos_y,z:pos.z});
    box.setAttribute('geometry', {width: '1',height: "0.5",depth: "0.5"});
    box.setAttribute('src',"#down_instruction");
    instruction.setAttribute('id',instruction_id);
    instruction.setAttribute('instruction_component', {event: 'run',type:'Down'});
  },

  eventButtonHandlerLeft: function () {
    //e.stopPropagation();
    let instruction = document.createElement('a-entity');
    let box = document.createElement('a-box');
    let programmer = this.parentNode;
    let num = programmer.getAttribute('programmer_component').count;
    let pos = programmer.children[10].getAttribute("position");
    let pos_x = pos.x + 5;
    let pos_y = pos.y;
    let incremento = 1;
    let instruction_id = "instruction" + num;

    document.getElementById("instructions").appendChild(instruction);
    instruction.appendChild(box);
    if(num !== 0){
      pos_y += 0.55*num;
    }
    num += incremento;
    programmer.setAttribute('programmer_component', {count: num});
    box.setAttribute('position',{x:pos_x,y:pos_y,z:pos.z});
    box.setAttribute('geometry', {width: '1',height: "0.5",depth: "0.5"});
    box.setAttribute('src',"#left_instruction");
    instruction.setAttribute('id',instruction_id);
    instruction.setAttribute('instruction_component', {event: 'run',type:'Left'});
  },

  eventButtonHandlerRight: function () {
    //e.stopPropagation();
    let instruction = document.createElement('a-entity');
    let box = document.createElement('a-box');
    let programmer = this.parentNode;
    let num = programmer.getAttribute('programmer_component').count;
    let pos = programmer.children[10].getAttribute("position");
    let pos_x = pos.x + 5;
    let pos_y = pos.y;
    let incremento = 1;
    let instruction_id = "instruction" + num;

    document.getElementById("instructions").appendChild(instruction);
    instruction.appendChild(box);
    if(num !== 0){
      pos_y += 0.55*num;
    }
    num += incremento;
    programmer.setAttribute('programmer_component', {count: num});
    box.setAttribute('position',{x:pos_x,y:pos_y,z:pos.z});
    box.setAttribute('geometry', {width: '1',height: "0.5",depth: "0.5"});
    box.setAttribute('src',"#right_instruction");
    instruction.setAttribute('id',instruction_id);
    instruction.setAttribute('instruction_component', {event: 'run',type:'Right'});
  },

  //Finds all the mobiles with a specific program id
  eventButtonHandlerRun: function () {
    //In this exercise we only have ONE mobile
    let mobile = document.getElementById("mobile");
    let program_id = mobile.getAttribute("mobile_component").program;  //id of the program that uses this mobile
    let program = this.parentNode.getAttribute('id');

    if(program === program_id){
      mobile.emit('mousedown');
    }
  },

  eventButtonHandlerDeleteInstructions: function () {
    let programmer = this.parentNode;
    let instructions = programmer.children[9];
    let child = instructions.lastElementChild;
    

    while (child) { 
      instructions.removeChild(child); 
      child = instructions.lastElementChild; 
    }
    programmer.setAttribute('programmer_component', {count: 0});
  },

  eventButtonHandlerDeleteProgram: function () {
    let ide = document.getElementById('programming-enviroment');
    let program = this.parentNode;

    ide.removeChild(program);
  },
  //WE ONLY HAVE ONE MOBILE
  eventButtonHandlerReset: function () {
    let mobile = document.getElementById('mobile');
    let pos = mobile.getAttribute('mobile_component').position;

    mobile.setAttribute('position',{x:pos[0],y:pos[1],z:pos[2]});
  }

});
