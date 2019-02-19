// Send message to background script
chrome.runtime.sendMessage({ type: 'console', payload: 'hello' });

// Request a random user
chrome.runtime.sendMessage(
  { type: 'user' },
  (response) => {
    console.log(response);
    modifyUser(response);
  }
);

function modifyUser(response) {
  const nameField = fetchHTMLElement('[itemprop="name"]');
  if (nameField) {
    nameField.innerText = response.name;
  }

  const additionalNameField = fetchHTMLElement('[itemprop="additionalName"]');
  if (additionalNameField) {
    additionalNameField.innerText = response.username.toLowerCase();
  }
}

function fetchHTMLElement(query) {
  const collection = document.querySelectorAll(query);
  if (collection.length) {
    return collection[0] as HTMLElement;
  }
  return null;
}
