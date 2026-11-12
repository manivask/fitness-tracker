export const usersData = {
  manivasagam: {
    id: "manivasagam",
    name: "Manivasagam",
    shortName: "Mani",
    avatarInitial: "M",
    age: 38,
    gender: "Male",
    startWeight: "82.8",
    targetLossKg: 15, // Goal: reduce 15 kg
    dietBase: "Eggetarian",
    goal: "Weight Loss (-15 kg)",
    planNo: "Phase 1",
    startDate: "12-Nov-2026",
    // Estimated daily expenditure parameters (TDEE baseline ~2350 kcal)
    estimatedTDEE: 2350,
    workoutBurnAvg: 350, // workout + AM brisk steps
    dietNotes: [
      { id: "m-note-1", label: "Note 1 (AM Steps)", text: "1500 steps to be completed right after dropping kid in school. Use parking or nearby open paths." },
      { id: "m-note-2", label: "Note 2 (Meal 2 Gravy)", text: "Curd or Rasam only. Absolutely no other gravies are allowed." },
      { id: "m-note-3", label: "Note 3 (Veggies Batch Prep)", text: "Cook veggies once (300-400g total raw) and split it into two equal portions for Meal 2 and Meal 3." }
    ],
    stepGoal: {
      target: 1500,
      label: "AM Steps (1,500)",
      condition: "Post School Drop-off (Everyday)"
    },
    dietSections: [
      {
        id: "m-snack-1",
        title: "Snack 1 & Morning Routine",
        time: "Early Morning (Wake-up)",
        items: [
          { id: "m-s1-1", name: "Black Coffee", quantity: "1 cup", calories: 5, protein: 0.3, carbs: 0, fat: 0, note: "No sugar / zero cal sweetener allowed" },
          { id: "m-s1-2", name: "AM Step Count Target", quantity: "1,500 steps", calories: 0, caloriesBurned: 75, note: "Post school drop-off walk (~75 kcal burn)", isStepTarget: true }
        ]
      },
      {
        id: "m-meal-1",
        title: "Meal 1",
        time: "9:30 AM – 10:00 AM",
        items: [
          { id: "m-m1-1", name: "Egg Whites", quantity: "5 no", calories: 85, protein: 18, carbs: 1, fat: 0.2, note: "Boiled or dry scrambled" },
          { id: "m-m1-2", name: "Papaya / Apple / Orange", quantity: "200 gms", calories: 95, protein: 1, carbs: 24, fat: 0.3, note: "Choose any one / rotate daily" },
          { id: "m-m1-3", name: "Mixed Nuts", quantity: "5 gms", calories: 30, protein: 1, carbs: 1, fat: 2.7, note: "Almonds, walnuts, or mixed nuts" }
        ]
      },
      {
        id: "m-meal-2",
        title: "Meal 2 (Lunch)",
        time: "1:00 PM – 2:00 PM",
        requiresPhoto: true,
        items: [
          { id: "m-m2-1", name: "Cooked Rice", quantity: "150 – 160 gms", calories: 200, protein: 4, carbs: 45, fat: 0.5, note: "Weighed cooked" },
          { id: "m-m2-2", name: "Curd / Rasam", quantity: "100 gms", calories: 65, protein: 3.5, carbs: 4.5, fat: 3.2, note: "Strictly Curd or Rasam only (Note 2)" },
          { id: "m-m2-3", name: "Egg Whites", quantity: "3 no", calories: 51, protein: 11, carbs: 0.6, fat: 0.1, note: "Boiled or poached" },
          { id: "m-m2-4", name: "Any Veggies", quantity: "150 – 200 gms", calories: 60, protein: 3, carbs: 10, fat: 0.5, note: "Cook once and split with Meal 3 (Note 3)" },
          { id: "m-m2-5", name: "Butter", quantity: "10 gms", calories: 72, protein: 0.1, carbs: 0, fat: 8.1, note: "For cooking entire Meal 2" }
        ]
      },
      {
        id: "m-workout-window",
        title: "Daily Movement / Workout Window",
        time: "Around 3:00 PM – 3:30 PM",
        items: [
          { id: "m-w-1", name: "Home Workouts or Outdoor LISS Cardio", quantity: "30 – 45 mins", calories: 0, caloriesBurned: 275, note: "Follow Training P1 split for today (~250-300 kcal burn)" }
        ]
      },
      {
        id: "m-snack-2",
        title: "Snack 2 (Post Workout)",
        time: "Immediately Post-Workout",
        items: [
          { id: "m-s2-1", name: "Whey Protein", quantity: "1 Scoop", calories: 120, protein: 24, carbs: 2, fat: 1.5, note: "Mixed with cold water" }
        ]
      },
      {
        id: "m-meal-3",
        title: "Meal 3 (Dinner)",
        time: "8:00 PM – 8:30 PM",
        items: [
          { id: "m-m3-1", name: "Rolled Oats", quantity: "40 gms", calories: 155, protein: 5.5, carbs: 27, fat: 2.8, note: "Raw dry measurement before cooking" },
          { id: "m-m3-2", name: "Brown Whole Egg OR Paneer", quantity: "1 Whole Egg / 25g Paneer", calories: 75, protein: 6.5, carbs: 0.8, fat: 5.2, note: "Micronutrient & essential fat boost" },
          { id: "m-m3-3", name: "Any Veggies", quantity: "150 – 200 gms", calories: 60, protein: 3, carbs: 10, fat: 0.5, note: "Cooked from lunch batch prep" },
          { id: "m-m3-4", name: "Butter", quantity: "5 gms", calories: 36, protein: 0, carbs: 0, fat: 4.1, note: "For cooking entire Meal 3" }
        ]
      },
      {
        id: "m-sos",
        title: "SOS Hunger Relievers (Zero Guilt)",
        time: "Anytime as needed",
        isSos: true,
        items: [
          { id: "m-sos-1", name: "Cucumber", quantity: "As needed", calories: 15, protein: 0.7, carbs: 3, fat: 0.1, note: "Hydrating, crunchy volume" },
          { id: "m-sos-2", name: "Black Coffee", quantity: "1 cup", calories: 5, protein: 0.3, carbs: 0, fat: 0, note: "Natural appetite regulator" },
          { id: "m-sos-3", name: "Diet Sodas", quantity: "1 can max", calories: 0, protein: 0, carbs: 0, fat: 0, note: "Zero calorie beverage option" }
        ]
      }
    ]
  },

  vijayalakshmi: {
    id: "vijayalakshmi",
    name: "Vijayalakshmi",
    shortName: "Viji",
    avatarInitial: "V",
    age: 33,
    gender: "Female",
    startWeight: "98.8",
    targetLossKg: 15, // Goal: reduce 15 kg
    dietBase: "Eggetarian",
    goal: "Weight Loss (-15 kg)",
    planNo: "Phase 1",
    startDate: "12-Nov-2026",
    // Estimated daily expenditure parameters (TDEE baseline ~2250 kcal)
    estimatedTDEE: 2250,
    workoutBurnAvg: 300, // workout + brisk steps
    dietNotes: [
      { id: "v-note-1", label: "Note 1 (Steps)", text: "2000 steps to be finished inside / near home before lunch (Only on off days, 8.00 AM to 8.30 AM)." },
      { id: "v-note-2", label: "Note 2 (Curd & Satiety)", text: "Mixing curd with veggies or eating it separately will significantly increase the satiety level." },
      { id: "v-note-3", label: "Note 3 (Protein Bar SOS)", text: "Use protein bar only during peak cravings / period cycles. Only 1 bar (approx 200-220 cal) rarely." }
    ],
    stepGoal: {
      target: 2000,
      label: "Steps (2,000)",
      condition: "Inside/Near Home Before Lunch (Off-days)"
    },
    dietSections: [
      {
        id: "v-snack-1",
        title: "Snack 1 (Early Morning)",
        time: "6:15 AM – 6:30 AM",
        items: [
          { id: "v-s1-1", name: "Milk (For Coffee / Tea)", quantity: "150 gms", calories: 95, protein: 4.8, carbs: 7.2, fat: 5, note: "Strictly sugarless" },
          { id: "v-s1-2", name: "Step Count Target (Off days)", quantity: "2,000 steps", calories: 0, caloriesBurned: 100, note: "8:00 AM to 8:30 AM inside/near home (Note 1)", isStepTarget: true }
        ]
      },
      {
        id: "v-meal-1",
        title: "Meal 1",
        time: "9:30 AM – 10:00 AM",
        items: [
          { id: "v-m1-1", name: "Brown Whole Egg / Paneer", quantity: "2 no / 50 gms", calories: 150, protein: 13, carbs: 1.5, fat: 10.5, note: "2 whole eggs OR 50g fresh paneer" },
          { id: "v-m1-2", name: "Any Veggies (Mostly Low cal)", quantity: "100 – 150 gms", calories: 45, protein: 2.2, carbs: 8, fat: 0.4, note: "Broccoli, beans, zucchini, spinach" },
          { id: "v-m1-3", name: "Butter", quantity: "5 gms", calories: 36, protein: 0, carbs: 0, fat: 4.1, note: "For cooking entire Meal 1" }
        ]
      },
      {
        id: "v-meal-2",
        title: "Meal 2 (Lunch)",
        time: "1:00 PM – 2:00 PM",
        requiresPhoto: true,
        items: [
          { id: "v-m2-1", name: "Whole Grain Bread", quantity: "2 Slices (approx 80g)", calories: 160, protein: 7, carbs: 28, fat: 2, note: "100% whole grain bread" },
          { id: "v-m2-2", name: "Cheese Slice", quantity: "1 no", calories: 85, protein: 5, carbs: 0.5, fat: 7, note: "Single slice cheese (~80-100 cal)" },
          { id: "v-m2-3", name: "Any Veggies (Mostly Low cal)", quantity: "100 – 150 gms", calories: 45, protein: 2.2, carbs: 8, fat: 0.4, note: "Sauteed or fresh salad" },
          { id: "v-m2-4", name: "Curd", quantity: "100 gms", calories: 65, protein: 3.5, carbs: 4.5, fat: 3.2, note: "Mix with veggies or have separately for satiety (Note 2)" }
        ]
      },
      {
        id: "v-workout-window",
        title: "Daily Movement / Workout Window",
        time: "Around 3:00 PM – 3:30 PM",
        items: [
          { id: "v-w-1", name: "Home Workouts or Outdoor LISS Cardio", quantity: "30 – 45 mins", calories: 0, caloriesBurned: 250, note: "Partner workout synchronized with Manivasagam" }
        ]
      },
      {
        id: "v-snack-2",
        title: "Snack 2 (Evening / Post Workout)",
        time: "Post Workout / Evening",
        items: [
          { id: "v-s2-1", name: "Milk (For Coffee / Tea)", quantity: "150 gms", calories: 95, protein: 4.8, carbs: 7.2, fat: 5, note: "Strictly sugarless" }
        ]
      },
      {
        id: "v-meal-3",
        title: "Meal 3 (Dinner)",
        time: "8:00 PM – 8:30 PM",
        items: [
          { id: "v-m3-1", name: "Rolled Oats", quantity: "40 gms", calories: 155, protein: 5.5, carbs: 27, fat: 2.8, note: "Raw measurement before cooking" },
          { id: "v-m3-2", name: "Whey Protein", quantity: "1 Scoop", calories: 120, protein: 24, carbs: 2, fat: 1.5, note: "Mix into oats or take as shake" },
          { id: "v-m3-3", name: "Mixed Nuts", quantity: "10 gms", calories: 60, protein: 2, carbs: 2, fat: 5.4, note: "Almonds, walnuts, or mixed nuts" }
        ]
      },
      {
        id: "v-sos",
        title: "SOS Hunger Relievers & Cravings",
        time: "Anytime as needed",
        isSos: true,
        items: [
          { id: "v-sos-1", name: "Cucumber", quantity: "As needed", calories: 15, protein: 0.7, carbs: 3, fat: 0.1, note: "High volume, crunchy, zero guilt" },
          { id: "v-sos-2", name: "Protein Bar", quantity: "1 no", calories: 210, protein: 20, carbs: 18, fat: 7, note: "Use only during peak cravings / period cycles (Note 3)" },
          { id: "v-sos-3", name: "Diet Sodas", quantity: "1 can max", calories: 0, protein: 0, carbs: 0, fat: 0, note: "Zero calorie carbonated option" }
        ]
      }
    ]
  }
};
