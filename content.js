const ENCRYPTION_KEY = 'free';

function decrypt(encoded) {
  const decoded = atob(encoded);
  return [...decoded].map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length))).join('');
}

// Функция для создания уведомлений
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: bold;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease-out;
    max-width: 400px;
    text-align: center;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Автоматически удаляем уведомление через 4 секунды
  setTimeout(() => {
    notification.style.animation = 'slideDown 0.3s ease-in';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Функция для создания уведомления с Telegram ссылкой
function showTelegramNotification() {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #4CAF50;
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: bold;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease-out;
    max-width: 400px;
    text-align: center;
    cursor: pointer;
  `;
  
  notification.innerHTML = `
    <div style="margin-bottom: 8px;">Everything went successfully, please wait a couple of seconds</div>
    <div style="font-size: 16px;">
      Subscribe to our Telegram: <span class="rainbow-text" style="font-weight: 900; text-decoration: underline;">L1ksa</span>
    </div>
  `;
  
  // Обработчик клика для открытия Telegram
  notification.addEventListener('click', () => {
    window.open('https://t.me/lik1sa', '_blank');
  });
  
  // Добавляем hover эффект
  notification.addEventListener('mouseenter', () => {
    notification.style.transform = 'translateX(-50%) scale(1.05)';
    notification.style.transition = 'transform 0.2s ease';
  });
  
  notification.addEventListener('mouseleave', () => {
    notification.style.transform = 'translateX(-50%) scale(1)';
  });
  
  document.body.appendChild(notification);
  
  // Автоматически удаляем уведомление через 8 секунд
  setTimeout(() => {
    notification.style.animation = 'slideDown 0.3s ease-in';
    setTimeout(() => notification.remove(), 300);
  }, 8000);
}

// Функция для определения версии Construct 3
function detectVersion() {
  const scripts = document.querySelectorAll('script[src]');
  for (let script of scripts) {
    const src = script.src;
    if (src.includes('editor.construct.net')) {
      // Ищем версию в URL
      const versionMatch = src.match(/r(\d+)/);
      if (versionMatch) {
        return versionMatch[1];
      }
    }
  }
  return null;
}

// Функция для поиска подходящей версии в списке
function findVersionConfig(version) {
  if (!window.versiones) return null;
  
  // Ищем точное совпадение версии
  for (let config of window.versiones) {
    if (config.name.includes(`r${version}`)) {
      return config;
    }
  }
  
  // Если точного совпадения нет, ищем ближайшую
  const versionNum = parseInt(version);
  let closest = null;
  let minDiff = Infinity;
  
  for (let config of window.versiones) {
    const name = config.name;
    const matches = name.match(/r(\d+)/g);
    if (matches) {
      for (let match of matches) {
        const configVersion = parseInt(match.substring(1));
        const diff = Math.abs(configVersion - versionNum);
        if (diff < minDiff) {
          minDiff = diff;
          closest = config;
        }
      }
    }
  }
  
  return closest;
}

// Функция автоматического инжекта
function autoInject() {
  try {
    // Проверяем, был ли уже выполнен hard reload для любой версии
    const wasHardReloaded = sessionStorage.getItem('construct3_hard_reloaded');
    if (wasHardReloaded === 'true') {
      // Если hard reload уже был выполнен, показываем уведомление об успехе и очищаем флаг
      sessionStorage.removeItem('construct3_hard_reloaded');
      showTelegramNotification();
      return;
    }
    
    // Определяем версию
    const detectedVersion = detectVersion();
    if (!detectedVersion) {
      showNotification('Version not found in list', 'error');
      return;
    }
    
    showNotification(`Successfully detected version: r${detectedVersion}`, 'success');
    
    // Ищем конфигурацию для этой версии
    const versionConfig = findVersionConfig(detectedVersion);
    if (!versionConfig) {
      showNotification('Version not found in list', 'error');
      return;
    }
    
    // Расшифровываем данные
    const decryptedData = JSON.parse(decrypt(versionConfig.code));
    
    // Отправляем переменные отладчика
    chrome.runtime.sendMessage({ type: 'setDebuggerVariables', ...decryptedData }, (response) => {
      if (response && response.success) {
        // Активируем модификацию
        window.postMessage({ type: 'Activar', options: decryptedData }, '*');
        
        if (decryptedData.Op5 === "NUEVO") {
          // Для новых версий запускаем отладку
          chrome.runtime.sendMessage({ action: 'startDebugging' }, (debugResponse) => {
            if (debugResponse && debugResponse.success) {
              // Для версий r458, r458-2 и r449-2 автоматически делаем hard reload
              if (detectedVersion === '458' || detectedVersion === '458-2' || detectedVersion === '449') {
                showNotification('Successfully injected! Auto-reloading...', 'success');
                
                // Устанавливаем флаг перед hard reload
                sessionStorage.setItem('construct3_hard_reloaded', 'true');
                
                // Автоматически делаем hard reload через 2 секунды
                setTimeout(() => {
                  chrome.runtime.sendMessage({ action: 'hardReload' }, (reloadResponse) => {
                    if (reloadResponse && reloadResponse.success) {
                      showNotification('Page reloaded with cache bypass!', 'success');
                    } else {
                      showNotification('Auto-reload failed, please press Ctrl+F5 manually', 'error');
                    }
                  });
                }, 2000);
              } else {
                showNotification('Successfully injected!', 'success');
              }
            } else {
              showNotification('Injection failed', 'error');
            }
          });
        } else {
          // Для старых версий
          if (detectedVersion === '458' || detectedVersion === '458-2' || detectedVersion === '449') {
            showNotification('Successfully injected! Auto-reloading...', 'success');
            
            // Устанавливаем флаг перед hard reload
            sessionStorage.setItem('construct3_hard_reloaded', 'true');
            
            // Автоматически делаем hard reload через 2 секунды
            setTimeout(() => {
              chrome.runtime.sendMessage({ action: 'hardReload' }, (reloadResponse) => {
                if (reloadResponse && reloadResponse.success) {
                  showNotification('Page reloaded with cache bypass!', 'success');
                } else {
                  showNotification('Auto-reload failed, please press Ctrl+F5 manually', 'error');
                }
              });
            }, 2000);
          } else {
            showNotification('Successfully injected!', 'success');
          }
        }
      } else {
        showNotification('Injection failed', 'error');
      }
    });
    
  } catch (error) {
    console.error('Auto injection error:', error);
    showNotification('Injection failed', 'error');
  }
}

// Инициализация
window.onload = function () {
  // Добавляем стили для уведомлений
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from {
        transform: translateX(-50%) translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
    }
    @keyframes slideDown {
      from {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
      to {
        transform: translateX(-50%) translateY(100px);
        opacity: 0;
      }
    }
    .rainbow-text {
      background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
      background-size: 400% 400%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: rainbow 2s ease-in-out infinite;
    }
    @keyframes rainbow {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Загружаем modifier.js
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('modifier.js');
  document.head.appendChild(script);
  
  // Ждем загрузки versiones.js и запускаем автоматический инжект
  const checkVersiones = setInterval(() => {
    if (window.versiones && window.versiones.length > 0) {
      clearInterval(checkVersiones);
      // Небольшая задержка для полной загрузки страницы
      setTimeout(autoInject, 1000);
    }
  }, 100);
  
  // Таймаут на случай, если versiones.js не загрузится
  setTimeout(() => {
    if (!window.versiones) {
      clearInterval(checkVersiones);
      showNotification('Version configuration not loaded', 'error');
    }
  }, 5000);
};