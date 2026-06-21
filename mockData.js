import { Bike, TrainFront, Soup, Plug, ShowerHead, ShirtIcon } from "lucide-react";

export const QUICK_PILLS = [
  { id: "q1", label: "Swapped beef burger for lentil soup", icon: Soup },
  { id: "q2", label: "Took the subway for 12 miles", icon: TrainFront },
  { id: "q3", label: "Unplugged home entertainment center for 8 hours", icon: Plug },
];

export const INITIAL_LEDGER = [
  {
    id: "l1",
    label: "Walked to the grocery store instead of driving",
    impact: 1.4,
    category: "Transit",
    methodology: "Zero-emission human-powered transit over regional baselines.",
    pivot: "Integrate alternative transport options into your regular commutes.",
    confidence: 90,
    time: "8:12 AM",
  },
  {
    id: "l2",
    label: "Air-dried laundry instead of using the dryer",
    impact: 1.1,
    category: "General Analysis",
    methodology: "Baseline behavioral model mapping applied to generalized text strings.",
    pivot: "Provide granular item details during entry processing for accurate tracking.",
    confidence: 68,
    time: "7:40 AM",
  },
];

export const INITIAL_ACTIONS = [
  {
    id: "a1",
    title: "Swap one beef meal for plant-based",
    why: "Your food emissions are 28% above your guild's average this week.",
    category: "Diet",
    tier: "Easy",
    impact: 3.2,
    xp: 15,
    icon: Soup,
    committed: false,
    expanded: false,
  },
  {
    id: "a2",
    title: "Carpool or take transit twice this week",
    why: "Transport is your single largest emission source — 41% of your footprint.",
    category: "Transit",
    tier: "Medium",
    impact: 5.6,
    xp: 25,
    icon: TrainFront,
    committed: false,
    expanded: false,
  },
  {
    id: "a3",
    title: "Switch your next laundry load to cold water",
    why: "A small habit swap that quietly adds up over a month.",
    category: "General Analysis",
    tier: "Easy",
    impact: 0.9,
    xp: 6,
    icon: ShirtIcon,
    committed: false,
    expanded: false,
  },
  {
    id: "a4",
    title: "Take a 5-minute shorter shower",
    why: "Water heating is a quiet contributor — most people underestimate it.",
    category: "General Analysis",
    tier: "Easy",
    impact: 0.4,
    xp: 5,
    icon: ShowerHead,
    committed: false,
    expanded: false,
  },
  {
    id: "a5",
    title: "Bike instead of driving for one short errand",
    why: "Trips under 3km are the easiest wins on your carbon map.",
    category: "Transit",
    tier: "Medium",
    impact: 3.8,
    xp: 18,
    icon: Bike,
    committed: false,
    expanded: false,
  },
];

export const GLOBAL_LEADERS = [
  { rank: 1, name: "Priya N.", offset: 184.2 },
  { rank: 2, name: "Jonas K.", offset: 171.6 },
  { rank: 3, name: "Mei L.", offset: 159.8 },
  { rank: 4, name: "Sam O.", offset: 142.3 },
];

export const GUILD_MEMBERS = [
  { name: "Dana R.", offset: 38.4 },
  { name: "Theo B.", offset: 31.1 },
  { name: "Yuki S.", offset: 27.9 },
];
