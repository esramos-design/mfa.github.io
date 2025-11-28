
<div align="center">
  <a href="https://esramos-design.github.io/mfa.github.io/" target="_blank">
    <img src="https://raw.githubusercontent.com/esramos-design/mfa.github.io/main/mpa.jpg" alt="Mining Fracture Analyser Logo" width="50%">
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

# Mining Fracture Analyser (MFA)

**A real-time cooperative mining calculator for Star Citizen.**
*Stop Guessing. Start Fracturing.*

[🔴 Launch Live Demo](https://esramos-design.github.io/mfa.github.io/) | [🐛 Report Bug](https://github.com/esramos-design/mfa.github.io/issues) | [✨ Request Feature](https://github.com/esramos-design/mfa.github.io/issues)

---

## 📖 About The Project

The **Mining Fracture Analyser (MFA)** is a specialized calculation engine developed for Star Citizen industrial crews.

Star Citizen mining mechanics involve complex variables: Laser Power, Instability, Resistance, Distance, and Consumables. Guessing these values often results in **overheated rocks (catastrophic explosions)** or wasted time on rocks that are mathematically impossible to break.

This tool solves that problem by calculating the **Total Combined Effective Laser Power** of your entire crew in real-time, providing a simple "Pass/Fail" verdict before you even activate your lasers.

**Version 2.0** introduces a standalone Windows Application wrapper and an **AI Senior Foreman** powered by Google Gemini to provide tactical advice and roleplay orders.

---

## ✨ Key Features

### 🤖 AI Senior Foreman (New in v2.0)
Powered by Google Gemini API:
* **Analyze Strategy:** Reads current rock stats and provides a strategic risk assessment (e.g., "High Instability detected, recommend Stampede module").
* **Generate Orders:** Creates roleplay-ready "Command Uplink" text blocks for voice/text comms.

### 📸 OCR Auto-Scan (Tesseract.js)
Don't waste time typing numbers while piloting.
* **Step 1:** Take a screenshot of your mining UI.
* **Step 2:** Press `Ctrl+V` (Paste) directly into the app.
* **Result:** The app automatically extracts Mass, Resistance, and Instability.

### 🚀 Multi-Crew Fleet Simulation
Simulate any combination of ships currently in the game:
* **Argo MOLE** (3 Laser Heads) - Configurable per head.
* **MISC Prospector** (1 Laser Head)
* **Drake Golem** (Mining Turret Support)
* *Heat Management:* Toggle individual heads on/off to simulate heat management strategies.

### 📊 Advanced Visual Analytics
We don't just show numbers; we visualize the physics:
* **Power Margin Chart:** Visualizes your power surplus vs. the rock's requirement.
* **Risk Profile:** A Doughnut chart comparing Resistance, Instability, and your Safety Margin.
* **Resistance Curve:** A predictive line graph showing laser efficiency across the heating window.

---

## 🛠 User Guide: Windows App Installation

This section is for players who want to run the tool as a standalone program (App Mode).

### Step 1: Install Python
This app runs on Python. If you don't have it installed:
1. Download Python from [python.org](https://www.python.org/downloads/).
2. **CRUCIAL:** During installation, check the box that says **"Add Python to PATH"**.

### Step 2: Save the Application Files
Create a new folder on your computer (e.g., `Desktop\MFA_Tool`) and save the following two files inside it:
* `index.html`: The main application code.
* `run_app.py`: The launcher script.

### Step 3: Install the Window Wrapper
Open your Command Prompt (search for `cmd` in Windows) and run this command:
```bash
pip install pywebview
````

*(This library allows the HTML tool to run as a native window instead of in a web browser tab, removing the address bar and adding desktop features)*

### Step 4: Activate the AI (Gemini API)

To use the "Analyze Strategy" and "Generate Orders" buttons, you need a free API key.

1.  **Get a Key:** Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and create a free API key.
2.  **Edit `index.html`:**
      * Right-click `index.html` and select **Open with Notepad** (or VS Code).
      * Find this line (approx. line 430): `const apiKey = "";`
      * Paste your key: `const apiKey = "YOUR_KEY_HERE";`
      * Save the file.

### Step 5: Run the App

Double-click `run_app.py` (or run `python run_app.py` in terminal). The application will launch in a dark-mode window.

-----

## 🤖 User Guide: Using the AI Foreman

Once you have entered your rock parameters and set up your mining team, the **Analytics Column** (Column 3) will unlock the AI features.

**Feature 1: ✨ Analyze Strategy**
*Use this when: You are unsure if the rock is safe to mine or what modules to equip.*

1.  Click the **Analyze Strategy** button (Purple).
2.  The AI will read the current rock stats and your crew's loadout.
3.  It outputs a **Strategic Assessment**:
      * **Risk Analysis:** Warns if high instability makes an explosion likely.
      * **Loadout Advice:** Suggests specific modules (e.g., "Equip a **Stampede** module to counter the 40% instability").

**Feature 2: ✨ Generate Orders**
*Use this when: You are the crew leader and need to give clear instructions.*

1.  Click the **Generate Orders** button (Blue).
2.  The AI generates a formatted **"Command Uplink"** text block.
3.  **Usage:** Read it aloud over Discord or copy/paste it into in-game chat.

> **Example Order:**
> "/// COMMAND UPLINK /// Target Mass 23k. Resistance Critical. MOLE 1, active Surge on my mark. Prospectors, hold laser power at 20% to stabilize. EXECUTE."

-----

## 📷 User Guide: OCR & Features

**Using OCR (Auto-Scan)**

1.  While in-game, verify you are looking at the rock's scan data.
2.  Take a screenshot (Print Screen) or use Snipping Tool.
3.  **CTRL+V (Paste)** the image directly into the MFA App window.
4.  *Alternatively:* Click the "Auto-Scan Rock" box to upload an image file.
5.  The tool will automatically fill in Mass, Resistance, and Instability.

**Using Smart Recommendations**
If your simulation fails, the **Recommendation Engine** (Column 5) kicks in automatically. It will analyze available modules and tell you:

> *"You need 2 more active lasers and a Surge Module to crack this rock."*

-----

## 🧠 Technical: How It Works

The application uses established community formulas (verified by SC-Trade-Tools and RedMonsterSC) to calculate:

1.  **Base Power:** Sum of all active laser heads.
2.  **Module Modifiers:** Applies buffs/debuffs from Surges, Stampedes, Torrents, etc.
3.  **Resistance Calculation:** `Effective Power = Total Power * (1 - Rock Resistance)`.
4.  **Heat Transfer:** Determines if `Effective Power` \> `Rock Heat Threshold`.

-----

## 💻 Developer Guide: Local Setup

If you wish to contribute to the codebase or run the web version locally without Python.

**Project Structure**

  * `index.html`: Main application structure.
  * `run_app.py`: Python wrapper for desktop use.

**Local Web Server**
Due to browser security policies (CORS) regarding Web Workers (used by Tesseract OCR), simply opening the `index.html` file in Chrome/Edge will **not** allow the OCR to work. You must run a local server:

  * **VS Code:** Right-click `index.html` -\> "Open with Live Server".
  * **Python:** Run `python -m http.server 8000` in the directory.

-----

## 🤝 Contributing Guidelines

First off, thanks for taking the time to contribute\! 脂
The Mining Fracture Analyser is a community tool built for Star Citizen players. We welcome contributions from developers of all skill levels.

### 噫 How Can I Contribute?

**1. Reporting Bugs**

  * **Search existing issues** to see if the bug has already been reported.
  * **Create a new issue** using the Bug Report template.
  * **Include details:** Browser version, screen resolution (if OCR failed), and the specific rock parameters used.

**2. Suggesting Enhancements**

  * Open a new issue with the tag `enhancement`.
  * Explain why this feature would be useful to the mining community.

**3. Pull Requests (Code Contributions)**

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

-----

## ⚠️ Troubleshooting

  * **"The AI buttons do nothing":**
      * Did you paste your API key into `index.html`?
      * Check your internet connection.
  * **"ModuleNotFoundError: No module named 'webview'":**
      * You missed Step 3 in the Installation. Run `pip install pywebview` in your terminal.
  * **OCR Not Picking up numbers:**
      * Ensure the screenshot is clear.
      * Try cropping the image closer to the stats on the right side of the UI.
      * OCR relies on visual contrast; darker backgrounds in screenshots help.

-----

## ⚠️ Disclaimer & License

**Disclaimer**
This application is a fan-made tool. It uses empirical data. In-game variables such as server tick rates (FPS), desync, and unannounced CIG balance changes can affect actual mining results. **Use this tool as a guide, not a guarantee.**

**License**
Distributed under the GNU General Public License (GPL). See `LICENSE` for more information.

**Contact**
Developer: CHIRONDRAGON





<div align="center">
  <a href="https://esramos-design.github.io/mfa.github.io/" target="_blank">
    <img src="https://raw.githubusercontent.com/esramos-design/mfa.github.io/main/mpa.jpg" alt="Mining Fracture Analyser Logo" width="50%">
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

---

## 📑 Table of Contents
1. [About The Project](#-about-the-project)
2. [Key Features](#-key-features)
3. [How It Works](#-how-it-works)
4. [Getting Started](#-getting-started)
5. [Contributing](#-contributing)
6. [License](#-license)
7. [Contact](#-contact)

---

## 📖 About The Project

The **Mining Fracture Analyser** is a specialized web application developed by **CHIRONDRAGON**.

Star Citizen mining mechanics involve complex variables: Laser Power, Instability, Resistance, Distance, and Consumables. Guessing these values often results in overheated rocks (explosions) or wasted time on rocks that are mathematically impossible to break.

This tool solves that problem by calculating the **Total Combined Effective Laser Power** of your entire crew in real-time, providing a simple "Pass/Fail" verdict before you even activate your lasers.

---

## ✨ Key Features

### 📸 OCR Auto-Scan (Tesseract.js)
Don't waste time typing numbers while piloting.
* **Step 1:** Take a screenshot of your mining UI.
* **Step 2:** Press `Ctrl+V` (Paste) directly into the app.
* **Result:** The app automatically reads and inputs Rock Mass, Resistance, and Instability.

### 🚀 Multi-Crew Fleet Simulation
Simulate any combination of ships currently in the game:
* **Argo MOLE** (3 Laser Heads)
* **MISC Prospector** (1 Laser Head)
* **Drake Golem** (Mining Turret Support)
* *Configurable:* Toggle individual heads on/off to simulate heat management strategies.

### 📊 Advanced Visual Analytics
We don't just show numbers; we visualize the physics:
* **Power Margin Chart:** Visualizes your power surplus vs. the rock's requirement.
* **Risk Profile:** A Doughnut chart comparing Resistance, Instability, and your Safety Margin.
* **Resistance Curve:** A predictive line graph showing how your laser efficiency performs across the heating window.

### 💡 Smart Recommendations
If your simulation fails, the **Recommendation Engine** kicks in. It will analyze available modules and tell you:
> *"You need 2 more active lasers and a Surge Module to crack this rock."*

---

## 🧠 How It Works
The application uses established community formulas (verified by SC-Trade-Tools and RedMonsterSC) to calculate:

1.  **Base Power:** Sum of all active laser heads.
2.  **Module Modifiers:** Applies buffs/debuffs from Surges, Stampedes, Torrents, etc.
3.  **Resistance Calculation:** `Effective Power = Total Power * (1 - Rock Resistance)`.
4.  **Heat Transfer:** Determines if `Effective Power` > `Rock Heat Threshold`.

---

## 📦 Getting Started

### Prerequisites
* A modern web browser (Chrome, Firefox, Edge, Brave).
* No installation required for the Live Demo.

### Local Installation (For Developers)
If you wish to run this locally or contribute to the code:

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/esramos-design/mfa.github.io.git](https://github.com/esramos-design/mfa.github.io.git)
    ```
2.  **Navigate to the folder:**
    ```bash
    cd mfa.github.io
    ```
3.  **Run via Local Server:**
    * *Note:* Due to browser security policies (CORS) regarding Web Workers (used by Tesseract OCR), simply opening `index.html` file will not work for scanning.
    * **VS Code:** Right-click `index.html` -> "Open with Live Server".
    * **Python:** `python -m http.server 8000`

---

## 🤝 Contributing
Contributions are the lifeblood of open source. If you want to improve the UI, update the laser stats, or refine the OCR accuracy:

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/NewFeature`).
3.  Commit your Changes (`git commit -m 'Add some NewFeature'`).
4.  Push to the Branch (`git push origin feature/NewFeature`).
5.  Open a Pull Request.

Please see <a href="CONTRIBUTING.md" target="_blank">CONTRIBUTING.md</a> for more details.

---

## ⚠️ Disclaimer
This application is a fan-made tool. It uses empirical data. In-game variables such as server tick rates (FPS), desync, and unannounced CIG balance changes can affect actual mining results. **Use this tool as a guide, not a guarantee.**

## 📄 License
Distributed under the GNU General Public License (GPL). See `LICENSE` for more information.

## 📞 Contact
**Developer:** CHIRONDRAGON
**Organization:** 
