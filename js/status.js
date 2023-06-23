const statusElement = document.getElementById('status');
const offlineModeDiv = document.getElementById('offline-mode');

// Estado inicial de conexión
if (!navigator.onLine) {
    showOfflineMode();
} else {
    showOnlineStatus();
}

window.addEventListener('offline', event => {
    showOfflineMode();
});

window.addEventListener('online', event => {
    showOnlineStatus();
});

function showOfflineMode() {
    offlineModeDiv.style.display = 'block';
}

function showOnlineStatus() {
    const onlineStatusDiv = document.getElementById('online-status');
    const statusElement = document.getElementById('status');
  
    onlineStatusDiv.style.display = 'block';
}

