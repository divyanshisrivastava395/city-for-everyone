
import {
  residents,
  upgrades,
  STARTING_BUDGET,
  type BarrierId,
  type ResidentId,
} from "./gameData";

export type GameState = {
  budget: number;
  purchasedUpgradeIds: string[];
};

export function createInitialState(): GameState {
  return {
    budget: STARTING_BUDGET,
    purchasedUpgradeIds: [],
  };
}

export function purchaseUpgrade(
  state: GameState,
  upgradeId: string,
): GameState {
  const upgrade = upgrades.find((item) => item.id === upgradeId);

  // Ignore unknown upgrades, duplicate purchases, and unaffordable items.
  if (
    !upgrade ||
    state.purchasedUpgradeIds.includes(upgradeId) ||
    state.budget < upgrade.cost
  ) {
    return state;
  }

  return {
    budget: state.budget - upgrade.cost,
    purchasedUpgradeIds: [
      ...state.purchasedUpgradeIds,
      upgradeId,
    ],
  };
}

export function getFixedBarriers(state: GameState): Set<BarrierId> {
  const fixed = new Set<BarrierId>();

  for (const upgradeId of state.purchasedUpgradeIds) {
    const upgrade = upgrades.find((item) => item.id === upgradeId);

    upgrade?.fixes.forEach((barrier) => fixed.add(barrier));
  }

  return fixed;
}

export function getResidentProgress(
  state: GameState,
  residentId: ResidentId,
) {
  const resident = residents.find((item) => item.id === residentId);

  if (!resident) {
    return {
      total: 0,
      fixed: 0,
      remaining: 0,
      accessible: false,
    };
  }

  const fixedBarriers = getFixedBarriers(state);
  const fixed = resident.barriers.filter((barrier) =>
    fixedBarriers.has(barrier),
  ).length;

  return {
    total: resident.barriers.length,
    fixed,
    remaining: resident.barriers.length - fixed,
    accessible: fixed === resident.barriers.length,
  };
}

export function getCityScore(state: GameState): number {
  const totalBarriers = residents.reduce(
    (sum, resident) => sum + resident.barriers.length,
    0,
  );

  const fixedBarriers = getFixedBarriers(state);

  const fixedCount = residents.reduce(
    (sum, resident) =>
      sum +
      resident.barriers.filter((barrier) =>
        fixedBarriers.has(barrier),
      ).length,
    0,
  );

  return Math.round((fixedCount / totalBarriers) * 100);
}

