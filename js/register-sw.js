// Reviso si el browser soport SW
if ('serviceWorker' in navigator){
  navigator.serviceWorker.register('../sw.js').then((message)=>{
      console.log('Service Worker registrado con éxito');
  })
} else { // no soporta SW
  alert('Error al registrar el Service Worker');
}




