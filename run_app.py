import webview
import sys
import os

# --- Star Citizen MFA Launcher ---
# Wraps the HTML tool in a native Windows window
# Requirements: pip install pywebview

if __name__ == '__main__':
    # 1. Locate the HTML file (assumes it is in the same folder)
    base_path = os.path.dirname(os.path.abspath(__file__))
    html_file = os.path.join(base_path, 'index.html')
    
    if not os.path.exists(html_file):
        print(f"Error: Could not find 'index.html' in {base_path}")
        sys.exit(1)

    # 2. Configure the Window
    window = webview.create_window(
        'Mining Fracture Analyser',  # Window Title
        url=f'file://{html_file}',   # Load local file
        width=1600,                  # Default Width
        height=900,                  # Default Height
        resizable=True,
        min_size=(1024, 768),
        background_color='#0d1117',  # Match the HTML body background
        text_select=True             # Allow text selection
    )
    
    # 3. Start the App Loop
    # gui='edgechromium' ensures it uses the modern Windows WebView2 runtime
    webview.start(gui='edgechromium', debug=False)