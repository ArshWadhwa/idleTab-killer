# IdleTab Killer

A modern Chrome extension to automatically close your least recently used (LRU) tabs, keeping your browser fast and clutter-free. Professionally designed with a beautiful popup UI and custom logo.

---

## Features
- **Close LRU Tabs:** Instantly close the oldest tabs with one click.
- **Custom Tab Removal:** Enter how many LRU tabs you want to close.
- **Smart Default:** If no number is entered, always keeps your 5 most recent tabs open.
- **Error Handling:** Prevents closing more tabs than are open, with clear error messages.
- **Modern UI:** Sleek popup with Montserrat font, custom logo, and responsive design.

---

## Installation
1. **Clone or Download** this repository.
2. **Go to** `chrome://extensions` in your Chrome browser.
3. **Enable** "Developer mode" (top right).
4. **Click** "Load unpacked" and select the project folder (`lru-tab-closer-extension`).
5. The IdleTab Killer icon will appear in your Chrome toolbar.

---

## Usage
1. **Click** the IdleTab Killer icon in your Chrome toolbar.
2. **Enter** the number of LRU tabs you want to close (or leave blank to keep 5 tabs).
3. **Click** "Close LRU Tabs".
4. The extension will close the oldest tabs and keep your most recent ones open.
5. If you try to close more tabs than are open, a friendly error message will appear.

---

## Customization
- **Change the default number of tabs to keep:** Edit the `background.js` file (`tabs.length - 5` logic).
- **Change the logo:** Replace `icons/icons.png` with your own image.
- **Style the popup:** Edit `popup.html` and its CSS for further customization.

---

## Credits
- **Design & Development:** [Your Name]
- **Logo:** Your custom `icons/icons.png`
- **Font:** [Montserrat](https://fonts.google.com/specimen/Montserrat) via Google Fonts

---

## License
MIT License. Feel free to use, modify, and share!
