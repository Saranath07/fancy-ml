import { motion, useReducedMotion } from 'framer-motion';

export function TalkOpening() {
  const reduced = useReducedMotion();
  return <section className="talk-opening" aria-label="What AI Asks. What AI Keeps. Presented by Saranath P">
    <div className="talk-light talk-light-gold" /><div className="talk-light talk-light-blue" />
    <svg className="talk-constellation" viewBox="0 0 700 700" aria-hidden="true">
      <defs><linearGradient id="talk-thread"><stop stopColor="#f8d37a"/><stop offset="1" stopColor="#8bc9cd"/></linearGradient></defs>
      {[140,220,300].map(r=><circle key={r} cx="350" cy="350" r={r} fill="none" stroke="#eee6d5" strokeOpacity=".07" />)}
      {Array.from({length:24},(_,i)=>{const angle=i*2.39996;const r=110+(i%5)*38;const x=350+Math.cos(angle)*r;const y=350+Math.sin(angle)*r;return <g key={i}>
        {i%3===0&&<motion.path d={`M350 350 Q${350+(x-350)*.2} ${y} ${x} ${y}`} stroke="url(#talk-thread)" strokeWidth="1" fill="none" initial={{pathLength:reduced?1:0,opacity:0}} animate={{pathLength:1,opacity:.22}} transition={{duration:reduced?0:2.8,delay:reduced?0:i*.055}}/>}
        <motion.circle cx={x} cy={y} r={i%3===0?3.5:2} fill={i%2?'#8bc9cd':'#f8d37a'} initial={{opacity:0}} animate={{opacity:reduced?.55:[.25,.65,.25]}} transition={{duration:reduced?0:6+i%4,repeat:reduced?0:Infinity,delay:reduced?0:i*.08}}/>
      </g>;})}
      <circle cx="350" cy="350" r="7" fill="#f8d37a"/><circle cx="350" cy="350" r="20" fill="none" stroke="#f8d37a" strokeOpacity=".3"/>
    </svg>
    <div className="talk-title-block">
      <motion.p className="talk-eyebrow" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.9}}>ACTIVE LEARNING × PRIVACY</motion.p>
      <h1><motion.span initial={{opacity:0,y:reduced?0:14}} animate={{opacity:1,y:0}} transition={{duration:1,delay:.15}}>What AI <em>Asks.</em></motion.span><motion.span initial={{opacity:0,y:reduced?0:14}} animate={{opacity:1,y:0}} transition={{duration:1,delay:.4}}>What AI <em>Keeps.</em></motion.span></h1>
      <motion.p className="talk-subtitle" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:.85}}>Learning smarter. Revealing less.</motion.p>
    </div>
    <motion.div className="talk-speaker" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:1.05}}><div><strong>Saranath P</strong><p>MS (by Research), Dept. of Data Science and AI</p><span>IIT Madras</span></div></motion.div>
  </section>;
}
