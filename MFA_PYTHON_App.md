<div align="center">
  <a href="https://esramos-design.github.io/mfa.github.io/" target="_blank">
    <img src="https://raw.githubusercontent.com/esramos-design/mfa.github.io/main/mfa.jpg" alt="Mining Fracture Analyser Logo" width="50%">
  </a>

  <h1 align="center">Mining Fracture Analyser (MFA) v4.1</h1>

  <p align="center">
    <strong>A real-time cooperative mining calculator for Star Citizen.</strong>
    <br />
    Stop Guessing. Start Fracturing.
    <br />
    <br />
    <a href="https://github.com/esramos-design/mfa.github.io/blob/main/LICENSE" target="_blank">
      <img alt="License: GPL-3.0" src="https://img.shields.io/badge/license-GPL--3.0-blue.svg" />
    </a>
    <img alt="Status: Active" src="https://img.shields.io/badge/status-active-success.svg" />
    <img alt="Game: Star Citizen" src="https://img.shields.io/badge/Star%20Citizen-4.4+-orange" />
    <br />
    <br />
    <a href="https://esramos-design.github.io/mfa.github.io/" target="_blank">🔴 <strong>Launch Live Demo</strong></a>
    |
    <a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">🐛 Report Bug</a>
    |
    <a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">✨ Request Feature</a>
  </p>
</div>


# **Mining Fracture Analyser (MFA) \- PYTHON App Edition**

The **Mining Fracture Analyser (MFA)** is a standalone Windows application designed for Star Citizen mining crews. It calculates whether your crew (MOLEs, Prospectors, Golems) has enough combined laser power to fracture a specific rock based on its Mass, Resistance, and Instability.

**Version 4.1** introduces **Live OCR Scanning**, **Drake Golem Support**, and an enhanced **AI Senior Foreman** powered by Google Gemini.

## **🛠️ Phase 1: Installation & Setup**

### **1\. Install Python**

This app runs on Python. If you don't have it installed:  
• Download Python from https://www.python.org/downloads/  
• Crucial: During installation, check the box that says "Add Python to PATH".

### **2\. Save the Application Files**

Create a new folder on your computer (e.g., Desktop\\MFA\_Tool) and save the two files (index.html and run\_app.py) inside it.

### **3\. Install the Window Wrapper**

Open your Command Prompt (search for cmd in Windows) and run this command:

pip install pywebview

*(This library allows the HTML tool to run as a native window instead of in a web browser tab)*

## **🔑 Phase 2: Activating the AI Foreman (Gemini API)**

To unlock the AI strategy and risk analysis features, you need a free API key from Google.

1. **Get a Key:** Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) and create a free API key.  
2. **Launch the App:** Run run\_app.py to open the MFA tool.  
3. Enter Key: • Look for the "Senior Foreman AI" section in the right-hand column.  
   • Click the "AUTH KEY" button.  
   • Paste your key starting with AIza... and click Initialize.  
   • The key is saved locally within the app.

## **🚀 Phase 3: Running the App**

1. Open your folder.  
2. Double-click run\_app.py.  
   (Alternatively, right-click inside the folder \> Open Terminal \> type python run\_app.py)  
3. The application will launch in a dedicated dark-mode window.

## **🤖 Phase 4: Working with the AI Senior Foreman**

Once you have entered your rock parameters and set up your mining team, the **Analytics Column** (Column 4\) will unlock 4 specific AI modes:

1\. 🧠 STRATEGY  
Use this when: You need a general assessment.  
• Analyzes the rock's mass/resistance against your current fleet power.  
• Advises on whether the fracture is safe or if you need more lasers.  
2\. ⚠️ RISK REPORT  
Use this when: Dealing with High Instability.  
• Calculates the probability of an explosion.  
• Recommends safe distances and specific stability modules.  
3\. 🔧 LOADOUT  
Use this when: You want to optimize.  
• Suggests the mathematically perfect module combinations (Surge, Brandt, Torrent) for the specific rock you are facing.  
4\. 📢 ORDERS  
Use this when: You are the Crew Commander.  
• Generates a formatted "Command Uplink" text block to read aloud or paste into the game chat.

## **📷 Phase 5: Live OCR & Scanning**

MFA v4.1 can "see" your game screen to automatically input data.

**Option A: Live Stream Scanning (Recommended)**

1. Click **"Scan Mining (Right)"** or **"Scan Loadout (Left)"** in the app.  
2. A window prompt will appear. Select your **Star Citizen game window**.  
3. The app will now watch your screen:  
   • Mining Scan: Reads Mass, Resistance, and Instability from the rock HUD.  
   • Loadout Scan: Reads installed modules from your VMA/Mobiglas screen.

**Option B: Static Upload**

1. Take a screenshot of the rock's scan data.  
2. Click **"Or Upload Static Screenshot"** in the app (or paste the image with CTRL+V).  
3. The tool extracts the values instantly.

## **⚠️ Troubleshooting**

• "The AI buttons do nothing": Ensure you have clicked "AUTH KEY" and entered a valid Google Gemini key.  
• "ModuleNotFoundError: No module named 'webview'": You missed Step 3 in Phase 1\. Run pip install pywebview in your terminal.  
• "Live Scan shows a black screen": Ensure Star Citizen is running in Borderles Windowed mode for best compatibility with screen capture.
