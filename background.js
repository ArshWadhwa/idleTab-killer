// background.js
// Tracks tab activity for LRU Tab Closer extension

let tabHistory = [];

// Extension load hote hi saare open tabs ko tabHistory me dalo
chrome.tabs.query({}, (tabs) => {
    const openTabIds = tabs.map(tab => tab.id);
    openTabIds.forEach(id => {
        if (!tabHistory.includes(id)) {
            tabHistory.push(id);
        }
    });
});

// Naya tab create hone par add karo
chrome.tabs.onCreated.addListener(tab => {
    tabHistory = tabHistory.filter(id => id !== tab.id);
    tabHistory.push(tab.id);
});

// Activate hone par end me le jao
chrome.tabs.onActivated.addListener(activeInfo => {
    const tabId = activeInfo.tabId;
    tabHistory = tabHistory.filter(id => id !== tabId);
    tabHistory.push(tabId);
    console.log("Updated tab History: ", tabHistory);
});

// Tab band hone par hatao
chrome.tabs.onRemoved.addListener(tabId => {
    tabHistory = tabHistory.filter(id => id !== tabId);
});

// LRU tabs band karo (with debug logs)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "closeLRUTabs") {
        chrome.tabs.query({}, (tabs) => {
            let tabsToClose;
            if (request.numTabs && !isNaN(request.numTabs)) {
                if (request.numTabs >= tabs.length) {
                    sendResponse({ error: "You can't remove more tabs than are open!" });
                    return;
                }
                tabsToClose = Math.min(request.numTabs, tabs.length);
            } else {
                tabsToClose = tabs.length - 9; // Default: keep 5 tabs
                if (tabsToClose <= 0) {
                    sendResponse({ error: "There are not enough tabs to remove. At least 6 tabs must be open." });
                    return;
                }
            }

            const openTabIds = tabs.map(tab => tab.id);
            const filteredHistory = tabHistory.filter(id => openTabIds.includes(id));
            const tabsToRemove = filteredHistory.slice(0, tabsToClose);

            // Debug logs
            console.log("All openTabIds:", openTabIds);
            console.log("tabHistory:", tabHistory);
            console.log("filteredHistory:", filteredHistory);
            console.log("tabsToRemove:", tabsToRemove);

            tabsToRemove.forEach(tabId => {
                chrome.tabs.remove(tabId, () => {});
            });

            // History update karo
            tabHistory = filteredHistory.filter(id => !tabsToRemove.includes(id));
            sendResponse({ success: true });
        });
        // Required for async sendResponse
        return true;
    }
});