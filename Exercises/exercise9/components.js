function makeProgEnvironmentEstruct(ide) {
    let entity;

    for (let k = 0; k < 2; k++) { //Iteramos dentro de IDE
        entity = document.createElement('a-entity');
        if (k === 0) { //IDE-MENU
            entity.setAttribute('ide-menu', '');
            ide.appendChild(entity);
        } else { //PROGRAMS
            entity.setAttribute('programs', '');
            ide.appendChild(entity);
        }
    }
}


AFRAME.registerComponent('programming-environment', {
    schema: {
        count: { type: 'number', default: 0 }, //number of programs that have been created
    },

    init: function() {
        var self = this;
        let ide = this.el;
        let assets = document.getElementById('elements');
        let newProgramImg = document.createElement('img');


        //INSERT NEW PROGRAM IMAGE
        newProgramImg.setAttribute('id', 'new_program_button');
        newProgramImg.setAttribute('src', '../Images/new_program_button.gif');
        assets.appendChild(newProgramImg);

        //CREATE PROGRAMMING ENVIRONMENT ESTRUCTURE
        makeProgEnvironmentEstruct(ide);
    },
});

AFRAME.registerComponent('ide-menu', {

    init: function() {
        var self = this;
        let ideMenu = this.el;
        let entityAux, box;

        entityAux = ideMenu;
        for (let i = 0; i < 3; i++) { //Iteramos dentro de ide-menu
            if (i === 0 || i === 2) {
                box = document.createElement('a-box');
                entityAux.appendChild(box);
                if (i === 0) { //IDE BOX
                    box.setAttribute('color', "black");
                    box.setAttribute('geometry', { width: '6.5', height: "6", depth: "0.5" });
                } else if (i === 2) { //NEW PROGRAM BUTTON
                    box.setAttribute('src', "#new_program_button");
                    box.setAttribute('geometry', { width: '2', height: "1", depth: "0.5" });
                    box.setAttribute('position', { x: 0, y: -2.2, z: 0.5 });
                }
            } else if (i === 1) {
                entityAux = document.createElement('a-entity');
                ideMenu.appendChild(entityAux);
                entityAux.setAttribute('button', { text: 'New Program' });
            }
        }
    },

});

function insertProgramsIcons() {
    let assets = document.getElementById('elements');
    let imgId = '';
    let imgSrc = '../Images/';
    let num = 0;
    let img;

    for (let i = 0; i < 20; i++) {
        img = document.createElement('img');
        assets.appendChild(img);
        imgSrc = '../Images/';
        num = i + 1;
        img.setAttribute('class', 'icon');
        imgId = 'icon' + num;
        img.setAttribute('id', imgId);
        if (i === 0 || i === 12) {
            imgSrc += imgId + '.jpeg';
        } else {
            imgSrc += imgId + '.jpg';
        }
        img.setAttribute('src', imgSrc);
    }
}

function insertProgramsButtonsAssets() {
    let assets = document.getElementById('elements');
    let imgId = '';
    let imgSrc = '../Images/';
    let img;

    for (let i = 0; i < 8; i++) {
        img = document.createElement('img');
        assets.appendChild(img);
        if (i === 0) {
            imgId = 'up_button';
        } else if (i === 1) {
            imgId = 'down_button';
        } else if (i === 2) {
            imgId = 'left_button';
        } else if (i === 3) {
            imgId = 'right_button';
        } else if (i === 4) {
            imgId = 'forward_button';
        } else if (i === 5) {
            imgId = 'back_button';
        } else if (i === 6) {
            imgId = 'delete_program_button';
        } else if (i === 7) {
            imgId = 'delete_instructions_button';
        }
        imgSrc += imgId + '.gif';
        img.setAttribute('id', imgId);
        img.setAttribute('src', imgSrc);
        imgId = '';
        imgSrc = '../Images/';
    }
}

function insertProgramsInstructionsAssets() {
    let assets = document.getElementById('elements');
    let imgId = '';
    let imgSrc = '../Images/';
    let img;

    for (let i = 0; i < 6; i++) {
        img = document.createElement('img');
        assets.appendChild(img);
        if (i === 0) {
            imgId = 'up_instruction';
        } else if (i === 1) {
            imgId = 'down_instruction';
        } else if (i === 2) {
            imgId = 'left_instruction';
        } else if (i === 3) {
            imgId = 'right_instruction';
        } else if (i === 4) {
            imgId = 'forward_instruction';
        } else if (i === 5) {
            imgId = 'back_instruction';
        }
        imgSrc += imgId + '.gif';
        img.setAttribute('id', imgId);
        img.setAttribute('src', imgSrc);
        imgId = '';
        imgSrc = '../Images/';
    }
}

function insertProgramsAssets() {
    insertProgramsButtonsAssets();
    insertProgramsIcons();
    insertProgramsInstructionsAssets();
}

function setProgramPosition(prog, programs){
    let lastProg = programs.lastChild;
    let pos = lastProg.getAttribute('position');
    let increment = 0.4;
    let progWidth, pos_x;

    if (programs.length === 0){
        prog.setAttribute('position', { x: 0, y: 0.3, z: 0.2 });
    } else {
        pos = lastProg.getAttribute('position');
        progWidth = prog.children[0].children[0].getAttribute('geometry').width;
        pos_x = pos.x + increment + programs.length * progWidth;
        prog.setAttribute('position', { x: pos_x, y: pos.y, z: pos.z });
    }
}

function insertProgram() {
    let progrEnvironment = document.getElementById('programming-environment');
    let num = progrEnvironment.getAttribute('programming-environment').count + 1;
    let prog = document.createElement('a-entity');
    let icons = document.getElementsByClassName('icon');
    let programs = progrEnvironment.children[1];
    let programsChildren = Array.from(programs.children);
    let found = false;
    let progId = "programmer";
    let iconId, programIcon;

    progrEnvironment.setAttribute('programming-environment', { count: num });
    if (programsChildren.length === 0) { //There is no program
        //prog.setAttribute('position', { x: 0, y: 0.3, z: 0.2 });
        prog.setAttribute('program', { position: num, icon: "icon1" });
    } else { //There is at least one program
        for (let icon of icons) {
            iconId = icon.getAttribute('id');
            for (let i = 0; i < programsChildren.length; i++) {
                if (i > 1) {
                    programIcon = programsChildren[i].getAttribute('program').icon;
                    if (iconId === programIcon) { //found
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                prog.setAttribute('program', { position: num, icon: iconId });
                break;
            } else { //This icon is being used. We have to keep searching for one unused
                found = false;
            }
        }
    }
    setProgramPosition(prog,programs);
    progId += num;
    prog.setAttribute('id', progId);
    programs.appendChild(prog);
}

AFRAME.registerComponent('programs', {

    init: function() {
        var self = this;
        let programs = this.el;

        insertProgramsAssets(programs);
        insertProgram();
    },

});

AFRAME.registerComponent('program', {
    schema: {
        count: { type: 'number', default: 0 }, //number of instructions
        position: { type: 'number', default: 0 }, //number of program
        icon: { type: 'string', default: '' },
    },

    init: function() {
        var self = this;
        let prog = this.el;
        let num = prog.getAttribute('program').position;
        let entity;

        for (let i = 0; i < 3; i++) {
            entity = document.createElement('a-entity');
             prog.appendChild(entity);
            if (i === 0) {
                entity.setAttribute('program-menu', '');
            } else if(i === 1){
                entity.setAttribute('program-buttons', '');
            } else if(i === 2){
                entity.setAttribute('instructions', '');
            }
           
        }
    }

});


AFRAME.registerComponent('program-menu', {

    init: function(){
        var self = this;
        let progMenu = this.el;
        let prog = progMenu.parentNode;
        let text = document.createElement('a-text');
        let box = document.createElement('a-box');
        let icon = '#' + prog.getAttribute('program').icon;
        let programs = prog.parentNode;

        for (let i = 0; i < 2; i++ ) {
            if (i === 0) {
                box.setAttribute('src', icon);
                box.setAttribute('geometry', { width: '6', height: "3.5", depth: "0.5" });
                progMenu.appendChild(box);
            } else {
                text.setAttribute('scale', { x: 2.5, y: 2, z: 0.5 });
                text.setAttribute('text', { value: 'PROGRAMMER', color: 'white', width: '7' });
                text.setAttribute('position', { x: -2.65, y: 1.3, z: 0.3 });
                progMenu.appendChild(text);
            }
        }
        /*if (programs.children.length !== 1){
            progWidth = prog.children[0].children[0].getAttribute('geometry').width;
            pos_x += increment + programs.length * progWidth;
        }
        prog.setAttribute('position', { x: pos_x, y: 0.3, z: 0.2 });*/
    }
});

AFRAME.registerComponent('program-buttons', {

    init: function(){
        var self = this;
        let numButtons = 8;
        let progButtons = this.el;
        let entity = document.createElement('a-entity');
        let box = document.createElement('a-box');

        for (let i = 0; i < numButtons; i++) {
            entity = document.createElement('a-entity');
            box = document.createElement('a-box');
            box.setAttribute('geometry', { width: '1', height: "1", depth: "0.5" });
            entity.appendChild(box);
            progButtons.appendChild(entity);
            if (i === 0) {
                entity.setAttribute('button', { text: 'Up' });
                entity.setAttribute('position', { x: -2.2, y: 0.3, z: 0.3 });
                box.setAttribute('src', "#up_button");
            } else if (i === 1) {
                entity.setAttribute('button', { text: 'Down' });
                entity.setAttribute('position', { x: -0.7, y: 0.3, z: 0.3 });
                box.setAttribute('src', "#down_button");
            } else if (i === 2) {
                entity.setAttribute('button', { text: 'Left' });
                entity.setAttribute('position', { x: -2.2, y: -1, z: 0.3 });
                box.setAttribute('src', "#left_button");
            } else if (i === 3) {
                entity.setAttribute('button', { text: 'Right' });
                entity.setAttribute('position', { x: -0.7, y: -1, z: 0.3 });
                box.setAttribute('src', "#right_button");
            } else if (i === 4) {
                entity.setAttribute('button', { text: 'Delete Instructions' });
                entity.setAttribute('position', { x: 2.3, y: -1, z: 0.3 });
                box.setAttribute('src', "#delete_instructions_button");
            } else if (i === 5) {
                entity.setAttribute('button', { text: 'Delete Program' });
                entity.setAttribute('position', { x: 2.3, y: 0.3, z: 0.3 });
                box.setAttribute('src', "#delete_program_button");
            } else if (i === 6) {
                entity.setAttribute('button', { text: 'Forward' });
                entity.setAttribute('position', { x: 0.8, y: 0.3, z: 0.3 });
                box.setAttribute('src', "#forward_button");
            } else if (i === 7) {
                entity.setAttribute('button', { text: 'Back' });
                entity.setAttribute('position', { x: 0.8, y: -1, z: 0.3 });
                box.setAttribute('src', "#back_button");
            }
        }

    }

});

AFRAME.registerComponent('instructions', {

    update: function(oldData) {
        console.log("Estoy en el update de instructions");
    },
});

function makeInstruction(programmer, idImage, typeInstruction) {
    let instruction = document.createElement('a-entity');
    let box = document.createElement('a-box');
    let instructions = programmer.children[2];
    let instruction_num = programmer.getAttribute('program').count;
    //let programmer_num = programmer.getAttribute('program').position;
    let pos = programmer.getAttribute("position");
    let pos_y = 4;
    let incremento = 1;

    if (instruction_num > 0) {
        pos = instructions.lastChild.children[0].getAttribute("position");
        pos_y = pos.y + 0.55;
    }
    instructions.appendChild(instruction);
    instruction.appendChild(box);
    instruction_num += incremento;
    programmer.setAttribute('program', { count: instruction_num });
    box.setAttribute('position', { x: pos.x, y: pos_y, z: pos.z });
    box.setAttribute('geometry', { width: '1', height: "0.5", depth: "0.5" });
    box.setAttribute('src', idImage);
    instruction.setAttribute('instruction', { event: 'run', type: typeInstruction });
};

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
        } else if (this.data.text === 'Forward') {
            this.el.addEventListener("click", this.eventButtonHandlerForward);
        } else if (this.data.text === 'Back') {
            this.el.addEventListener("click", this.eventButtonHandlerBack);
        } else if (this.data.text === 'Delete Instructions') {
            this.el.addEventListener("click", this.eventButtonHandlerDeleteInstructions);
        } else if (this.data.text === 'Delete Program') {
            this.el.addEventListener("click", this.eventButtonHandlerDeleteProgram);
        } else if (this.data.text === 'New Program') {
            this.el.addEventListener("click", this.eventButtonHandlerNewProgram);
        }
        /*
        } else if (this.data.text === 'Run') {
            this.el.addEventListener("click", this.eventButtonHandlerRun);
        } else if (this.data.text === 'Reset') {
            this.el.addEventListener("click", this.eventButtonHandlerReset);
        } else if (this.data.text === 'New Mobile') {
            this.el.addEventListener("click", this.eventButtonHandlerNewMobile);
        } else if (this.data.text === 'Program') {
            this.el.addEventListener("click", this.eventButtonHandlerProgram);
        } else if (this.data.text === 'Change Program') {
            this.el.addEventListener("click", this.eventButtonHandlerChangeProgram);
        } else if (this.data.text === 'Delete Mobile') {
            this.el.addEventListener("click", this.eventButtonHandlerDeleteMobile);
        }*/
    },

    eventButtonHandlerBack: function() {
        let programmer = this.parentNode.parentNode;
        let idImage = "#back_instruction";
        let typeInstruction = "Back";

        makeInstruction(programmer, idImage, typeInstruction);
    },

    eventButtonHandlerForward: function() {
        let programmer = this.parentNode.parentNode;
        let idImage = "#forward_instruction";
        let typeInstruction = "Forward";

        makeInstruction(programmer, idImage, typeInstruction);
    },

    eventButtonHandlerUp: function() {
        let programmer = this.parentNode.parentNode;
        let idImage = "#up_instruction";
        let typeInstruction = "Up";

        makeInstruction(programmer, idImage, typeInstruction);
    },

    eventButtonHandlerDown: function() {
        let programmer = this.parentNode.parentNode;
        let idImage = "#down_instruction";
        let typeInstruction = "Down";

        makeInstruction(programmer, idImage, typeInstruction);
    },

    eventButtonHandlerLeft: function() {
        let programmer = this.parentNode.parentNode;
        let idImage = "#left_instruction";
        let typeInstruction = "Left";

        makeInstruction(programmer, idImage, typeInstruction);
    },

    eventButtonHandlerRight: function() {
        let programmer = this.parentNode.parentNode;
        let idImage = "#right_instruction";
        let typeInstruction = "Right";

        makeInstruction(programmer, idImage, typeInstruction);
    },

    eventButtonHandlerDeleteInstructions: function() {
        let programmer = this.parentNode.parentNode;
        let instructions = programmer.children[2];
        let child = instructions.lastElementChild;

        while (child) {
            instructions.removeChild(child);
            child = instructions.lastElementChild;
        }
        programmer.setAttribute('program', { count: 0 });
    },

    eventButtonHandlerNewProgram: function() {
        insertProgram();
    },
});

AFRAME.registerComponent('instruction', {
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
        //let box = mobile.children[0];
        let pos = {};

        if (program_id === mobile.getAttribute("mobile_component").program) {
            pos = box.getAttribute("position");
            if (this.getAttribute("instruction").type === 'Up') {
                box.setAttribute('position', { x: pos.x, y: pos.y + 1, z: pos.z });
            } else if (this.getAttribute("instruction").type === 'Down') {
                box.setAttribute('position', { x: pos.x, y: pos.y - 1, z: pos.z });
            } else if (this.getAttribute("instruction").type === 'Left') {
                box.setAttribute('position', { x: pos.x - 1, y: pos.y, z: pos.z });
            } else if (this.getAttribute("instruction").type === 'Right') {
                box.setAttribute('position', { x: pos.x + 1, y: pos.y, z: pos.z });
            } else if (this.getAttribute("instruction").type === 'Forward') {
                box.setAttribute('position', { x: pos.x, y: pos.y, z: pos.z + 1 });
            } else if (this.getAttribute("instruction").type === 'Back') {
                box.setAttribute('position', { x: pos.x, y: pos.y, z: pos.z - 1 });
            }
        }
    },

});
