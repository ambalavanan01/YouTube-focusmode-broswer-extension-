document.addEventListener('DOMContentLoaded', async () => {
    const focusToggle = document.getElementById('focusToggle');
    const studyToggle = document.getElementById('studyToggle');
    const FOCUS_KEY = 'yt_focus_mode_enabled';
    const STUDY_KEY = 'yt_study_mode_enabled';

    // Load initial states
    try {
        const result = await chrome.storage.sync.get([FOCUS_KEY, STUDY_KEY]);
        if (focusToggle) focusToggle.checked = result[FOCUS_KEY] ?? false;
        if (studyToggle) studyToggle.checked = result[STUDY_KEY] ?? false;
    } catch (error) {
        console.error('Error loading state:', error);
    }

    // Handle Focus Toggle
    if (focusToggle) {
        focusToggle.addEventListener('change', async (e) => {
            await saveState(FOCUS_KEY, e.target.checked);
        });
    }

    // Handle Study Toggle
    if (studyToggle) {
        studyToggle.addEventListener('change', async (e) => {
            await saveState(STUDY_KEY, e.target.checked);
        });
    }

    async function saveState(key, value) {
        try {
            await chrome.storage.sync.set({ [key]: value });
        } catch (error) {
            console.error('Error saving state:', error);
        }
    }
});
