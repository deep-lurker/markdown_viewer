// Open the full-page markdown viewer/editor when the toolbar icon is clicked.
chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("viewer.html") });
});
