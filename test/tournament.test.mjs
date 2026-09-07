import test from 'node:test';
import assert from 'node:assert/strict';
import { createTournament, chooseWinner } from '../src/lib/tournament.js';
import { advanceBayesianStage, retreatBayesianStage } from '../src/lib/bayesian-stage.js';

const films = ['a', 'b', 'c', 'd'].map((id) => ({ id }));
const keepOrder = (items) => [...items];

test('the chosen film advances until a champion remains', () => {
  let tournament = createTournament(films, keepOrder);

  tournament = chooseWinner(tournament, 'a', keepOrder);
  assert.equal(tournament.round, 1);
  assert.equal(tournament.queue.length, 1);

  tournament = chooseWinner(tournament, 'c', keepOrder);
  assert.equal(tournament.round, 2);
  assert.deepEqual(tournament.queue[0].map((film) => film.id), ['a', 'c']);

  tournament = chooseWinner(tournament, 'c', keepOrder);
  assert.equal(tournament.champion.id, 'c');
  assert.equal(tournament.queue.length, 0);
});

test('the Bayesian scene reveals one image at a time before the four-image layout', () => {
  assert.equal(advanceBayesianStage(0), 1);
  assert.equal(advanceBayesianStage(1), 2);
  assert.equal(advanceBayesianStage(2), 3);
  assert.equal(advanceBayesianStage(3), 4);
  assert.equal(advanceBayesianStage(4), 4);
  assert.equal(retreatBayesianStage(4), 3);
});
