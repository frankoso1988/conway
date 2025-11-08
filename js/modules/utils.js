export function formatDateTime(){
  const n=new Date();
  return n.toLocaleString("es-AR",{dateStyle:"short",timeStyle:"short"});
}
