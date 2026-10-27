
export type ResidentId = "alex" | "sam" | "jamie";

export type BarrierId =
  | "missing-ramp"
  | "narrow-path"
  | "poor-crossing-visibility"
  | "missing-tactile-paving"
  | "noisy-road"
  | "confusing-signs";

export type Upgrade = {
  id: string;
  name: string;
  cost: number;
  fixes: BarrierId[];
  description: string;
};

export type Resident = {
  id: ResidentId;
  name: string;
  destination: string;
  barriers: BarrierId[];
  description: string;
};

export const STARTING_BUDGET = 10;

export const residents: Resident[] = [
  {
    id: "alex",
    name: "Alex",
    destination: "Community library",
    barriers: ["missing-ramp", "narrow-path"],
    description: "Uses a wheelchair and needs accessible routes.",
  },
  {
    id: "sam",
    name: "Sam",
    destination: "Bus stop",
    barriers: [
      "poor-crossing-visibility",
      "missing-tactile-paving",
    ],
    description: "Has low vision and benefits from safer crossings.",
  },
  {
    id: "jamie",
    name: "Jamie",
    destination: "School",
    barriers: ["noisy-road", "confusing-signs"],
    description: "Benefits from quieter paths and clear directions.",
  },
];

export const upgrades: Upgrade[] = [
  {
    id: "curb-ramp",
    name: "Curb ramp",
    cost: 3,
    fixes: ["missing-ramp"],
    description: "Makes raised curbs easier to navigate.",
  },
  {
    id: "accessible-sidewalk",
    name: "Wider sidewalk",
    cost: 4,
    fixes: ["narrow-path"],
    description: "Creates more room to move safely.",
  },
  {
    id: "audible-signal",
    name: "Audible crossing signal",
    cost: 2,
    fixes: ["poor-crossing-visibility"],
    description: "Adds sound cues at crossings.",
  },
  {
    id: "tactile-paving",
    name: "Tactile paving",
    cost: 2,
    fixes: ["missing-tactile-paving"],
    description: "Adds textured ground cues.",
  },
  {
    id: "quiet-walkway",
    name: "Quiet walkway",
    cost: 3,
    fixes: ["noisy-road"],
    description: "Provides a calmer route away from traffic noise.",
  },
  {
    id: "clear-signs",
    name: "Clear directional signs",
    cost: 1,
    fixes: ["confusing-signs"],
    description: "Makes directions easier to understand.",
  },
];
