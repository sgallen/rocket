import { fetchRandomUser } from './service';

export class RuntimeListener {
  constructor() {
    this.messageListener();
  }

  messageListener() {
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        // true must be returned to indicate async handling of sendResponse
        // https://developer.chrome.com/apps/messaging#simple
        return this.messageHandler(request, sendResponse);
      }
    );
  }

  messageHandler(request, sendResponse): any {
    switch (request.type) {
      case 'console':
        console.log(request.payload);
        break;

      case 'user':
        fetchRandomUser()
          .then(user => sendResponse(user));
        return true;  // async

      default:
        break;
    }
  }
}
