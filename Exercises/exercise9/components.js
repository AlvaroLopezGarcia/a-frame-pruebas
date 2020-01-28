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

function setProgramsPosition(increment, programNum) {
    let ide = document.getElementById('programming-environment');
    let programs = ide.children[1].children;
    let programsChildren = Array.from(programs);
    let pos, pos_x, program;

    for (let i = 0; i < programs.length; i++) {
        program = programsChildren[i];
        pos = program.getAttribute('position');
        if (programNum === -1 || i < programNum) { //WHEN WE JUST CREATED A NEW PROGRAM OR WHEN WE HAVE TO MOVE ALL THE PROGRAMS BEFORE THE ONE REMOVED
            pos_x = pos.x - increment;
        } else if (i >= programNum && programNum !== -1) { //WHEN WE HAVE TO MOVE  ALL THE PROGRAMS AFTER THE ONE REMOVED
            pos_x = pos.x + increment;
        }
        program.setAttribute('position', { x: pos_x, y: pos.y, z: pos.z });
    }
}

function setIde(increment, programNum) {
    let ide = document.getElementById('programming-environment');
    let ideBox = ide.children[0].children[0];
    let ideWidth = ideBox.getAttribute('geometry').width;
    let ideWidthNew = ideWidth + increment;
    let pos = ide.getAttribute('position');
    let posIncrement = increment / 2;
    let pos_x = pos.x + posIncrement;

    ideBox.setAttribute('geometry', { width: String(ideWidthNew) });
    ide.setAttribute('position', { x: pos_x, y: pos.y, z: pos.z });
    /*if (programNum ===){

    }*/
    setProgramsPosition(posIncrement, programNum);
}

//WE USE THIS FUNCTION ONLY WHEN IS CREATED A NEW PROGRAM
function setProgramPosition(prog, programs) {
    let increment = 0.5;
    let lastProg, progWidth, pos, pos_x;

    if (programs.children.length === 0) {
        prog.setAttribute('position', { x: 0, y: 0.3, z: 0.2 });
    } else {
        lastProg = programs.lastChild;
        pos = lastProg.getAttribute('position');
        progWidth = lastProg.children[0].children[0].getAttribute('geometry').width;
        pos_x = pos.x + increment + progWidth;
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
        prog.setAttribute('program', { position: num, icon: "icon1" });
    } else { //There is at least one program
        for (let icon of icons) {
            iconId = icon.getAttribute('id');
            for (let i = 0; i < programsChildren.length; i++) {
                programIcon = programsChildren[i].getAttribute('program').icon;
                if (iconId === programIcon) { //found
                    found = true;
                    break;
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
    setProgramPosition(prog, programs);
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
        //position: { type: 'number', default: 0 }, //number of program
        icon: { type: 'string', default: '' },
    },

    init: function() {
        var self = this;
        let prog = this.el;
        let entity;

        for (let i = 0; i < 3; i++) {
            entity = document.createElement('a-entity');
            prog.appendChild(entity);
            if (i === 0) {
                entity.setAttribute('program-menu', '');
            } else if (i === 1) {
                entity.setAttribute('program-buttons', '');
            } else if (i === 2) {
                entity.setAttribute('instructions', '');
            }
        }
    }

});


AFRAME.registerComponent('program-menu', {

    init: function() {
        var self = this;
        let progMenu = this.el;
        let prog = progMenu.parentNode;
        let text = document.createElement('a-text');
        let box = document.createElement('a-box');
        let icon = '#' + prog.getAttribute('program').icon;
        let programs = prog.parentNode;

        for (let i = 0; i < 2; i++) {
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
    }
});

AFRAME.registerComponent('program-buttons', {

    init: function() {
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
    box.setAttribute('position', { x: 0, y: pos_y, z: 0 });
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
        } else if (this.data.text === 'New Mobile') {
            this.el.addEventListener("click", this.eventButtonHandlerNewMobile);
        } else if (this.data.text === 'Run') {
            this.el.addEventListener("click", this.eventButtonHandlerRun);
        } else if (this.data.text === 'Reset') {
            this.el.addEventListener("click", this.eventButtonHandlerReset);
        } else if (this.data.text === 'Program') {
            this.el.addEventListener("click", this.eventButtonHandlerProgram);
        } else if (this.data.text === 'Change Program') {
            this.el.addEventListener("click", this.eventButtonHandlerChangeProgram);
        } else if (this.data.text === 'Delete Mobile') {
            this.el.addEventListener("click", this.eventButtonHandlerDeleteMobile);
        }
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
        let ide = document.getElementById('programming-environment');
        let programs = ide.children[1];
        let increment = 6.5;


        if (programs.children.length !== 0) {
            setIde(increment, -1);
        }
        insertProgram();
    },

    //This button only works if is not created the change program menu
    eventButtonHandlerDeleteProgram: function() {
        let changeProgramId = document.getElementById('change-program');
        let ide = document.getElementById('programming-environment');
        let program = this.parentNode.parentNode;
        let programs = ide.children[1];
        let programsChildren = Array.from(programs.children);
        let num = programsChildren.indexOf(program);
        let increment = -6.5;
        let programId = program.getAttribute('id');
        let mobiles = document.getElementsByClassName('mobile');
        let mobile, plane;


        if (changeProgramId === null) {
            //Remove program
            programs.removeChild(program);
            if (programs.children.length !== 0) {
                setIde(increment, num);
            }

            //Modify Mobiles
            for (let l = 0; l < mobiles.length; l++) {
                mobile = mobiles[l];
                if (programId === mobile.getAttribute('mobile').program) {
                    mobile = mobiles[l];
                    plane = mobile.children[0].children[2];
                    mobile.setAttribute('mobile', { program: "" });
                    plane.removeAttribute('src');
                }
            }
        }
    },

    eventButtonHandlerNewMobile: function() {
        insertMobile();
    },

    eventButtonHandlerReset: function() {
        let mobile = this.parentNode.parentNode.parentNode;
        let drone = mobile.children[1];
        let pos = mobile.getAttribute('mobile').position;
        let posX = pos[0];
        let posY = pos[1];
        let posZ = pos[2];

        drone.setAttribute('position', { x: posX, y: posY, z: posZ });
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
        let box = mobile.children[0];
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

function insertMobilesButtonsAssets() {
    let assets = document.getElementById('elements');
    let imgId = '';
    let imgSrc = '../Images/';
    let img;

    for (let i = 0; i < 5; i++) {
        img = document.createElement('img');
        assets.appendChild(img);
        if (i === 0) {
            imgId = 'run_button';
        } else if (i === 1) {
            imgId = 'reset_button';
        } else if (i === 2) {
            imgId = 'new_mobile_button';
        } else if (i === 3) {
            imgId = 'program_button';
        } else if (i === 4) {
            imgId = 'delete_mobile_button';
        }
        imgSrc += imgId + '.gif';
        img.setAttribute('id', imgId);
        img.setAttribute('src', imgSrc);
        imgId = '';
        imgSrc = '../Images/';
    }
}

function insertMobilesObjects() {
    let assets = document.getElementById('elements');
    let itemId = '';
    let itemSrc = '../Objects/';
    let num = 0;
    let item;

    for (let i = 0; i < 12; i++) {
        item = document.createElement('a-asset-item');
        assets.appendChild(item);
        itemSrc = '../Objects/';
        num = i + 1;
        item.setAttribute('class', 'object');
        itemId = 'object' + num;
        item.setAttribute('id', itemId);
        itemSrc += itemId + './scene.gltf';
        item.setAttribute('src', itemSrc);
    }
}

function insertMobilesAssets() {
    insertMobilesButtonsAssets();
    insertMobilesObjects();
}

function insertMobile() {
    let mobilesEnvironment = document.getElementById('mobiles-environment');
    let num = mobilesEnvironment.getAttribute('mobiles-environment').count + 1;
    let mobile = document.createElement('a-entity');
    let scene = document.getElementById('scene');

    mobilesEnvironment.setAttribute('mobiles-environment', { count: num });
    if (num === 1) {
        mobile.setAttribute('mobile', { program: 'programmer1' });
    } else {
        mobile.setAttribute('mobile', { event: 'move' });
    }
    scene.appendChild(mobile);
}

AFRAME.registerComponent('mobiles-environment', {
    schema: {
        count: { type: 'number', default: 0 }, //number of mobiles that have been created
    },

    init: function() {
        var self = this;
        let mobiles = this.el;

        insertMobilesAssets();
        mobiles.setAttribute('position', { x: -6, y: 4, z: 5 });
        mobiles.setAttribute('rotation', { x: 0, y: 90, z: 0 });
        //CREATE FIRST MOBILE
        insertMobile();
        //CREATE MOBILES ENVIRONMENT ESTRUCTURE
        makeMobilesEnvironmentEstruct();
    },
});

function makeMobilesEnvironmentEstruct(mobiles) {
    let mobilesEnvironment = document.getElementById('mobiles-environment');
    let mobilesMenu = document.createElement('a-entity');

    mobilesMenu.setAttribute('mobiles-menu', '');
    mobilesEnvironment.appendChild(mobilesMenu);
}

AFRAME.registerComponent('mobiles-menu', {

    init: function() {
        var self = this;
        let mobilesMenu = this.el;
        let element, box;

        for (let i = 0; i < 3; i++) {
            if (i === 0) {
                box = document.createElement('a-box');
                box.setAttribute('color', "black");
                box.setAttribute('geometry', { width: '4', height: "3", depth: "0.5" });
                element = box;
            } else if (i === 1) {
                element = document.createElement('a-text');
                element.setAttribute('scale', { x: 3, y: 2.5, z: 0.5 });
                element.setAttribute('text', { value: 'MOBILES', color: 'white', width: '7' });
                element.setAttribute('position', { x: -2, y: 1, z: 0.25 });
            } else if (i === 2) {
                element = document.createElement('a-entity');
                box = document.createElement('a-box');
                element.appendChild(box);
                element.setAttribute('position', { x: 0, y: -0.5, z: 0.5 });
                element.setAttribute('button', { text: 'New Mobile' });
                box.setAttribute('src', "#new_mobile_button");
                box.setAttribute('geometry', { width: '2', height: "1", depth: "0.5" });
            }
            mobilesMenu.appendChild(element);
        }
    },
});

function insertDrone(mobile, entity) {
    let mobiles = document.getElementsByClassName('mobile');
    let mobilesChildren = Array.from(mobiles);
    let found = false;
    let num = mobiles.length;
    let mobilesEnvironment = document.getElementById('mobiles-environment');
    let mobilesCount = mobilesEnvironment.getAttribute('mobiles-environment').count;
    let increment = 6.5; //Width Programmer Menu
    let objects = document.getElementsByClassName('object');
    let dronePosX = -5 - (increment * (mobilesCount - 1));
    let objectId, objectUsed;

    if (mobiles.length === 1) { //There was no mobile created
        entity.setAttribute('gltf-model', "#object1");
        mobile.setAttribute('mobile', { object: 'object1' });
    } else { //There is at least one mobile created
        for (let object of objects) {
            objectId = object.getAttribute('id');
            for (let i = 0; i < mobiles.length; i++) {
                objectUsed = mobilesChildren[i].getAttribute('mobile').object;
                if (objectId === objectUsed) { //found
                    found = true;
                    break;
                }
            }
            if (!found) {
                mobile.setAttribute('mobile', { object: objectId });
                objectId = '#' + objectId;
                entity.setAttribute('gltf-model', objectId);
                found = true;
                break;
            } else { //This object is being used. We have to keep searching for one unused
                found = false;
            }
        }
        if (!found) { //We reuse objects because they are all being used
            num = num - 11;
            objectId = '#object' + String(num);
            entity.setAttribute('gltf-model', objectId);
        }
    }
    entity.setAttribute('position', { x: dronePosX, y: 3, z: -6 });
    mobile.setAttribute('mobile', { position: [dronePosX, 3, -6] });
    entity.setAttribute('scale', { x: 0.005, y: 0.005, z: 0.005 });
    entity.setAttribute('animation-mixer', '');
    mobile.appendChild(entity);
}

function makeMobileEstruct(mobile) {
    let mobileNum = document.getElementById('mobiles-environment').getAttribute('mobiles-environment').count;
    let increment = 6.9;
    let mobilePosZ = 12 + (increment * (mobileNum - 1));
    let entity, pos;

    for (let k = 0; k < 2; k++) {
        entity = document.createElement('a-entity');
        if (k === 0) { //MOBILE-MENU          
            entity.setAttribute('mobile-menu', '');
            entity.setAttribute('position', { x: -6, y: 2, z: mobilePosZ });
            entity.setAttribute('rotation', { x: 0, y: 90, z: 0 });
            mobile.appendChild(entity);
        } else { //DRONE
            insertDrone(mobile, entity);
            console.log('Insertamos el dron');
        }
    }
}

AFRAME.registerComponent('mobile', {
    schema: {
        event: { type: 'string', default: 'move' },
        program: { type: 'string', default: '' },
        position: { type: 'array', default: [] }, //origin position
        object: { type: 'string', default: '' },
    },

    init: function() {
        var self = this;
        let mobile = this.el;
        let mobileClass = 'mobile';
        let mobilesEnvironment = document.getElementById('mobiles-environment');
        let num = mobilesEnvironment.getAttribute('mobiles-environment').count;
        let mobileId = mobileClass + num;

        mobile.setAttribute('class', mobileClass);
        mobile.setAttribute('id', mobileId);
        makeMobileEstruct(mobile);
        mobile.addEventListener(this.data.event, this.eventMobileHandlerMove);
    },

    eventMobileHandlerMove: function() {
        let program_id = this.parentNode.parentNode.getAttribute("mobile").program;
        let instructions = document.getElementById(program_id).children[2].children;
        let mobile = this.parentNode;

        for (let instruction of instructions) {
            instruction.emit('run', mobile);
        }
    },
});

AFRAME.registerComponent('mobile-menu', {
    init: function() {
        var self = this;
        let mobileMenu = this.el;
        let mobileNum = document.getElementById('mobiles-environment').getAttribute('mobiles-environment').count;
        let element;

        for (let i = 0; i < 4; i++) {
            if (i === 0) {
                element = document.createElement('a-box');
                element.setAttribute('color', 'brown');
                element.setAttribute('geometry', { width: '6', height: "3.5", depth: "0.5" });
            } else if (i === 1) {
                element = document.createElement('a-text');
                element.setAttribute('scale', { x: 2.5, y: 2, z: 0.5 });
                element.setAttribute('text', { value: 'MOBILE', color: 'white', width: '7' });
                element.setAttribute('position', { x: -2, y: 1.3, z: 0.3 });
            } else if (i === 2) {
                element = document.createElement('a-plane');
                element.setAttribute('position', { x: 1.5, y: 1.3, z: 0.3 });
                element.setAttribute('geometry', { width: '0.5', height: "0.5" });
                if (mobileNum === 1) {
                    element.setAttribute('src', '../Images/icon1.jpeg');
                }
            } else if (i === 3) {
                element = document.createElement('a-entity');
                element.setAttribute('mobile-buttons', '');
            }
            mobileMenu.appendChild(element);
        }
    }
});

AFRAME.registerComponent('mobile-buttons', {

    init: function() {
        var self = this;
        let numButtons = 4;
        let mobileButtons = this.el;
        let entity = document.createElement('a-entity');
        let box = document.createElement('a-box');

        for (let i = 0; i < numButtons; i++) {
            entity = document.createElement('a-entity');
            box = document.createElement('a-box');
            box.setAttribute('geometry', { width: '2', height: "1", depth: "0.5" });
            entity.appendChild(box);
            mobileButtons.appendChild(entity);
            if (i === 0) {
                entity.setAttribute('button', { text: 'Run' });
                entity.setAttribute('position', { x: 1.5, y: 0.3, z: 0.5 });
                box.setAttribute('src', "#run_button");
            } else if (i === 1) {
                entity.setAttribute('button', { text: 'Reset' });
                entity.setAttribute('position', { x: 1.5, y: -1, z: 0.5 });
                box.setAttribute('src', "#reset_button");
            } else if (i === 2) {
                entity.setAttribute('button', { text: 'Program' });
                entity.setAttribute('position', { x: -1.5, y: 0.3, z: 0.5 });
                box.setAttribute('src', "#program_button");
            } else if (i === 3) {
                entity.setAttribute('button', { text: 'Delete Mobile' });
                entity.setAttribute('position', { x: -1.5, y: -1, z: 0.5 });
                box.setAttribute('src', "#delete_mobile_button");
            }
        }

    }
});