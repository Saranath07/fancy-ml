# Active Ranking and Sequential Decision-Making

## Presentation contract

This is a cinematic React presentation, not a dashboard. The projected canvas may contain only photographs, poster art, icons, numbers, mathematical notation, and live visualizations. All explanatory language belongs in the speaker notes.

- **Canvas:** 16:9, edge-to-edge, near-black cinema palette with gold, electric cyan, and winner-red accents.
- **Motion:** Framer Motion for layout transitions; CSS 3D transforms for poster depth; SVG paths for brackets and probability flows; particles rendered with Canvas when the audience vote count is large.
- **Continuity:** Use `layoutId` so the same film poster physically travels from poll, to duel, to bracket, to posterior, and finally to the podium.
- **Visible text rule:** No sentences, captions, buttons, legends, or prose labels. Film titles may remain inside their original poster artwork. Equations and essential numbers are allowed.
- **Presenter controls:** Controls remain invisible until the pointer moves to the bottom edge. Keyboard: right arrow advances, left arrow reverses, space triggers the principal animation, and number keys select a film.
- **Reduced motion:** Replace camera moves, flashes, and particle bursts with 250 ms dissolves when `prefers-reduced-motion` is enabled.

## Asset manifest

Download or license these before implementation:

1. Five hero posters in matching 2:3 portrait crops: *Leo*, *Jailer*, *Maharaja*, *Amaran*, and *GOAT*.
2. Fifteen additional Tamil-film posters for the 20-film tournament, plus enough poster thumbnails to create a 100-film mosaic. Avoid duplicates.
3. One empty premium cinema auditorium photograph, photographed from the stage toward the audience.
4. Separate transparent overlays: projector cone, floating dust, stadium smoke, gold sparks, camera flash, and soft lens flare.
5. Audience silhouette layers in foreground, middle distance, and balcony depth.
6. Transparent SVG/PNG assets: trophy, crown, ballot token, film reel, golden ticket, wedding garland, airplane, graduation cap, and branching portal.
7. One licensed Stanford campus photograph or a generic elite-university campus if branding permission is unavailable.
8. One original illustrated couple shown from behind. Do not use actor likenesses or a still from *Oh My Kadavule* unless licensed.
9. Neutral visual icons for recommendation, search, and AI preference comparison. Avoid product screenshots and unnecessary brand marks.

---

## Slide 1 — Five films, one instinct

### Projected frame

Five full-height posters stand in a shallow arc on a reflective cinema floor. A dark audience is visible only as silhouettes and phone-screen glows. No title or prompt is shown.

### Animation and interaction

1. A projector flickers on and reveals the five posters sequentially.
2. A QR code can appear for five seconds without accompanying prose, then shrink into a corner.
3. Each audience vote becomes a small point of light that travels from the auditorium toward the selected poster.
4. The poster receives a soft pulse rather than an arcade-style explosion. A single numeric tally floats beneath it.
5. Do not declare a winner yet; preserve uncertainty for the next slide.

### Speaker notes

> “Choose the film you believe is best. Do not calculate; follow your first instinct.
>
> With only five alternatives, this feels natural. We remember performances, music, emotion, and personal taste, then make a decision almost immediately. Hold on to that feeling—because the same request becomes radically harder when the collection grows.”

### React blueprint

`<FiveFilmVote />`

State: `votesByFilm`, `selectedFilmBySession`, `pollOpen`, `audienceParticles`.

The vote endpoint must accept one anonymous vote per session. If no live backend exists, use a clearly marked presenter-only simulation mode; never present simulated votes as audience responses.

---

## Slide 2 — One hundred films, 4,950 relationships

### Projected frame

The five posters shrink backward into a 10-by-10 wall of 100 posters. Lines begin connecting every possible pair until the image becomes visually impossible to follow. Only the following equation remains crisp:

$$
\binom{100}{2}=\frac{100\cdot99}{2}=4950
$$

### Animation

- Begin with an orderly gallery.
- Accelerate the camera backward while connections accumulate.
- At 4,950 edges, briefly freeze the network, suppress the poster colors, and isolate the equation.
- Use progressive line aggregation rather than attempting to animate 4,950 DOM elements individually.

### Speaker notes

> “Now make the same decision across one hundred films.
>
> The difficulty is not merely that the screen is crowded. One hundred alternatives contain 4,950 possible pairwise relationships. A person cannot reliably hold that global comparison structure in working memory. If global ranking is overwhelming, we need a smaller unit of judgment.”

### React blueprint

`<FilmRelationshipExplosion />`

Use a single Canvas/WebGL layer for the edge field and DOM elements only for the posters that remain in focus.

---

## Slide 3 — The atomic judgment

### Projected frame

Ninety-eight posters fall into darkness. Two posters move forward into opposing pools of light. Between them:

$$
i\succ j\quad\big|\quad j\succ i
$$

### Animation and interaction

- Use restrained CSS perspective: posters lean inward by three degrees and return upright on hover.
- Audience votes travel as cyan or red particles toward the chosen side.
- The majority side brightens; the losing side remains visible rather than being destroyed.
- A close result produces two nearly equal light columns, foreshadowing uncertainty.

### Speaker notes

> “Instead of ranking everything, answer one local question: which of these two do you prefer?
>
> Pairwise comparison reduces a global cognitive burden to a direct relative judgment. It is not perfectly noiseless—taste can change and crowds can disagree—but it is much easier to answer consistently.”

### React blueprint

`<PairwiseCinemaArena />`

State: `leftFilm`, `rightFilm`, `votes`, `roundStatus`, `winner`, `confidencePulse`.

---

## Slide 4 — A tournament comes alive

### Projected frame

A realistic 20-film bracket surrounds a central cinema screen. Four preliminary matchups reduce the field to sixteen; the remaining rounds lead to one trophy. Only match scores and this total appear:

$$
20-1=19
$$

### Animation and interaction

1. Four preliminary duels illuminate first.
2. Winning posters physically travel along SVG bracket paths using shared layout transitions.
3. The arena view expands for the active matchup while the rest of the bracket dims.
4. Live audience particles enter glass vote chambers beneath both posters.
5. When voting closes, the winner advances and both films receive rating updates; elimination and rating are displayed as separate visual states.
6. The trophy is revealed only after all 19 matches are complete.

### Speaker notes

> “A 20-film single-elimination tournament needs 19 matches. It creates suspense, gives every comparison consequences, and guarantees one champion.
>
> We can also maintain ratings after each result, but the bracket and the rating system do different jobs. The bracket decides who survives. A rating attempts to summarize evidence accumulated across comparisons.”

### React blueprint

`<LiveFilmTournament />`

State: `matches`, `activeMatchId`, `bracketStage`, `ratings`, `audienceVotes`, `isPollOpen`.

Use a seeded schedule for reproducible demonstrations. Audience responses determine winners when the poll is live; seeded synthetic outcomes are permitted only in rehearsal mode.

---

## Slide 5 — What one upset destroys

### Projected frame

The apparent strongest film approaches the trophy. A narrow upset reverses one branch; the original future fractures and a different champion occupies the podium. Then the same matchup repeats as a strip of small trials with changing outcomes.

$$
P(i\succ j\mid\theta)
=
\frac{e^{\theta_i}}{e^{\theta_i}+e^{\theta_j}}
$$

### Animation

- Replay the decisive matchup several times with controlled stochastic variation.
- Let the champion change in some replays.
- Keep the stochastic transitions visually subtle: changing crowd particles, not a roulette-wheel effect.

### Speaker notes

> “A knockout identifies the winner of this particular path through the bracket. It does not necessarily identify the best film.
>
> Preference observations are noisy. Even if film $i$ has greater latent appeal than film $j$, $j$ can still win a particular poll. One early upset can permanently remove a strong candidate. The tournament is exciting precisely because it is fragile.”

### React blueprint

`<CounterfactualBracketReplay />`

The logistic probability is illustrative of a Bradley–Terry model; do not imply that observed audience vote share is automatically the fitted probability.

---

## Slide 6 — Evidence has a price

### Projected frame

The knockout bracket unfolds into every possible edge among 20 posters. A field of 190 faint match tokens appears. Ten solid gold tokens remain in the foreground.

$$
\binom{20}{2}=190
$$

$$
b=10
$$

### Animation

- Each hypothetical comparison consumes one faint token.
- The 190-token field recedes beyond the canvas.
- Ten gold tokens strike the floor one by one and remain tangible throughout the presentation.

### Speaker notes

> “Repeating and broadening comparisons would improve the evidence, but a complete round robin requires 190 distinct pairs even before repetition.
>
> Suppose the audience will answer only ten more questions. Every comparison now has an opportunity cost. The problem is no longer merely how to learn; it is how to decide what to learn next.”

### React blueprint

`<ComparisonBudget />`

State: `budgetRemaining`, `candidateEdges`, `queriedEdges`.

---

## Slide 7 — Belief before and after a vote

### Projected frame

Poster cards float above uncertain score distributions. One comparison arrives as a pulse; the probability landscape deforms and concentrates.

$$
\pi(\theta\mid D)
\propto
P(D\mid\theta)\,\pi(\theta)
$$

### Animation

- Begin with broad overlapping distributions.
- Pass the observed duel through the likelihood as a wave.
- Morph, rather than replace, the prior into the posterior.
- Keep uncertainty visible; one vote must not collapse the posterior unrealistically.

### Speaker notes

> “We represent uncertainty explicitly. The prior describes our beliefs about the films’ latent scores before the new result. The likelihood describes how compatible an observed preference is with possible scores. Their combination produces the posterior.
>
> A result moves belief; it does not turn uncertainty into certainty.”

### React blueprint

`<PosteriorLandscape />`

Use normalized samples or a low-dimensional illustrative density. If the implementation uses particles, call them posterior samples in the notes and render the empirical distribution honestly.

---

## Slide 8 — The irreversible fork

### Projected frame

An original illustrated couple stands at the center of a moonlit campus. A Stanford campus, airplane, and graduation cap form one future. A home, wedding garland, and local skyline form the other. Neither future is coded as good or bad.

$$
A\longleftarrow\Large\circ\longrightarrow B
$$

### Animation

1. Warm fragments of shared college life appear behind the couple.
2. An admission envelope enters from one side; the garland and family home emerge from the other.
3. The ground divides into two luminous paths.
4. Each future remains partly obscured by fog.
5. When she reaches toward one path, the other recedes, emphasizing irreversibility.

### Speaker notes

> “Imagine two students who have built a loving relationship through college. In their final year, she receives admission to Stanford for the degree she has dreamed about. At the same time, family circumstances make an immediate marriage seem like the only way to preserve the relationship.
>
> One path keeps her close to the relationship and begins a life at home. The other pursues her academic ambition abroad and places the relationship under profound uncertainty. Neither path guarantees happiness. She must choose while the consequences remain hidden.”

### React blueprint

`<IrreversibleLifeFork />`

Avoid a visual in which the man or either family physically blocks her. The decision must remain centered on her agency and uncertain future utility, not on a simplistic career-versus-love stereotype.

---

## Slide 9 — The golden-ticket lookahead

### Projected frame

A cosmic golden ticket descends between the two paths. It opens two portals. Each future contains a distribution of possible lifetime utility rather than a predetermined happy or tragic ending.

$$
U_A\sim P(U\mid A)
\qquad
U_B\sim P(U\mid B)
$$

### Animation

1. Travel down path $A$, reveal several possible outcomes, and rewind as gold particles flow backward.
2. Travel down path $B$, reveal its possible outcomes, and rewind again.
3. Fold both distributions toward the original decision point.
4. Transform the two portals into the two possible outcomes of a film comparison.

### Speaker notes

> “Now imagine an impossible boon, inspired by the emotional premise of *Oh My Kadavule*: a golden ticket that does not tell her the answer, but lets her explore possible futures and return before making the real decision.
>
> A computer performs a mathematical version of this fantasy. It can evaluate hypothetical branches before spending a real action. The analogy is not exact: $A$ and $B$ are choices, while the two branches in our ranking problem will be possible observations after choosing a query. What transfers is the discipline of looking ahead.”

### React blueprint

`<GoldenTicketLookahead />`

Use original artwork. Do not use a film still, actor likeness, deity representation, or recreated studio artwork without permission.

---

## Slide 10 — One question, two possible worlds

### Projected frame

The golden ticket becomes a candidate film pair. The canvas splits into two posterior futures:

$$
\pi
\longrightarrow
\begin{cases}
\pi^{ij+}, & i\succ j,\\[3pt]
\pi^{ij-}, & j\succ i.
\end{cases}
$$

The branches are weighted by:

$$
p_{ij}
=
\int P(i\succ j\mid\theta)\,\pi(\theta)\,d\theta,
\qquad
p_{ji}=1-p_{ij}.
$$

### Animation

- A pulse travels from the pair into both hypothetical outcomes.
- Each branch updates the full posterior landscape.
- Both branches grow another level to show that later queries can depend on the observed answer.
- The entire tree folds back to the root after evaluation.

### Speaker notes

> “If we ask whether $i$ beats $j$, we do not yet know the answer. We therefore examine both possible observations.
>
> Each observation has a posterior predictive probability, produces a different updated posterior, and changes which question should be asked afterward. Lookahead evaluates an adaptive policy, not a fixed list of future comparisons.”

### React blueprint

`<PosteriorBranchingWorlds />`

---

## Slide 11 — What winning means mathematically

### Projected frame

Each film poster receives a probability halo. One halo becomes the largest.

$$
q_i(\pi)
=
\int
\mathbf 1\!\left\{i=\arg\max_k\theta_k\right\}
\pi(\theta)\,d\theta
$$

$$
V_0(\pi)=\max_i q_i(\pi)
$$

### Animation

- Poster halos are built from posterior particles or density mass.
- The recommended film rises only slightly; competitors remain visible.
- The height of the podium reflects probability of correct selection, not an Elo score.

### Speaker notes

> “When the budget reaches zero, the algorithm must recommend one film. For each candidate, $q_i$ is the posterior probability that it truly has the greatest latent score. The terminal value $V_0$ is the confidence attached to the best available recommendation.
>
> This is different from an internal score estimate and different from a tournament win.”

### React blueprint

`<TerminalPCS />`

---

## Slide 12 — The Bellman choice

### Projected frame

The branching futures collapse into one central equation while candidate pairs orbit it:

$$
V_b(\pi)
=
\max_{i<j}
\left[
p_{ij}V_{b-1}(\pi^{ij+})
+
p_{ji}V_{b-1}(\pi^{ij-})
\right]
$$

### Animation

1. Evaluate several candidate pairs in parallel as miniature two-branch trees.
2. Their expected terminal values appear only as numbers.
3. The maximum pair absorbs one of the ten gold tokens.
4. A real audience vote arrives, one branch becomes reality, and $b$ decreases.
5. Repeat rapidly until the final token disappears.

### Speaker notes

> “For every candidate pair, the Bellman equation averages the value of its two possible posterior futures, weighted by their predictive probabilities. It then chooses the pair with the greatest expected terminal value.
>
> This is not generic information gain. The objective is specifically to maximize the probability of making the correct final recommendation after the remaining budget is spent. Under the chosen prior, preference model, action space, terminal objective, and exact recursion, this policy is Bayes-optimal.”

### React blueprint

`<BellmanPairSelector />`

For a live demonstration, precompute a small exact or approximate tree. If approximate inference or truncated search is used, disclose that in the speaker notes and never label the numerical implementation itself exact.

---

## Slide 13 — Ten questions later

### Projected frame

Replay the ten selected duels as a fast cinematic montage. The posterior halos stabilize; one film occupies the center of a restrained podium. Beside it:

$$
10\ll190
$$

### Animation

- Use match cuts between each selected pair.
- Let uncertainty contract gradually across the ten updates.
- End with the winning halo and its posterior probability, not a claim of certainty.
- Dissolve into three wordless visual echoes: a feed comparison, two search results, and two AI responses judged by a human silhouette.

### Speaker notes

> “The value of active sequential design is not that ten answers magically contain all 190 comparisons. It is that each question is chosen in light of everything already learned and in service of a precise final objective.
>
> Related pairwise-preference ideas appear in recommendation, ranking, and human-feedback systems. Those systems do not all use this exact Bellman policy, but they share the central insight: when judgments are expensive, deciding what to ask can matter as much as learning from the answer.”

### React blueprint

`<AdaptiveFinale />`

End in silence for two seconds before returning control to the presenter.
