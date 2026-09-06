let serviciosSeleccionados = 0;
function toggleModo() {
  const html = document.documentElement;
  const btn  = document.getElementById('btnModo');
  const esDark = html.getAttribute('data-theme') === 'dark';

  html.setAttribute('data-theme', esDark ? 'light' : 'dark');
  btn.innerHTML = esDark
    ? '<i class="bi bi-moon-stars-fill me-1"></i> Modo oscuro'
    : '<i class="bi bi-sun-fill me-1"></i> Modo claro';
}


function solicitar(btn, nombre) {
  serviciosSeleccionados++;
  document.getElementById('navCount').textContent    = serviciosSeleccionados;
  document.getElementById('floatCount').textContent  = serviciosSeleccionados;
 
  const badge = document.getElementById('navCounter');
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 300);
 
  const fc = document.getElementById('floatingCounter');
  fc.style.display = 'flex';


  document.getElementById('modalServiciosMsg').textContent =
    `Servicios seleccionados: ${serviciosSeleccionados}`;
  new bootstrap.Modal(document.getElementById('modalServicios')).show();
}


const reglas = {
  fNombre:    { re: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/, msg: 'Mínimo 2 letras, sin números.' },
  fApellidos: { re: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,80}$/, msg: 'Mínimo 2 letras, sin números.' },
  fEdad:      { re: /^([1-9][0-9]?|1[01][0-9]|120)$/,  msg: 'Ingresa una edad válida (1 – 120).' },
  fCiudad:    { re: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,60}$/, msg: 'Mínimo 2 letras.' },
  fTelefono:  { re: /^[0-9]{10}$/,                      msg: '10 dígitos numéricos.' },
  fCorreo:    { re: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,   msg: 'Correo electrónico inválido.' },
};


function validarCampo(id) {
  const el    = document.getElementById(id);
  const regla = reglas[id];
  const valido = regla.re.test(el.value.trim());
  el.classList.toggle('is-invalid', !valido);
  el.classList.toggle('is-valid',    valido);
  return valido;
}


document.addEventListener('DOMContentLoaded', () => {
  Object.keys(reglas).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => validarCampo(id));
  });
});


function registrar() {
  let ok = true;

 
  Object.keys(reglas).forEach(id => {
    if (!validarCampo(id)) ok = false;
  });

 
  const sel = document.getElementById('fServicio');
  if (!sel.value) {
    sel.classList.add('is-invalid');
    ok = false;
  } else {
    sel.classList.remove('is-invalid');
  }

  if (!ok) return;

 
  const datos = [
    { label: 'Nombre',           val: document.getElementById('fNombre').value.trim() },
    { label: 'Apellidos',        val: document.getElementById('fApellidos').value.trim() },
    { label: 'Edad',             val: document.getElementById('fEdad').value + ' años' },
    { label: 'Ciudad',           val: document.getElementById('fCiudad').value.trim() },
    { label: 'Teléfono',         val: document.getElementById('fTelefono').value.trim() },
    { label: 'Correo',           val: document.getElementById('fCorreo').value.trim() },
    { label: 'Servicio interés', val: sel.value },
  ];

  
  const grid = document.getElementById('modalRegistroData');
  grid.innerHTML = datos.map(d => `
    <div class="data-item">
      <label>${d.label}</label>
      <span>${d.val}</span>
    </div>`).join('');

  new bootstrap.Modal(document.getElementById('modalRegistro')).show();
}
