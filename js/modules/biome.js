export class BiomeSystem{
  constructor(grid,logger){this.grid=grid;this.logger=logger;this.biomes=[];}
  assignBiomes(){this.biomes=[
    {name:"Bosque Azul",color:"#00bcd4"},
    {name:"Desierto Carmesi",color:"#ff5252"},
    {name:"Llanura Verde",color:"#76ff03"},
    {name:"Montana Violeta",color:"#9c27b0"}];}
  getColorAt(x,y){const s=(x*37+y*17)%this.biomes.length;return this.biomes[s]?.color||"#fff";}
  activeCount(){return this.biomes.length;}
  mutateBiomes(){if(Math.random()<.3){const nb={name:"Nueva Especie "+Math.floor(Math.random()*1000),color:`hsl(${Math.random()*360},70%,55%)`};
    this.biomes.push(nb);this.logger.add("Surge un nuevo bioma: "+nb.name);}}
  updateBiomes(){if(Math.random()<.05)this.mutateBiomes();}
  clear(){this.biomes=[];}
}
