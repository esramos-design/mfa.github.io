**\# Mining Fracture Analyser (MFA) - Star Citizen Edition**

The **Mining Fracture Analyser (MFA)** is a standalone Windows application designed for Star Citizen mining crews. It calculates whether your crew (MOLEs, Prospectors, etc.) has enough combined laser power to fracture a specific rock based on its Mass, Resistance, and Instability.

Version 2.0 includes an **AI Senior Foreman** powered by Google Gemini, which provides tactical advice and generates roleplay-ready orders for your crew.

**🛠️ Phase 1: Installation & Setup**

**1. Install Python**
This app runs on Python. If you don't have it installed:
• Download Python from [https://www.python.org/downloads/](https://www.python.org/downloads/)
• **Crucial:** During installation, check the box that says **"Add Python to PATH"**.

**2. Save the Application Files**
Create a new folder on your computer (e.g., `Desktop\MFA_Tool`) and save the two files (`index.html` and `run_app.py`) inside it.

**3. Install the Window Wrapper**
Open your Command Prompt (search for `cmd` in Windows) and run this command:

```bash
pip install pywebview
```

*(This library allows the HTML tool to run as a native window instead of in a web browser tab)*

-----

**🔑 Phase 2: Activating the AI Foreman (Gemini API)**

To use the "Analyze Strategy" and "Generate Orders" buttons, you need a free API key from Google.

1.  **Get a Key:** Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) and create a free API key.
2.  **Edit the Code:**
    • Right-click `index.html` and select **Open with Notepad** (or VS Code).
    • Scroll down to the bottom script section (around line 430) to find this line:
    `const apiKey = "";`
    • Paste your key inside the quotes:
    `const apiKey = "YOUR_COPIED_GOOGLE_API_KEY_HERE";`
    • **Save** the file.

-----

**🚀 Phase 3: Running the App**

1.  Open your folder.
2.  Double-click `run_app.py`.
    *(Alternatively, right-click inside the folder \> Open Terminal \> type `python run_app.py`)*
3.  The application will launch in a dark-mode window.

-----

**🤖 Phase 4: Working with the AI Senior Foreman**

Once you have entered your rock parameters and set up your mining team, the **Analytics Column** (Column 3) will unlock the AI features.

**Feature 1: ✨ Analyze Strategy**
*Use this when: You are unsure if the rock is safe to mine or what modules to equip.*
• Click the **Analyze Strategy** button (Purple).
• The AI will read the current rock stats and your crew's loadout to output a **Strategic Assessment** (Risk Analysis & Loadout Advice).

**Feature 2: ✨ Generate Orders**
*Use this when: You are the crew leader and need to give clear instructions.*
• Click the **Generate Orders** button (Blue).
• The AI will generate a formatted "Command Uplink" text block to read aloud or paste in-game.

> **Example Order:**
> "/// COMMAND UPLINK /// Target Mass 23k. Resistance Critical. MOLE 1, active Surge on my mark. Prospectors, hold laser power at 20% to stabilize. EXECUTE."

-----

**📷 Extra Feature: OCR Scanning**
Don't want to type numbers manually?

1.  Take a screenshot of the rock's scan data in Star Citizen.
2.  **CTRL+V (Paste)** the image directly into the app window.
3.  The tool will automatically extract the Mass, Resistance, and Instability values.

-----

**⚠️ Troubleshooting**
• **"The AI buttons do nothing":** Did you paste your API key into `index.html`?
• **"ModuleNotFoundError: No module named 'webview'":** You missed Step 3 in Phase 1. Run `pip install pywebview` in your terminal.
