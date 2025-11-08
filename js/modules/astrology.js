export class AstrologyEventGenerator{
  constructor(logger){
    this.logger=logger;
    this.planets=[
      "Sol","Luna","Mercurio","Venus","Marte","Júpiter","Saturno","Urano","Neptuno","Plutón"
    ];
    this.aspects=[
      "en conjunción con","en sextil a","en cuadratura con","en trígono a","opuesto a"
    ];
    this.signs=[
      "Aries","Tauro","Géminis","Cáncer","Leo","Virgo","Libra","Escorpio","Sagitario","Capricornio","Acuario","Piscis"
    ];
    this.houses=[
      "Casa I","Casa II","Casa III","Casa IV","Casa V","Casa VI","Casa VII","Casa VIII","Casa IX","Casa X","Casa XI","Casa XII"
    ];
    this.effects=[
      "desata una ola de creatividad colectiva",
      "anuncia cambios inesperados en los patrones de vida",
      "otorga estabilidad a las colonias más alejadas",
      "intensifica la cooperación entre biomas",
      "predice una mutación notable en el ecosistema",
      "impulsa una migración masiva de células",
      "invita a un periodo de introspección y calma",
      "provoca un repunte de natalidad en zonas frías",
      "estimula la aparición de biomas híbridos",
      "favorece la supervivencia de estructuras complejas"
    ];
  }
  randomItem(list){return list[Math.floor(Math.random()*list.length)];}
  generateEvent(){
    const planet=this.randomItem(this.planets);
    const aspect=this.randomItem(this.aspects);
    const target=this.randomItem(this.planets.filter(p=>p!==planet));
    const sign=this.randomItem(this.signs);
    const house=this.randomItem(this.houses);
    const effect=this.randomItem(this.effects);
    return `Evento astrológico: ${planet} ${aspect} ${target} en ${sign}, influenciando ${house}, ${effect}.`;
  }
  emitEvent(){
    const message=this.generateEvent();
    if(this.logger){
      this.logger.add(message);
    }
    return message;
  }
}
