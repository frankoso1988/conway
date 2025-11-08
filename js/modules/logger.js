export class Logger{
  constructor(container){this.container=container;}
  add(msg){const t=new Date().toLocaleTimeString();
    this.container.innerHTML=`[${t}] ${msg}<br>`+this.container.innerHTML;}
}
