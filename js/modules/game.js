export class Game {
  constructor(grid,ctx,genCounter,popCounter,biomeCounter,biomeSystem,logger){
    this.grid=grid;this.ctx=ctx;this.genCounter=genCounter;this.popCounter=popCounter;
    this.biomeCounter=biomeCounter;this.biomeSystem=biomeSystem;this.logger=logger;
    this.running=false;this.generation=0;this.interval=150;this.cellSize=10;
  }
  start(){if(!this.running){this.running=true;this.logger.add("Simulacion iniciada");this.loop();}}
  pause(){this.running=false;this.logger.add("Simulacion pausada");}
  clear(){this.grid.cells=this.grid.createEmptyGrid();this.biomeSystem.clear();this.generation=0;this.logger.add("Mundo reiniciado");this.draw();}
  randomize(){this.grid.randomize();this.biomeSystem.assignBiomes();this.logger.add("Mundo inicializado al azar");this.draw();}
  evolve(){this.biomeSystem.mutateBiomes();this.logger.add("Biomas evolucionaron");}
  loop(){if(!this.running)return;this.nextGeneration();this.draw();
    this.genCounter.textContent=this.generation;this.popCounter.textContent=this.grid.countPopulation();
    this.biomeCounter.textContent=this.biomeSystem.activeCount();
    setTimeout(()=>this.loop(),this.interval);}
  nextGeneration(){
    const newGrid=this.grid.createEmptyGrid();
    for(let y=0;y<this.grid.rows;y++){
      for(let x=0;x<this.grid.cols;x++){
        const n=this.countNeighbors(x,y),c=this.grid.get(x,y);
        newGrid[y][x]=(c&&(n==2||n==3))||(!c&&n==3)?1:0;
      }}
    this.grid.cells=newGrid;this.biomeSystem.updateBiomes();this.generation++;
  }
  countNeighbors(x,y){let s=0;for(let dy=-1;dy<=1;dy++){for(let dx=-1;dx<=1;dx++){if(dx==0&&dy==0)continue;s+=this.grid.get(x+dx,y+dy);}}return s;}
  draw(){const c=this.ctx,g=this.grid,cs=this.cellSize;c.clearRect(0,0,c.canvas.width,c.canvas.height);
    for(let y=0;y<g.rows;y++){for(let x=0;x<g.cols;x++){if(g.get(x,y)){c.fillStyle=this.biomeSystem.getColorAt(x,y);c.fillRect(x*cs,y*cs,cs-1,cs-1);}}}}
}
