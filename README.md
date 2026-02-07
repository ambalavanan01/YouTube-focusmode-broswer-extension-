# 🎯 YouTube Focus Mode

**Reclaim your attention.** A minimal, privacy-focused browser extension that removes distractions from YouTube.


## 🚀 Features

-   **Focus Mode**: Hides comments, sidebar recommendations, merchandise shelves, and other clutter on video pages.
-   **Productivity Mode (Study Mode)**: A strict "Search Only" experience. Completely hides the Home Feed, leaving only the search bar. Perfect for studying or deep work.
-   **Shorts Blocker**: Automatically redirects YouTube Shorts (`/shorts/video-id`) to the standard video player (`/watch?v=video-id`), preventing the "infinite scroll" trap.
-   **Dark Mode UI**: Beautiful, modern popup interface with glassmorphism effects.
-   **Lightning Fast**: Uses `MutationObserver` to hide elements *before* they render, preventing layout shifts.
-   **Cross-Browser**: Compatible with Chrome, Edge, Brave, and Firefox (Manifest V3).

## 📥 Installation

### From Source (Developer Mode)

1.  **Clone or Download** this repository.
2.  **Chrome / Edge / Brave**:
    -   Go to `chrome://extensions`.
    -   Enable **Developer Mode** (top right).
    -   Click **Load unpacked**.
    -   Select the `youtube-focus-mode` folder.
3.  **Firefox**:
    -   Go to `about:debugging#/runtime/this-firefox`.
    -   Click **Load Temporary Add-on...**.
    -   Select the `manifest.json` file.

## 🛠️ Usage

1.  Click the extension icon in your browser toolbar.
2.  **Focus Mode**: Toggle ON to clean up video pages (comments, sidebar).
3.  **Study Mode**: Toggle ON to hide the home feed entirely (search only).
4.  Settings are saved automatically and synced across your browser.

## 🔒 Privacy Policy

**We do not collect any data.**

-   **No Analytics**: We do not track your usage.
-   **No Remote Code**: All logic runs locally on your device.
-   **No Data Transmission**: The extension does not send any data to external servers.
-   **Permissions**:
    -   `storage`: Used only to save your "Focus" and "Study" toggle preferences locally.

## 📜 License

This project is licensed under the **Mozilla Public License 2.0**.
You are free to use, modify, and distribute this software.

---
*Not affiliated with YouTube or Google Inc.*

