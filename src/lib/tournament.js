const pair = (films) => films.reduce((matches, film, index) => {
  if (index % 2 === 0) matches.push([film]);
  else matches[matches.length - 1].push(film);
  return matches;
}, []);

export const shuffle = (items) => {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [next[index], next[target]] = [next[target], next[index]];
  }
  return next;
};

export const createTournament = (films, arrange = shuffle) => {
  if (films.length < 2 || (films.length & (films.length - 1)) !== 0) {
    throw new Error('A knockout tournament requires a power-of-two field.');
  }

  return {
    round: 1,
    queue: pair(arrange(films)),
    winners: [],
    history: [],
    champion: null
  };
};

export const chooseWinner = (state, winnerId, arrange = shuffle) => {
  if (state.champion || state.queue.length === 0) return state;

  const [current, ...remaining] = state.queue;
  const winner = current.find((film) => film.id === winnerId);
  if (!winner) throw new Error('The selected film is not in the active duel.');

  const winners = [...state.winners, winner];
  const history = [...state.history, { round: state.round, pair: current, winner }];

  if (remaining.length > 0) {
    return { ...state, queue: remaining, winners, history };
  }

  if (winners.length === 1) {
    return { ...state, queue: [], winners: [], history, champion: winners[0] };
  }

  return {
    ...state,
    round: state.round + 1,
    queue: pair(arrange(winners)),
    winners: [],
    history
  };
};
