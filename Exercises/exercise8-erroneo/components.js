AFRAME.registerComponent('programming-enviroment', {
    schema: {
        count: { type: 'number', default: 0 }, //number of programs that have been created
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
        let instructionsEntity = document.createElement('a-entity');
        let programmerId = 'programmer';
        let programButtons = 8;
        let programmerButtonEntity, programmerButtonBox;

        //IDE menu
        ide.appendChild(ideBox);
        ide.setAttribute('programming-enviroment', { count: 1 });
        ideBox.setAttribute('position', { x: 2.1, y: 3, z: -5.9 });
        ideBox.setAttribute('color', "black");
        ideBox.setAttribute('geometry', { width: '6.5', height: "6", depth: "0.5" });

        //New Program Button
        ide.appendChild(newProgramEntity);
        newProgramEntity.appendChild(newProgramBox);
        newProgramEntity.setAttribute('button', { text: 'New Program' });
        newProgramBox.setAttribute('position', { x: 2.1, y: 0.62, z: -5.45 });
        newProgramBox.setAttribute('geometry', { width: '2', height: "1", depth: "0.5" });
        newProgramBox.setAttribute('src', "#new_program_button");


        //First program menu
        programmerEntity.setAttribute('programmer_component', { position: ide.children.length - 1, icon: "icon1" });
        programmerId += ide.children.length - 1;
        programmerEntity.setAttribute('id', programmerId);
        ide.appendChild(programmerEntity);

        //Programmer text
        programmerEntity.appendChild(text);
        text.setAttribute('position', { x: -0.6, y: 4.25, z: -5.6 });
        text.setAttribute('rotation', { x: 0, y: 0, z: 0 });
        text.setAttribute('scale', { x: 2.5, y: 2, z: 0.5 });
        text.setAttribute('text', { value: 'PROGRAMMER', color: 'white', width: '7' });

        //Programmer Buttons
        for (let i = 0; i < programButtons; i++) {
            programmerButtonEntity = document.createElement('a-entity');
            programmerButtonBox = document.createElement('a-box');
            programmerEntity.appendChild(programmerButtonEntity);
            programmerButtonEntity.appendChild(programmerButtonBox);
            programmerButtonBox.setAttribute('geometry', { width: '1', height: "1", depth: "0.5" });
            if (i === 0) {
                programmerButtonEntity.setAttribute('button', { text: 'Up' });
                programmerButtonBox.setAttribute('position', { x: -0.25, y: 3.25, z: -5.45 });
                programmerButtonBox.setAttribute('src', "#up_button");
            } else if (i === 1) {
                programmerButtonEntity.setAttribute('button', { text: 'Down' });
                programmerButtonBox.setAttribute('position', { x: 1.25, y: 3.25, z: -5.45 });
                programmerButtonBox.setAttribute('src', "#down_button");
            } else if (i === 2) {
                programmerButtonEntity.setAttribute('button', { text: 'Left' });
                programmerButtonBox.setAttribute('position', { x: -0.25, y: 2, z: -5.45 });
                programmerButtonBox.setAttribute('src', "#left_button");
            } else if (i === 3) {
                programmerButtonEntity.setAttribute('button', { text: 'Right' });
                programmerButtonBox.setAttribute('position', { x: 1.25, y: 2, z: -5.45 });
                programmerButtonBox.setAttribute('src', "#right_button");
            } else if (i === 4) {
                programmerButtonEntity.setAttribute('button', { text: 'Delete Instructions' });
                programmerButtonBox.setAttribute('position', { x: 4.5, y: 2, z: -5.45 });
                programmerButtonBox.setAttribute('src', "#delete_instructions_button");
            } else if (i === 5) {
                programmerButtonEntity.setAttribute('button', { text: 'Delete Program' });
                programmerButtonBox.setAttribute('position', { x: 4.5, y: 3.25, z: -5.45 });
                programmerButtonBox.setAttribute('src', "#delete_program_button");
            } else if (i === 6) {
                programmerButtonEntity.setAttribute('button', { text: 'Forward' });
                programmerButtonBox.setAttribute('position', { x: 2.75, y: 3.25, z: -5.45 });
                programmerButtonBox.setAttribute('src', "#forward_button");
            } else if (i === 7) {
                programmerButtonEntity.setAttribute('button', { text: 'Back' });
                programmerButtonBox.setAttribute('position', { x: 2.75, y: 2, z: -5.45 });
                programmerButtonBox.setAttribute('src', "#back_button");
            }
        }

        //Instructions
        programmerEntity.appendChild(instructionsEntity);
        instructionsEntity.setAttribute('instructions', '');

        programmerEntity.appendChild(programmerBox);
        programmerBox.setAttribute('position', { x: 2.1, y: 3, z: -5.85 });
        programmerBox.setAttribute('src', "#icon1");
        programmerBox.setAttribute('geometry', { width: '6', height: "3.5", depth: "0.5" });
    },
});

AFRAME.registerComponent('programmer_component', {
    schema: {
        count: { type: 'number', default: 0 }, //number of instructions
        position: { type: 'number', default: 0 }, //number of program
        icon: { type: 'string', default: '' },
    },
});

AFRAME.registerComponent('mobile_component', {
    schema: {
        event: { type: 'string', default: 'move' },
        program: { type: 'string', default: '' },
        position: { type: 'array', default: [] }, //origin position
        object: { type: 'string', default: '' },
    },

    init: function() {
        var self = this;
        let mobile = this.el.children[0];
        let pos = mobile.getAttribute('position');

        mobile.addEventListener(this.data.event, this.eventMobileHandlerMouseDown);
        this.el.setAttribute('mobile_component', { position: [pos.x, pos.y, pos.z] });
    },

    eventMobileHandlerMouseDown: function() {
        let program_id = this.parentNode.getAttribute("mobile_component").program;
        let instructions = document.getElementById(program_id).children[9].children;
        let mobile = this.parentNode;

        for (let instruction of instructions) {
            instruction.emit('run', mobile);
        }
    },
});

AFRAME.registerComponent('mobiles', {
    schema: {
        count: { type: 'number', default: 0 }, //number of mobiles that have been created
    },

    init: function(oldData) {
        var self = this;
        let mobiles = document.getElementById('mobiles-enviroment');
        let mobilesBox = document.createElement('a-box');
        let mobilesText = document.createElement('a-text');
        let mobileEntity = document.createElement('a-entity');
        let mobileMenu = document.createElement('a-box');
        let mobileObject = document.createElement('a-entity');
        let mobileText = document.createElement('a-text');
        let mobileId = 'mobile';
        let plane = document.createElement('a-plane');
        let runEntity = document.createElement('a-entity');
        let runBox = document.createElement('a-box');
        let resetEntity = document.createElement('a-entity');
        let resetBox = document.createElement('a-box');
        let newMobileEntity = document.createElement('a-entity');
        let newMobileBox = document.createElement('a-box');
        let programEntity = document.createElement('a-entity');
        let programBox = document.createElement('a-box');
        let deleteMobileEntity = document.createElement('a-entity');
        let deleteMobileBox = document.createElement('a-box');

        //Mobile object
        mobileObject.setAttribute('position', { x: -5, y: 3, z: -6 });
        mobileObject.setAttribute('scale', { x: 0.005, y: 0.005, z: 0.005 });
        mobileObject.setAttribute('gltf-model', "#object1");
        mobileObject.setAttribute('animation-mixer', '');
        mobileEntity.appendChild(mobileObject);


        //Mobiles menu
        mobiles.appendChild(mobilesBox);
        mobiles.setAttribute('mobiles', { count: 1 });
        mobilesBox.setAttribute('position', { x: -6, y: 3, z: 5 });
        mobilesBox.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        mobilesBox.setAttribute('color', "black");
        mobilesBox.setAttribute('geometry', { width: '6.5', height: "6", depth: "0.5" });

        //Text mobiles menu
        mobiles.appendChild(mobilesText);
        mobilesText.setAttribute('position', { x: -5.7, y: 5.35, z: 7.7 });
        mobilesText.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        mobilesText.setAttribute('scale', { x: 4, y: 3, z: 0.5 });
        mobilesText.setAttribute('text', { value: 'MOBILES', color: 'white', width: '7' });

        //New  mobile button
        mobiles.appendChild(newMobileEntity);
        newMobileEntity.appendChild(newMobileBox);
        newMobileEntity.setAttribute('button', { text: 'New Mobile' });
        newMobileBox.setAttribute('position', { x: -5.45, y: 0.65, z: 5 });
        newMobileBox.setAttribute('geometry', { width: '2', height: "1", depth: "0.5" });
        newMobileBox.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        newMobileBox.setAttribute('src', "#new_mobile_button");

        //First mobile menu
        mobileEntity.appendChild(mobileMenu);
        mobileEntity.setAttribute('mobile_component', { program: 'programmer1', object: 'object1' });
        mobileId += mobiles.children.length - 2;
        mobileEntity.setAttribute('id', mobileId);
        mobileMenu.setAttribute('position', { x: -5.9, y: 3, z: 5 });
        mobileMenu.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        mobileMenu.setAttribute('color', 'brown');
        mobileMenu.setAttribute('geometry', { width: '6', height: "3.5", depth: "0.5" });
        mobiles.appendChild(mobileEntity);

        //Text mobile menu
        mobileEntity.appendChild(mobileText);
        mobileText.setAttribute('position', { x: -5.6, y: 4.4, z: 6.6 });
        mobileText.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        mobileText.setAttribute('scale', { x: 2.5, y: 2, z: 0.5 });
        mobileText.setAttribute('text', { value: 'MOBILE', color: 'white', width: '7' });

        //Plane program used
        mobileEntity.appendChild(plane);
        plane.setAttribute('src', '#icon1');
        plane.setAttribute('position', { x: -5.6, y: 4.4, z: 3 });
        plane.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        plane.setAttribute('geometry', { width: '0.5', height: "0.5" });

        //Run Button
        mobileEntity.appendChild(runEntity);
        runEntity.appendChild(runBox);
        runEntity.setAttribute('button', { text: 'Run' });
        runBox.setAttribute('position', { x: -5.45, y: 3.3, z: 3.5 });
        runBox.setAttribute('geometry', { width: '2', height: "1", depth: "0.5" });
        runBox.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        runBox.setAttribute('src', "#run_button");

        //Reset Button
        mobileEntity.appendChild(resetEntity);
        resetEntity.appendChild(resetBox);
        resetEntity.setAttribute('button', { text: 'Reset' });
        resetBox.setAttribute('position', { x: -5.45, y: 2, z: 3.5 });
        resetBox.setAttribute('geometry', { width: '2', height: "1", depth: "0.5" });
        resetBox.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        resetBox.setAttribute('src', "#reset_button");

        //Program Button
        mobileEntity.appendChild(programEntity);
        programEntity.appendChild(programBox);
        programEntity.setAttribute('button', { text: 'Program' });
        programBox.setAttribute('position', { x: -5.45, y: 3.3, z: 6.4 });
        programBox.setAttribute('geometry', { width: '2', height: "1", depth: "0.5" });
        programBox.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        programBox.setAttribute('src', "#program_button");

        //Delete Mobile Button
        mobileEntity.appendChild(deleteMobileEntity);
        deleteMobileEntity.appendChild(deleteMobileBox);
        deleteMobileEntity.setAttribute('button', { text: 'Delete Mobile' });
        deleteMobileBox.setAttribute('position', { x: -5.45, y: 2, z: 6.4 });
        deleteMobileBox.setAttribute('geometry', { width: '2', height: "1", depth: "0.5" });
        deleteMobileBox.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        deleteMobileBox.setAttribute('src', "#delete_mobile_button");
    },
});

AFRAME.registerComponent('instruction_component', {
    schema: {
        event: { type: 'string', default: '' },
        type: { type: 'string', default: '' },
    },

    init: function() {
        var self = this;

        this.el.addEventListener(this.data.event, this.eventInstructionHandlerRun);
    },

    eventInstructionHandlerRun: function(e) {
        let program = this.parentNode.parentNode;
        let program_id = program.getAttribute("id");
        let mobile = e.detail;
        let box = mobile.children[0];
        let pos = {};

        if (program_id === mobile.getAttribute("mobile_component").program) {
            pos = box.getAttribute("position");
            if (this.getAttribute("instruction_component").type === 'Up') {
                box.setAttribute('position', { x: pos.x, y: pos.y + 1, z: pos.z });
            } else if (this.getAttribute("instruction_component").type === 'Down') {
                box.setAttribute('position', { x: pos.x, y: pos.y - 1, z: pos.z });
            } else if (this.getAttribute("instruction_component").type === 'Left') {
                box.setAttribute('position', { x: pos.x - 1, y: pos.y, z: pos.z });
            } else if (this.getAttribute("instruction_component").type === 'Right') {
                box.setAttribute('position', { x: pos.x + 1, y: pos.y, z: pos.z });
            } else if (this.getAttribute("instruction_component").type === 'Forward') {
                box.setAttribute('position', { x: pos.x, y: pos.y, z: pos.z + 1 });
            } else if (this.getAttribute("instruction_component").type === 'Back') {
                box.setAttribute('position', { x: pos.x, y: pos.y, z: pos.z - 1 });
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
        text: { type: 'string', default: '' },
    },

    init: function() {
        var self = this;

        if (this.data.text === 'Up') {
            this.el.addEventListener("click", this.eventButtonHandlerUp);
        } else if (this.data.text === 'Down') {
            this.el.addEventListener("click", this.eventButtonHandlerDown);
        } else if (this.data.text === 'Left') {
            this.el.addEventListener("click", this.eventButtonHandlerLeft);
        } else if (this.data.text === 'Right') {
            this.el.addEventListener("click", this.eventButtonHandlerRight);
        } else if (this.data.text === 'Run') {
            this.el.addEventListener("click", this.eventButtonHandlerRun);
        } else if (this.data.text === 'Delete Instructions') {
            this.el.addEventListener("click", this.eventButtonHandlerDeleteInstructions);
        } else if (this.data.text === 'Delete Program') {
            this.el.addEventListener("click", this.eventButtonHandlerDeleteProgram);
        } else if (this.data.text === 'Reset') {
            this.el.addEventListener("click", this.eventButtonHandlerReset);
        } else if (this.data.text === 'New Program') {
            this.el.addEventListener("click", this.eventButtonHandlerNewProgram);
        } else if (this.data.text === 'New Mobile') {
            this.el.addEventListener("click", this.eventButtonHandlerNewMobile);
        } else if (this.data.text === 'Program') {
            this.el.addEventListener("click", this.eventButtonHandlerProgram);
        } else if (this.data.text === 'Change Program') {
            this.el.addEventListener("click", this.eventButtonHandlerChangeProgram);
        } else if (this.data.text === 'Delete Mobile') {
            this.el.addEventListener("click", this.eventButtonHandlerDeleteMobile);
        } else if (this.data.text === 'Forward') {
            this.el.addEventListener("click", this.eventButtonHandlerForward);
        } else if (this.data.text === 'Back') {
            this.el.addEventListener("click", this.eventButtonHandlerBack);
        }
    },

    makeInstruction: function(programmer, idImage, typeInstruction) {
        let instruction = document.createElement('a-entity');
        let box = document.createElement('a-box');
        let instructions = programmer.children[9];
        let instruction_num = programmer.getAttribute('programmer_component').count;
        let programmer_num = programmer.getAttribute('programmer_component').position;
        let pos = programmer.children[10].getAttribute("position");
        let pos_x = 0;
        let pos_y = 7;
        let incremento = 1;

        if (instruction_num === 0) {
            pos_x = pos.x + 5 * (programmer_num);
            //pos_y = 0.5;
        } else {
            pos = instructions.lastChild.children[0].getAttribute("position");
            pos_x = pos.x;
            pos_y = pos.y + 0.55;
        }
        instructions.appendChild(instruction);
        instruction.appendChild(box);
        instruction_num += incremento;
        programmer.setAttribute('programmer_component', { count: instruction_num });
        box.setAttribute('position', { x: pos_x, y: pos_y, z: pos.z });
        box.setAttribute('geometry', { width: '1', height: "0.5", depth: "0.5" });
        box.setAttribute('src', idImage);
        instruction.setAttribute('instruction_component', { event: 'run', type: typeInstruction });
    },

    eventButtonHandlerBack: function() {
        let programmer = this.parentNode;
        let idImage = "#back_instruction";
        let typeInstruction = "Back";

        this.makeInstruction(programmer, idImage, typeInstruction);
    },

    eventButtonHandlerForward: function() {
        let programmer = this.parentNode;
        let idImage = "#forward_instruction";
        let typeInstruction = "Forward";

        this.makeInstruction(programmer, idImage, typeInstruction);
    },

    eventButtonHandlerUp: function() {
        let programmer = this.parentNode;
        let idImage = "#up_instruction";
        let typeInstruction = "Up";

        this.makeInstruction(programmer, idImage, typeInstruction);
    },

    eventButtonHandlerDown: function() {
        let programmer = this.parentNode;
        let idImage = "#down_instruction";
        let typeInstruction = "Down";

        this.makeInstruction(programmer, idImage, typeInstruction);
    },

    eventButtonHandlerLeft: function() {
        let programmer = this.parentNode;
        let idImage = "#left_instruction";
        let typeInstruction = "Left";

        this.makeInstruction(programmer, idImage, typeInstruction);
    },

    eventButtonHandlerRight: function() {
        let programmer = this.parentNode;
        let idImage = "#right_instruction";
        let typeInstruction = "Right";

        this.makeInstruction(programmer, idImage, typeInstruction);
    },

    //Finds the program assigned to the mobile
    eventButtonHandlerRun: function() {
        let mobile = this.parentNode;
        let program_id = mobile.getAttribute("mobile_component").program; //id of the program that uses this mobile
        let box = mobile.children[0];

        if (program_id !== "") {
            box.emit('move');
        }
    },

    eventButtonHandlerDeleteInstructions: function() {
        let programmer = this.parentNode;
        let instructions = programmer.children[9];
        let child = instructions.lastElementChild;

        while (child) {
            instructions.removeChild(child);
            child = instructions.lastElementChild;
        }
        programmer.setAttribute('programmer_component', { count: 0 });
    },

    //This button only works if is not created the change program menu
    eventButtonHandlerDeleteProgram: function() {
        let changeProgramId = document.getElementById('change-program');
        let ide = document.getElementById('programming-enviroment');
        let ideBox = ide.children[0];
        let program = this.parentNode;
        let programId = program.getAttribute('id');
        let programBox = program.children[10];
        let programs = Array.from(ide.children);
        let num = programs.indexOf(program);
        let incremento = programBox.getAttribute('geometry').width + 0.4; //Width Programmer Menu
        const mobiles = Array.from(document.getElementById('mobiles-enviroment').children);
        let ideWidth = ideBox.getAttribute('geometry').width - programBox.getAttribute('geometry').width - 0.4;
        let entity, buttonBox, child, mobile, plane, pos, ideBoxPosX;

        if (changeProgramId === null) {
            //Remove program
            ide.removeChild(program);
            programs = Array.from(ide.children);
            if (programs.length > 2) { //There is at least one program
                for (let i = 0; i < programs.length; i++) {
                    if (i >= num) {
                        entity = programs[i];
                        for (let j = 0; j < entity.children.length; j++) { //each program
                            if (j !== 0 && j < 9) {
                                buttonBox = entity.children[j].children[0];
                                pos = buttonBox.getAttribute('position');
                                buttonBox.setAttribute('position', { x: pos.x - incremento, y: pos.y, z: pos.z });
                            } else if (j === 0 || j === 10) { //text and program box
                                child = entity.children[j];
                                pos = child.getAttribute('position');
                                child.setAttribute('position', { x: pos.x - incremento, y: pos.y, z: pos.z });
                            }
                        }
                    }
                }
                //Modify menu IDE
                pos = ideBox.getAttribute('position');
                ideBox.setAttribute('geometry', { width: String(ideWidth) });
                ideBoxPosX = pos.x - incremento / 2;
                ideBox.setAttribute('position', { x: ideBoxPosX, y: pos.y, z: pos.z });
            }

            //Modify Mobiles
            for (let l = 0; l < mobiles.length; l++) {
                if (l > 2) {
                    mobile = mobiles[l];
                    if (programId === mobile.getAttribute('mobile_component').program) {
                        mobile = mobiles[l];
                        plane = mobile.children[3];
                        mobile.setAttribute('mobile_component', { program: "" });
                        plane.removeAttribute('src');
                    }
                }
            }
        }

    },

    eventButtonHandlerReset: function() {
        let mobile = this.parentNode;
        let box = mobile.children[0];
        let pos = mobile.getAttribute('mobile_component').position;
        let posX = pos[0];
        let posY = pos[1];
        let posZ = pos[2];

        box.setAttribute('position', { x: posX, y: posY, z: posZ });
    },

    eventButtonHandlerNewProgram: function() {
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
        let instructionsEntity = document.createElement('a-entity');
        let forwardEntity = document.createElement('a-entity');
        let forwardBox = document.createElement('a-box');
        let backEntity = document.createElement('a-entity');
        let backBox = document.createElement('a-box');
        let incremento = 6.4; //Width Programmer Menu
        let programmerPosition = ide.children.length - 1;
        let programmerId = 'programmer' + ideCount;
        let ideBoxPosX = 2.1 + (incremento * (programmerPosition - 1)) / 2;
        let ideWidth = 6.5 + incremento * (programmerPosition - 1);
        let icons = document.getElementsByClassName('icon');
        let programs = Array.from(ide.children);
        let found = false;
        let iconId, programIcon;

        //IDE menu
        ide.setAttribute('programming-enviroment', { count: ideCount });
        ideBox.setAttribute('geometry', { width: String(ideWidth) });
        ideBox.setAttribute('position', { x: ideBoxPosX, y: 3, z: -5.9 });

        //New Program Button
        //newProgramBox.setAttribute('position', { x: 2.1 + incremento * (programmerPosition - 1), y: 0.62, z: -5.45 });

        if (programs.length === 2) { //There is no program
            programmerEntity.setAttribute('programmer_component', { count: 0, position: ideCount, icon: "icon1" });
            programmerBox.setAttribute('src', '#icon1');
        } else { //There is at least one program
            for (let icon of icons) {
                iconId = icon.getAttribute('id');
                for (let i = 0; i < programs.length; i++) {
                    if (i > 1) {
                        programIcon = programs[i].getAttribute('programmer_component').icon;
                        if (iconId === programIcon) { //found
                            found = true;
                            break;
                        }
                    }
                }
                if (!found) {
                    programmerEntity.setAttribute('programmer_component', { count: 0, position: ideCount, icon: iconId });
                    iconId = '#' + iconId;
                    programmerBox.setAttribute('src', iconId);
                    break;
                } else { //This icon is being used. We have to keep searching for one unused
                    found = false;
                }
            }
        }

        //Next program menu
        programmerEntity.appendChild(text);
        programmerEntity.setAttribute('id', programmerId);
        ide.appendChild(programmerEntity);

        text.setAttribute('position', { x: -0.6 + incremento * (programmerPosition - 1), y: 4.25, z: -5.6 });
        text.setAttribute('rotation', { x: 0, y: 0, z: 0 });
        text.setAttribute('scale', { x: 2.5, y: 2, z: 0.5 });
        text.setAttribute('text', { value: 'PROGRAMMER', color: 'white', width: '7' });

        //Up Button
        programmerEntity.appendChild(upEntity);
        upEntity.appendChild(upBox);
        upEntity.setAttribute('button', { text: 'Up' });
        upBox.setAttribute('position', { x: -0.25 + incremento * (programmerPosition - 1), y: 3.25, z: -5.45 });
        upBox.setAttribute('geometry', { width: '1', height: "1", depth: "0.5" });
        upBox.setAttribute('src', "#up_button");

        //Down Button
        programmerEntity.appendChild(downEntity);
        downEntity.appendChild(downBox);
        downEntity.setAttribute('button', { text: 'Down' });
        downBox.setAttribute('position', { x: 1.25 + incremento * (programmerPosition - 1), y: 3.25, z: -5.45 });
        downBox.setAttribute('geometry', { width: '1', height: "1", depth: "0.5" });
        downBox.setAttribute('src', "#down_button");

        //Left Button
        programmerEntity.appendChild(leftEntity);
        leftEntity.appendChild(leftBox);
        leftEntity.setAttribute('button', { text: 'Left' });
        leftBox.setAttribute('position', { x: -0.25 + incremento * (programmerPosition - 1), y: 2, z: -5.45 });
        leftBox.setAttribute('geometry', { width: '1', height: "1", depth: "0.5" });
        leftBox.setAttribute('src', "#left_button");

        //Right Button
        programmerEntity.appendChild(rightEntity);
        rightEntity.appendChild(rightBox);
        rightEntity.setAttribute('button', { text: 'Right' });
        rightBox.setAttribute('position', { x: 1.25 + incremento * (programmerPosition - 1), y: 2, z: -5.45 });
        rightBox.setAttribute('geometry', { width: '1', height: "1", depth: "0.5" });
        rightBox.setAttribute('src', "#right_button");

        //Delete Instructions Button
        programmerEntity.appendChild(deleteInstructEntity);
        deleteInstructEntity.appendChild(deleteInstructBox);
        deleteInstructEntity.setAttribute('button', { text: 'Delete Instructions' });
        deleteInstructBox.setAttribute('position', { x: 4.5 + incremento * (programmerPosition - 1), y: 2, z: -5.45 });
        deleteInstructBox.setAttribute('geometry', { width: '1', height: "1", depth: "0.5" });
        deleteInstructBox.setAttribute('src', "#delete_instructions_button");

        //Delete Program Button
        programmerEntity.appendChild(deleteProgEntity);
        deleteProgEntity.appendChild(deleteProgBox);
        deleteProgEntity.setAttribute('button', { text: 'Delete Program' });
        deleteProgBox.setAttribute('position', { x: 4.5 + incremento * (programmerPosition - 1), y: 3.25, z: -5.45 });
        deleteProgBox.setAttribute('geometry', { width: '1', height: "1", depth: "0.5" });
        deleteProgBox.setAttribute('src', "#delete_program_button");

        //Forward button
        programmerEntity.appendChild(forwardEntity);
        forwardEntity.appendChild(forwardBox);
        forwardEntity.setAttribute('button', { text: 'Forward' });
        forwardBox.setAttribute('position', { x: 2.75 + incremento * (programmerPosition - 1), y: 3.25, z: -5.45 });
        forwardBox.setAttribute('geometry', { width: '1', height: "1", depth: "0.5" });
        forwardBox.setAttribute('src', "#forward_button");

        //Back button
        programmerEntity.appendChild(backEntity);
        backEntity.appendChild(backBox);
        backEntity.setAttribute('button', { text: 'Back' });
        backBox.setAttribute('position', { x: 2.75 + incremento * (programmerPosition - 1), y: 2, z: -5.45 });
        backBox.setAttribute('geometry', { width: '1', height: "1", depth: "0.5" });
        backBox.setAttribute('src', "#back_button");

        //Instructions
        programmerEntity.appendChild(instructionsEntity);
        instructionsEntity.setAttribute('instructions', '');

        programmerEntity.appendChild(programmerBox);
        programmerBox.setAttribute('position', { x: 2.1 + incremento * (programmerPosition - 1), y: 3, z: -5.85 });
        programmerBox.setAttribute('geometry', { width: '6', height: "3.5", depth: "0.5" });
    },

    eventButtonHandlerNewMobile: function() {
        let mobiles = document.getElementById('mobiles-enviroment');
        let mobilesCount = mobiles.getAttribute('mobiles').count + 1;
        let mobilesBox = mobiles.children[0];
        //let mobilesText = document.createElement('a-text');
        let mobileEntity = document.createElement('a-entity');
        let mobileMenu = document.createElement('a-box');
        let mobileObject = document.createElement('a-entity');
        let mobileText = document.createElement('a-text');
        let mobileId = 'mobile' + mobilesCount;
        let plane = document.createElement('a-plane');
        let runEntity = document.createElement('a-entity');
        let runBox = document.createElement('a-box');
        let resetEntity = document.createElement('a-entity');
        let resetBox = document.createElement('a-box');
        //let newMobileEntity = mobiles.children[2];
        //let newMobileBox = newMobileEntity.children[0];
        let programEntity = document.createElement('a-entity');
        let programBox = document.createElement('a-box');
        let incremento = 6.4; //Width Programmer Menu
        let mobilePosition = mobiles.children.length - 2;
        let mobileBoxPosZ = 5 + (incremento * (mobilePosition - 1)) / 2;
        let mobileWidth = 6.5 + incremento * (mobilePosition - 1);
        let deleteMobileEntity = document.createElement('a-entity');
        let deleteMobileBox = document.createElement('a-box');
        let mobilesChildren = Array.from(mobiles.children);
        let objects = document.getElementsByClassName('object');
        let num = mobilesChildren.length - 3;
        let found = false;
        let objectId, objectUsed;


        //New Mobile object
        if (mobilesChildren.length === 3) { //There is no mobile
            mobileObject.setAttribute('gltf-model', "#object1");
        } else { //There is at least one program
            for (let object of objects) {
                objectId = object.getAttribute('id');
                for (let i = 0; i < mobilesChildren.length; i++) {
                    if (i > 2) {
                        objectUsed = mobilesChildren[i].getAttribute('mobile_component').object;
                        if (objectId === objectUsed) { //found
                            found = true;
                            break;
                        }
                    }
                }
                if (!found) {
                    objectId = '#' + objectId;
                    mobileObject.setAttribute('gltf-model', objectId);
                    found = true;
                    break;
                } else { //This object is being used. We have to keep searching for one unused
                    found = false;
                }
            }
            if (!found) { //We reuse objects because they are all being used
                num = num - 11;
                objectId = '#object' + String(num);
                mobileObject.setAttribute('gltf-model', objectId);
            }
        }
        mobileObject.setAttribute('position', { x: -5 - (incremento * (mobilesCount - 1)), y: 3, z: -6 });
        mobileObject.setAttribute('scale', { x: 0.01, y: 0.01, z: 0.01 });
        mobileObject.setAttribute('animation-mixer', '');
        mobileEntity.appendChild(mobileObject);

        //Mobiles menu
        mobiles.setAttribute('mobiles', { count: mobilesCount });
        mobilesBox.setAttribute('position', { x: -6, y: 3, z: mobileBoxPosZ });
        mobilesBox.setAttribute('geometry', { width: String(mobileWidth), height: 6, depth: "0.5" });

        //New  mobile button
        //newMobileBox.setAttribute('position', { x: -5.65, y: 0.65 - incremento * (mobilePosition - 1), z: 5 });

        //Next mobile menu
        mobileEntity.appendChild(mobileMenu);
        mobileEntity.setAttribute('mobile_component', { program: '', object: objectId.slice(1) });
        mobileEntity.setAttribute('id', mobileId);
        mobileMenu.setAttribute('position', { x: -5.9, y: 3, z: 5 + incremento * (mobilePosition - 1) });
        mobileMenu.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        mobileMenu.setAttribute('color', 'brown');
        mobileMenu.setAttribute('geometry', { width: '6', height: "3.5", depth: "0.5" });
        mobiles.appendChild(mobileEntity);

        //Text mobile menu
        mobileEntity.appendChild(mobileText);
        mobileText.setAttribute('position', { x: -5.6, y: 4.4, z: 6.6 + incremento * (mobilePosition - 1) });
        mobileText.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        mobileText.setAttribute('scale', { x: 2.5, y: 2, z: 0.5 });
        mobileText.setAttribute('text', { value: 'MOBILE', color: 'white', width: '7' });

        //Plane program used
        mobileEntity.appendChild(plane);
        plane.setAttribute('position', { x: -5.6, y: 4.4, z: 3 + incremento * (mobilePosition - 1) });
        plane.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        plane.setAttribute('geometry', { width: '0.5', height: "0.5" });

        //Run Button
        mobileEntity.appendChild(runEntity);
        runEntity.appendChild(runBox);
        runEntity.setAttribute('button', { text: 'Run' });
        runBox.setAttribute('position', { x: -5.45, y: 3.3, z: 3.5 + incremento * (mobilePosition - 1) });
        runBox.setAttribute('geometry', { width: '2', height: "1", depth: "0.5" });
        runBox.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        runBox.setAttribute('src', "#run_button");

        //Reset Button
        mobileEntity.appendChild(resetEntity);
        resetEntity.appendChild(resetBox);
        resetEntity.setAttribute('button', { text: 'Reset' });
        resetBox.setAttribute('position', { x: -5.45, y: 2, z: 3.5 + incremento * (mobilePosition - 1) });
        resetBox.setAttribute('geometry', { width: '2', height: "1", depth: "0.5" });
        resetBox.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        resetBox.setAttribute('src', "#reset_button");

        //Program Button
        mobileEntity.appendChild(programEntity);
        programEntity.appendChild(programBox);
        programEntity.setAttribute('button', { text: 'Program' });
        programBox.setAttribute('position', { x: -5.45, y: 3.3, z: 6.4 + incremento * (mobilePosition - 1) });
        programBox.setAttribute('geometry', { width: '2', height: "1", depth: "0.5" });
        programBox.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        programBox.setAttribute('src', "#program_button");

        //Delete Mobile Button
        mobileEntity.appendChild(deleteMobileEntity);
        deleteMobileEntity.appendChild(deleteMobileBox);
        deleteMobileEntity.setAttribute('button', { text: 'Delete Mobile' });
        deleteMobileBox.setAttribute('position', { x: -5.45, y: 2, z: 6.4 + incremento * (mobilePosition - 1) });
        deleteMobileBox.setAttribute('geometry', { width: '2', height: "1", depth: "0.5" });
        deleteMobileBox.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        deleteMobileBox.setAttribute('src', "#delete_mobile_button");
    },

    eventButtonHandlerProgram: function() {
        let mobile = this.parentNode;
        let mobileId = mobile.getAttribute('id');
        let mobileNum = mobileId.slice(6);
        let menuEntity = document.createElement('a-entity');
        let menuBox = document.createElement('a-box');
        let menuWidth = 0;
        let ide = document.getElementById('programming-enviroment');
        let programs = Array.from(ide.children);
        let programsNum = 0;
        let changeProgramId = document.getElementById('change-program');
        let program, programIcon, programEntity, programBox;


        if (programs.length > 2 && changeProgramId === null) { //Al least there is a program
            mobile.appendChild(menuEntity);
            menuEntity.appendChild(menuBox);
            menuEntity.setAttribute('id', 'change-program');
            menuBox.setAttribute('rotation', { x: 0, y: 90, z: 0 });
            menuBox.setAttribute('color', 'brown');

            for (let i = 0; i < programs.length; i++) {
                if (i > 1) {
                    programsNum++;
                    program = programs[i];
                    programIcon = '#' + program.getAttribute('programmer_component').icon;
                    programEntity = document.createElement('a-entity');
                    programBox = document.createElement('a-box');
                    programEntity.appendChild(programBox);
                    menuEntity.appendChild(programEntity);
                    programEntity.setAttribute('button', { text: 'Change Program' });
                    programBox.setAttribute('position', { x: -5.4, y: 8, z: 10 + (2 * (programsNum - 1)) });
                    programBox.setAttribute('src', programIcon);
                }
            }
            menuWidth = 2 * programsNum;
            menuBox.setAttribute('geometry', { width: String(menuWidth), height: '2', depth: "0.5" });
            menuBox.setAttribute('position', { x: -5.9, y: 8, z: 10 + ((programsNum - 1)) });
        }
    },

    eventButtonHandlerChangeProgram: function() {
        let changeProgramMenu = this.parentNode;
        let buttonSrc = this.children[0].getAttribute('src');
        let icon = buttonSrc.slice(1);
        let ide = document.getElementById('programming-enviroment');
        let programs = Array.from(ide.children);
        let mobile = changeProgramMenu.parentNode;
        let programId, mobilePlane;

        for (let i = 0; i < programs.length; i++) {
            if (i > 1) {
                program = programs[i];
                if (icon === program.getAttribute('programmer_component').icon) {
                    programId = program.getAttribute('id');
                    mobilePlane = mobile.children[3];
                    mobile.setAttribute('mobile_component', { program: programId });
                    mobilePlane.setAttribute('src', buttonSrc);
                    break;
                }
            }
        }
        //Remove Change Program Menu
        mobile.removeChild(changeProgramMenu);
    },

    eventButtonHandlerDeleteMobile: function() {
        let mobiles = document.getElementById('mobiles-enviroment');
        let mobilesBox = mobiles.children[0];
        let mobilesChildren = Array.from(mobiles.children);
        let mobile = this.parentNode;
        let mobileBox = mobile.children[1];
        let incremento = mobileBox.getAttribute('geometry').width + 0.4; //Width Programmer Menu
        let mobilesBoxWidth = mobilesBox.getAttribute('geometry').width - mobileBox.getAttribute('geometry').width - 0.4;;
        let num = mobilesChildren.indexOf(mobile);
        let mobilesChild, pos, mobileChild, buttonBox;

        //Remove mobile
        mobiles.removeChild(mobile);
        mobilesChildren = Array.from(mobiles.children);

        //Modify mobile-enviroment
        for (let i = 0; i < mobilesChildren.length; i++) {
            if (i !== 1) { //The text "Mobiles" is not modified
                mobilesChild = mobilesChildren[i];
                if (i === 0 && mobiles.children.length > 3) { //Modify mobiles box
                    pos = mobilesChild.getAttribute('position');
                    mobilesBoxWidth = mobilesChild.getAttribute('geometry').width - incremento;
                    mobilesChild.setAttribute('position', { x: pos.x, y: pos.y, z: pos.z - (incremento / 2) });
                    mobilesChild.setAttribute('geometry', { width: String(mobilesBoxWidth) });
                }
                /*else if (i === 2) { //Modify new mobile box
                                   newProgramBox = mobilesChild.children[0];
                                   pos = newProgramBox.getAttribute('position');
                                   newProgramBox.setAttribute('position', { x: pos.x, y: pos.y + incremento, z: pos.z });
                               }*/
                else if (i >= num) { //Modify each mobile
                    for (let j = 0; j < mobilesChild.children.length; j++) {
                        if (j !== 0) {
                            mobileChild = mobilesChild.children[j];
                            if (j < 4) {
                                pos = mobileChild.getAttribute('position');
                                mobileChild.setAttribute('position', { x: pos.x, y: pos.y, z: pos.z - incremento });
                            } else {
                                buttonBox = mobileChild.children[0];
                                pos = buttonBox.getAttribute('position');
                                buttonBox.setAttribute('position', { x: pos.x, y: pos.y, z: pos.z - incremento });
                            }
                        }
                    }
                }

            }
        }

    }

});