function sendNotification(options) {
  const { type, iconUrl, title, message } = options;
  chrome.notifications.create(null, {
    type,
    iconUrl,
    title,
    message,
  }, nid => {
    chrome.notifications.onClicked.addListener((id) => {
      if (id === nid) {
        window.open(options.url);
      }
    });
  });
}

function sendDefaultNotification(options) {
  const o = Object.assign({
    type: 'basic',
    iconUrl: 'logo.png',
  }, options);
  sendNotification(o);
}

function onMessage(msg, func) {
  chrome.runtime.onMessage.addListener(request => {
    if (request.type === msg) {
      func(request);
    }
  });
}

onMessage('sendNotification', p => {
  sendDefaultNotification({
    title: `Hypertrons new Release ${p.num}!`,
    message: `Hypertrons new Release ${p.num} has come, click to check more.`,
    url: 'https://www.github.com/hypertrons/hypertrons',
  });
});
