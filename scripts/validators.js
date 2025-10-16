// validators.js — input validation using regex

function validateDescription(desc) {
  const re = /^\S(?:.*\S)?$/;
  return re.test(desc);
}

function validateAmount(str) {
  const re = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
  return re.test(str);
}

function validateDate(d) {
  const re = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  return re.test(d);
}

function validateCategory(cat) {
  const re = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
  return re.test(cat);
}

// advanced: detect duplicate word (e.g. "meal meal")
function hasDuplicateWord(str) {
  const re = /\b(\w+)\s+\1\b/i;
  return re.test(str);
}

// expose
window.validators = {
  validateDescription,
  validateAmount,
  validateDate,
  validateCategory,
  hasDuplicateWord
};