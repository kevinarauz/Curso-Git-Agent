/**
 * Componente completamente estático para el modal del certificado
 * Resistente a auto-refresh y reloads
 */

// Función para crear el modal estático
export const createStaticCertificateModal = () => {
  // Eliminar modal existente si lo hay
  const existing = document.getElementById('static-certificate-modal');
  if (existing) {
    existing.remove();
  }

  // Crear modal completamente estático
  const modal = document.createElement('div');
  modal.id = 'static-certificate-modal';
  modal.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: rgba(0, 0, 0, 0.5) !important;
    z-index: 999999 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 20px !important;
    overflow: hidden !important;
    touch-action: none !important;
  `;

  // HTML del certificado
  modal.innerHTML = `
    <div style="
      background: white !important;
      border-radius: 24px !important;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
      max-width: 64rem !important;
      width: 100% !important;
      max-height: 90vh !important;
      position: relative !important;
      display: flex !important;
      flex-direction: column !important;
      touch-action: none !important;
    ">
      <!-- Botón de cerrar -->
      <button 
        onclick="document.getElementById('static-certificate-modal').remove(); document.body.style.overflow = 'auto';"
        style="
          position: absolute !important;
          top: 16px !important;
          right: 16px !important;
          z-index: 10 !important;
          background: white !important;
          background-opacity: 0.9 !important;
          border-radius: 50% !important;
          padding: 8px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          border: none !important;
          cursor: pointer !important;
          font-size: 20px !important;
          font-weight: bold !important;
          color: #374151 !important;
          width: 40px !important;
          height: 40px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        "
        onmouseover="this.style.backgroundColor='#f3f4f6';"
        onmouseout="this.style.backgroundColor='white';"
      >✕</button>

      <!-- Contenido scrolleable -->
      <div style="
        overflow-y: auto !important;
        flex: 1 !important;
        -webkit-overflow-scrolling: touch !important;
        scrollbar-width: thin !important;
      ">
        <!-- Header del certificado -->
        <div style="
          background: linear-gradient(to right, #2563eb, #7c3aed, #4f46e5) !important;
          padding: 32px !important;
          color: white !important;
          text-align: center !important;
          border-radius: 24px 24px 0 0 !important;
        ">
          <div style="margin-bottom: 16px !important;">
            <div style="
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
              width: 80px !important;
              height: 80px !important;
              background: rgba(255, 255, 255, 0.2) !important;
              border-radius: 50% !important;
              margin-bottom: 16px !important;
            ">🏆</div>
            <h1 style="
              font-size: 2.5rem !important;
              font-weight: bold !important;
              margin-bottom: 8px !important;
              margin: 0 !important;
            ">CERTIFICADO DE COMPLETACIÓN</h1>
            <p style="
              font-size: 1.25rem !important;
              color: rgba(219, 234, 254, 1) !important;
              margin: 8px 0 0 0 !important;
            ">Git Training Portal</p>
          </div>
        </div>

        <!-- Contenido del certificado -->
        <div style="padding: 48px !important; text-align: center !important;">
          <!-- Decoración superior -->
          <div style="display: flex !important; justify-content: center !important; margin-bottom: 32px !important;">
            <div style="
              border: 4px solid #fbbf24 !important;
              border-radius: 50% !important;
              padding: 24px !important;
              background: #fffbeb !important;
            ">
              <div style="font-size: 4rem !important;">🎓</div>
            </div>
          </div>

          <!-- Texto principal -->
          <div style="margin-bottom: 32px !important;">
            <h2 style="
              font-size: 1.5rem !important;
              color: #374151 !important;
              margin-bottom: 16px !important;
              margin: 0 !important;
            ">Se certifica que</h2>
            <h3 style="
              font-size: 3rem !important;
              font-weight: bold !important;
              color: #111827 !important;
              margin: 16px 0 !important;
              border-bottom: 4px solid #3b82f6 !important;
              padding-bottom: 8px !important;
              display: inline-block !important;
            ">Estudiante de Git</h3>
            <p style="
              font-size: 1.25rem !important;
              color: #374151 !important;
              margin: 24px 0 !important;
            ">ha completado exitosamente el</p>
            <h4 style="
              font-size: 2rem !important;
              font-weight: bold !important;
              color: #2563eb !important;
              margin: 0 0 24px 0 !important;
            ">Examen de Git</h4>
          </div>

          <!-- Detalles del curso -->
          <div style="
            background: #f9fafb !important;
            border-radius: 16px !important;
            padding: 32px !important;
            margin-bottom: 32px !important;
          ">
            <div style="
              display: grid !important;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
              gap: 24px !important;
              text-align: center !important;
            ">
              <div>
                <div style="font-size: 2rem !important; margin-bottom: 8px !important;">📚</div>
                <h5 style="
                  font-weight: bold !important;
                  color: #111827 !important;
                  margin: 0 0 4px 0 !important;
                ">Módulos Completados</h5>
                <p style="
                  color: #6b7280 !important;
                  margin: 0 !important;
                ">6 Secciones Prácticas</p>
              </div>
              <div>
                <div style="font-size: 2rem !important; margin-bottom: 8px !important;">⏱️</div>
                <h5 style="
                  font-weight: bold !important;
                  color: #111827 !important;
                  margin: 0 0 4px 0 !important;
                ">Duración</h5>
                <p style="
                  color: #6b7280 !important;
                  margin: 0 !important;
                ">1 Hora de Examen</p>
              </div>
              <div>
                <div style="font-size: 2rem !important; margin-bottom: 8px !important;">🏆</div>
                <h5 style="
                  font-weight: bold !important;
                  color: #111827 !important;
                  margin: 0 0 4px 0 !important;
                ">Puntuación</h5>
                <p style="
                  color: #6b7280 !important;
                  margin: 0 !important;
                ">10/10 Puntos</p>
              </div>
            </div>
          </div>

          <!-- Habilidades certificadas -->
          <div style="margin-bottom: 32px !important;">
            <h5 style="
              font-size: 1.25rem !important;
              font-weight: bold !important;
              color: #111827 !important;
              margin-bottom: 16px !important;
              margin-top: 0 !important;
            ">Habilidades Certificadas:</h5>
            <div style="
              display: flex !important;
              flex-wrap: wrap !important;
              justify-content: center !important;
              gap: 12px !important;
            ">
              <span style="
                padding: 8px 16px !important;
                background: #dbeafe !important;
                color: #1e40af !important;
                border-radius: 9999px !important;
                font-size: 0.875rem !important;
                font-weight: 500 !important;
              ">Configuración Git</span>
              <span style="
                padding: 8px 16px !important;
                background: #dcfce7 !important;
                color: #166534 !important;
                border-radius: 9999px !important;
                font-size: 0.875rem !important;
                font-weight: 500 !important;
              ">Repositorios Remotos</span>
              <span style="
                padding: 8px 16px !important;
                background: #e9d5ff !important;
                color: #7c2d12 !important;
                border-radius: 9999px !important;
                font-size: 0.875rem !important;
                font-weight: 500 !important;
              ">Área de Staging</span>
              <span style="
                padding: 8px 16px !important;
                background: #fed7aa !important;
                color: #9a3412 !important;
                border-radius: 9999px !important;
                font-size: 0.875rem !important;
                font-weight: 500 !important;
              ">Manejo de Ramas</span>
              <span style="
                padding: 8px 16px !important;
                background: #fecaca !important;
                color: #991b1b !important;
                border-radius: 9999px !important;
                font-size: 0.875rem !important;
                font-weight: 500 !important;
              ">Resolución de Conflictos</span>
              <span style="
                padding: 8px 16px !important;
                background: #e0e7ff !important;
                color: #3730a3 !important;
                border-radius: 9999px !important;
                font-size: 0.875rem !important;
                font-weight: 500 !important;
              ">Push y Sincronización</span>
            </div>
          </div>

          <!-- Fecha y firmas -->
          <div style="
            border-top: 1px solid #e5e7eb !important;
            padding-top: 32px !important;
          ">
            <div style="
              display: grid !important;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
              gap: 32px !important;
              text-align: center !important;
            ">
              <div>
                <div style="
                  border-bottom: 2px solid #d1d5db !important;
                  padding-bottom: 8px !important;
                  margin-bottom: 8px !important;
                  margin: 0 32px 8px 32px !important;
                ">
                  <p style="
                    font-size: 1.125rem !important;
                    font-weight: bold !important;
                    color: #111827 !important;
                    margin: 0 !important;
                  ">Git Training Portal</p>
                </div>
                <p style="
                  font-size: 0.875rem !important;
                  color: #6b7280 !important;
                  margin: 0 !important;
                ">Plataforma de Certificación</p>
              </div>
              <div>
                <div style="
                  border-bottom: 2px solid #d1d5db !important;
                  padding-bottom: 8px !important;
                  margin-bottom: 8px !important;
                  margin: 0 32px 8px 32px !important;
                ">
                  <p style="
                    font-size: 1.125rem !important;
                    font-weight: bold !important;
                    color: #111827 !important;
                    margin: 0 !important;
                  ">${new Date().toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
                <p style="
                  font-size: 0.875rem !important;
                  color: #6b7280 !important;
                  margin: 0 !important;
                ">Fecha de Completación</p>
              </div>
            </div>
          </div>

          <!-- Decoración inferior -->
          <div style="
            margin-top: 32px !important;
            display: flex !important;
            justify-content: center !important;
            gap: 16px !important;
          ">
            <div style="
              width: 12px !important;
              height: 12px !important;
              background: #3b82f6 !important;
              border-radius: 50% !important;
            "></div>
            <div style="
              width: 12px !important;
              height: 12px !important;
              background: #8b5cf6 !important;
              border-radius: 50% !important;
            "></div>
            <div style="
              width: 12px !important;
              height: 12px !important;
              background: #6366f1 !important;
              border-radius: 50% !important;
            "></div>
          </div>

          <!-- ID del certificado -->
          <div style="margin-top: 16px !important;">
            <p style="
              font-size: 0.75rem !important;
              color: #9ca3af !important;
              margin: 0 !important;
            ">ID del Certificado: GIT-${Date.now().toString().slice(-6)}</p>
          </div>
        </div>

        <!-- Botones de acción -->
        <div style="
          background: #f9fafb !important;
          padding: 24px 32px !important;
          border-radius: 0 0 24px 24px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 16px !important;
          align-items: center !important;
        ">
          <button 
            onclick="window.print();"
            style="
              padding: 12px 24px !important;
              background: #2563eb !important;
              color: white !important;
              border-radius: 12px !important;
              font-weight: 500 !important;
              border: none !important;
              cursor: pointer !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              gap: 8px !important;
              transition: background-color 0.2s !important;
            "
            onmouseover="this.style.backgroundColor='#1d4ed8';"
            onmouseout="this.style.backgroundColor='#2563eb';"
          >🖨️ Imprimir Certificado</button>
          <button 
            onclick="document.getElementById('static-certificate-modal').remove(); document.body.style.overflow = 'auto';"
            style="
              padding: 12px 24px !important;
              background: #6b7280 !important;
              color: white !important;
              border-radius: 12px !important;
              font-weight: 500 !important;
              border: none !important;
              cursor: pointer !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              gap: 8px !important;
              transition: background-color 0.2s !important;
            "
            onmouseover="this.style.backgroundColor='#4b5563';"
            onmouseout="this.style.backgroundColor='#6b7280';"
          >✖️ Cerrar</button>
        </div>
      </div>
    </div>
  `;

  // Prevenir scroll del body
  document.body.style.overflow = 'hidden';

  // Agregar al DOM
  document.body.appendChild(modal);

  // Bloquear refresh mientras el modal esté abierto
  const preventRefresh = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = 'El certificado está abierto. ¿Seguro que quieres salir?';
    return e.returnValue;
  };

  const preventKeyRefresh = (e: KeyboardEvent) => {
    if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
      e.preventDefault();
      console.warn('🚫 Refresh bloqueado - Certificado abierto');
    }
  };

  window.addEventListener('beforeunload', preventRefresh);
  window.addEventListener('keydown', preventKeyRefresh);

  // Cleanup cuando se cierre el modal
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const modalExists = document.getElementById('static-certificate-modal');
        if (!modalExists) {
          window.removeEventListener('beforeunload', preventRefresh);
          window.removeEventListener('keydown', preventKeyRefresh);
          observer.disconnect();
        }
      }
    });
  });

  observer.observe(document.body, { childList: true });

  return modal;
};
