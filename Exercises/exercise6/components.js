AFRAME.registerComponent('programming-enviroment', {
  schema: {
    count: {type: 'number', default: 0}, //number of programs that have been created
  },

  init: function(oldData) {
    var self = this;
    let ide = document.getElementById('programming-enviroment');
    let ideBox = document.createElement('a-box');
    let newProgramEntity = document.createElement('a-entity');
    let newProgramBox = document.createElement('a-box');
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
    let programmerId = 'programmer';
    let isntructions

    //IDE menu
    ide.appendChild(ideBox);
    ide.setAttribute('programming-enviroment',{count:1});
    ideBox.setAttribute('position',{x:2.1,y:3,z:-5.9});
    ideBox.setAttribute('color',"black");
    ideBox.setAttribute('geometry', {width: '6.5',height: "6",depth: "0.5"});

    //New Program Button
    ide.appendChild(newProgramEntity);
    newProgramEntity.appendChild(newProgramBox);
    newProgramEntity.setAttribute('button',{text:'New Program'});
    newProgramBox.setAttribute('position',{x:2.1,y:0.62,z:-5.45});
    newProgramBox.setAttribute('geometry', {width: '2',height: "1",depth: "0.5"});
    newProgramBox.setAttribute('src',"#new_program_button");


    //First program menu
    programmerEntity.appendChild(text);
    //programmerEntity.setAttribute('programmer_component', {count: 0, position: ide.children.length-1});
    programmerEntity.setAttribute('programmer_component', {position: ide.children.length-1});
    programmerId += ide.children.length-1;
    programmerEntity.setAttribute('id',programmerId);
    ide.appendChild(programmerEntity);

    text.setAttribute('position',{x:-0.6,y:4.25,z:-5.6});
    text.setAttribute('rotation',{x:0,y:0,z:0});
    text.setAttribute('scale',{x:2.5,y:2,z:0.5});
    text.setAttribute('text',{value: 'PROGRAMMER',color: 'white',width: '7'});

    //Up Button
    programmerEntity.appendChild(upEntity);
    upEntity.appendChild(upBox);
    upEntity.setAttribute('button',{text:'Up'});
    upBox.setAttribute('position',{x:-0.25,y:3.25,z:-5.45});
    upBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    upBox.setAttribute('src',"#up_button");

    //Down Button
    programmerEntity.appendChild(downEntity);
    downEntity.appendChild(downBox);
    downEntity.setAttribute('button',{text:'Down'});
    downBox.setAttribute('position',{x:1.25,y:3.25,z:-5.45});
    downBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    downBox.setAttribute('src',"#down_button");

    //Left Button
    programmerEntity.appendChild(leftEntity);
    leftEntity.appendChild(leftBox);
    leftEntity.setAttribute('button',{text:'Left'});
    leftBox.setAttribute('position',{x:-0.25,y:2,z:-5.45});
    leftBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    leftBox.setAttribute('src',"#left_button");

    //Right Button
    programmerEntity.appendChild(rightEntity);
    rightEntity.appendChild(rightBox);
    rightEntity.setAttribute('button',{text:'Right'});
    rightBox.setAttribute('position',{x:1.25,y:2,z:-5.45});
    rightBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    rightBox.setAttribute('src',"#right_button");

    //Delete Instructions Button
    programmerEntity.appendChild(deleteInstructEntity);
    deleteInstructEntity.appendChild(deleteInstructBox);
    deleteInstructEntity.setAttribute('button',{text:'Delete Instructions'});
    deleteInstructBox.setAttribute('position',{x:3,y:3.25,z:-5.45});
    deleteInstructBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    deleteInstructBox.setAttribute('src',"#delete_instructions_button");

    //Delete Program Button
    programmerEntity.appendChild(deleteProgEntity);
    deleteProgEntity.appendChild(deleteProgBox);
    deleteProgEntity.setAttribute('button',{text:'Delete Program'});
    deleteProgBox.setAttribute('position',{x:4.5,y:3.25,z:-5.45});
    deleteProgBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    deleteProgBox.setAttribute('src',"#delete_program_button");


    //Run Button
    programmerEntity.appendChild(runEntity);
    runEntity.appendChild(runBox);
    runEntity.setAttribute('button',{text:'Run'});
    runBox.setAttribute('position',{x:3,y:2,z:-5.45});
    runBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    runBox.setAttribute('src',"#run_button");

    //Reset Button
    programmerEntity.appendChild(resetEntity);
    resetEntity.appendChild(resetBox);
    resetEntity.setAttribute('button',{text:'Reset'});
    resetBox.setAttribute('position',{x:4.5,y:2,z:-5.45});
    resetBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    resetBox.setAttribute('src',"#reset_button");

    //Instructions
    programmerEntity.appendChild(instructionsEntity);
    instructionsEntity.setAttribute('instructions');
    //instructionsEntity.setAttribute('id','instructions');

    programmerEntity.appendChild(programmerBox);
    programmerBox.setAttribute('position',{x:2.1,y:3,z:-5.85});
    programmerBox.setAttribute('color',"brown");
    programmerBox.setAttribute('geometry', {width: '6',height: "3.5",depth: "0.5"});
  },
});

AFRAME.registerComponent('programmer_component', {
  schema: {
    count: {type: 'number', default: 0}, //number of instructions
    position: {type: 'number', default: 0}, //number of program
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
    }else if(this.data.text === 'New Program'){
      this.el.addEventListener("click",this.eventButtonHandlerNewProgram);
    }
  },

  eventButtonHandlerUp: function () {
    //e.stopPropagation();
    let instruction = document.createElement('a-entity');
    let box = document.createElement('a-box');
    let programmer = this.parentNode;
    let instructions = programmer.children[9];
    let instruction_num = programmer.getAttribute('programmer_component').count;
    let programmer_num = programmer.getAttribute('programmer_component').position;
    let pos = programmer.children[10].getAttribute("position");
    let pos_x = 0;
    let pos_y = 0;
    let incremento = 1;
    //let instruction_id = "instruction" + instruction_num;

    
    if(instruction_num === 0){
      pos_x = pos.x + 5*(programmer_num);
      pos_y = 0.5;
    }else{
      pos = instructions.lastChild.children[0].getAttribute("position");
      pos_x = pos.x;
      pos_y = pos.y + 0.55;
    }
    instructions.appendChild(instruction);
    instruction.appendChild(box);
    instruction_num += incremento;
    programmer.setAttribute('programmer_component', {count: instruction_num});
    box.setAttribute('position',{x:pos_x,y:pos_y,z:pos.z});
    box.setAttribute('geometry', {width: '1',height: "0.5",depth: "0.5"});
    box.setAttribute('src',"#up_instruction");
    //instruction.setAttribute('id',instruction_id);
    instruction.setAttribute('instruction_component', {event: 'run',type:'Up'});
  },

  eventButtonHandlerDown: function () {
    //e.stopPropagation();
    let instruction = document.createElement('a-entity');
    let box = document.createElement('a-box');
    let programmer = this.parentNode;
    let instructions = programmer.children[9];
    let instruction_num = programmer.getAttribute('programmer_component').count;
    let programmer_num = programmer.getAttribute('programmer_component').position;
    let pos = programmer.children[10].getAttribute("position");
    let pos_x = 0;
    let pos_y = 0;
    let incremento = 1;
    //let instruction_id = "instruction" + instruction_num;

    
    if(instruction_num === 0){
      pos_x = pos.x + 5*(programmer_num);
      pos_y = 0.5;
    }else{
      pos = instructions.lastChild.children[0].getAttribute("position");
      pos_x = pos.x;
      pos_y = pos.y + 0.55;
    }
    instructions.appendChild(instruction);
    instruction.appendChild(box);
    instruction_num += incremento;
    programmer.setAttribute('programmer_component', {count: instruction_num});
    box.setAttribute('position',{x:pos_x,y:pos_y,z:pos.z});
    box.setAttribute('geometry', {width: '1',height: "0.5",depth: "0.5"});
    box.setAttribute('src',"#down_instruction");
    //instruction.setAttribute('id',instruction_id);
    instruction.setAttribute('instruction_component', {event: 'run',type:'Down'});
  },

  eventButtonHandlerLeft: function () {
    //e.stopPropagation();
    let instruction = document.createElement('a-entity');
    let box = document.createElement('a-box');
    let programmer = this.parentNode;
    let instructions = programmer.children[9];
    let instruction_num = programmer.getAttribute('programmer_component').count;
    let programmer_num = programmer.getAttribute('programmer_component').position;
    let pos = programmer.children[10].getAttribute("position");
    let pos_x = 0;
    let pos_y = 0;
    let incremento = 1;
    //let instruction_id = "instruction" + instruction_num;

    
    if(instruction_num === 0){
      pos_x = pos.x + 5*(programmer_num);
      pos_y = 0.5;
    }else{
      pos = instructions.lastChild.children[0].getAttribute("position");
      pos_x = pos.x;
      pos_y = pos.y + 0.55;
    }
    instructions.appendChild(instruction);
    instruction.appendChild(box);
    instruction_num += incremento;
    programmer.setAttribute('programmer_component', {count: instruction_num});
    box.setAttribute('position',{x:pos_x,y:pos_y,z:pos.z});
    box.setAttribute('geometry', {width: '1',height: "0.5",depth: "0.5"});
    box.setAttribute('src',"#left_instruction");
    //instruction.setAttribute('id',instruction_id);
    instruction.setAttribute('instruction_component', {event: 'run',type:'Left'});
  },

  eventButtonHandlerRight: function () {
    //e.stopPropagation();
    let instruction = document.createElement('a-entity');
    let box = document.createElement('a-box');
    let programmer = this.parentNode;
    let instructions = programmer.children[9];
    let instruction_num = programmer.getAttribute('programmer_component').count;
    let programmer_num = programmer.getAttribute('programmer_component').position;
    let pos = programmer.children[10].getAttribute("position");
    let pos_x = 0;
    let pos_y = 0;
    let incremento = 1;
    //let instruction_id = "instruction" + instruction_num;

    
    if(instruction_num === 0){
      pos_x = pos.x + 5*(programmer_num);
      pos_y = 0.5;
    }else{
      pos = instructions.lastChild.children[0].getAttribute("position");
      pos_x = pos.x;
      pos_y = pos.y + 0.55;
    }
    instructions.appendChild(instruction);
    instruction.appendChild(box);
    instruction_num += incremento;
    programmer.setAttribute('programmer_component', {count: instruction_num});
    box.setAttribute('position',{x:pos_x,y:pos_y,z:pos.z});
    box.setAttribute('geometry', {width: '1',height: "0.5",depth: "0.5"});
    box.setAttribute('src',"#right_instruction");
    //instruction.setAttribute('id',instruction_id);
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
    let ideBox = ide.children[0];
    let newProgramEntity = ide.children[1];
    let newProgramBox = newProgramEntity.children[0];
    let program = this.parentNode;
    let programBox = program.children[10];
    let incremento = 3.54;
    let ideBoxPos = ideBox.getAttribute('position');
    let ideBoxPosY = ideBoxPos.y - incremento/2;
    let ideHeight = ideBox.getAttribute('geometry').height - programBox.getAttribute('geometry').height;
    const children = Array.from(ide.children);  //Before remove
    const ideLengthBefore = ide.children.length;      //Before remove
    let num = children.indexOf(program);
    let nextChild = num;
    let entity,entityBox,child,pos,ideLengthAfter;
    
    //Remove program
    ide.removeChild(program);
    ideLengthAfter = ide.children.length;
    if (ideLengthBefore === 3){  //Only one program
      //Modify menu IDE
      pos = ideBox.getAttribute('position');
      ideBox.setAttribute('geometry', {height: String(ideHeight)});
      pos = newProgramBox.getAttribute('position');
      newProgramBox.setAttribute('position',{x:pos.x,y:pos.y+incremento/2,z:pos.z});
    }else if (ideLengthAfter >= 3){  //Two or more programs
      while(num < ideLengthAfter) {
        entity = ide.children[num];
        for (let i = 0; i < entity.children.length; i++) {     //each program children
          if (i!==0 && i<9){
            entityBox = entity.children[i].children[0];
            pos = entityBox.getAttribute('position');
            entityBox.setAttribute('position',{x:pos.x,y:pos.y+incremento,z:pos.z});
          }else if(i===0 || i===10){      //text and program box
            child = entity.children[i];
            pos = child.getAttribute('position');
            child.setAttribute('position',{x:pos.x,y:pos.y+incremento,z:pos.z});
          }
        }
        num++;
      }
      //Modify menu IDE
      pos = ideBox.getAttribute('position');
      ideBox.setAttribute('geometry', {height: String(ideHeight)});
      ideBoxPosY = ideBoxPos.y + incremento/2;
      ideBox.setAttribute('position',{x:pos.x,y:ideBoxPosY,z:pos.z});
      pos = newProgramBox.getAttribute('position');
      //Modify botton New Program
      num = program.getAttribute('programmer_component').position;
      newProgramBox.setAttribute('position',{x:pos.x,y:pos.y+incremento,z:pos.z});
    }
    
  },
  //WE ONLY HAVE ONE MOBILE
  eventButtonHandlerReset: function () {
    let mobile = document.getElementById('mobile');
    let pos = mobile.getAttribute('mobile_component').position;

    mobile.setAttribute('position',{x:pos[0],y:pos[1],z:pos[2]});
  },

  eventButtonHandlerNewProgram: function () {
    let ide = document.getElementById('programming-enviroment');
    let ideCount = ide.getAttribute('programming-enviroment').count + 1;
    let ideBox = ide.children[0];
    let newProgramBox = ide.children[1].children[0];
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
    let resetBox = document.createElement('a-box')
    let instructionsEntity = document.createElement('a-entity');
    let incremento = 3.54;       //Height Programmer Menu
    let programmerPosition = ide.children.length-1;
    let programmerId = 'programmer' + ideCount;
    let ideBoxPosY = 3-(incremento*(programmerPosition-1))/2;
    let ideHeight = 6+incremento*(programmerPosition-1);

    //IDE menu
    ide.setAttribute('programming-enviroment',{count:ideCount});
    ideBox.setAttribute('geometry', {height: String(ideHeight)});
    ideBox.setAttribute('position',{x:2.1,y:ideBoxPosY,z:-5.9});

    //New Program Button
    newProgramBox.setAttribute('position',{x:2.1,y:0.62-incremento*(programmerPosition-1),z:-5.45});
    
    //Next program menu
    programmerEntity.appendChild(text);
    programmerEntity.setAttribute('programmer_component', {count: 0, position: programmerPosition});
    programmerEntity.setAttribute('id',programmerId);
    ide.appendChild(programmerEntity);

    text.setAttribute('position',{x:-0.6,y:4.25-incremento*(programmerPosition-1),z:-5.6});
    text.setAttribute('rotation',{x:0,y:0,z:0});
    text.setAttribute('scale',{x:2.5,y:2,z:0.5});
    text.setAttribute('text',{value: 'PROGRAMMER',color: 'white',width: '7'});

    //Up Button
    programmerEntity.appendChild(upEntity);
    upEntity.appendChild(upBox);
    upEntity.setAttribute('button',{text:'Up'});
    upBox.setAttribute('position',{x:-0.25,y:3.25-incremento*(programmerPosition-1),z:-5.45});
    upBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    upBox.setAttribute('src',"#up_button");

    //Down Button
    programmerEntity.appendChild(downEntity);
    downEntity.appendChild(downBox);
    downEntity.setAttribute('button',{text:'Down'});
    downBox.setAttribute('position',{x:1.25,y:3.25-incremento*(programmerPosition-1),z:-5.45});
    downBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    downBox.setAttribute('src',"#down_button");

    //Left Button
    programmerEntity.appendChild(leftEntity);
    leftEntity.appendChild(leftBox);
    leftEntity.setAttribute('button',{text:'Left'});
    leftBox.setAttribute('position',{x:-0.25,y:2-incremento*(programmerPosition-1),z:-5.45});
    leftBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    leftBox.setAttribute('src',"#left_button");

    //Right Button
    programmerEntity.appendChild(rightEntity);
    rightEntity.appendChild(rightBox);
    rightEntity.setAttribute('button',{text:'Right'});
    rightBox.setAttribute('position',{x:1.25,y:2-incremento*(programmerPosition-1),z:-5.45});
    rightBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    rightBox.setAttribute('src',"#right_button");

    //Delete Instructions Button
    programmerEntity.appendChild(deleteInstructEntity);
    deleteInstructEntity.appendChild(deleteInstructBox);
    deleteInstructEntity.setAttribute('button',{text:'Delete Instructions'});
    deleteInstructBox.setAttribute('position',{x:3,y:3.25-incremento*(programmerPosition-1),z:-5.45});
    deleteInstructBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    deleteInstructBox.setAttribute('src',"#delete_instructions_button");

    //Delete Program Button
    programmerEntity.appendChild(deleteProgEntity);
    deleteProgEntity.appendChild(deleteProgBox);
    deleteProgEntity.setAttribute('button',{text:'Delete Program'});
    deleteProgBox.setAttribute('position',{x:4.5,y:3.25-incremento*(programmerPosition-1),z:-5.45});
    deleteProgBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    deleteProgBox.setAttribute('src',"#delete_program_button");


    //Run Button
    programmerEntity.appendChild(runEntity);
    runEntity.appendChild(runBox);
    runEntity.setAttribute('button',{text:'Run'});
    runBox.setAttribute('position',{x:3,y:2-incremento*(programmerPosition-1),z:-5.45});
    runBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    runBox.setAttribute('src',"#run_button");

    //Reset Button
    programmerEntity.appendChild(resetEntity);
    resetEntity.appendChild(resetBox);
    resetEntity.setAttribute('button',{text:'Reset'});
    resetBox.setAttribute('position',{x:4.5,y:2-incremento*(programmerPosition-1),z:-5.45});
    resetBox.setAttribute('geometry', {width: '1',height: "1",depth: "0.5"});
    resetBox.setAttribute('src',"#reset_button");

    //Instructions
    programmerEntity.appendChild(instructionsEntity);
    instructionsEntity.setAttribute('instructions');
    //instructionsEntity.setAttribute('id','instructions');

    programmerEntity.appendChild(programmerBox);
    programmerBox.setAttribute('position',{x:2.1,y:3-incremento*(programmerPosition-1),z:-5.85});
    programmerBox.setAttribute('color',"brown");
    programmerBox.setAttribute('geometry', {width: '6',height: "3.5",depth: "0.5"});
  }

});
