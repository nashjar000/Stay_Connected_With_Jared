// Theme Control Panel
document.addEventListener("DOMContentLoaded", function () {
    // Only show control panel if certain conditions are met (for testing/admin use)
    const showControlPanel = window.location.search.includes('theme-control') || 
                             localStorage.getItem('showThemeControl') === 'true';
    
    if (!showControlPanel) return;
    
    // Create control panel
    const controlPanel = document.createElement('div');
    controlPanel.id = 'theme-control-panel';
    controlPanel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 9999;
        font-family: monospace;
        font-size: 12px;
        min-width: 200px;
    `;
    
    // Get current theme info
    const updateControlPanel = () => {
        const themeInfo = window.themeManager ? window.themeManager.getThemeInfo() : {};
        
        controlPanel.innerHTML = `
            <div style="margin-bottom: 10px;">
                <strong>🎨 Theme Control Panel</strong>
            </div>
            <div style="margin-bottom: 8px;">
                Current: <span style="color: orange;">${themeInfo.current || 'loading...'}</span>
            </div>
            <div style="margin-bottom: 8px;">
                Seasonal: <span style="color: lightblue;">${themeInfo.seasonal || 'loading...'}</span>
            </div>
            <div style="margin-bottom: 8px;">
                Override: <span style="color: ${themeInfo.isManualOverride ? 'red' : 'green'};">
                    ${themeInfo.isManualOverride ? 'ON' : 'OFF'}
                </span>
            </div>
            <div style="margin-bottom: 10px;">
                <button onclick="window.themeManager?.setManualTheme('normal')" style="margin: 2px; padding: 4px 8px;">Normal</button>
                <button onclick="window.themeManager?.setManualTheme('valentine')" style="margin: 2px; padding: 4px 8px;">Valentine</button>
                <button onclick="window.themeManager?.setManualTheme('easter')" style="margin: 2px; padding: 4px 8px;">Easter</button>
                <button onclick="window.themeManager?.setManualTheme('july4')" style="margin: 2px; padding: 4px 8px;">July 4th</button>
                <button onclick="window.themeManager?.setManualTheme('halloween')" style="margin: 2px; padding: 4px 8px;">Halloween</button>
                <button onclick="window.themeManager?.setManualTheme('thanksgiving')" style="margin: 2px; padding: 4px 8px;">Thanksgiving</button>
                <button onclick="window.themeManager?.setManualTheme('christmas')" style="margin: 2px; padding: 4px 8px;">Christmas</button>
            </div>
            <div style="margin-bottom: 10px;">
                <button onclick="window.themeManager?.clearManualOverride()" style="padding: 4px 8px;">Auto Mode</button>
            </div>
            <div style="font-size: 10px; color: #ccc;">
                Date test: <input type="date" id="test-date" style="width: 100px; font-size: 10px;" />
                <button onclick="testDate()" style="font-size: 10px; padding: 2px 4px;">Test</button>
            </div>
        `;
    };
    
    // Test date functionality
    window.testDate = function() {
        const testDate = document.getElementById('test-date').value;
        if (testDate && window.themeManager) {
            const date = new Date(testDate);
            const result = window.themeManager.testDate(date);
            alert(`On ${testDate}, the seasonal theme would be: ${result}`);
        }
    };
    
    document.body.appendChild(controlPanel);
    
    // Update panel when theme changes
    window.addEventListener('themeChanged', updateControlPanel);
    
    // Initial update
    updateControlPanel();
    
    // Update every few seconds to show current state
    setInterval(updateControlPanel, 3000);
});