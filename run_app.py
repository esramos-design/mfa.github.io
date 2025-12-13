import webview
import os
import sys

"""
MINING FRACTURE ANALYSER (MFA) - DESKTOP LAUNCHER
Wraps the HTML5 dashboard in a native OS window using pywebview.
Version: 5.22
"""

def get_entry_point():
    """
    Resolves the absolute path to index.html.
    This logic allows the app to find its files whether running raw (Python) 
    or inside the frozen PyInstaller .exe bundle (sys._MEIPASS).
    """
    if getattr(sys, 'frozen', False):
        # Running inside a PyInstaller bundle
        base_dir = sys._MEIPASS
    else:
        # Running in a normal Python environment
        base_dir = os.path.dirname(os.path.abspath(__file__))
        
    return os.path.join(base_dir, 'index.html')

if __name__ == '__main__':
    # 1. Resolve the main HTML file path
    entry_file = get_entry_point()
    
    # 2. Configure the Window
    # Background color matches CSS 'var(--bg-main)' to prevent white flash on startup
    window = webview.create_window(
        title='Mining Fracture Analyser v5.22',
        url=entry_file,
        width=1600,
        height=900,
        resizable=True,
        background_color='#0D0D0D',
        min_size=(1024, 768)
    )

    # 3. Launch
    # debug=True allows right-click > Inspect Element (useful for troubleshooting)
    # Set to False for public release
    webview.start(debug=False)