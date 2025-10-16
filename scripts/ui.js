// This file will be for handling navigation,binding events and rendering
(function(){
  let currentEditId = null;

  function showSection(id) {
    document.querySelectorAll('.page-section').forEach(sec => {
      sec.style.display = sec.id === id ? 'block' : 'none';
    });
  }

  function bindNav() {
    ['dashboard','records','add','settings','help'].forEach(n => {
      const btn = document.getElementById('nav-' + n);
      if (btn) {
        btn.addEventListener('click', () => {
          showSection(n);
        });
      }
    });
  }

  function convertAmount(amountInRWF) {
    const settings = window.appState.getSettings();
    const rates = settings.exchangeRates || { RWF: 1, USD: 0, EUR: 0 };
    const rate = rates[settings.currency] || 1;
    return amountInRWF * rate;
  }

  function renderRecords(recs, searchRe) {
    const tbody = document.getElementById('records-body');
    tbody.innerHTML = '';
    const settings = window.appState.getSettings();
    recs.forEach(r => {
      const tr = document.createElement('tr');
      function makeTd(content) {
        const td = document.createElement('td');
        if (searchRe) td.innerHTML = window.searchUtils.highlightMatches(content, searchRe);
        else td.textContent = content;
        return td;
      }

      tr.append(makeTd(r.description));
      tr.append(makeTd(convertAmount(r.amount).toFixed(2) + ' ' + settings.currency));
      tr.append(makeTd(r.category));
      tr.append(makeTd(r.date));

      const tdAct = document.createElement('td');
      const btnE = document.createElement('button');
      btnE.textContent = 'Edit';
      btnE.addEventListener('click', () => {
        fillForm(r);
        showSection('add');
      });
      tdAct.append(btnE);

      const btnD = document.createElement('button');
      btnD.textContent = 'Delete';
      btnD.addEventListener('click', () => {
        if (confirm('Delete this record?')) {
          window.appState.deleteRecord(r.id);
          refreshUI();
        }
      });
      tdAct.append(btnD);

      tr.append(tdAct);
      tbody.append(tr);
    });
  }

  function renderStats() {
    const recs = window.appState.getRecords();
    const set = window.appState.getSettings();

    document.getElementById('stat-total').textContent = recs.length;

    const rawSum = recs.reduce((s, r) => s + Number(r.amount), 0);
    const sumConv = convertAmount(rawSum);
    document.getElementById('stat-sum').textContent = sumConv.toFixed(2) + ' ' + set.currency;

    const freq = {};
    recs.forEach(r => {
      freq[r.category] = (freq[r.category] || 0) + Number(r.amount);
    });
    const topCat = Object.keys(freq).sort((a,b) => freq[b] - freq[a])[0] || '—';
    document.getElementById('stat-top').textContent = topCat;

    const capEl = document.getElementById('stat-cap');
    if (set.cap != null) {
      const remRaw = set.cap - rawSum;
      const remConv = convertAmount(remRaw);
      if (remRaw >= 0) {
        capEl.textContent = remConv.toFixed(2) + ' ' + set.currency + ' remaining';
      } else {
        capEl.textContent = 'Over by ' + Math.abs(remConv).toFixed(2) + ' ' + set.currency;
      }
    } else {
      capEl.textContent = 'No cap set';
    }
  }

  function bindSearchSort() {
    const inp = document.getElementById('search-input');
    const sel = document.getElementById('sort-select');
    function apply() {
      const pattern = inp.value.trim();
      const re = window.searchUtils.compileRegex(pattern, 'i');
      let recs = window.appState.getRecords();
      const key = sel.value;
      recs.sort((a,b) => {
        if (key === 'amount') return Number(a.amount) - Number(b.amount);
        if (key === 'description') return a.description.localeCompare(b.description);
        if (key === 'date') return a.date.localeCompare(b.date);
        return 0;
      });
      renderRecords(recs, re);
    }
    inp.addEventListener('input', apply);
    sel.addEventListener('change', apply);
  }

  function fillForm(r) {
    document.getElementById('inp-desc').value = r.description;
    document.getElementById('inp-amt').value = r.amount;
    document.getElementById('inp-cat').value = r.category;
    document.getElementById('inp-date').value = r.date;
    currentEditId = r.id;
  }

  function bindForm() {
    const form = document.getElementById('txn-form');
    const inpDesc = document.getElementById('inp-desc');
    const inpAmt = document.getElementById('inp-amt');
    const inpCat = document.getElementById('inp-cat');
    const inpDate = document.getElementById('inp-date');

    form.addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('err-desc').textContent = '';
      document.getElementById('err-amt').textContent = '';
      document.getElementById('err-cat').textContent = '';
      document.getElementById('err-date').textContent = '';

      let valid = true;
      if (!window.validators.validateDescription(inpDesc.value)) {
        document.getElementById('err-desc').textContent = 'Invalid description';
        valid = false;
      }
      if (!window.validators.validateAmount(inpAmt.value)) {
        document.getElementById('err-amt').textContent = 'Invalid amount';
        valid = false;
      }
      if (!window.validators.validateCategory(inpCat.value)) {
        document.getElementById('err-cat').textContent = 'Invalid category';
        valid = false;
      }
      if (!window.validators.validateDate(inpDate.value)) {
        document.getElementById('err-date').textContent = 'Invalid date';
        valid = false;
      }
      if (window.validators.hasDuplicateWord(inpDesc.value)) {
        document.getElementById('err-desc').textContent += ' (duplicate word)';
        valid = false;
      }
      if (!valid) return;

      const obj = {
        description: inpDesc.value.trim(),
        amount: Number(inpAmt.value),
        category: inpCat.value.trim(),
        date: inpDate.value
      };

      if (currentEditId !== null) {
        window.appState.updateRecord(currentEditId, obj);
        currentEditId = null;
      } else {
        window.appState.addRecord(obj);
      }
      form.reset();
      refreshUI();
      showSection('records');
    });

    document.getElementById('btn-cancel').addEventListener('click', () => {
      currentEditId = null;
      form.reset();
      showSection('records');
    });
  }

  function bindKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'n':
            e.preventDefault();
            showSection('add');
            break;
          case 'd':
            e.preventDefault();
            showSection('dashboard');
            break;
          case 'r':
            e.preventDefault();
            showSection('records');
            break;
          case 's':
            e.preventDefault();
            showSection('settings');
            break;
        }
      }
      if (e.key === 'Escape') {
        const form = document.getElementById('txn-form');
        if (form && form.style.display !== 'none') {
          e.preventDefault();
          form.reset();
          showSection('records');
        }
      }
    });
  }

  function refreshUI() {
    renderRecords(window.appState.getRecords(), null);
    renderStats();
  }

  function init() {
    bindNav();
    showSection('dashboard');
    bindSearchSort();
    bindForm();
    bindKeyboardShortcuts();
    refreshUI();
    if (window.drawChart) {
      window.drawChart();
    }
  }

  window.ui = { init };
})();
