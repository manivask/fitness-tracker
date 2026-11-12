# Fitness & Diet Tracker (Phase 1)

Modern, interactive fitness, training split, and nutrition tracking web application tailored for **Manivasagam** and **Vijayalakshmi** based on their personal trainer Phase 1 protocols.

Live Repository: [https://github.com/manivask/fitness-tracker](https://github.com/manivask/fitness-tracker)

---

## ✨ Key Features

1. **Dual Member Profiles**:
   - Seamlessly toggle between **Manivasagam** (82.8 kg base) and **Vijayalakshmi** (98.8 kg base).
   - Independent meal adherence, step targets, workout logging, and body weights.

2. **Date-Wise Logging & Retrieval**:
   - Integrated **Date Picker** with quick previous/next day controls and "Today" tag.
   - Logs are structured date-wise and saved as clean JSON under `DailyLogs/{YYYY-MM-DD}_{user}.json`.
   - Dedicated **Save Log** button with instant visual feedback and one-click full backup download.

3. **Phase 1 Eggetarian Diet Plans**:
   - Chronological meal schedules (Early morning, Meal 1, Meal 2 Lunch with photo check-in, Snack 2 Post-workout, Meal 3 Dinner, and SOS hunger drawer).
   - **Calories & Macros per Item**: Itemized calories, protein, carbs, and fat on every food item.
   - Dynamic adherence circular ring tracking daily compliance.
   - Coach's guidelines and specific notes (e.g. AM school drop-off steps, curd/rasam only, veggie batch preparation, craving control).

4. **Synchronized 4-Day Training Split**:
   - **Day 1**: Full Body Mobility & Hypertrophy A
   - **Day 2**: Active Recovery (Outdoor Brisk Walk) & Core Stabilization (Dead Bug, Push-Up Plank)
   - **Day 3**: Mobility & Hypertrophy B (Arnold Press, KB RDL, Lateral Walks, Face Pulls)
   - **Day 4**: Functional Endurance (Brisk Walk & Ground Get-Ups with palm-form emphasis)
   - **Calorie Burn Badges**: Per-exercise and per-session calorie burn calibrated for each member's weight and metabolic rate.
   - **Interactive Set Tracker**: Check off Set 1, 2, and 3 with custom notes for weights or hold times.
   - **Active Rest / Hold Timer**: Built-in 30s/45s/60s/90s rest countdown and stopwatch for plank/dead bug holds.

5. **15 kg Weight Loss Roadmap & Workout Duration Forecast**:
   - Trajectory forecast to lose 15 kg (Mani: 82.8 kg $\rightarrow$ 67.8 kg, Viji: 98.8 kg $\rightarrow$ 83.8 kg).
   - Total required caloric deficit: $15 \text{ kg} \times 7,700 \text{ kcal/kg} = 115,500 \text{ kcal}$.
   - Realistic timeline forecast (~20 to 24 weeks).
   - Interactive Calorie Simulator with sliders for Food Intake, Workout Burn, and Resting BMR.

6. **Video Tutorials Directory**:
   - Every mobility drill and lifting movement indexed with verified YouTube tutorial searches and technique cues.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Development Run
```bash
# Clone the repository
git clone https://github.com/manivask/fitness-tracker.git
cd fitness-tracker

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 📁 DailyLogs Structure
Logs are saved in the `DailyLogs/` directory in JSON format:
```
DailyLogs/
  ├── 2026-11-12_manivasagam.json
  └── 2026-11-12_vijayalakshmi.json
```

Example JSON payload:
```json
{
  "date": "2026-11-12",
  "user": "manivasagam",
  "userName": "Manivasagam",
  "weight": "82.8",
  "stepCompleted": true,
  "diet": {
    "m-s1-1": true,
    "m-m1-1": true
  },
  "workouts": {
    "manivasagam-d1-m1-set-1": true
  }
}
```
