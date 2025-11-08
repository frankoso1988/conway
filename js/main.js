import { Grid } from "./modules/grid.js";
import { Game } from "./modules/game.js";
import { UI } from "./modules/ui.js";
import { BiomeSystem } from "./modules/biome.js";
import { Logger } from "./modules/logger.js";
import { formatDateTime } from "./modules/utils.js";

const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");
const genCounter=document.getElementById("gen");
const popCounter=document.getElementById("pop");
const biomeCounter=document.getElementById("biomes");
const datetime=document.getElementById("datetime");
const logContainer=document.getElementById("logContainer");

const grid=new Grid(96,72);
const logger=new Logger(logContainer);
const biomeSystem=new BiomeSystem(grid,logger);
const game=new Game(grid,ctx,genCounter,popCounter,biomeCounter,biomeSystem,logger);
const ui=new UI(game,logger);

datetime.textContent=formatDateTime();
setInterval(()=>datetime.textContent=formatDateTime(),60000);
ui.bindControls();
game.draw();
game.updateStats();
