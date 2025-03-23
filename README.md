# simple-addon-commands-Bedrock
A simple .js file to make it easier to create custom commands for Minecraft bedrock addons

## PLEASE NOTE: 
- This file will have to be copyed into the scripts folder in your Minecraft Bedrock addon to work.
- There is currently NO npm for this project. 
- This project currently only works for the latest -beta version of the ```@minecraft/server```
- This is project may be slow to update or fix problems

## This is a project made to make it easier for people to make custom commands for Mincraft Bedrock Addons

### How to import
1. Copy the [simple addon commands file](simple-addon-commands.js) into the scripts folder in your Minecraft Bedrock addon.
2. In your main JavaScript file use ```import { ChatCommands } from "./chatcommands.js";``` to import ChatCommands to your main.js file.
3. Use ```ChatCommands./*The funtion you want here*/``` to run the funtion you want from the Simple addon commands.

### Functions
- ```commandsetup``` Command setup sets up the basics for the commands, it takes three varibles, prefix, modversion, modauthor. PREFIX will be the prefix before every commad like: ```!```, or ```mc:``` that comes before the rest of the command. MODVERSION is the version of the mod/addon that will be displayed in the help menu. MODAUTHOR is the author of the mod/addon that will be displayed in the help menu.
```md
ChatCommands.commandsetup('mc:', '1.0.0', 'SnakeBDragon');
```
- ```addcommand``` Add command is how you setup your commands, it takes three varibles, commandname, commanddescription, musthaveOP. COMMANDNAME will be the name of your command that will come after the prefix. COMMANDDESCRIPTION is the description that will show in the help menu. MUSTHAVEop is either true or false, this defines if the player must have op or not to use this command.
```md
ChatCommands.addcommand('sayhi', 'Says hi to the player', false, (player, message) => {
    /*The code in this function will run when the command is used*/
    player.sendMessage('Hi ' + player.name + '!');
});
```
- ```getinputtypes``` Get input types returns all posible input types you can use, it has four varibles but these are not to be filled out.
```md
console.warn(getinputtypes())
/* will warn a array of all the input types */
```
- ```addinput``` Add input creates a input for the command, this funtion is to be ran inside a command. its main funtion is support for player names using ```""```. it takes four varibles, player, message, messagewordnum, inputtype. PLAYER is the class of the player that run the command. MESSAGE is the message for the command. MESSAGEWORDNUM is the number of spaces before this input like 1 would be the input right after the command. INPUTTYPE is the type of input you want.
```md
ChatCommands.addcommand('sayhi', 'Says hi to the player', false, (player, message) => {
    let inputdata1 = ChatCommands.addinput(player, message, 1, 'playername');
    console.warn(inputdata1.value); /* prints the username entered */
    console.warn(inputdata1.num); /* this is only for the playername input type this returns 1 less then the length of the username for spaces so "S B D" would be 2 this can be taken away from the next input so it dosent grab the B but the text after the username */
    let inputdata2 = ChatCommands.addinput(player, message, 2 - inputdata1.num, 'numinput');
});
```
- ```getuniversalvariable``` Get universal variable will get a universal variable that has been set before, it takes one varible, varible. VARIBLE is the varible that you wish to access.
```md
ChatCommands.getuniversalvariable('anyvariable');
```
- ```setuniversalvariable``` Set universal variable can be used to create or change a universal varible, it takes two varibles, varible, value. VARIBLE is the varible that you wish to create or edit. VALUE is the value you wish to assign to that varible.
```md
ChatCommands.setuniversalvariable('anyvariable', 'anyvalue');
```
<br>
Other
<br>
The .js file will automaticly make a help menu when you use ```commandsetup```. Tosee the help menu use PREFIXhelp e.g

```md
ChatCommands.commandsetup('mc:', '1.0.0', 'SnakeBDragon');
/*using mc:help will show the player the help menu in chat*/
```

```world.getDynamicProperty('chatcommands:prefixs');``` will get you a {} with all addons that use the simple addon comands with the prefix, modversion and modauthor inside. this can be used to see what other mods are on the world using simple addon commands allowing you at add fetures that interact with other addons if they are on the world.
