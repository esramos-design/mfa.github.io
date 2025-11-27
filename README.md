
# ⛏️ Mining Fracture Analyser
**Stop Guessing. Start Fracturing.**
[🔴 Live Demo](YOUR_LINK_HERE) | [🐛 Report Bug](YOUR_LINK_HERE) | [✨ Request Feature](YOUR_LINK_HERE) | [💬 Join Discord](YOUR_LINK_HERE)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> **📖 Introduction**
> The **Mining Fracture Analyser** is a precision calculation engine designed for serious industrial crews in Star Citizen (MOLEs, Prospectors, Golems).
>
> It simplifies complex mechanics by calculating your crew's **Total Combined Effective Laser Power (MW)** in real-time. Instantly determine if your team has enough power to crack a rock *before* you waste consumables or overheat your lasers.

**🤝 The Collaboration Team**
Developed by **CHIRONDRAGON** for the **THRUSTERS & DUST** organization.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### ✨ KEY FEATURES

📸 **OCR Auto-Scan (Magic Paste)**
Stop manually typing numbers while flying!
* Simply take a screenshot of your mining UI.
* **Paste (`Ctrl+V`)** directly into the browser.
* The tool automatically detects **Mass**, **Resistance**, and **Instability**.

🚀 **Advanced Multi-Crew Support**
Simulate any fleet composition:
* Mix ships (MOLEs + Prospectors + Golems).
* Toggle individual laser heads On/Off.
* Assign specific modules (Surge, Stampede) to specific heads.

📊 **Visual Analytics Suite**
Don't just see numbers; visualize the fracture:
* **Power Margin Chart:** See exactly how much overhead you have.
* **Risk Profile:** A doughnut chart balancing Resistance vs. Instability vs. Safety.
* **Resistance Curve:** A predictive line graph showing laser performance as heat increases.

💡 **Smart Recommendations**
Underpowered? The system thinks for you. It automatically suggests the **minimum laser heads required** and optimal **module configurations** to guarantee a break.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 📦 HOW TO USE

**1️⃣ Input Target Data**
* **Auto:** Paste a screenshot (`Ctrl+V`) into the "Auto-Scan" box.
* **Manual:** Enter Base Resistance (%), Instability (%), and Mass (kg).

**2️⃣ Assemble Team & Loadouts**
* Select your ship chassis.
* Click `Add` to generate laser slots.
* Configure Laser Heads, Modules, and Gadgets.

**3️⃣ Run Simulation**
* Click `RUN ANALYTIC SIMULATION`.
* Review the **Verdict**, **Effective Resistance**, and **Total Power** output.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**🛠️ Built With:** HTML5, Tailwind CSS (Space-Themed), Chart.js, Tesseract.js
**⚠️ Disclaimer:** Results are based on empirical community data. Server tick rates and desync may impact in-game results.
**📄 License:** Open Source (GNU GPL).





# Mining Fracture Analyser

## Introduction
The Mining Fracture Analyser is a powerful, real-time calculation tool designed specifically for cooperative mining crews in Star Citizen, such as those using multiple MOLEs, Prospectors, or Golems. This application simplifies complex in-game mechanics by calculating your crew's Total Combined Effective Laser Power (MW) and comparing it against a targeted rock's mass, effective resistance, and instability. Use it to pre-determine if your team has enough power to successfully fracture a difficult asteroid or planet-side rock before committing time and resources.

## The Collaboration Team
This application was developed by CHIRONDRAGON as a community tool for the THRUSTERS & DUST organization.  
**Developer:** CHIRONDRAGON  
**Organization:** THRUSTERS & DUST

## How to Use the App
The analyser is designed for quick input based on your in-game ship loadouts and the rock data displayed on your scanner.

### Step 1: Assemble Your Mining Team
Use the "1. Assemble Your Mining Team" dropdown to select a ship (e.g., Argo MOLE or MISC Prospector). Click Add Ship. The app will automatically add the corresponding number of laser heads (e.g., 3 heads for a MOLE, 1 for a Prospector) to the configuration area.

### Step 2: Configure Loadouts
For every active Laser Head added:  
- **Laser Head (Base Power):** Select the actual mining laser head installed (e.g., Lancet MH2, Helix I).  
- **Modules:** Select up to three Power Modules (e.g., Surge, Rieger-C3). Only modules with a power multiplier (>1.0) will increase your effective fracture power.

### Step 3: Apply Gadget
In the "2. Select Gadget" section, choose the resistance-reducing gadget your crew plans to use on the rock (e.g., Sabir). This applies a single, non-stacking resistance reduction to the target rock.

### Step 4: Input Rock Parameters
Enter the rock's Base Resistance (%) and Rock Instability (%) values exactly as shown on your ship's mining scanner. Enter the Target Rock Mass (kg) for the specific rock you intend to fracture.

### Step 5: Calculate
Click the "Calculate Combined Fracture Limit" button.

## What Do You Get From It?
The results section provides the critical metrics needed for a successful fracture:  
- **Effective Resistance:** The final resistance of the rock after your chosen gadget has been applied.  
- **Total Combined Effective Laser Power (MW):** The sum of the raw power from all active laser heads, multiplied by the effects of all chosen modules. This is your crew's true fracture strength.  
- **Max Theoretical Breakable Mass Limit (kg):** The largest rock mass your current team configuration can theoretically crack, given the rock's Effective Resistance.  
- **VERDICT:** A clear indicator of FRACTURE SUCCESSFUL or FRACTURE FAILED.  
- **Upgrade Required (If Failed):** If the fracture fails, the app provides the exact Required Effective Power (MW) you need to safely crack the rock and offers recommendations for the maximum-power module loadouts.

## Disclaimer of Accuracy & Safety
This application uses empirical data and established community formulas to provide a useful estimation of your fracture capability.  
**Estimation Tool:** This is not a guarantee of success. In-game variables, ping, server latency, pilot charge control, and minor patch updates can all affect the actual results.  
**Use at Your Own Risk:** The developer is not responsible for any catastrophic failure (rock explosion) that may occur in the game.  
**Data Updates:** Values are based on the latest available data at the time of development. Star Citizen is an alpha, and all ship/laser/module stats are subject to change by Cloud Imperium Games (CIG).

## License
This project is open-source and released under the GNU General Public License (GPL).
