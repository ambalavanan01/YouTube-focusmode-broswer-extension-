/* 
  Core Logic for YouTube Focus Mode & Productivity Mode
*/

(function () {
  const FOCUS_KEY = 'yt_focus_mode_enabled';
  const STUDY_KEY = 'yt_study_mode_enabled';

  let focusState = false;
  let studyState = false;

  // Use documentElement (<html>) instead of body for earlier injection
  const targetElement = document.documentElement;

  async function init() {
    try {
      const result = await chrome.storage.sync.get([FOCUS_KEY, STUDY_KEY]);
      focusState = result[FOCUS_KEY] ?? false;
      studyState = result[STUDY_KEY] ?? false;
      applyState();
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }

  function applyState() {
    if (!targetElement) return;

    // Apply Focus Mode
    if (focusState) targetElement.classList.add('yt-focus-mode-active');
    else targetElement.classList.remove('yt-focus-mode-active');

    // Apply Study Mode
    if (studyState) targetElement.classList.add('yt-study-mode-active');
    else targetElement.classList.remove('yt-study-mode-active');
  }

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync') {
      if (changes[FOCUS_KEY]) {
        focusState = changes[FOCUS_KEY].newValue;
      }
      if (changes[STUDY_KEY]) {
        studyState = changes[STUDY_KEY].newValue;
      }
      applyState();
    }
  });

  // Watch for class tampering (YouTube SPA might reset classes)
  const classObserver = new MutationObserver(() => {
    if (focusState && !targetElement.classList.contains('yt-focus-mode-active')) {
      targetElement.classList.add('yt-focus-mode-active');
    }
    if (studyState && !targetElement.classList.contains('yt-study-mode-active')) {
      targetElement.classList.add('yt-study-mode-active');
    }
  });

  // Shorts Redirect Logic
  // Requires body/title observation for navigation changes
  const navigationObserver = new MutationObserver(() => {
    if ((focusState || studyState) && window.location.pathname.startsWith('/shorts/')) {
      handleShortsRedirect();
    }
  });

  function handleShortsRedirect() {
    const videoId = window.location.pathname.split('/shorts/')[1];
    if (videoId) {
      window.location.replace(`https://www.youtube.com/watch?v=${videoId}`);
    }
  }

  // Initialization
  // We can safely add classes to documentElement immediately
  init();
  classObserver.observe(targetElement, { attributes: true, attributeFilter: ['class'] });

  // For Shorts redirect, we still need to watch body/title for navigation changes
  if (document.body) {
    navigationObserver.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      navigationObserver.observe(document.body, { childList: true, subtree: true });
    });
  }

})();
