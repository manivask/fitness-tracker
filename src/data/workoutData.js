export const trainingGeneralNotes = [
  "Mandatory general warm-up before training every single day.",
  "Week 1 & 2: Do 2 sets of each exercise. After Week 3: Increase to 3 sets.",
  "Don't just move the weight or body through reps — learn and control the movement first.",
  "Take generous rest between sets for the first few weeks; your stamina will progress naturally.",
  "Training plan is synchronized with partner convenience & available equipment."
];

export const trainingSplits = [
  {
    id: "day-1",
    dayNumber: 1,
    title: "Day 1: Full Body Mobility & Hypertrophy A",
    category: "Strength & Mobility",
    duration: "45-50 min",
    estimatedBurnByMember: {
      manivasagam: 320,
      vijayalakshmi: 280
    },
    sections: [
      {
        title: "Mobility & Dynamic Prep",
        exercises: [
          { 
            id: "d1-m1", 
            name: "Standing Leg Rotations (CW & ACW)", 
            sets: 2, 
            load: "BW", 
            reps: "10 to 12 ES", 
            caloriesBurn: { manivasagam: 14, vijayalakshmi: 12 },
            notes: "Clockwise & Counter-Clockwise each side",
            videoQuery: "Standing+Single+Leg+Hip+Rotation+mobility+exercise",
            videoTitle: "Standing Leg & Hip Rotation Mobility Guide"
          },
          { 
            id: "d1-m2", 
            name: "Lying Pronated Arm Circles", 
            sets: 2, 
            load: "BW", 
            reps: "8 to 10", 
            caloriesBurn: { manivasagam: 12, vijayalakshmi: 10 },
            notes: "Chest down, controlled rotations",
            videoQuery: "Prone+Arm+Circles+shoulder+mobility+tutorial",
            videoTitle: "Prone / Lying Arm Circles Tutorial"
          },
          { 
            id: "d1-m3", 
            name: "Feet Elevated Toe Touch", 
            sets: 2, 
            load: "BW", 
            reps: "10 to 12 ES", 
            caloriesBurn: { manivasagam: 15, vijayalakshmi: 13 },
            notes: "Hamstring and posterior chain lengthening",
            videoQuery: "Elevated+Toe+Touch+hamstring+stretch",
            videoTitle: "Elevated Toe Touch Form & Stretch"
          },
          { 
            id: "d1-m4", 
            name: "Seated Banded L Holds", 
            sets: 2, 
            load: "BW", 
            reps: "Max Hold", 
            isTimed: true, 
            caloriesBurn: { manivasagam: 18, vijayalakshmi: 16 },
            notes: "Shoulder depression and lat activation",
            videoQuery: "Banded+L+Sit+Hold+exercise+form",
            videoTitle: "Banded L-Hold Form & Lat Activation"
          },
          { 
            id: "d1-m5", 
            name: "Knee Extension on Pike Position", 
            sets: 2, 
            load: "BW", 
            reps: "10 to 12", 
            caloriesBurn: { manivasagam: 16, vijayalakshmi: 14 },
            notes: "Quad lockout & hamstring active stretch",
            videoQuery: "Pike+position+knee+extension+exercise",
            videoTitle: "Pike Position Knee Extension Tutorial"
          }
        ]
      },
      {
        title: "Main Hypertrophy Circuit",
        exercises: [
          { 
            id: "d1-e1", 
            name: "Bodyweight Squats / Touch Down Squats", 
            sets: 2, 
            maxSets: 3, 
            load: "BW", 
            reps: "15 to 18", 
            caloriesBurn: { manivasagam: 35, vijayalakshmi: 30 },
            notes: "Depth below parallel, knee tracking with toes",
            videoQuery: "bodyweight+squat+proper+form+touchdown",
            videoTitle: "How to Squat Properly: Form Guide"
          },
          { 
            id: "d1-e2", 
            name: "Incline Push Ups / Kneeling Push Press", 
            sets: 2, 
            maxSets: 3, 
            load: "BW", 
            reps: "AMRAP", 
            caloriesBurn: { manivasagam: 30, vijayalakshmi: 26 },
            notes: "Full range chest to bench or kneeling press",
            videoQuery: "incline+push+ups+proper+form+kneeling+press",
            videoTitle: "Incline Push Ups & Variations Tutorial"
          },
          { 
            id: "d1-e3", 
            name: "Double Arm DB Rowing / One Arm KB Rowing", 
            sets: 2, 
            maxSets: 3, 
            load: "15 lbs KB", 
            reps: "15 to 18", 
            caloriesBurn: { manivasagam: 32, vijayalakshmi: 28 },
            notes: "Squeeze lats at peak contraction",
            videoQuery: "dumbbell+row+and+kettlebell+one+arm+row+form",
            videoTitle: "Dumbbell & Kettlebell Row Technique"
          },
          { 
            id: "d1-e4", 
            name: "Alternate Reverse Lunges", 
            sets: 2, 
            maxSets: 3, 
            load: "BW", 
            reps: "10 ES", 
            caloriesBurn: { manivasagam: 34, vijayalakshmi: 30 },
            notes: "10 reps each side, torso upright",
            videoQuery: "reverse+lunges+proper+form+bodyweight",
            videoTitle: "Reverse Lunges Proper Form"
          },
          { 
            id: "d1-e5", 
            name: "Bodyweight Squats / Touch Down Squats (Set 2)", 
            sets: 2, 
            maxSets: 3, 
            load: "BW", 
            reps: "13 to 15", 
            caloriesBurn: { manivasagam: 30, vijayalakshmi: 26 },
            notes: "High tempo, steady pace",
            videoQuery: "bodyweight+squats+tempo+reps",
            videoTitle: "Squat Cadence & Controlled Depth"
          },
          { 
            id: "d1-e6", 
            name: "Dumbbell Floor Press", 
            sets: 2, 
            maxSets: 3, 
            load: "3.4 kgs", 
            reps: "15 to 18", 
            caloriesBurn: { manivasagam: 25, vijayalakshmi: 22 },
            notes: "Upper arm touches floor at 45 degree angle",
            videoQuery: "dumbbell+floor+press+proper+form",
            videoTitle: "Dumbbell Floor Press Demonstration"
          },
          { 
            id: "d1-e7", 
            name: "Alternate Reverse Lunges (Set 2)", 
            sets: 2, 
            maxSets: 3, 
            load: "BW", 
            reps: "10 to 12", 
            caloriesBurn: { manivasagam: 30, vijayalakshmi: 26 },
            notes: "Drive through front heel",
            videoQuery: "reverse+lunges+glute+quad+drive",
            videoTitle: "Reverse Lunge Mechanics"
          },
          { 
            id: "d1-e8", 
            name: "DL / KB Pullover (On Floor)", 
            sets: 2, 
            maxSets: 3, 
            load: "15 lbs KB", 
            reps: "AMRAP", 
            caloriesBurn: { manivasagam: 22, vijayalakshmi: 20 },
            notes: "Felt deep in lats and ribcage",
            videoQuery: "kettlebell+pullover+on+floor+form",
            videoTitle: "Floor Pullover Lat Engagement Tutorial"
          },
          { 
            id: "d1-e9", 
            name: "Double Arm Dumbbell Biceps Curl", 
            sets: 2, 
            maxSets: 3, 
            load: "3.4 kgs", 
            reps: "15 to 18", 
            caloriesBurn: { manivasagam: 18, vijayalakshmi: 16 },
            notes: "Elbows pinned to sides",
            videoQuery: "dumbbell+bicep+curl+form+mistakes",
            videoTitle: "Bicep Curl Full Range of Motion"
          },
          { 
            id: "d1-e10", 
            name: "Overhead One Arm DB Triceps Extension", 
            sets: 2, 
            maxSets: 3, 
            load: "3.4 kgs", 
            reps: "13 to 15 EA", 
            caloriesBurn: { manivasagam: 16, vijayalakshmi: 14 },
            notes: "Keep elbow stationary and vertical",
            videoQuery: "single+arm+overhead+dumbbell+tricep+extension",
            videoTitle: "Single Arm Overhead Triceps Extension"
          }
        ]
      }
    ]
  },
  {
    id: "day-2",
    dayNumber: 2,
    title: "Day 2: Active Recovery & Core Stabilization",
    category: "LISS Cardio & Core",
    duration: "40 min",
    estimatedBurnByMember: {
      manivasagam: 260,
      vijayalakshmi: 230
    },
    specialTrackingNote: "Timing of the first set in Dead Bug and Push Up Plank must be logged accurately to track core progression.",
    sections: [
      {
        title: "Aerobic Base",
        exercises: [
          { 
            id: "d2-e1", 
            name: "Outdoor Brisk Walk", 
            sets: 1, 
            load: "Body", 
            reps: "30 to 35 mins", 
            caloriesBurn: { manivasagam: 160, vijayalakshmi: 140 },
            notes: "Sustained brisk cadence (conversational pace)",
            videoQuery: "brisk+walking+benefits+proper+posture+cadence",
            videoTitle: "Brisk Walking Posture & Cadence Tips"
          }
        ]
      },
      {
        title: "Core Holds & Flexibility",
        exercises: [
          { 
            id: "d2-e2", 
            name: "Dead Bug Hold (Basic)", 
            sets: 2, 
            load: "BW", 
            reps: "Max Hold", 
            isTimed: true, 
            highlightFirstSet: true, 
            caloriesBurn: { manivasagam: 25, vijayalakshmi: 22 },
            notes: "Lower back pressed flat against floor without arching",
            videoQuery: "dead+bug+isometric+hold+core+exercise",
            videoTitle: "Dead Bug Hold Core Progression"
          },
          { 
            id: "d2-e3", 
            name: "Push Up Plank", 
            sets: 2, 
            load: "BW", 
            reps: "Max Hold", 
            isTimed: true, 
            highlightFirstSet: true, 
            caloriesBurn: { manivasagam: 30, vijayalakshmi: 26 },
            notes: "Hands beneath shoulders, glutes and abs locked",
            videoQuery: "push+up+position+plank+high+plank+form",
            videoTitle: "High Plank / Push-Up Plank Form"
          },
          { 
            id: "d2-e4", 
            name: "Full Body Stretching", 
            sets: 1, 
            load: "BW", 
            reps: "As needed", 
            caloriesBurn: { manivasagam: 20, vijayalakshmi: 18 },
            notes: "Hamstrings, hips, thoracic spine, calves",
            videoQuery: "10+min+full+body+stretch+routine+recovery",
            videoTitle: "10-Minute Full Body Post-Workout Stretch"
          }
        ]
      }
    ]
  },
  {
    id: "day-3",
    dayNumber: 3,
    title: "Day 3: Mobility & Hypertrophy B",
    category: "Strength & Posture",
    duration: "45-50 min",
    estimatedBurnByMember: {
      manivasagam: 330,
      vijayalakshmi: 290
    },
    sections: [
      {
        title: "Mobility & Dynamic Activation",
        exercises: [
          { 
            id: "d3-m1", 
            name: "Standing Leg Rotations (CW & ACW)", 
            sets: 2, 
            load: "BW", 
            reps: "10 to 12 ES", 
            caloriesBurn: { manivasagam: 14, vijayalakshmi: 12 },
            notes: "Both clockwise and counter-clockwise",
            videoQuery: "standing+hip+rotations+mobility",
            videoTitle: "Hip Mobility Circles"
          },
          { 
            id: "d3-m2", 
            name: "Lying Pronated Arm Circles", 
            sets: 2, 
            load: "BW", 
            reps: "8 to 10", 
            caloriesBurn: { manivasagam: 12, vijayalakshmi: 10 },
            notes: "Warm up scapular stabilizers",
            videoQuery: "prone+arm+circles+mobility",
            videoTitle: "Prone Arm Circles for Scapular Health"
          },
          { 
            id: "d3-m3", 
            name: "Feet Elevated Toe Touch", 
            sets: 2, 
            load: "BW", 
            reps: "10 to 12 ES", 
            caloriesBurn: { manivasagam: 15, vijayalakshmi: 13 },
            notes: "Dynamic stretch",
            videoQuery: "toe+touch+elevated+stretch",
            videoTitle: "Toe Touch Stretch Technique"
          },
          { 
            id: "d3-m4", 
            name: "Seated Banded L Holds", 
            sets: 2, 
            load: "BW", 
            reps: "Max Hold", 
            isTimed: true, 
            caloriesBurn: { manivasagam: 18, vijayalakshmi: 16 },
            notes: "Lat and rear delt engagement",
            videoQuery: "banded+lat+hold+seated",
            videoTitle: "Seated Banded Lat Activation"
          },
          { 
            id: "d3-m5", 
            name: "Hop Jumps (Low Intensity)", 
            sets: 2, 
            load: "BW", 
            reps: "30 sec", 
            isTimed: true, 
            caloriesBurn: { manivasagam: 25, vijayalakshmi: 22 },
            notes: "Light elastic bounce on balls of feet",
            videoQuery: "low+intensity+hop+jumps+warmup+ankle+stiffness",
            videoTitle: "Low-Impact Hop Jumps Warm-Up"
          }
        ]
      },
      {
        title: "Posterior Chain, Delts & Arms",
        exercises: [
          { 
            id: "d3-e1", 
            name: "Lying Pronated Y Raise (Both Arms)", 
            sets: 2, 
            maxSets: 3, 
            load: "BW", 
            reps: "15 to 18", 
            caloriesBurn: { manivasagam: 16, vijayalakshmi: 14 },
            notes: "Thumbs up, activate lower traps",
            videoQuery: "prone+Y+raise+lower+trap+exercise",
            videoTitle: "Prone Y-Raises for Mid & Lower Traps"
          },
          { 
            id: "d3-e2", 
            name: "Lying Hip Thrust", 
            sets: 2, 
            maxSets: 3, 
            load: "BW", 
            reps: "15 to 18", 
            caloriesBurn: { manivasagam: 32, vijayalakshmi: 28 },
            notes: "Pause 1 sec at top glute contraction",
            videoQuery: "glute+bridge+lying+hip+thrust+form",
            videoTitle: "Lying Glute Bridge / Hip Thrust Form"
          },
          { 
            id: "d3-e3", 
            name: "Lying Pronated T Raise (Both Arms)", 
            sets: 2, 
            maxSets: 3, 
            load: "BW", 
            reps: "15 to 18", 
            caloriesBurn: { manivasagam: 16, vijayalakshmi: 14 },
            notes: "Arms straight out in T position",
            videoQuery: "prone+T+raise+rhomboids+rear+delts",
            videoTitle: "Prone T-Raises for Rear Delts"
          },
          { 
            id: "d3-e4", 
            name: "Lying Leg Raises", 
            sets: 2, 
            maxSets: 3, 
            load: "BW", 
            reps: "AMRAP", 
            caloriesBurn: { manivasagam: 24, vijayalakshmi: 20 },
            notes: "Strict lower ab pull without momentum",
            videoQuery: "lying+leg+raises+ab+exercise+proper+form",
            videoTitle: "Lying Leg Raise Tutorial (No Lower Back Arch)"
          },
          { 
            id: "d3-e5", 
            name: "Standing DB Arnold Press - Both Arms", 
            sets: 2, 
            maxSets: 3, 
            load: "3.4 kgs", 
            reps: "13 to 15", 
            caloriesBurn: { manivasagam: 28, vijayalakshmi: 24 },
            notes: "Smooth rotation from palms facing chest to facing out",
            videoQuery: "arnold+press+dumbbell+shoulder+exercise+form",
            videoTitle: "Arnold Press Proper Form & Execution"
          },
          { 
            id: "d3-e6", 
            name: "Staggered Stance Kettlebell RDL", 
            sets: 2, 
            maxSets: 3, 
            load: "15 lbs KB", 
            reps: "8 to 12 ES", 
            caloriesBurn: { manivasagam: 35, vijayalakshmi: 30 },
            notes: "8-12 each side, hinge at hip",
            videoQuery: "staggered+stance+rdl+kettlebell+romanian+deadlift",
            videoTitle: "Staggered Stance / B-Stance RDL Technique"
          },
          { 
            id: "d3-e7", 
            name: "Banded Lateral Walks", 
            sets: 2, 
            maxSets: 3, 
            load: "Band", 
            reps: "60 Sec ES", 
            isTimed: true, 
            caloriesBurn: { manivasagam: 26, vijayalakshmi: 22 },
            notes: "Glute medius burn, stay in athletic quarter squat",
            videoQuery: "resistance+band+lateral+walks+glute+activation",
            videoTitle: "Banded Lateral Monster Walks"
          },
          { 
            id: "d3-e8", 
            name: "Banded Face Pulls", 
            sets: 2, 
            maxSets: 3, 
            load: "Band", 
            reps: "AMRAP", 
            caloriesBurn: { manivasagam: 20, vijayalakshmi: 18 },
            notes: "Pull to eye level, externally rotate wrists",
            videoQuery: "resistance+band+face+pulls+posture",
            videoTitle: "Band Face Pulls for Upper Back & Rotator Cuff"
          },
          { 
            id: "d3-e9", 
            name: "Double Arm DB Hammer Curl", 
            sets: 2, 
            maxSets: 3, 
            load: "3.4 kgs", 
            reps: "15 to 18", 
            caloriesBurn: { manivasagam: 18, vijayalakshmi: 16 },
            notes: "Palms facing each other, targets brachialis",
            videoQuery: "dumbbell+hammer+curls+form",
            videoTitle: "Hammer Curls Proper Form"
          },
          { 
            id: "d3-e10", 
            name: "Bent Over DB Triceps Kick Backs", 
            sets: 2, 
            maxSets: 3, 
            load: "1.1 kgs", 
            reps: "15 to 18 ES", 
            caloriesBurn: { manivasagam: 16, vijayalakshmi: 14 },
            notes: "Lock elbows high, full arm extension",
            videoQuery: "tricep+kickbacks+dumbbell+bent+over+form",
            videoTitle: "Tricep Kickback Demonstration"
          },
          { 
            id: "d3-e11", 
            name: "Standing Calf Raises", 
            sets: 2, 
            maxSets: 3, 
            load: "BW", 
            reps: "20 to 25", 
            caloriesBurn: { manivasagam: 18, vijayalakshmi: 16 },
            notes: "Hold top contraction for 1 sec",
            videoQuery: "standing+calf+raises+full+stretch",
            videoTitle: "Calf Raises Technique & Range of Motion"
          }
        ]
      }
    ]
  },
  {
    id: "day-4",
    dayNumber: 4,
    title: "Day 4: Brisk Walk & Ground Get-Ups",
    category: "Endurance & Functional Strength",
    duration: "40-45 min",
    estimatedBurnByMember: {
      manivasagam: 290,
      vijayalakshmi: 250
    },
    specialTrackingNote: "Use alternate limbs for each rep for getups. Crucial: Use the PALM, not the fingers!",
    sections: [
      {
        title: "Cardio Base",
        exercises: [
          { 
            id: "d4-e1", 
            name: "Outdoor Brisk Walk", 
            sets: 1, 
            load: "Body", 
            reps: "30 to 35 mins", 
            caloriesBurn: { manivasagam: 160, vijayalakshmi: 140 },
            notes: "Paced outdoor walk",
            videoQuery: "outdoor+brisk+walking+heart+rate+zone",
            videoTitle: "Zone 2 Outdoor Brisk Walking"
          }
        ]
      },
      {
        title: "Functional Ground Movement",
        exercises: [
          { 
            id: "d4-e2", 
            name: "Pronated Get Ups", 
            sets: 4, 
            maxSets: 5, 
            load: "BW", 
            reps: "10 to 12", 
            caloriesBurn: { manivasagam: 60, vijayalakshmi: 52 },
            notes: "Alternate limbs every rep; push through full palm (Note: Not fingers!)",
            videoQuery: "prone+get+up+functional+movement+ground+to+standing",
            videoTitle: "Prone Get Up / Ground to Stand Progression"
          },
          { 
            id: "d4-e3", 
            name: "Supinated Get Ups", 
            sets: 2, 
            maxSets: 2, 
            load: "BW", 
            reps: "10 to 12", 
            caloriesBurn: { manivasagam: 32, vijayalakshmi: 28 },
            notes: "Smooth roll to seated to stand, switch lead leg",
            videoQuery: "turkish+get+up+bodyweight+roll+to+stand",
            videoTitle: "Supine Roll to Stand / Get-Up Tutorial"
          },
          { 
            id: "d4-e4", 
            name: "Full Body Stretching (If Needed)", 
            sets: 1, 
            load: "BW", 
            reps: "As needed", 
            caloriesBurn: { manivasagam: 20, vijayalakshmi: 18 },
            notes: "Recovery & tissue decompression",
            videoQuery: "mobility+decompression+full+body+stretch",
            videoTitle: "Post-Workout Full Body Decompression"
          }
        ]
      }
    ]
  }
];
