// Service Worker для Manifest V3
let debuggeeId = null;
let debuggerVariables = { Op1: null, Op2: null, Op3: null, Op4: null, Op5: null };

// Инициализация при установке расширения
chrome.runtime.onInstalled.addListener(() => {
  console.log('UltraFreeProMax extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'setDebuggerVariables') {
    debuggerVariables = { ...request };
    sendResponse({ success: true });
    return true;
  }
  if (request.action === 'startDebugging') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false });
        return;
      }
      debuggeeId = { tabId: tabs[0].id };
      chrome.debugger.attach(debuggeeId, '1.3', () => {
        if (chrome.runtime.lastError) {
          sendResponse({ success: false });
          return;
        }
        chrome.debugger.sendCommand(debuggeeId, 'Debugger.enable', () => {
          chrome.debugger.sendCommand(debuggeeId, 'Runtime.enable', () => {
            setBreakpoint();
            sendResponse({ success: true });
          });
        });
      });
    });
    return true;
  }
  if (request.type === 'closeDebugger') {
    if (debuggeeId) {
      chrome.debugger.detach(debuggeeId);
      debuggeeId = null;
    }
    return true;
  }
  if (request.action === 'hardReload') {
    hardReload(sendResponse);
    return true;
  }
});

// Функция hard reload (Ctrl+F5)
function hardReload(sendResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (chrome.runtime.lastError || tabs.length === 0) {
      sendResponse({ success: false, error: 'No active tab found' });
      return;
    }
    
    // Выполняем hard reload с bypassCache
    chrome.tabs.reload(tabs[0].id, { bypassCache: true }, () => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ success: true });
      }
    });
  });
}

function setBreakpoint() {
  if (!debuggerVariables.Op1 || isNaN(debuggerVariables.Op1)) {
    return;
  }

  const breakpointCode = `${debuggerVariables.Op2} = ${debuggerVariables.Op4}; false;`;

  chrome.debugger.sendCommand(debuggeeId, 'Debugger.setBreakpointByUrl', {
    lineNumber: parseInt(debuggerVariables.Op1),
    urlRegex: '.*(main\.js|main-r458-2\.js).*',
    condition: breakpointCode
  });
}

chrome.debugger.onEvent.addListener((debuggee, method) => {
  if (method === 'Debugger.paused') {
    chrome.debugger.sendCommand(debuggee, 'Runtime.evaluate', {
      expression: `${debuggerVariables.Op2} = ${debuggerVariables.Op4};`
    }, () => {
      chrome.debugger.sendCommand(debuggee, 'Debugger.resume', () => {
        setTimeout(() => {
          if (debuggeeId) {
            chrome.debugger.detach(debuggeeId);
            debuggeeId = null;
          }
        }, 1000);
      });
    });
  }
});

chrome.debugger.onDetach.addListener(() => {
  debuggeeId = null;
});