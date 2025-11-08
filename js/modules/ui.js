export class UI{
  constructor(game,logger){
    this.game=game;
    this.logger=logger;
  }
  bindControls(){
    document.getElementById("startBtn").onclick=()=>this.game.start();
    document.getElementById("pauseBtn").onclick=()=>this.game.pause();
    document.getElementById("clearBtn").onclick=()=>this.game.clear();
    document.getElementById("randomBtn").onclick=()=>this.game.randomize();
    document.getElementById("evoBtn").onclick=()=>this.game.step();
    document.getElementById("ghostBtn").onclick=()=>this.game.triggerGhostEffect();
    document.getElementById("speedRange").oninput=e=>this.game.interval=parseInt(e.target.value,10);
    this.game.ctx.canvas.addEventListener("click",e=>{
      const rect=this.game.ctx.canvas.getBoundingClientRect();
      const x=Math.floor((e.clientX-rect.left)/this.game.cellSize);
      const y=Math.floor((e.clientY-rect.top)/this.game.cellSize);
      const current=this.game.grid.get(x,y);
      this.game.grid.set(x,y,current?0:1);
      this.game.draw();
      this.game.updateStats();
    });
  }
}
