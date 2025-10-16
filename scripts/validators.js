// The validators.js will help in validating the user input by using regex for checking the format

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

// This advanced regex will help me in detecting duplicate words
function hasDuplicateWord(str) {
  const re = /\b(\w+)\s+\1\b/i;
  return re.test(str);
}

window.validators = {
  validateDescription,
  validateAmount,
  validateDate,
  validateCategory,
  hasDuplicateWord
};