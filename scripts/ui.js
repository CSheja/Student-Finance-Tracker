// ui.js — handles rendering, navigation, binding events

(function(){
  function showSection(id) {
    document.querySelectorAll('.page-section').forEach(sec => {
      sec.style.display = sec.id === id ? 'block' : 'none';
    });
  }

  function bindNav() {
    const names = ['dashboard','records','add','settings','help'];
    names.forEach(n => {
      const btn = document.getElementById('nav-' + n);
      if (btn) {
        btn.addEventListener('click', () => {
          showSection(n);
        });
      }
    });
  }

  function renderRecords(recs, searchRe) {
    const tbody = document.getElementById('records-body');
    tbody.innerHTML = '';
    recs.forEach(r => {
      const tr = document.createElement('tr');

      function makeTd(content) {
        const td = document.createElement('td');
        if (searchRe) {
          td.innerHTML = window.searchUtils.highlightMatches(content, searchRe);
        } else {
          td.textContent = content;
        }
        return td;
      }

      tr.append(makeTd(r.description));
      tr.append(makeTd(parseFloat(r.amount).toFixed(2)));
      tr.append(makeTd(r.category));
      tr.append(makeTd(r.date));

      const tdAct = document.createElement('td');
      const btnE = document.createElement('button');
      btnE.textContent = 'Edit';
      btnE.addEventListener('click', () => {
        // TODO: fill form with r, then switch to add section in edit mode
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

    const sum = recs.reduce((s, r) => s + Number(r.amount), 0);
    document.getElementById('stat-sum').textContent = sum.toFixed(2);

    const freq = {};
    recs.forEach(r => {
      freq[r.category] = (freq[r.category] || 0) + Number(r.amount);
    });
    const topCat = Object.keys(freq).sort((a,b) => freq[b] - freq[a])[0] || '—';
    document.getElementById('stat-top').textContent = topCat;

    if (set.cap != null) {
      const rem = Number(set.cap) - sum;
      const el = document.getElementById('stat-cap');
      if (rem >= 0) {
        el.textContent = rem.toFixed(2) + ' RWF remaining';
      } else {
        el.textContent = 'Over by ' + Math.abs(rem).toFixed(2) + ' RWF';
      }
    } else {
      document.getElementById('stat-cap').textContent = 'No cap set';
    }
  }

  function bindSearchSort() {
    const inp = document.getElementById('search-input');
    const sel = document.getElementById('sort-select');

    function apply() {
      const pattern = inp.value.trim();
      const re = window.searchUtils.compileRegex(pattern, 'i');
      let recs = window.appState.getRecords();

      // sort
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

  function bindForm() {
    const form = document.getElementById('txn-form');
    const inpDesc = document.getElementById('inp-desc');
    const inpAmt = document.getElementById('inp-amt');
    const inpCat = document.getElementById('inp-cat');
    const inpDate = document.getElementById('inp-date');

    form.addEventListener('submit', e => {
      e.preventDefault();
      // clear error spans
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
        document.getElementById('err-desc').textContent += ' (duplicate word) ';
        valid = false;
      }

      if (!valid) {
        return;  // don't add
      }

      const obj = {
        description: inpDesc.value.trim(),
        amount: Number(inpAmt.value),
        category: inpCat.value.trim(),
        date: inpDate.value
      };
      window.appState.addRecord(obj);
      form.reset();
      refreshUI();
      showSection('records');
    });

    document.getElementById('btn-cancel').addEventListener('click', () => {
      showSection('records');
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
    refreshUI();
  }

  window.ui = {
    init
  };
})();