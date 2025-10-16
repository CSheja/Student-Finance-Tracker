// My storage.js file will manage data persistence and app state

(function(){
  const STORAGE_KEY = 'studentFinanceRecords';
  const SETTINGS_KEY = 'studentFinanceSettings';

  let records = [];
  let settings = null;

  function loadRecords() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      records = JSON.parse(raw);
    } else {
      records = [];
    }
  }

  function saveRecords() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }

  function loadSettings() {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      settings = JSON.parse(raw);
    } else {
      settings = {
        cap: null,
        currency: 'RWF',
        exchangeRates: {
          RWF: 1,
          USD: 0.001,
          EUR: 0.0009
        }
      };
    }
  }

  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  function generateId() {
    // This is a simple unique id using timestamp + random
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function addRecord(record) {
    record.id = generateId();
    records.push(record);
    saveRecords();
  }

  function updateRecord(id, updated) {
    const idx = records.findIndex(r => r.id === id);
    if (idx >= 0) {
      records[idx] = {...records[idx], ...updated};
      saveRecords();
    }
  }

  function deleteRecord(id) {
    records = records.filter(r => r.id !== id);
    saveRecords();
  }

  function getRecords() {
    return [...records];
  }

  function getSettings() {
    if (!settings) {
      loadSettings();
    }
    return {...settings};
  }

  function setSettings(newSettings) {
    settings = {...settings, ...newSettings};
    saveSettings();
  }

  loadRecords();
  loadSettings();

  window.appState = {
    addRecord,
    updateRecord,
    deleteRecord,
    getRecords,
    getSettings,
    setSettings
  };
})();
