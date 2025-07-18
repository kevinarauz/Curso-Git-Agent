// Verificación rápida de que React funciona correctamente
console.log('🔍 Verificando React...');

try {
  const React = await import('react');
  console.log('✅ React importado correctamente:', React);
  console.log('✅ createContext disponible:', typeof React.createContext);
  console.log('✅ useState disponible:', typeof React.useState);
  console.log('✅ useEffect disponible:', typeof React.useEffect);
  console.log('✅ useContext disponible:', typeof React.useContext);
  console.log('✅ useReducer disponible:', typeof React.useReducer);
} catch (error) {
  console.error('❌ Error importando React:', error);
}

export {};
