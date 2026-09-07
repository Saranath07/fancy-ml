export const BAYESIAN_LAYOUT_STAGE = 4;

export const advanceBayesianStage = (stage) => Math.min(stage + 1, BAYESIAN_LAYOUT_STAGE);

export const retreatBayesianStage = (stage) => Math.max(stage - 1, 0);
