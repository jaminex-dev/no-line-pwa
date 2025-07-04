function actualizarIndicador(conectado) {
  const indicador = document.getElementById("indicador-sincronizacion");
  if (conectado) {
    indicador.textContent = "🟢 En línea";
  } else {
    indicador.textContent = "🔴 Sin conexión";
  }
}
