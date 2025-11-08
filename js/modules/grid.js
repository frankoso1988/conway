export class Grid {
  constructor(cols,rows){this.cols=cols;this.rows=rows;this.cells=this.createEmptyGrid();}
  createEmptyGrid(){return Array.from({length:this.rows},()=>Array(this.cols).fill(0));}
  randomize(){this.cells=this.cells.map(r=>r.map(()=>Math.random()>.82?1:0));}
  get(x,y){if(x<0||x>=this.cols||y<0||y>=this.rows)return 0;return this.cells[y][x];}
  set(x,y,val){this.cells[y][x]=val;}
  countPopulation(){return this.cells.flat().reduce((a,b)=>a+b,0);}
}
