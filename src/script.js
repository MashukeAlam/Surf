const {ipcRenderer} = require('electron'); 
require('./renderer.js');
const {remote} = require('electron');
const contextMenu = require('electron-context-menu');

let TAB_COUNT = 0;
let MASTER_RECORD = [];


const id = (str) => {
    return document.getElementById(str);
}