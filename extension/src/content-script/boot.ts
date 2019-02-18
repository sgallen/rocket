let nameFields = document.getElementsByClassName('vcard-names');
if (nameFields.length) {
  const el = nameFields[0] as HTMLElement;
  el.innerText = 'Optimus Prime';
}

// Send message to background script
let request = { type: 'console', payload: 'hello' };
chrome.runtime.sendMessage(request);
