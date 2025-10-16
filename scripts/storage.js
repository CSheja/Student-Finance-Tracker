// storage.js — load / save data to localStorage

const STORAGE_KEY = 'finance:records';

function loadRecords() {
  const s = localStorage.getItem(STORAGE_KEY);
  if (!s) return [];
  try {
    return JSON.parse(s);
  } catch (err) {
    console.error('Could not parse records', err);
    return [];
  }
}

function saveRecords(arr) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch (err) {
    console.error('Could not save records', err);
  }
}

// expose
window.storage = {
  loadRecords,
  saveRecords
};
