import { motion } from 'framer-motion';
import { Film, MessageCircle, Vote, ArrowRight, ShieldCheck } from 'lucide-react';

const examples = [
  { icon:Film, place:'Movie night', ask:'One useful comparison', keep:'Bound each viewer’s influence', color:'gold' },
  { icon:MessageCircle, place:'Your AI assistant', ask:'Learn from useful feedback', keep:'Patterns, not personal details', color:'blue' },
  { icon:Vote, place:'A private vote', ask:'A randomized response', keep:'The group signal', color:'red' },
];
export function TalkConclusion() {
  return <div className="talk-conclusion"><span className="pa-case-kicker">BACK TO EVERYDAY LIFE</span><h1>Ask better.<br /><em>Reveal less.</em></h1><div className="conclusion-journey">{examples.map((e,i)=><motion.section key={e.place} className={`conclusion-stop conclusion-${e.color}`} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:i*.18}}><e.icon /><h2>{e.place}</h2><p>{e.ask}</p><ArrowRight className="conclusion-arrow" /><p>{e.keep}</p></motion.section>)}</div><motion.div className="conclusion-principle" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7,duration:.7}}><span>Active learning</span><ArrowRight /><span>Useful information</span><ShieldCheck /><span>Differential privacy</span></motion.div></div>;
}
