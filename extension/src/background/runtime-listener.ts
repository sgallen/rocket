export class RuntimeListener {
  constructor() {
    this.messageListener();
  }

  messageListener() {
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        this.messageHandler(request);
      }
    );
  }

  messageHandler(request) {
    switch (request.type) {
      case 'console':
        console.log(request.payload);
        break;

      default:
        break;
    }
  }
}
