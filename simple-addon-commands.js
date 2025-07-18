import { world, system, Player } from "@minecraft/server";
//Made by SnakeBDragon
const ChatCommands = (function() {
    return {
      commandsetup,
      addcommand,
      getinputtypes,
      addinput,
    };
})();

const afterEvents = world.afterEvents;
const beforeEvents = world.beforeEvents;
let Uprefix = '';
let Umodversion = '1.0.0';
let Umodauthor = 'Unknown';
const CCERROR = {
    PREFIX_NOT_SET: '[Chat Commands] [ERROR] Prefix not set',
    PREFIX_SLASH: '[Chat Commands] [ERROR] Prefix cannot start with /',
    PREFIX_EMPTY: '[Chat Commands] [ERROR] Prefix cannot be empty',
    MISSING_VARIABLE: '[Chat Commands] [ERROR] Missing the variable: ',
    MISSING_INPUT: '[Chat Commands] [ERROR] Missing the input: ',
    NAV: '[Chat Commands] [ERROR] Not a variable ',
};
let normalchatcommands = []
let OPchatcommands = []

beforeEvents.chatSend.subscribe((data) => {
    const player = data.sender;
    const message = data.message;
    let dynamicvalue = undefined
    if(message.startsWith(Uprefix + 'help')) {
        data.cancel = true;
        player.sendMessage('------------------------------------------------' + Uprefix + 'help------------------------------------------------');
        player.sendMessage('Addon made by §2' + Umodauthor + ' §7| Version §6' + Umodversion + ' §7| Simple addon commands made by SnakeBDragon');
        for (let i = 0; i < normalchatcommands.length; i++) {
            dynamicvalue = undefined
            if (!normalchatcommands[i].hideondynamicproperty == false) {
                dynamicvalue = world.getDynamicProperty(normalchatcommands[i].hideondynamicproperty)
            }
            if (!dynamicvalue == true) {
                player.sendMessage('§6' + Uprefix + normalchatcommands[i].command + ' §7- ' + normalchatcommands[i].description);
            }
        }
        if (player.playerPermissionLevel == 2 && OPchatcommands.length >= 1) {
            player.sendMessage('------------------------------------------------' + Uprefix + 'OP--------------------------------------------------');;
            for (let i = 0; i < OPchatcommands.length; i++) {
                dynamicvalue = undefined
                if (!OPchatcommands[i].hideondynamicproperty == false) {
                    dynamicvalue = world.getDynamicProperty(OPchatcommands[i].hideondynamicproperty)
                }
                if (!dynamicvalue == true) {
                    player.sendMessage('§6' + Uprefix + OPchatcommands[i].command + ' §7- ' + OPchatcommands[i].description);
                }
            }
        }
    } 
})
   
function getinputtypes(playername='playername - can put a player name here "" is supported', numinput='numinput - any number', booleninput='booleninput - any bolen/true/false', input='input - anything dose not support fingerspaces') {	
    return [playername, numinput, booleninput, input]
}

function addinput(player, message, messagewordnum=1, inputtype='input') {
    if (player == undefined || player == null || player == '' || player == ' ') {
        console.warn(CCERROR.MISSING_VARIABLE + 'player');
        return CCERROR.MISSING_VARIABLE + 'player';
    }

    if (message == undefined || message == null || message == '' || message == ' ') {
        console.warn(CCERROR.MISSING_VARIABLE + 'message');
        return CCERROR.MISSING_VARIABLE + 'message';
    }
    
    if (messagewordnum <= 0 || messagewordnum != Number(messagewordnum)) {
        console.warn(CCERROR.MISSING_VARIABLE + 'messagewordnum');
        return CCERROR.MISSING_VARIABLE + 'messagewordnum';
    }

    if (inputtype != 'playername' && inputtype != 'numinput' && inputtype != 'booleninput' && inputtype != 'stringinput' && inputtype != 'input') {
        console.warn(CCERROR.MISSING_INPUT + 'inputtype');
        return CCERROR.MISSING_INPUT + 'inputtype';
    }

    if (inputtype == 'playername') {
        let messagesplit = message.split(' ');
        if (messagesplit[messagewordnum].split('')[0] == '"') {
            for (let i = 0; i < 5; i++) {
                if (messagesplit[messagewordnum + i].split('')[messagesplit[messagewordnum + i].split('').length - 1] == '"') {
                    let usernamelist = []; 
                    for (let j = 0; j < i + 1; j++) {
                        usernamelist.push(messagesplit[messagewordnum + j].replace(/"/g, ''));
                    }
                    usernamelist = usernamelist.join(' ');
                    let playerentity = 'ERROR'
                    for (let j = 0; j < world.getPlayers().length; j++) {
                        if (world.getPlayers()[j].name == usernamelist) {
                            playerentity = world.getPlayers()[j];
                            break;
                        }
                    }
                    return {'value': usernamelist, 'num': i, 'playerentity': playerentity};
                }
            }
        }
        else {
            let playerentity = 'ERROR'
            for (let j = 0; j < world.getPlayers().length; j++) {
                if (world.getPlayers()[j].name == messagesplit[messagewordnum]) {
                    playerentity = world.getPlayers()[j];
                    break;
                }
            }
            return {'value': messagesplit[messagewordnum], 'num': 0, 'playerentity': playerentity};
        }
    }
    if (inputtype == 'numinput') {
        let messagesplit = message.split(' ');
        if (messagesplit[messagewordnum] == Number(messagesplit[messagewordnum])) {
            return {'value': messagesplit[messagewordnum]};
        }
        else {
            return {'value': 'NaN'};
        }
    }

    if (inputtype == 'booleninput') {
        let messagesplit = message.split(' ');
        if (messagesplit[messagewordnum] == 'true' || messagesplit[messagewordnum] == 'false') {
            return {'value': messagesplit[messagewordnum]};
        }
        else if (messagesplit[messagewordnum] == 'True') {
            return {'value': 'true'};
        }
        else if (messagesplit[messagewordnum] == 'False') {
            return {'value': 'false'};
        }
        else {
            return {'value': 'NaB'};
        }
    }

    if (inputtype == 'input') {
        let messagesplit = message.split(' ');
        return {'value': messagesplit[messagewordnum]};
    }
}

function commandsetup(prefix, modversion='1.0.0', modauthor='Unknown') {
    system.runTimeout(() => {
        if(prefix.startsWith('/')) {
            console.warn(CCERROR.PREFIX_SLASH);
            return CCERROR.PREFIX_SLASH;
        }
        else if (prefix == '' || prefix ==' ' || prefix == undefined) {
            console.warn(CCERROR.PREFIX_EMPTY);
            return CCERROR.PREFIX_EMPTY;
        }
        else {
            Uprefix = prefix;
            Umodversion = modversion;
            Umodauthor = modauthor;
            let otherprefixs = world.getDynamicProperty('chatcommands:prefixs');
            if (otherprefixs == undefined) {
                otherprefixs = [];
                otherprefixs.push({
                    prefix: prefix,
                    modversion: modversion,
                    modauthor: modauthor
                })
            }
            else {
                otherprefixs = JSON.parse(otherprefixs);
                let R = 0;
                for (let i = 0; i < otherprefixs.length; i++) {
                    if (otherprefixs[i].prefix == prefix) {
                        R = 1
                        break;
                    }
                }
                if (R == 0) {
                    otherprefixs.push({
                        prefix: prefix,
                        modversion: modversion,
                        modauthor: modauthor
                    });
                }
            }
            otherprefixs = JSON.stringify(otherprefixs);
            world.setDynamicProperty('chatcommands:prefixs', otherprefixs);
            return true;
        }
    }, 1)
}

function addcommand(commandname, commanddescription, extraoptions = {musthaveop: false, hideondynamicproperty: 'str'}, callback) {
    if (extraoptions == false) {
        extraoptions = {musthaveop: false, hideondynamicproperty: false}
    }
    if (extraoptions.musthaveop == undefined) {
        extraoptions.musthaveop = false
    }
    if (extraoptions.hideondynamicproperty == undefined) {
        extraoptions.hideondynamicproperty = false
    }

    system.runTimeout(() => {
        if (commandname == undefined || commandname == '' || commandname == ' ') {
            console.warn(CCERROR.MISSING_VARIABLE + 'commandname');
            return;
        }

        if (commanddescription == undefined || commanddescription == '' || commanddescription == ' ') {
            console.warn(CCERROR.MISSING_VARIABLE + 'commanddescription');
            return;
        }

        if (extraoptions.musthaveop) {
            OPchatcommands.push({
                command: commandname,
                description: commanddescription,
                hideondynamicproperty: extraoptions.hideondynamicproperty
            });
        }
        else {
            normalchatcommands.push({
                command: commandname,
                description: commanddescription,
                hideondynamicproperty: extraoptions.hideondynamicproperty
            });
        }

        beforeEvents.chatSend.subscribe((data) => {
            const message = data.message;
            let dynamicvalue = undefined
            if (!extraoptions.hideondynamicproperty == false) {
                dynamicvalue = world.getDynamicProperty(extraoptions.hideondynamicproperty)
            }

            if (message.startsWith(Uprefix + commandname + ' ') || message == Uprefix + commandname) {
                if (!dynamicvalue == true) {
                    if (extraoptions.musthaveop) {
                        if (data.sender.playerPermissionLevel == 2) {
                            data.cancel = true;
                            system.run(() => {callback(data.sender, message)});
                        }
                        else {
                            data.cancel = true;
                            data.sender.sendMessage('§cYou need to be OP to use this command');
                        }
                    }
                    else {
                        data.cancel = true;
                        system.run(() => {callback(data.sender, message)});
                    }
                }
                else {
                    data.cancel = true;
                    data.sender.sendMessage('§cThis command has been disabled');
                }
            }
        });
    }, 1);
}

export { ChatCommands /* Made by SnakeBDragon */ };
