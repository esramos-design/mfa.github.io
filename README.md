
<div align="center">
  <a href="https://esramos-design.github.io/mfa.github.io/" target="_blank">
    <img src="https://raw.githubusercontent.com/esramos-design/mfa.github.io/main/mfa.jpg" alt="Mining Fracture Analyser Logo" width="50%">
  </a>

  <h1 align="center">Mining Fracture Analyser</h1>

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

\<div align="center"\>  
\<a href="https://esramos-design.github.io/mfa.github.io/" target="\_blank"\>  
\<img src="https://raw.githubusercontent.com/esramos-design/mfa.github.io/main/mpa.jpg" alt="Mining Fracture Analyser Logo" width="50%"\>  
\</a\>  
\<h1 align="center"\>Mining Fracture Analyser (MFA) v3.6\</h1\>

\<p align="center"\>  
\<strong\>Precision. Power. Profit.\</strong\>  
\<br /\>  
A real-time cooperative mining calculator for Star Citizen.  
\<br /\>  
Stop Guessing. Start Fracturing.  
\<br /\>  
\<br /\>  
\<a href="https://github.com/esramos-design/mfa.github.io/blob/main/LICENSE" target="\_blank"\>  
\<img alt="License: GPL-3.0" src="https://img.shields.io/badge/license-GPL--3.0-blue.svg" /\>  
\</a\>  
\<img alt="Status: Active" src="https://img.shields.io/badge/status-active-success.svg" /\>  
\<img alt="Game: Star Citizen" src="https://img.shields.io/badge/Star%20Citizen-4.4+-orange" /\>  
\<br /\>  
\<br /\>  
\<a href="https://esramos-design.github.io/mfa.github.io/" target="\_blank"\>🔴 \<strong\>Launch Live Demo\</strong\>\</a\>  
|  
\<a href="https://discord.gg/wktsh9h46F" target="\_blank"\>💬 \<strong\>Join Discord Support\</strong\>\</a\>  
|  
\<a href="https://github.com/esramos-design/mfa.github.io/issues" target="\_blank"\>🐛 Report Bug\</a\>  
\</p\>  
\</div\>

# 

# **Overview**

The **Mining Fracture Analyser (MFA)** is a specialized calculation engine developed for Star Citizen industrial crews.

Whether you are running a solo **Drake Golem**, a **MISC Prospector**, or coordinating a full **Argo MOLE** multi-crew, MFA calculates your **Total Combined Effective Laser Power (MW)** in real-time. It accounts for complex variables—Laser Power, Instability, Resistance, Distance, and Consumables—to provide a simple "Pass/Fail" verdict before you even activate your lasers.

**Version 3.6** introduces the "Aerospace Platinum" light theme, updated support for the Drake Golem (Fixed Pitman Heads), and data sourced directly from **UEX Corp**.

## **📑 Table of Contents**

* [Key Features](https://www.google.com/search?q=%23-key-features)  
* [User Guide: Installation & Setup](https://www.google.com/search?q=%23-user-guide-installation--setup)  
* [User Guide: The AI Foreman](https://www.google.com/search?q=%23-user-guide-the-ai-foreman)  
* [User Guide: OCR Auto-Scan](https://www.google.com/search?q=%23-user-guide-ocr-auto-scan)  
* [Technical: How It Works](https://www.google.com/search?q=%23-technical-how-it-works)  
* [Contributing](https://www.google.com/search?q=%23-contributing)  
* [Troubleshooting](https://www.google.com/search?q=%23-troubleshooting)

## **✨ Key Features**

### **🛠️ Fleet Solutions & Smart Recommendations**

The tool acts as a fleet commander, analyzing power deficits and recommending reinforcements.

* **Reinforcement Calculator:** Automatically calculates how many extra ships are needed to break a rock (e.g., *"⚠️ Reinforcements Required: \+1x Prospector OR \+1x MOLE"*).  
* **Role-Based MOLE Loadouts:** Suggests specialized configurations for multi-crew efficiency:  
  * **Breaker:** Max Power/Fracture.  
  * **Surgeon:** Max Stability/Window.  
  * **Vacuum:** Max Extraction speed.

### **🚀 Multi-Crew Fleet Simulation**

Simulate any combination of ships currently in the game:

* **Argo MOLE:** 3 Laser Heads (Configurable per head).  
* **MISC Prospector:** 1 Laser Head.  
* **Drake Golem:** Mining Turret Support (Fixed Pitman heads).  
* **Heat Management:** Toggle individual heads on/off to simulate heat management strategies.

### **⚡ Active Module Toggle**

Granular control for **Active Modules** (e.g., Surge, Stampede, Brandt).

* **ON:** The module's effects are applied. Use this to see if you can crack the rock *with* the module activated.  
* **OFF:** The module's effects are ignored. Use this to simulate cooldowns or saving a charge.

### **🤖 AI Senior Foreman**

Powered by the **Google Gemini API**:

* **Analyze Strategy:** Reads current rock stats and provides a strategic risk assessment (e.g., *"High Instability detected, recommend Stampede module"*).  
* **Generate Orders:** Creates roleplay-ready "Command Uplink" text blocks for voice/text comms.

### **📸 OCR Auto-Scan (Tesseract.js)**

Don't waste time typing numbers while piloting.

* **Paste & Go:** Take a screenshot of your mining UI and press Ctrl+V directly into the app.  
* **Auto-Extraction:** Automatically extracts Mass, Resistance, and Instability.

### **📊 Advanced Visual Analytics**

* **Power Margin Chart:** Visualizes your power surplus vs. the rock's requirement.  
* **Risk Profile:** A Doughnut chart comparing Resistance, Instability, and your Safety Margin.  
* **Resistance Curve:** A predictive line graph showing laser efficiency across the heating window.

### **🎨 Themes**

* **Dark Mode:** The classic high-contrast interface.  
* **Aerospace Platinum:** A new, clean light mode for high-visibility environments.

## **🛠 User Guide: Installation & Setup**

You can use MFA in three ways depending on your preference.

### **Method 1: Live Web Version (Easiest)**

Simply visit the [GitHub Pages link](https://esramos-design.github.io/mfa.github.io/) to use the tool immediately in your browser.

### **Method 2: Local Single-File**

1. Download index.html from this repository.  
2. Double-click to open in Chrome, Edge, or Firefox.  
3. *Note:* OCR features may be limited by browser security (CORS) when running locally without a server.

### **Method 3: Windows Desktop App (Advanced)**

For the best experience without a browser bar, run MFA as a standalone Python app.

1. **Install Python:** Download from [python.org](https://www.python.org/). **CRUCIAL:** Check **"Add Python to PATH"** during installation.  
2. **Install Wrapper:** Open Command Prompt (cmd) and run:  
   pip install pywebview

3. **Create Script:** Create a file named run\_app.py in the same folder as your index.html with the following content:  
   import webview  
   import sys  
   import os

   if \_\_name\_\_ \== '\_\_main\_\_':  
       html\_file \= os.path.join(os.path.dirname(os.path.abspath(\_\_file\_\_)), 'index.html')  
       webview.create\_window(  
           'Mining Fracture Analyser v3.6',  
           url=html\_file,  
           width=1400,  
           height=900,  
           background\_color='\#0d1117'  
       )  
       webview.start(debug=True)

4. **Run:** Double-click run\_app.py.

## **🤖 User Guide: The AI Foreman**

To unlock the **Analyze Strategy** and **Generate Orders** buttons, you must configure a free Google Gemini API key.

1. **Get a Key:** Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and create a free API key.  
2. **Configure:**  
   * Open index.html in a text editor (Notepad, VS Code).  
   * Find the line: const apiKey \= ""; (Near the bottom).  
   * Paste your key: const apiKey \= "YOUR\_KEY\_HERE";  
   * Save and refresh the app.

**Feature Usage:**

* **Analyze Strategy:** Click this when you are unsure if a rock is safe. It will output advice like *"Equip a Stampede module to counter the 40% instability."*  
* **Generate Orders:** Click this to generate a text block like: *"/// COMMAND UPLINK /// Target Mass 23k. MOLE 1, active Surge on my mark. EXECUTE."*

## **📸 User Guide: OCR Auto-Scan**

1. In-game, align your ship so the Rock Scan data is clearly visible on your UI.  
2. Take a screenshot (Print Screen or Snipping Tool).  
3. Switch to the MFA tool and press **CTRL+V (Paste)**.  
4. *Alternatively:* Click the "Auto-Scan Rock" box to upload an image file.  
5. Verify the Mass, Resistance, and Instability values have populated correctly.

**Tip:** Darker backgrounds in Star Citizen (space) usually yield better OCR results than bright backgrounds (planet surfaces).

## **🧠 Technical: How It Works**

The application uses established community formulas verified by **UEX Corp** and **RedMonsterSC**.

1. **Base Power:** Sum of all active laser heads.  
2. **Module Modifiers:** Applies buffs/debuffs from Surges, Stampedes, Torrents, etc.  
3. **Resistance Calculation:** Effective Power \= Total Power \* (1 \- Rock Resistance).  
4. **Heat Transfer:** Determines if Effective Power \> Rock Heat Threshold.

### **Tech Stack**

* **Core:** HTML5, JavaScript (ES6+), Tailwind CSS.  
* **Visualization:** Chart.js.  
* **OCR:** Tesseract.js.  
* **AI:** Google Gemini API.

## **🤝 Contributing**

We welcome contributions\! Please join our [Discord Server](https://discord.gg/wktsh9h46F) to discuss changes.

1. **Fork** the Project.  
2. Create your **Feature Branch** (git checkout \-b feature/AmazingFeature).  
3. **Commit** your Changes (git commit \-m 'Add some AmazingFeature').  
4. **Push** to the Branch (git push origin feature/AmazingFeature).  
5. Open a **Pull Request**.

## **Disclaimer & License**

**Disclaimer:** This application is a fan-made tool using empirical data. Star Citizen server tick rates (FPS), desync, and unannounced CIG balance changes can affect actual mining results. Use this tool as a guide, not a guarantee.

**License:** Distributed under the GNU General Public License (GPL). See LICENSE for more information.

**Credits:**

* Data provided by [UEX Corp](https://www.google.com/search?q=https://uexcorp.space/).  
* Images property of Cloud Imperium Games.  
* Developer: CHIRONDRAGON.
