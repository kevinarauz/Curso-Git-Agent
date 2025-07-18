import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Git Training Portal</h1>
      <p>Aplicación funcionando correctamente!</p>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
