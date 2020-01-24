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

/*function createProgramMenu(programMenu) {
    let entity, box, ;

    for (let i = 0; i < 3; i++) {
        if (i === 0) {
            box = document.createElement('a-box');
            box.setAttribute('src', );
        } else if (i === 1) {

        } else if (i === 2) {

        }
    }
}*/

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
    progId += num;
    prog.setAttribute('id', progId);
    programs.appendChild(prog);


    /*for (let i = 0; i < 2; i++) {
        entity = document.createElement('a-entity');
        entityAux = entity;
        if (i === 0) {
            entity.setAttribute('program-menu', '');
        } else {
            entity.setAttribute('program-buttons', '');
        }
    }*/
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
        let entity;

        for (let i = 0; i < 2; i++) {
            entity = document.createElement('a-entity');
            if (i === 0) {
                entity.setAttribute('program-menu', '');
            } else {
                entity.setAttribute('program-buttons', '');
            }
        }
    }

});

/*
AFRAME.registerComponent('program-menu', {

    init: function(){
        var self = this;
        let programMenu = ;

    }

});*/