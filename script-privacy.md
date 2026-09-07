# Privacy in AI — presenter script

## Presentation controls and visual contract

This privacy deck fills the browser viewport, including Mac aspect ratios. Press F to request browser fullscreen; browser chrome cannot be hidden automatically without a user gesture. Small page numbers run continuously from the talk opening through active learning and privacy. There are no progress bars or next/previous buttons. Use arrows or Space for reveals; N toggles notes on the same screen. Close notes before projecting. Open `/#privacy`; direct section links run from `/#privacy/1` through `/#privacy/14`.

ChatGPT uses a charcoal chat interface. Only the Netflix Prize and Netflix–IMDb linkage use Netflix styling. The demographic game, political question, coin tree, calculator and DP-SGD use the active-learning deck’s KaTeX_Main/Georgia font, cream/gold equations and dark teal background. The reference screenshots guide the interactions and content, not their typography or crowded layout.

## 1. When ChatGPT reveals contact information

Real basis: Nasr et al., November 2023, documented training-data extraction from ChatGPT (gpt-3.5-turbo). Their word-repetition attack produced memorized material including contact information. The projected chat is a reconstructed sequence; Arun Kumar, example.com and the masked number are fictional replacements, not a verbatim transcript or an actual Indian victim. Ask the room: imagine your contact details being returned to a stranger who asked only for a repeated word. Personal information can create privacy risk even if previously published online. Do not claim access to another user’s private chats, universal extraction, or that this historical prompt still works on current models. This is a historical training-data memorization example, not a live attack.

## 2. The million-dollar dataset

In October 2006, Netflix offered $1 million for a 10% improvement over Cinematch’s rating-prediction error, measured by RMSE. This was the DVD-rental era. Contestants received about 100 million ratings from roughly 480,000 subscribers, with movie IDs, stars and dates, and customer IDs replacing identities. A team won in 2009. Names were absent, but patterns remained. Narayanan and Shmatikov demonstrated linkage using outside information, including public IMDb ratings. The Tamil posters are a present-day teaching analogy, not films from the historical dataset and not a claim about today’s Netflix catalogue.

## 3. Link Netflix to IMDb

The historical Netflix Prize dataset did not contain review comments. This fictional teaching extension adds similar, differently worded comments on both platforms. Reveal public IMDb-style reviews, then highlight shared phrases: coffee shop fight, interval varaikkum, and last 20 minutes. Combine wording with movie, stars and date to link three films to movie_buff_chennai. Ask the audience to spot the clues before advancing. Similar wording alone is not proof of identity. The fourth rating is now associated with that public pseudonym. A pseudonym is not automatically a verified real identity. These films and dates are modern teaching data, not the historical competition dataset. Narayanan and Shmatikov demonstrated linkage with auxiliary information including IMDb. This miniature uses exact matches; real linkage can involve uncertainty.

## 4. Can you deanonymize this?

This is a separate fictional demographic linkage game, not the fields of the Netflix Prize dataset. The game uses a Sherlock-style evidence board with ten pinned anonymous case files. Select a named profile, then click a case file. Advancing reveals a red thread connecting the selected profile to the matching file. Give the room up to four minutes with the optional timer; pause or resume it as needed. Advance to reveal the correct mappings: Priya 01, Rahul 02, Suresh 03, Ananya 10, Vikram 09. Combining coarse attributes can identify a row and attach additional information to someone. All rows are invented. The result illustrates linkage, not a measured real-world attack success rate.

## 5. Did you vote for TVK?

Ask: “Neenga TVK-ku vote poteengala?” / “Did you vote for TVK?” This is a neutral question about past voting preference, not an endorsement or election prediction. Do not first ask for a public show of true preferences. Participation is optional; nobody reveals their true answer. First project only the question. Advance to acknowledge that it is private. Then reveal, on separate advances: the strategy heading alone; the first coin node; its two branches; the second coin branches. Branch lines draw before their labels fade in. Use physical fair coins privately. First coin: heads means report your true yes/no; tails means flip again, report yes on heads and no on tails. Never show or collect the coin path. For a room activity collect only final yes/no bits on identical folded slips, mix them, then count. The projector demonstrates a fictional participant; it does not collect audience secrets. An answer can come from either route.

## 6. Randomized response calculator

Begin with two blank count inputs. Reveal the statistics only after both contain valid counts; entering 12 YES reports among 40 responses illustrates the calculation. Expected forced-YES count is N/4 and expected truthful-route count is N/2, not observed counts. Estimate p by (Y-N/4)/(N/2), giving 10%. Enter aggregate counts from optional participation if available; never enter private truths. The calculator validates counts and preserves raw estimates outside [0,1] rather than silently clipping. The optional simulation creates 100 fictional people with exactly 30 true YES answers, independently randomizes their reports, and explicitly labels the result as simulation. Repeated simulations vary. This is an educational simulation, not a live political poll or certified privacy system.

## 7. The same answer. Two stories.

Write X for the private truth and Y for the released answer. A true yes gives a reported yes with probability 3/4; a true no gives it with probability 1/4. Reverse the columns for a reported no. The largest likelihood ratio, checking both answers and both private states, is 3. Therefore one report satisfies epsilon-local DP with epsilon = ln 3 and delta = 0. The report still conveys information. It multiplies prior odds by at most three; it does not guarantee a particular posterior probability or perfect secrecy. Repeated reports spend additional privacy.

## 8. With you. Without you.

Move from local randomization to a trusted curator running a randomized mechanism. Compare two datasets differing by the addition or removal of one person’s whole contribution. The mechanism should give similar output probabilities in either world. The curves illustrate overlap, not a proof: every output event must satisfy the DP inequality. Movie taste can still be learned at population level. The promise limits what one person’s participation changes; it does not erase facts already known from elsewhere.

## 9. A promise about probabilities

For every neighboring D and D-prime and every measurable output event S: P(M(D) in S) <= exp(epsilon) P(M(D-prime) in S) + delta. Neighboring here means add/remove one protected contribution. Epsilon bounds the multiplicative change, delta is additive slack; delta is not simply the chance that a person’s data leaks. Smaller epsilon is a stronger bound at fixed delta. The slider is a conceptual distribution illustration only, not a calibrated DP mechanism. More noise usually costs utility; no universal accuracy percentage follows. We now implement this idea inside familiar gradient descent.

## 10. Every viewer pulls the model

You already know gradient descent. For each sampled training unit i compute g_i = gradient_theta loss(theta; x_i). These arrows are individual gradients in a two-dimensional illustration of a high-dimensional parameter space. One unusually long arrow can dominate the average. First show its effect on the unprotected mean. To protect an entire viewer, x_i must represent the viewer’s contribution and clipping/sampling/accounting must operate at that user level. Clipping each rating separately only gives example-level protection under the matching adjacency.

## 11. Limit each pull

Clip every individual gradient before aggregation: g-bar_i = g_i / max(1, ||g_i||_2/C). Short arrows remain untouched; long arrows keep direction but shrink to radius C. This bounds one unit’s contribution to the sum by C under add/remove adjacency. Replace-one adjacency can give 2C sensitivity. Clipping alone is not differential privacy. Nor is clipping just the final batch-average gradient equivalent to per-unit clipping.

## 12. Blur the combined direction

Use Poisson sampling with inclusion probability q and public nominal batch size L = qN under the chosen sampling/accounting convention. Sum clipped gradients, add Gaussian noise Z_t with covariance sigma squared C squared I, then divide by L. Update theta by subtracting learning rate times this noisy average. Gaussian noise is in parameter/gradient space; the displayed two-dimensional cloud is illustrative. Sigma is the noise multiplier relative to C, not epsilon. Reuse no noise across steps. This is central DP: a trusted trainer still accesses the raw data. This presentation is not a production DP training implementation.

## 13. Privacy has a running total

Every step contributes privacy loss. A privacy accountant combines the actual sampling scheme and rate q, noise multiplier sigma, number of steps T, adjacency and target delta to report the total epsilon. Do not invent epsilon from the animation or treat it as per-step epsilon times nothing. Private tuning, validation releases and additional runs also need appropriate accounting. Define the protected unit explicitly: rating-level DP is not automatically viewer-level DP. The final model is a post-processing of the accounted private updates. Close: “Patterns-a kathukko; personal details-a illa.” Learn useful patterns while bounding individual influence. This bounds training/release inference risk; it does not promise zero leakage or secure raw-data storage.

## 14. Ask better. Reveal less.

Conclude with three everyday examples. Movie night: select the most useful next comparison instead of asking for every possible rating; if training on viewing data, define and bound the viewer contribution. AI assistants: useful feedback can guide learning, but memorized contact details illustrate why privacy needs attention. A private vote: randomized response preserves a noisy aggregate signal while limiting the information in one report. These are illustrative applications, not claims that Netflix or ChatGPT currently implements the depicted mechanisms. Active learning chooses informative queries. Anonymization alone can fail. Differential privacy bounds the effect of a protected contribution; DP-SGD implements this through per-unit clipping, Gaussian noise and accounting across training. Neither method eliminates uncertainty, and DP does not promise zero disclosure or protect insecure raw-data storage. Close: ask better questions, learn useful patterns, and limit what individuals reveal.

## Source links

- [Nasr et al. • ChatGPT training-data extraction (2023)](https://not-just-memorization.github.io/extracting-training-data-from-chatgpt.html)
- [OpenAI • March 20, 2023 incident](https://openai.com/index/march-20-chatgpt-outage/)
- [Netflix • 2009 prize announcement](https://www.vizio.com/en/press/2009/sep/NetflixAwards1MillionNetflixPrizeandAnnouncesSecond1MillionChallenge)
- [Narayanan & Shmatikov • de-anonymization](https://systems.cs.columbia.edu/private-systems-class/papers/Narayanan2008Robust.pdf)
- [Dwork & Roth • differential privacy](https://www.cis.upenn.edu/~aaroth/Papers/privacybook.pdf)
- [Abadi et al. • DP-SGD (2016)](https://arxiv.org/abs/1607.00133)
