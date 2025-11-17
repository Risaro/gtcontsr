window.addEventListener('message', (event) => {
  if (event.data.type === 'Activar') {
    const data = event.data.options;
    const targetVar = window[data.Op5];
    if (data.Op5 === "NUEVO") window.postMessage({ type: 'startDebugging' }, '*');
    if (typeof targetVar !== 'undefined') {
      targetVar[data.Op1] = (data.Op4 === 'true');
      targetVar[data.Op2] = `"${data.Op3}"`;
    }
  }
});