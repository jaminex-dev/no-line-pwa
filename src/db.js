const db = {
  local: new PouchDB("no_line_datos"),
  remota: new PouchDB("http://admin:1234@10.1.1.134:5984/no_line_data")
};

// Sincronización continua
db.local.sync(db.remota, {
  live: true,
  retry: true
}).on("change", info => {
  console.log("Cambio detectado:", info);
}).on("paused", () => {
  actualizarIndicador(true);
}).on("active", () => {
  actualizarIndicador(true);
}).on("error", err => {
  console.error("Error de sincronización:", err);
  actualizarIndicador(false);
});
