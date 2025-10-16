// The state.jswill help in the web app logic for adding, updating, deleting, getting, settings

(function(){
  let records = window.storage.loadRecords();
  let settings = {
    cap: null,
    baseCurrency: 'RWF',
    rateUsd: null,
    rateEur: null
  };

  function genId() {
    return 'txn_' + Date.now();
  }

  function addRecord(obj) {
    obj.id = genId();
    const now = new Date().toISOString();
    obj.createdAt = now;
    obj.updatedAt = now;
    records.push(obj);
    window.storage.saveRecords(records);
    return obj;
  }

  function updateRecord(id, obj) {
    const rec = records.find(r => r.id === id);
    if (!rec) return null;
    Object.assign(rec, obj);
    rec.updatedAt = new Date().toISOString();
    window.storage.saveRecords(records);
    return rec;
  }

  function deleteRecord(id) {
    records = records.filter(r => r.id !== id);
    window.storage.saveRecords(records);
  }

  function getRecords() {
    return records.slice();
  }

  function setSettings(obj) {
    Object.assign(settings, obj);
  }

  function getSettings() {
    return Object.assign({}, settings);
  }

  window.appState = {
    addRecord,
    updateRecord,
    deleteRecord,
    getRecords,
    setSettings,
    getSettings
  };
})();