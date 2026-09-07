import { SlideData } from '../types/presentation';

export const ACTIVE_LEARNING_SLIDES: SlideData[] = [
  {
    id: 1,
    title: 'Five films, one instinct',
    subtitle: 'Natural human judgment on small collections',
    speakerNotes: [
      "Choose the film you believe is best. Do not calculate; follow your first instinct.",
      "With only five alternatives, this feels natural. We remember performances, music, emotion, and personal taste, then make a decision almost immediately.",
      "Hold on to that feeling—because the same request becomes radically harder when the collection grows."
    ]
  },
  {
    id: 2,
    title: 'One hundred films, 4,950 relationships',
    subtitle: 'The combinatorial explosion of global ranking',
    mathSnippet: '\\binom{100}{2} = \\frac{100 \\times 99}{2} = 4,950',
    speakerNotes: [
      "Now make the same decision across one hundred films.",
      "The difficulty is not merely that the screen is crowded. One hundred alternatives contain 4,950 possible pairwise relationships.",
      "A person cannot reliably hold that global comparison structure in working memory. If global ranking is overwhelming, we need a smaller unit of judgment."
    ]
  },
  {
    id: 3,
    title: 'The atomic judgment',
    subtitle: 'Pairwise relative preference replaces absolute scoring',
    mathSnippet: 'i \\succ j \\quad \\big| \\quad j \\succ i',
    speakerNotes: [
      "Instead of ranking everything, answer one local question: which of these two do you prefer?",
      "Pairwise comparison reduces a global cognitive burden to a direct relative judgment.",
      "It is not perfectly noiseless—taste can change and crowds can disagree—but it is much easier to answer consistently."
    ]
  },
  {
    id: 4,
    title: 'A tournament comes alive',
    subtitle: 'Single-elimination structure with 19 matches and Elo updates',
    mathSnippet: '20 - 1 = 19 \\text{ matches}',
    speakerNotes: [
      "A 20-film single-elimination tournament needs 19 matches. It creates suspense, gives every comparison consequences, and guarantees one champion.",
      "We can also maintain ratings after each result, but the bracket and the rating system do different jobs.",
      "The bracket decides who survives. A rating attempts to summarize evidence accumulated across comparisons."
    ]
  },
  {
    id: 5,
    title: 'What one upset destroys',
    subtitle: 'Stochastic preferences and the fragility of knockouts',
    mathSnippet: 'P(i \\succ j \\mid \\theta) = \\frac{e^{\\theta_i}}{e^{\\theta_i} + e^{\\theta_j}} = \\sigma(\\theta_i - \\theta_j)',
    speakerNotes: [
      "A knockout identifies the winner of this particular path through the bracket. It does not necessarily identify the best film.",
      "Preference observations are noisy. Even if film i has greater latent appeal than film j, j can still win a particular poll (like an IPL off-day).",
      "One early upset can permanently remove a strong candidate. The tournament is exciting precisely because it is fragile."
    ]
  },
  {
    id: 6,
    title: 'Evidence has a price',
    subtitle: 'Round-robin costs vs. a strict comparison budget',
    mathSnippet: '\\binom{20}{2} = 190 \\quad \\gg \\quad b = 10',
    speakerNotes: [
      "Repeating and broadening comparisons would improve the evidence, but a complete round robin requires 190 distinct pairs even before repetition.",
      "Suppose the audience will answer only ten more questions. Every comparison now has an opportunity cost.",
      "The problem is no longer merely how to learn; it is how to decide what to learn next."
    ]
  },
  {
    id: 7,
    title: 'Belief before and after a vote',
    subtitle: 'Bayesian updating under pairwise preference evidence',
    mathSnippet: '\\pi(\\theta \\mid D) \\propto P(D \\mid \\theta)\\,\\pi(\\theta)',
    speakerNotes: [
      "We represent uncertainty explicitly. The prior describes our beliefs about the films' latent scores before the new result.",
      "The likelihood describes how compatible an observed preference is with possible scores. Their combination produces the posterior.",
      "A result moves belief; it does not turn uncertainty into certainty."
    ]
  },
  {
    id: 8,
    title: 'The irreversible fork',
    subtitle: 'Sequential decisions, hidden trajectories, and Bellman lookahead',
    mathSnippet: 'V_b(\\pi) = \\max_{i < j} \\left[ p_{ij} V_{b-1}(\\pi^{ij+}) + p_{ji} V_{b-1}(\\pi^{ij-}) \\right]',
    speakerNotes: [
      "A girl from a village near Madurai has always dreamed of becoming a pilot, looking up at airplanes from her terrace. Unable to afford flight school immediately, she joins a regular college on scholarship.",
      "There she meets an amazing classmate from Trichy. For four years, they share an unspoken, deep bond—caring for each other while keeping their feelings unconfessed due to family and clan barriers.",
      "Upon graduation, she earns a scholarship to fly abroad to the US for pilot training. At the airport departures gate, tears fall as they face an irreversible fork in their lives: if they don't communicate now, their life trajectories diverge forever.",
      "At this critical moment of decision under uncertainty, god pauses the world to offer lookahead—simulating the downstream consequences of confessing versus staying silent, mirroring the Bellman dynamic programming recursion."
    ]
  },
  {
    id: 9,
    title: 'The golden-ticket lookahead',
    subtitle: 'Simulating hypothetical branches before taking a real action',
    mathSnippet: 'U_A \\sim P(U \\mid A) \\qquad U_B \\sim P(U \\mid B)',
    speakerNotes: [
      "Now imagine an impossible boon, inspired by the emotional premise of Oh My Kadavule: a golden ticket that does not tell her the answer, but lets her explore possible futures and return before making the real decision.",
      "A computer performs a mathematical version of this fantasy. It can evaluate hypothetical branches before spending a real action.",
      "The analogy is not exact: A and B are choices, while the two branches in our ranking problem will be possible observations after choosing a query. What transfers is the discipline of looking ahead."
    ]
  },
  {
    id: 10,
    title: 'One question, two possible worlds',
    subtitle: 'Predictive probabilities and branching posterior futures',
    mathSnippet: '\\pi \\longrightarrow \\begin{cases} \\pi^{ij+}, & i \\succ j \\\\[3pt] \\pi^{ij-}, & j \\succ i \\end{cases} \\quad p_{ij} = \\int P(i \\succ j \\mid \\theta)\\,\\pi(\\theta)\\,d\\theta',
    speakerNotes: [
      "If we ask whether i beats j, we do not yet know the answer. We therefore examine both possible observations.",
      "Each observation has a posterior predictive probability, produces a different updated posterior, and changes which question should be asked afterward.",
      "Lookahead evaluates an adaptive policy, not a fixed list of future comparisons."
    ]
  },
  {
    id: 11,
    title: 'What winning means mathematically',
    subtitle: 'Probability of Correct Selection (PCS) and terminal value',
    mathSnippet: 'q_i(\\pi) = \\int \\mathbf{1}\\{i = \\arg\\max_k \\theta_k\\}\\,\\pi(\\theta)\\,d\\theta \\qquad V_0(\\pi) = \\max_i q_i(\\pi)',
    speakerNotes: [
      "When the budget reaches zero, the algorithm must recommend one film. For each candidate, q_i is the posterior probability that it truly has the greatest latent score.",
      "The terminal value V_0 is the confidence attached to the best available recommendation.",
      "This is different from an internal score estimate and different from a tournament win."
    ]
  },
  {
    id: 12,
    title: 'The Bellman choice',
    subtitle: 'Bayes-optimal sequential query selection under fixed budget',
    mathSnippet: 'V_b(\\pi) = \\max_{i < j} \\left[ p_{ij} V_{b-1}(\\pi^{ij+}) + p_{ji} V_{b-1}(\\pi^{ij-}) \\right]',
    speakerNotes: [
      "For every candidate pair, the Bellman equation averages the value of its two possible posterior futures, weighted by their predictive probabilities. It then chooses the pair with the greatest expected terminal value.",
      "This is not generic information gain. The objective is specifically to maximize the probability of making the correct final recommendation after the remaining budget is spent.",
      "Under the chosen prior, preference model, action space, terminal objective, and exact recursion, this policy is Bayes-optimal."
    ]
  },
  {
    id: 13,
    title: 'Ten questions later',
    subtitle: 'Adaptive sequential design and its frontier in modern AI',
    mathSnippet: '10 \\ll 190 \\quad \\implies \\quad \\text{Bayes-Optimal Active Selection}',
    speakerNotes: [
      "The value of active sequential design is not that ten answers magically contain all 190 comparisons. It is that each question is chosen in light of everything already learned and in service of a precise final objective.",
      "Related pairwise-preference ideas appear in recommendation, ranking, and human-feedback systems.",
      "Those systems do not all use this exact Bellman policy, but they share the central insight: when judgments are expensive, deciding what to ask can matter as much as learning from the answer."
    ]
  }
];
