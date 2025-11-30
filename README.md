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


## **📑 Table of Contents**

1. [About The Project](https://www.google.com/search?q=%23-about-the-project)  
2. [Key Features](https://www.google.com/search?q=%23-key-features)  
3. [User Guide: Windows App Installation](https://www.google.com/search?q=%23-user-guide-windows-app-installation)  
4. [User Guide: Using the AI Foreman](https://www.google.com/search?q=%23-user-guide-using-the-ai-foreman)  
5. [User Guide: OCR & Features](https://www.google.com/search?q=%23-user-guide-ocr--features)  
6. [Technical: How It Works](https://www.google.com/search?q=%23-technical-how-it-works)  
7. [Developer Guide: Local Setup](https://www.google.com/search?q=%23-developer-guide-local-setup)  
8. [Troubleshooting](https://www.google.com/search?q=%23-troubleshooting)  
9. [Disclaimer & License](https://www.google.com/search?q=%23-disclaimer--license)

## **📖 About The Project**

The **Mining Fracture Analyser (MFA)** is a specialized calculation engine developed for Star Citizen industrial crews.

Star Citizen mining mechanics involve complex variables: Laser Power, Instability, Resistance, Distance, and Consumables. Guessing these values often results in **overheated rocks (catastrophic explosions)** or wasted time on rocks that are mathematically impossible to break.

This tool solves that problem by calculating the **Total Combined Effective Laser Power** of your entire crew in real-time, providing a simple "Pass/Fail" verdict before you even activate your lasers.

**Version 3.6** introduces a standalone Windows Application wrapper and an advanced **AI Senior Foreman** powered by Google Gemini to provide tactical advice, risk assessments, and roleplay orders.

## **✨ Key Features**

### **🤖 AI Senior Foreman (Powered by Gemini)**

Your virtual crew chief. Located in the **Requirements Panel**, the AI analyzes your specific situation to provide:

* **Strategic Assessments:** "Is this rock safe? What modules do I need?"  
* **Risk Reports:** Detailed breakdown of explosion probability.  
* **Optimization Tips:** Mathematical suggestions to improve yield.  
* **Roleplay Orders:** Generates "Command Uplink" text blocks for in-game chat.

### **📸 OCR Auto-Scan (Tesseract.js)**

Don't waste time typing numbers while piloting.

* **Step 1:** Take a screenshot of your mining UI.  
* **Step 2:** Press Ctrl+V (Paste) directly into the app.  
* **Result:** The app automatically extracts Mass, Resistance, and Instability.

### **🚀 Multi-Crew Fleet Simulation**

Simulate any combination of ships currently in the game:

* **Argo MOLE** (3 Laser Heads) \- Configurable per head.  
* **MISC Prospector** (1 Laser Head)  
* **Drake Golem** (Mining Turret Support)  
* *Heat Management:* Toggle individual heads on/off to simulate heat management strategies.

### **📊 Advanced Visual Analytics**

We don't just show numbers; we visualize the physics:

* **Power vs. Margin:** Visualizes your power surplus vs. the rock's requirement.  
* **Risk Profile:** A Doughnut chart comparing Resistance, Instability, and your Safety Margin.  
* **Resistance Curve:** A predictive line graph showing laser efficiency across the heating window.

## **🛠 User Guide: Windows App Installation**

This section is for players who want to run the tool as a standalone program (App Mode) on their PC.

### **Step 1: Install Python**

This app runs on Python. If you don't have it installed:

1. Download Python from [python.org](https://www.python.org/downloads/).  
2. **CRUCIAL:** During installation, check the box that says **"Add Python to PATH"**.

### **Step 2: Save the Application Files**

Create a new folder on your computer (e.g., Desktop\\MFA\_Tool) and save the following two files inside it:

* index.html: The main application code.  
* run\_app.py: The launcher script.

### **Step 3: Install the Window Wrapper**

Open your Command Prompt (search for cmd in Windows) and run this command:

pip install pywebview

*(This* library allows the HTML *tool to run as a native window instead of in a web browser tab, removing the address bar and adding desktop features)*

### **Step 4: Run the App**

Double-click run\_app.py (or run python run\_app.py in terminal). The application will launch in a dark-mode window.

## **🤖 User Guide: Using the AI Foreman**

The AI Foreman is located in the **bottom-right panel** (Column 4). It requires a one-time setup.

### **1\. Activating the AI (API Key Setup)**

1. **Get a Free Key:** Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and create a free API key.  
2. **In the App:** Click the **"🔑 Config"** button in the AI Foreman header.  
3. **Paste Key:** Enter your key into the popup modal and click **Save**.  
   * *Note: Your key is saved locally on your computer. It is never sent to our servers.*

### **2\. Available Modes**

Once configured, you can use the following buttons:

* **🧠 Strategy:** Provides a general assessment of the rock. Tells you if your current team can break it and suggests a general approach.  
* **⚠️ Risk Report:** Focuses purely on safety. Analyzes the **Instability** value and warns you of explosion risks. Recommends safety distances or specific stability modules (like Stampede/Optimum).  
* **🔧 Module Tips:** Acts as a loadout engineer. Suggests the mathematically optimal modules to equip for *this specific rock* (e.g., "Resistance is high, swap to a Brandt module").  
* **📢 Orders:** Generates a short, roleplay-style text block (e.g., "/// COMMAND UPLINK /// Target Mass 23k...") that you can copy/paste into Star Citizen's in-game chat to coordinate your team.  
* **Custom Query:** Type your own question (e.g., "How much is this rock worth?") into the text box and press Enter.

## **📷 User Guide: OCR & Features**

### **Using OCR (Auto-Scan)**

1. While in-game, verify you are looking at the rock's scan data.  
2. Take a screenshot (Print Screen) or use Snipping Tool.  
3. **CTRL+V (Paste)** the image directly into the MFA App window.  
4. *Alternatively:* Click the "Auto-Scan Rock" box to upload an image file.  
5. The tool will automatically fill in Mass, Resistance, and Instability.

### **Using Smart Recommendations**

If your simulation fails (Power Insufficient), the **Recommended Loadouts** section (bottom right) will automatically suggest:

* **Optimal Loadouts:** Specific laser/module combos for MOLEs, Prospectors, and Golems.  
* **Reinforcements:** Exactly how many extra ships you need to invite to break the rock.

## **🧠 Technical: How It Works**

The application uses established community formulas (verified by SC-Trade-Tools and RedMonsterSC) to calculate:

1. **Base Power:** Sum of all active laser heads.  
2. **Module Modifiers:** Applies buffs/debuffs from Surges, Stampedes, Torrents, etc.  
3. **Resistance Calculation:** Effective Power \= Total Power \* (1 \- Rock Resistance).  
4. **Heat Transfer:** Determines if Effective Power \> Rock Heat Threshold.

## **💻 Developer Guide: Local Setup**

If you wish to contribute to the codebase or run the web version locally without Python.

### **Local Web Server**

Due to browser security policies (CORS) regarding Web Workers (used by Tesseract OCR), simply opening the index.html file in Chrome/Edge will **not** allow the OCR to work. You must run a local server:

* **VS Code:** Right-click index.html \-\> "Open with Live Server".  
* **Python:** Run python \-m http.server 8000 in the directory.

## **⚠️ Troubleshooting**

* **"The AI buttons do nothing":**  
  * Did you click **"🔑 Config"** and save your API key?  
  * Check your internet connection.  
* **"ModuleNotFoundError: No module named 'webview'":**  
  * You missed Step 3 in the Installation. Run pip install pywebview in your terminal.  
* **OCR Not Picking up numbers:**  
  * Ensure the screenshot is clear.  
  * Try cropping the image closer to the stats on the right side of the UI.  
  * OCR relies on visual contrast; darker backgrounds in screenshots help.

## **⚠️ Disclaimer & License**

**Disclaimer:** This application is a fan-made tool using empirical data. Star Citizen server tick rates (FPS), desync, and unannounced CIG balance changes can affect actual mining results. Use this tool as a guide, not a guarantee.

**License:** Distributed under the GNU General Public License (GPL). See LICENSE for more information.

**Credits:**
* Data provided by [UEX Corp](https://www.google.com/search?q=https://uexcorp.space/).  
* Images property of Cloud Imperium Games.  
* Developer: CHIRONDRAGON.
