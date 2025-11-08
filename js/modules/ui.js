export class UI{
  constructor(game,logger){this.game=game;this.logger=logger;}
  bindControls(){
    document.getElementById("startBtn").onclick=()=>this.game.start();
    document.getElementById("pauseBtn").onclick=()=>this.game.pause();
    document.getElementById("clearBtn").onclick=()=>this.game.clear();
    document.getElementById("randomBtn").onclick=()=>this.game.randomize();
    document.getElementById("evoBtn").onclick=()=>this.game.evolve();
    const astroBtn=document.getElementById("astroBtn");
    if(astroBtn)astroBtn.onclick=()=>this.game.triggerAstrologyEvent();
    document.getElementById("speedRange").oninput=e=>this.game.interval=parseInt(e.target.value);
    this.game.ctx.canvas.addEventListener("click",e=>{
      const r=this.game.ctx.canvas.getBoundingClientRect();
      const x=Math.floor((e.clientX-r.left)/this.game.cellSize);
      const y=Math.floor((e.clientY-r.top)/this.game.cellSize);
      const c=this.game.grid.get(x,y);this.game.grid.set(x,y,c?0:1);this.game.draw();});
  }
}
