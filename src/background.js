// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
      // 从已有的tabs获取匹配的url
      chrome.tabs.query({}, function(tabs) {

          var arr = [];
          tabs.forEach(function(tab) {
              // if title or url match text, push it to the arr
              if(tab && (tab.url.indexOf(text) !== -1 || tab.title.indexOf(text) !== -1)) {
                  arr.push({ content: tab.url + '', description: tab.title });
              }
          });
          suggest(arr);
      });
  });

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
      chrome.tabs.query({ url: text }, function(tab) {
          if(tab.length > 0) {
              var selectTab = tab[0];
              chrome.tabs.update(selectTab.id, { active: true });
          }
      });
  });
