export class Game {
  constructor(grid,ctx,genCounter,popCounter,biomeCounter,biomeSystem,logger){
    this.grid=grid;
    this.ctx=ctx;
    this.genCounter=genCounter;
    this.popCounter=popCounter;
    this.biomeCounter=biomeCounter;
    this.biomeSystem=biomeSystem;
    this.logger=logger;
    this.running=false;
    this.generation=0;
    this.interval=150;
    this.cellSize=10;
    this.defaultRules={survival:[2,3],birth:[3]};
    this.currentRules=this.createRuleSet(this.defaultRules);
    this.ghostTimer=0;
    this.activeGhostRule=null;
  }
  start(){
    if(this.running)return;
    this.running=true;
    this.logger.add("Simulacion iniciada");
    this.loop();
  }
  pause(){
    if(!this.running)return;
    this.running=false;
    this.logger.add("Simulacion pausada");
  }
  clear(){
    this.grid.cells=this.grid.createEmptyGrid();
    this.biomeSystem.clear();
    this.generation=0;
    this.ghostTimer=0;
    this.restoreDefaultRules();
    this.logger.add("Mundo reiniciado");
    this.draw();
    this.updateStats();
  }
  randomize(){
    this.grid.randomize();
    this.biomeSystem.assignBiomes();
    this.generation=0;
    this.ghostTimer=0;
    this.restoreDefaultRules();
    this.logger.add("Mundo inicializado al azar");
    this.draw();
    this.updateStats();
  }
  evolve(){
    this.step();
  }
  step(){
    if(this.running)return;
    this.advanceGeneration();
    this.logger.add("Generacion avanzada manualmente");
  }
  loop(){
    if(!this.running)return;
    this.advanceGeneration();
    setTimeout(()=>this.loop(),this.interval);
  }
  advanceGeneration(){
    this.nextGeneration();
    this.draw();
    this.updateStats();
  }
  updateStats(){
    this.genCounter.textContent=this.generation;
    this.popCounter.textContent=this.grid.countPopulation();
    this.biomeCounter.textContent=this.biomeSystem.activeCount();
  }
  nextGeneration(){
    const newGrid=this.grid.createEmptyGrid();
    const survival=this.currentRules.survival;
    const birth=this.currentRules.birth;
    for(let y=0;y<this.grid.rows;y++){
      for(let x=0;x<this.grid.cols;x++){
        const neighbors=this.countNeighbors(x,y);
        const current=this.grid.get(x,y);
        if(current){
          newGrid[y][x]=survival.has(neighbors)?1:0;
        }else{
          newGrid[y][x]=birth.has(neighbors)?1:0;
        }
      }
    }
    this.grid.cells=newGrid;
    this.biomeSystem.updateBiomes();
    this.generation++;
    if(this.ghostTimer>0){
      this.ghostTimer--;
      if(this.ghostTimer===0){
        this.restoreDefaultRules();
      }
    }
  }
  countNeighbors(x,y){
    let sum=0;
    for(let dy=-1;dy<=1;dy++){
      for(let dx=-1;dx<=1;dx++){
        if(dx===0&&dy===0)continue;
        sum+=this.grid.get(x+dx,y+dy);
      }
    }
    return sum;
  }
  draw(){
    const context=this.ctx;
    const grid=this.grid;
    const cs=this.cellSize;
    context.clearRect(0,0,context.canvas.width,context.canvas.height);
    for(let y=0;y<grid.rows;y++){
      for(let x=0;x<grid.cols;x++){
        if(grid.get(x,y)){
          context.fillStyle=this.biomeSystem.getColorAt(x,y);
          context.fillRect(x*cs,y*cs,cs-1,cs-1);
        }
      }
    }
  }
  triggerGhostEffect(){
    const pattern=this.spawnGhostPattern();
    const rule=this.randomGhostRule();
    this.applyGhostRule(rule);
    this.logger.add("Efecto fantasma: "+pattern+" invoca "+rule.name+" con regla B"+rule.birth.join("")+"/S"+rule.survival.join("")+" durante 3 generaciones");
    this.draw();
    this.updateStats();
  }
  spawnGhostPattern(){
    const patterns=[
      {name:"Remolino Espectral",cells:[[0,0],[1,0],[2,0],[2,1],[1,2]]},
      {name:"Cruz Fantasmal",cells:[[1,0],[0,1],[1,1],[2,1],[1,2]]},
      {name:"Neblina Errante",cells:[[0,1],[1,0],[1,1],[2,1],[3,2],[2,3],[1,3]]}
    ];
    const choice=patterns[Math.floor(Math.random()*patterns.length)];
    const maxX=Math.max(...choice.cells.map(([cx])=>cx));
    const maxY=Math.max(...choice.cells.map(([,cy])=>cy));
    const offsetX=Math.floor(Math.random()*(this.grid.cols-(maxX+2)))+1;
    const offsetY=Math.floor(Math.random()*(this.grid.rows-(maxY+2)))+1;
    if(!this.biomeSystem.biomes.length)this.biomeSystem.assignBiomes();
    choice.cells.forEach(([dx,dy])=>{this.grid.set(offsetX+dx,offsetY+dy,1);});
    return choice.name;
  }
  randomGhostRule(){
    const rules=[
      {name:"HighLife",survival:[2,3],birth:[3,6]},
      {name:"Transicion Crepuscular",survival:[1,2,5],birth:[3,6]},
      {name:"Eco Nocturno",survival:[3,4,6,7,8],birth:[3,6,7,8]}
    ];
    return rules[Math.floor(Math.random()*rules.length)];
  }
  applyGhostRule(rule){
    this.currentRules=this.createRuleSet(rule);
    this.activeGhostRule=rule;
    this.ghostTimer=3;
  }
  restoreDefaultRules(){
    this.currentRules=this.createRuleSet(this.defaultRules);
    if(this.activeGhostRule){
      this.logger.add("Las reglas clasicas retornan tras el efecto fantasma");
      this.activeGhostRule=null;
    }
  }
  createRuleSet(rule){
    return{survival:new Set(rule.survival),birth:new Set(rule.birth)};
  }
}
