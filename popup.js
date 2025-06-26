document.addEventListener("DOMContentLoaded", () => {
    const errorDiv = document.createElement("div");
    errorDiv.id = "error-msg";
    errorDiv.style.color = "#d7263d";
    errorDiv.style.marginTop = "10px";
    errorDiv.style.fontSize = "14px";
    errorDiv.style.textAlign = "center";
    document.querySelector(".container").appendChild(errorDiv);

    document.getElementById("close-btn").addEventListener("click", () => {
        errorDiv.textContent = ""; // Clear previous error
        const numTabs = parseInt(document.getElementById("num-tabs").value, 10);
        chrome.runtime.sendMessage({ action: "closeLRUTabs", numTabs: numTabs }, (response) => {
            if (response && response.error) {
                errorDiv.textContent = response.error;
            }
        });
    });
});
