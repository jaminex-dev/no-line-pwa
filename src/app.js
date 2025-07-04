document.getElementById("guardar").addEventListener("click", async () => {
  const producto = document.getElementById("producto").value.trim();
  const peso = parseFloat(document.getElementById("peso").value);

  // Validación simple
  if (!producto || isNaN(peso)) return alert("Producto y peso son obligatorios");

  const registro = {
    _id: new Date().toISOString(),
    producto,
    peso
  };

  // Guardar en IndexedDB
  try {
    await db.local.put(registro);
    document.getElementById("producto").value = "";
    document.getElementById("peso").value = "";
    mostrarRegistros();
  } catch (err) {
    console.error("Error al guardar:", err);
  }
});

// Mostrar registros al cargar
async function mostrarRegistros() {
  const lista = document.getElementById("lista-registros");
  lista.innerHTML = "";

  const resultado = await db.local.allDocs({ include_docs: true, descending: true });

  resultado.rows.forEach(({ doc }) => {
    const li = document.createElement("li");
    li.textContent = `${doc.producto}: ${doc.peso} kg`;
    lista.appendChild(li);
  });
}

mostrarRegistros();
