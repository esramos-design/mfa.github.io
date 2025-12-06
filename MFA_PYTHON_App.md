<div align="center">
<h1 align="center">Mining Fracture Analyser (MFA) v5.15</h1>
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

</div>


# **Mining Fracture Analyser (MFA) - Desktop App**

The **Mining Fracture Analyser (MFA) - Python Edition** transforms the web tool into a dedicated, persistent tactical instrument—functioning virtually as a secondary Multi-Function Display (MFD) that lives outside your helmet.

## **🛠️ Phase 1: Installation & Setup**

### **1. Install Python**
* **Download Python:** [https://www.python.org/downloads/](https://www.python.org/downloads/)
* **Crucial:** Check the box **"Add Python to PATH"** during installation.

### **2. Prepare Application Files**
Create a folder and place **ALL** 5 core files inside:
1. `run_app.py`: The launcher script.
2. `index.html`: The interface.
3. `style.css`: The visual styles.
4. `script.js`: The calculation engine.
5. `scanner.js`: The OCR module.

### **3. Install the Window Wrapper**
Open your Command Prompt (cmd) and run:
`pip install pywebview`

## **🚀 Phase 2: Running the App**
1. Double-click `run_app.py`.
2. The application will launch in a dedicated **Dark Mode** window.

## **📷 Phase 3: Using OCR 4.0**

**Static Upload / Clipboard Mode**

To ensure maximum stability and zero interference with Star Citizen's anti-cheat or graphics drivers, MFA v5.15 uses a **Static Analysis** model.

1. **Take a Screenshot:** Use your preferred tool (PrintScreen, ShareX, etc.) to capture your mining HUD.
2. **Upload:** Click the **"UPLOAD SCREENSHOT"** area in the app.
3. **Processing:** The app applies **Inverted Grayscale** filtering to read the data instantly.
   * **Mining Scan:** Reads Mass, Resistance, and Instability from the Right MFD.
   * **Loadout Scan:** Reads installed modules from the Left MFD.

## **🤖 Phase 4: AI Foreman**

1. **Get a Key:** [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Enter Key:** Click **"AUTH KEY"** in the app and paste it.
3. **Features:**
   * 🧠 **STRATEGY:** Go/No-Go assessment.
   * ⚠️ **RISK REPORT:** Explosion probability analysis.
   * 🔧 **LOADOUT:** Min-max efficiency tips.
   * 📢 **ORDERS:** Roleplay-ready chat commands.

## **⚠️ Troubleshooting**

* **"Scanner not working":** Ensure `scanner.js` is in the same folder.
* **"Black Screen":** Ensure you have installed `pywebview` correctly.
* **"OCR Reading Garbage":** Ensure your screenshot is clear. The OCR is tuned for 1080p and 1440p resolutions.