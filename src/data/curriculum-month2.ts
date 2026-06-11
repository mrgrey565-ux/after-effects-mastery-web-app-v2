import type { CurriculumDay } from '../types';

export const month2Days: CurriculumDay[] = [
  // WEEK 5
  {
    day: 31, month: 2, week: 5,
    focus: 'Timing, Spacing, Anticipation, Overshoot',
    goal: 'Understand why animation feels professional.',
    consume: [
      'Animation principles for motion graphics',
      'Timing and spacing explained',
      'Anticipation and overshoot tutorial'
    ],
    platforms: ['YouTube', 'School of Motion', 'Motion Design School'],
    searchKeywords: [
      'After Effects animation principles timing spacing',
      'After Effects anticipation overshoot tutorial',
      'motion graphics timing spacing tutorial'
    ],
    recreate: 'Animate a title with anticipation, overshoot, settle.',
    variation: 'Create soft, snappy, and elastic timing versions.',
    output: '3 timing tests.',
    reflectionPrompts: [
      'Which timing feels most premium?',
      'What is the difference between overshoot and bounce?',
      'How does anticipation change viewer expectation?'
    ],
    tools: ['Keyframes', 'Easing', 'Timing', 'Spacing'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 32, month: 2, week: 5,
    focus: 'Graph Editor Deep Practice',
    goal: 'Control speed intentionally.',
    consume: [
      'Speed graph advanced beginner/intermediate lessons',
      'Professional easing curves tutorial'
    ],
    platforms: ['YouTube', 'School of Motion'],
    searchKeywords: [
      'After Effects graph editor advanced beginner',
      'After Effects speed graph professional motion',
      'After Effects easing curves tutorial'
    ],
    recreate: 'Animate 5 objects with different speed curves.',
    variation: 'Match one professional reference\'s movement.',
    output: 'Easing study board.',
    reflectionPrompts: [
      'Which curve made motion feel expensive?',
      'What is the relationship between speed and emotional tone?',
      'How do you read the speed graph to predict how motion will feel?'
    ],
    tools: ['Speed graph', 'Influence handles', 'Spatial interpolation'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 33, month: 2, week: 5,
    focus: 'Motion Blur, Frame Rate, Shutter Angle',
    goal: 'Make fast motion feel natural.',
    consume: [
      'Motion blur and shutter angle explained',
      'Frame rate choice explained'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects motion blur shutter angle tutorial',
      'After Effects frame rate motion blur explained',
      'motion blur professional animation After Effects'
    ],
    recreate: 'Fast transition with and without motion blur.',
    variation: 'Try subtle, normal, and exaggerated blur.',
    output: 'Motion blur comparison.',
    reflectionPrompts: [
      'When does blur become too much?',
      'What shutter angle feels most cinematic?',
      'How does frame rate affect the editing feel?'
    ],
    tools: ['Motion blur', 'Composition settings', 'Shutter angle'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 34, month: 2, week: 5,
    focus: 'Spatial Paths and Motion Arcs',
    goal: 'Avoid mechanical straight-line movement.',
    consume: [
      'Motion path tutorial',
      'Bezier handles explained',
      'Animation arcs principle'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects motion path tutorial',
      'After Effects bezier motion path',
      'animation arcs After Effects'
    ],
    recreate: 'Animate object along curved path with natural easing.',
    variation: 'Create playful bounce path and premium smooth path.',
    output: 'Motion path study.',
    reflectionPrompts: [
      'How do arcs improve motion?',
      'What real-world physics do arcs reference?',
      'Which path felt most satisfying to watch?'
    ],
    tools: ['Motion paths', 'Spatial interpolation', 'Bezier handles'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 35, month: 2, week: 5,
    focus: 'Advanced Parenting and Rigging Basics',
    goal: 'Build reusable controls.',
    consume: [
      'Null rigging tutorial',
      'Parent chain workflow',
      'Slider control rig tutorial'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects rigging with nulls beginner',
      'After Effects parent chain tutorial',
      'After Effects slider control rig tutorial'
    ],
    recreate: 'Create a simple UI card rig controlled by null/slider.',
    variation: 'Add color or scale controls.',
    output: 'Reusable card animation rig.',
    reflectionPrompts: [
      'What should be controlled by nulls?',
      'How does a rig save time on repeated animations?',
      'What would you build a rig for in your own projects?'
    ],
    tools: ['Nulls', 'Parenting', 'Effect controls', 'Sliders'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 36, month: 2, week: 5,
    focus: 'Mini Project 5: Animation Principles Pack',
    goal: 'Create a polished motion graphics bumper.',
    consume: [
      '5 clean motion design references',
      'Professional logo reveal examples'
    ],
    platforms: ['Behance', 'Dribbble', 'YouTube'],
    searchKeywords: [
      'smooth motion graphics bumper After Effects',
      'professional logo reveal animation After Effects',
      'motion design easing inspiration'
    ],
    recreate: '8–12 sec bumper using anticipation, arcs, overshoot, motion blur.',
    variation: 'Make minimal and high-energy versions.',
    output: 'Weekly project.',
    reflectionPrompts: [
      'Which principle improved the edit most?',
      'Did the motion feel natural or mechanical?',
      'What would you show this bumper to?'
    ],
    tools: ['Animation principles', 'Graph editor', 'Motion blur'],
    estimatedMinutes: 90,
    difficulty: 3,
    isWeeklyProject: true
  },
  {
    day: 37, month: 2, week: 5,
    focus: 'Week 5 Review: Upgrade Weak Animations',
    goal: 'Upgrade weak animations from previous work.',
    consume: [
      'Review your own exports',
      '5 professional motion references'
    ],
    platforms: ['YouTube', 'Behance', 'Dribbble'],
    searchKeywords: [
      'motion graphics animation critique',
      'how to improve easing After Effects',
      'professional motion graphics timing'
    ],
    recreate: 'Rework one old Month 1 animation with Month 2 timing.',
    variation: 'Export before/after.',
    output: 'Upgrade comparison.',
    reflectionPrompts: [
      'What changed after better graph editing?',
      'Which old animation embarrasses you most now?',
      'What is the single biggest timing improvement you can make?'
    ],
    tools: ['Critique', 'Graph editor', 'Revision'],
    estimatedMinutes: 75,
    difficulty: 2,
    isReviewDay: true
  },

  // WEEK 6
  {
    day: 38, month: 2, week: 6,
    focus: 'Text Animator Deep Dive',
    goal: 'Control letters/words/lines with range selectors.',
    consume: [
      'Text animator properties deep dive',
      'Range selector tutorial',
      'Offset and advanced mode'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects text animator range selector tutorial',
      'After Effects advanced text animation tutorial',
      'After Effects kinetic typography range selector'
    ],
    recreate: 'Letter-by-letter and word-by-word kinetic title.',
    variation: 'Make clean corporate and aggressive viral versions.',
    output: 'Text animator study.',
    reflectionPrompts: [
      'What is faster: manual keyframes or text animators?',
      'How does the range selector create staggered animation?',
      'What text animator properties feel most useful?'
    ],
    tools: ['Text animators', 'Range selector', 'Offset'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 39, month: 2, week: 6,
    focus: 'Kinetic Typography to Voice/Beat',
    goal: 'Sync typography to audio.',
    consume: [
      'Audio markers workflow',
      'Waveform and beat detection',
      'Beat/voice timing tutorial'
    ],
    platforms: ['YouTube', 'TikTok/Reels'],
    searchKeywords: [
      'After Effects kinetic typography audio sync',
      'After Effects animate text to voice',
      'After Effects audio markers tutorial'
    ],
    recreate: 'Animate 10–15 seconds of spoken quote/voiceover text.',
    variation: 'Highlight power words with scale/color changes.',
    output: 'Voice-synced kinetic type.',
    reflectionPrompts: [
      'Did text appear before, on, or after the sound?',
      'How much does timing precision affect professional feel?',
      'What audio-driven animation could you apply to transitions?'
    ],
    tools: ['Audio waveform', 'Markers', 'Text timing'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 40, month: 2, week: 6,
    focus: 'Layout, Hierarchy, and Design Basics for Editors',
    goal: 'Improve visual design quality.',
    consume: [
      'Typography hierarchy for video',
      'Spacing and alignment principles',
      'Contrast and readability'
    ],
    platforms: ['YouTube', 'Behance', 'Canva design school'],
    searchKeywords: [
      'motion graphics layout hierarchy',
      'typography hierarchy for video editors',
      'After Effects title design tutorial'
    ],
    recreate: 'Create 3 title layouts for same message.',
    variation: 'Luxury, tech, and bold creator styles.',
    output: 'Design style board.',
    reflectionPrompts: [
      'Which layout is clearest on mobile?',
      'What design principle had the biggest visual impact?',
      'How does typography hierarchy guide attention?'
    ],
    tools: ['Typography', 'Alignment', 'Composition', 'Contrast'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 41, month: 2, week: 6,
    focus: 'Modern Caption Systems',
    goal: 'Build repeatable caption templates.',
    consume: [
      'Caption styles overview',
      'Highlight word systems',
      'Safe margins and readability'
    ],
    platforms: ['YouTube', 'TikTok/Reels'],
    searchKeywords: [
      'After Effects caption template tutorial',
      'After Effects animated subtitles template',
      'viral captions After Effects tutorial'
    ],
    recreate: 'Create reusable caption precomp with highlight word style.',
    variation: '3 presets: clean, podcast, viral.',
    output: 'Caption template v1.',
    reflectionPrompts: [
      'How will you reuse this later?',
      'What makes a caption system scalable?',
      'Which preset would work for the most types of content?'
    ],
    tools: ['Precomps', 'Text styles', 'Safe areas'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 42, month: 2, week: 6,
    focus: 'Brand Style System in AE',
    goal: 'Create consistent style rules.',
    consume: [
      'Brand motion system tutorial',
      'Color palette in motion graphics',
      'Reusable component workflow'
    ],
    platforms: ['YouTube', 'Behance', 'Dribbble'],
    searchKeywords: [
      'After Effects brand motion system',
      'motion graphics style frames tutorial',
      'After Effects reusable motion graphics template'
    ],
    recreate: 'Build a mini brand kit: colors, font choices, lower third, title card, CTA.',
    variation: 'Create alternate dark/light version.',
    output: 'Personal motion kit v1.',
    reflectionPrompts: [
      'What style do you want to be known for?',
      'How consistent are your current projects visually?',
      'What brand kit elements would you use every day?'
    ],
    tools: ['Style planning', 'Precomps', 'Templates'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 43, month: 2, week: 6,
    focus: 'Mini Project 6: Typography Reel Segment',
    goal: 'Create a 15–20 sec typography-led edit.',
    consume: [
      '5 kinetic typography reel examples'
    ],
    platforms: ['YouTube', 'Behance', 'Instagram/TikTok'],
    searchKeywords: [
      'kinetic typography reel After Effects',
      'fast text animation After Effects',
      'motion typography social edit'
    ],
    recreate: '15–20 sec text-led edit with voice/beat sync and captions.',
    variation: 'Make a second version with different design system.',
    output: 'Weekly typography project.',
    reflectionPrompts: [
      'Is it readable, rhythmic, and stylish?',
      'Which version would perform better on social media?',
      'What typography technique became your favorite this week?'
    ],
    tools: ['Kinetic type', 'Captions', 'Layout', 'Sound'],
    estimatedMinutes: 90,
    difficulty: 3,
    isWeeklyProject: true
  },
  {
    day: 44, month: 2, week: 6,
    focus: 'Week 6 Review: Typography and Caption Polish',
    goal: 'Clean up typography and create reusable presets.',
    consume: [
      'Review your captions on mobile size',
      'Typography critique resources'
    ],
    platforms: ['YouTube', 'Behance'],
    searchKeywords: [
      'how to make captions readable mobile',
      'motion typography critique',
      'After Effects text animation mistakes'
    ],
    recreate: 'Improve one caption/type project.',
    variation: 'Export square, vertical, and horizontal layout tests.',
    output: 'Type/caption improvement pack.',
    reflectionPrompts: [
      'What style should become your default?',
      'What typography mistakes do you keep repeating?',
      'How does your typography look at arm\'s length on a phone?'
    ],
    tools: ['Review', 'Responsive layouts', 'Typography refinement'],
    estimatedMinutes: 75,
    difficulty: 2,
    isReviewDay: true
  },

  // WEEK 7
  {
    day: 45, month: 2, week: 7,
    focus: 'Built-In Effects Map',
    goal: 'Know useful built-in effects and when to use them.',
    consume: [
      'Overview of best built-in AE effects',
      'CC effects overview',
      'Displacement and distortion effects'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'best built in effects After Effects',
      'After Effects effects every editor should know',
      'After Effects no plugins effects tutorial'
    ],
    recreate: 'Create 5 micro looks using built-in effects only.',
    variation: 'Label each look and save as presets/project.',
    output: 'Effects lookbook v1.',
    reflectionPrompts: [
      'Which effects are most reusable?',
      'What effects can replace expensive plugins?',
      'Which effect surprised you with its versatility?'
    ],
    tools: ['Built-in effects', 'Effect controls', 'Presets'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 46, month: 2, week: 7,
    focus: 'Fractal Noise and Procedural Textures',
    goal: 'Generate texture, smoke, energy, maps.',
    consume: [
      'Fractal Noise deep dive',
      'Turbulent Noise tutorial',
      'Blending procedural textures'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects fractal noise tutorial',
      'After Effects procedural texture tutorial',
      'After Effects smoke energy fractal noise'
    ],
    recreate: 'Create animated texture background and energy matte.',
    variation: 'Tech, grunge, cinematic versions.',
    output: 'Procedural texture pack.',
    reflectionPrompts: [
      'How can textures improve flat motion graphics?',
      'What makes procedural textures different from static textures?',
      'Which texture style fits your design direction?'
    ],
    tools: ['Fractal Noise', 'Blending modes', 'Masks/mattes'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 47, month: 2, week: 7,
    focus: 'Displacement, Turbulent Displace, Glitch',
    goal: 'Create modern distortion effects.',
    consume: [
      'Displacement Map tutorial',
      'Turbulent Displace workflow',
      'Glitch effect without plugins'
    ],
    platforms: ['YouTube', 'TikTok/Reels'],
    searchKeywords: [
      'After Effects displacement map tutorial',
      'After Effects turbulent displace transition',
      'After Effects glitch effect no plugins'
    ],
    recreate: 'Glitch text reveal and displacement transition.',
    variation: 'Subtle premium distortion and intense cyber glitch.',
    output: 'Glitch/distortion pack.',
    reflectionPrompts: [
      'When does glitch become distracting?',
      'What makes distortion feel intentional vs accidental?',
      'What content genre fits glitch effects best?'
    ],
    tools: ['Displacement Map', 'Turbulent Displace', 'Glitch stack'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 48, month: 2, week: 7,
    focus: 'Zoom, Whip, Spin, Light-Leak Transitions',
    goal: 'Build a reusable transition toolkit.',
    consume: [
      'Transition pack tutorial (no plugins)',
      'Light leak transition technique'
    ],
    platforms: ['YouTube', 'TikTok/Reels'],
    searchKeywords: [
      'After Effects transition pack tutorial no plugins',
      'After Effects zoom whip spin transition',
      'After Effects light leak transition tutorial'
    ],
    recreate: '4 transitions: zoom, whip, spin, light leak/color flash.',
    variation: 'Sync transitions to beat markers.',
    output: 'Transition toolkit v2.',
    reflectionPrompts: [
      'Which transition is best for short-form edits?',
      'How does beat syncing change transition impact?',
      'Which transitions feel overused on social media?'
    ],
    tools: ['Transform', 'Blur', 'Motion Tile', 'Adjustment layers'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 49, month: 2, week: 7,
    focus: 'Speed Ramps and Impact Moments',
    goal: 'Create attention-grabbing edit beats.',
    consume: [
      'Speed ramp tutorial',
      'Impact frame and shake effect',
      'Sound hit syncing'
    ],
    platforms: ['YouTube', 'TikTok/Reels'],
    searchKeywords: [
      'After Effects speed ramp impact tutorial',
      'After Effects impact frame edit',
      'After Effects camera shake hit effect'
    ],
    recreate: 'Clip with speed ramp + impact hit + text punch.',
    variation: 'Make cinematic and viral versions.',
    output: 'Impact moment study.',
    reflectionPrompts: [
      'Did the effect support the story or just decorate?',
      'What is the right frequency of impact moments in an edit?',
      'How does the speed before impact affect the hit\'s power?'
    ],
    tools: ['Time Remap', 'Shake', 'Flash', 'Audio sync'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 50, month: 2, week: 7,
    focus: 'Mini Project 7: Social Edit / Hype Edit',
    goal: 'Combine transitions, effects, typography, sound.',
    consume: [
      '5 viral/hype edits with pacing breakdown'
    ],
    platforms: ['TikTok', 'Instagram', 'YouTube'],
    searchKeywords: [
      'After Effects hype edit tutorial',
      'After Effects viral reels edit breakdown',
      'After Effects fast transitions social edit'
    ],
    recreate: '15–25 sec vertical social edit with 4–6 cuts and sound design.',
    variation: 'Create slower premium version.',
    output: 'Weekly social edit.',
    reflectionPrompts: [
      'Which version has better retention?',
      'At what point did you feel the edit was "done"?',
      'What would make this go viral vs just look good?'
    ],
    tools: ['Effects stacks', 'Transitions', 'Sound', 'Captions'],
    estimatedMinutes: 90,
    difficulty: 3,
    isWeeklyProject: true
  },
  {
    day: 51, month: 2, week: 7,
    focus: 'Week 7 Review: Build Transition/Effect Library',
    goal: 'Save reusable transition/effect systems.',
    consume: [
      'Review your transitions frame-by-frame',
      'Effects stack breakdown examples'
    ],
    platforms: ['YouTube', 'Behance'],
    searchKeywords: [
      'After Effects transition mistakes',
      'video edit pacing critique',
      'motion graphics effects stack breakdown'
    ],
    recreate: 'Improve 2 transitions and save project as reusable library.',
    variation: 'Make thumbnails/previews for each transition.',
    output: 'Personal transition library v1.',
    reflectionPrompts: [
      'Which effects are becoming overused?',
      'What transitions define your current style?',
      'How do you decide when a transition is overused in an edit?'
    ],
    tools: ['Library building', 'Critique', 'Reuse'],
    estimatedMinutes: 75,
    difficulty: 2,
    isReviewDay: true
  },

  // WEEK 8
  {
    day: 52, month: 2, week: 8,
    focus: 'Motion Tracking Intermediate',
    goal: 'Improve tracking accuracy.',
    consume: [
      'Good track point selection guide',
      'Stabilize vs track explained',
      'Attach null to track tutorial'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects motion tracking tips',
      'After Effects stabilize motion tutorial',
      'After Effects tracking null object tutorial'
    ],
    recreate: 'Track a moving object and attach label/callout.',
    variation: 'Add shadow, blur, and perspective scale.',
    output: 'Better tracked callout.',
    reflectionPrompts: [
      'What caused tracking drift?',
      'What makes a good tracking point?',
      'When should you use stabilization instead of tracking?'
    ],
    tools: ['Tracker', 'Nulls', 'Stabilization', 'Callouts'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 53, month: 2, week: 8,
    focus: 'Mocha AE Planar Tracking Intermediate',
    goal: 'Track surfaces more reliably.',
    consume: [
      'Planar tracking in Mocha AE',
      'Spline setup workflow',
      'Export tracking data to AE'
    ],
    platforms: ['YouTube', 'Boris FX/Mocha resources', 'Adobe Help'],
    searchKeywords: [
      'Mocha AE planar tracking tutorial',
      'Mocha AE export tracking data After Effects',
      'Mocha AE screen replacement tips'
    ],
    recreate: 'Replace a screen/sign/poster with perspective movement.',
    variation: 'Add reflections, blur, grain, color match.',
    output: 'Realistic planar composite.',
    reflectionPrompts: [
      'Why is planar tracking different from point tracking?',
      'What surface properties make planar tracking easier?',
      'How would you handle a partially occluded tracking target?'
    ],
    tools: ['Mocha AE', 'Planar tracking', 'Corner pin'],
    estimatedMinutes: 75,
    difficulty: 4
  },
  {
    day: 54, month: 2, week: 8,
    focus: 'Roto Brush Intermediate and Matte Cleanup',
    goal: 'Create cleaner cutouts.',
    consume: [
      'Refine Edge workflow',
      'Matte controls explained',
      'Edge chatter fixes'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects Roto Brush refine edge tutorial',
      'After Effects roto brush clean edges',
      'After Effects matte cleanup tutorial'
    ],
    recreate: 'Roto a person/object for 5–8 seconds.',
    variation: 'Add background replacement and light wrap/fake rim light.',
    output: 'Roto composite.',
    reflectionPrompts: [
      'What edge problems appeared?',
      'What is light wrap and why does it help?',
      'What footage would make roto faster and cleaner?'
    ],
    tools: ['Roto Brush', 'Refine Edge', 'Matte cleanup'],
    estimatedMinutes: 75,
    difficulty: 4
  },
  {
    day: 55, month: 2, week: 8,
    focus: 'Green Screen / Keylight Basics',
    goal: 'Key footage and integrate subject.',
    consume: [
      'Keylight workflow tutorial',
      'Screen matte controls',
      'Spill suppression techniques'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects Keylight green screen beginner',
      'After Effects remove green screen tutorial',
      'After Effects green screen spill suppression'
    ],
    recreate: 'Key a green-screen clip and place subject in new background.',
    variation: 'Add color match, shadow, blur, grain.',
    output: 'Keyed composite.',
    reflectionPrompts: [
      'What makes a key look fake?',
      'What lighting conditions make green screen keying easier?',
      'How does spill suppression affect skin tones?'
    ],
    tools: ['Keylight', 'Screen matte', 'Spill suppression'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 56, month: 2, week: 8,
    focus: 'Camera Tracker and 3D Text in Footage',
    goal: 'Place text/objects into real camera movement.',
    consume: [
      '3D Camera Tracker explained',
      'Placing 3D text on surfaces',
      'Camera tracking tips'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects 3D camera tracker beginner',
      'After Effects place 3D text in footage',
      'After Effects camera tracking tutorial'
    ],
    recreate: 'Track footage and place 3D text on a surface.',
    variation: 'Add shadow, grain, motion blur, color match.',
    output: '3D tracked text shot.',
    reflectionPrompts: [
      'What footage works best for camera tracking?',
      'How does parallax in the shot affect tracking quality?',
      'What detail sold the 3D integration most?'
    ],
    tools: ['3D Camera Tracker', '3D text/layers', 'Compositing'],
    estimatedMinutes: 75,
    difficulty: 4
  },
  {
    day: 57, month: 2, week: 8,
    focus: 'Mini Project 8: VFX/Composite Shot',
    goal: 'Create one believable VFX-style shot.',
    consume: [
      '3 VFX/composite breakdowns'
    ],
    platforms: ['YouTube', 'Video Copilot', 'Adobe Help'],
    searchKeywords: [
      'After Effects VFX breakdown beginner',
      'After Effects compositing shot tutorial',
      'After Effects screen replacement roto tracking project'
    ],
    recreate: '8–12 sec shot using tracking or roto or keying + compositing details.',
    variation: 'Realistic version and stylized version.',
    output: 'Weekly VFX/composite shot.',
    reflectionPrompts: [
      'Which detail sold the composite most?',
      'What would a professional VFX artist critique first?',
      'Realistic or stylized — which was more satisfying to make?'
    ],
    tools: ['Tracking', 'Roto/keying', 'Compositing', 'Color match'],
    estimatedMinutes: 90,
    difficulty: 4,
    isWeeklyProject: true
  },
  {
    day: 58, month: 2, week: 8,
    focus: 'Week 8 Review: Composite Realism Diagnosis',
    goal: 'Diagnose realism issues in composites.',
    consume: [
      'Compositing realism critique resources',
      'Common compositing mistakes breakdown'
    ],
    platforms: ['YouTube', 'Video Copilot', 'Adobe resources'],
    searchKeywords: [
      'After Effects compositing mistakes',
      'VFX compositing color match shadows grain',
      'how to make composite realistic After Effects'
    ],
    recreate: 'Improve one composite with shadows, grain, blur, color match.',
    variation: 'Export before/after.',
    output: 'Composite improvement comparison.',
    reflectionPrompts: [
      'What repeated issue do your composites have?',
      'Which realism element is hardest to fake?',
      'What is your compositing workflow now?'
    ],
    tools: ['Critique', 'Realism pass', 'Revision'],
    estimatedMinutes: 75,
    difficulty: 3,
    isReviewDay: true
  },

  // WEEK 9
  {
    day: 59, month: 2, week: 9,
    focus: 'Expressions: Looping, Wiggle, Time, ValueAtTime',
    goal: 'Automate common animation behavior.',
    consume: [
      'Intermediate expression examples',
      'valueAtTime and time expressions',
      'Looping and wiggle control'
    ],
    platforms: ['YouTube', 'Adobe docs'],
    searchKeywords: [
      'After Effects expressions loopOut wiggle time valueAtTime',
      'After Effects useful expressions for motion graphics',
      'After Effects expression basics for editors'
    ],
    recreate: 'Create looping animated background and wiggle camera/text.',
    variation: 'Add controls for wiggle amount/speed.',
    output: 'Expression-controlled scene.',
    reflectionPrompts: [
      'What should be automated?',
      'How can expressions reduce project file complexity?',
      'What expression would save you the most time?'
    ],
    tools: ['loopOut', 'wiggle', 'time', 'valueAtTime', 'Sliders'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 60, month: 2, week: 9,
    focus: 'Essential Graphics / MOGRT Concept',
    goal: 'Understand reusable templates and editable properties.',
    consume: [
      'Essential Graphics panel tutorial',
      'MOGRT creation walkthrough'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects Essential Graphics tutorial',
      'After Effects create MOGRT template',
      'After Effects editable text template'
    ],
    recreate: 'Build a simple editable title template.',
    variation: 'Expose color/text controls.',
    output: 'Reusable title template.',
    reflectionPrompts: [
      'What parts should be editable for clients?',
      'How does Essential Graphics change your delivery workflow?',
      'What is the difference between a MOGRT and a normal AE project?'
    ],
    tools: ['Essential Graphics', 'Controls', 'Template thinking'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 61, month: 2, week: 9,
    focus: 'Project Organization and Speed Workflow',
    goal: 'Work like a professional without messy projects.',
    consume: [
      'Folder structure and naming conventions',
      'Proxies workflow',
      'Collect Files tutorial'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects project organization workflow',
      'After Effects collect files tutorial',
      'After Effects proxies workflow',
      'After Effects professional workflow'
    ],
    recreate: 'Organize existing projects into a clean template structure.',
    variation: 'Create your own AE project template folder.',
    output: 'Personal project structure.',
    reflectionPrompts: [
      'What wastes time in your workflow?',
      'How would better organization affect your output speed?',
      'What naming convention will you use going forward?'
    ],
    tools: ['Project organization', 'Proxies', 'Collect files'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 62, month: 2, week: 9,
    focus: 'Month 2 Final Project Planning',
    goal: 'Plan a 30–45 sec modern edit/ad.',
    consume: [
      'Product ads and creator reels',
      'Motion graphics portfolio pieces'
    ],
    platforms: ['Behance', 'YouTube', 'Instagram/TikTok'],
    searchKeywords: [
      'After Effects product ad tutorial',
      'After Effects modern social ad breakdown',
      'After Effects motion graphics portfolio project'
    ],
    recreate: 'Storyboard Month 2 final with 6–10 scenes.',
    variation: 'Choose two style directions and compare.',
    output: 'Script/storyboard/asset list.',
    reflectionPrompts: [
      'What is the clear message of the edit?',
      'What Month 2 techniques will you showcase?',
      'Who is the target audience for this project?'
    ],
    tools: ['Planning', 'Style frames', 'Asset prep'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 63, month: 2, week: 9,
    focus: 'Month 2 Final Project Build Part 1',
    goal: 'Build rough structure and core animation.',
    consume: [
      'Only search exact problems encountered'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      '[specific effect] After Effects tutorial',
      '[problem] After Effects fix',
      'After Effects [tool] explained'
    ],
    recreate: 'Build first 50% of final project.',
    variation: 'Test alternate opening hook.',
    output: 'Rough cut v1.',
    reflectionPrompts: [
      'Does the first 3 seconds hook attention?',
      'Is the pacing feeling right?',
      'What technical problems did you encounter?'
    ],
    tools: ['All Month 2 tools'],
    estimatedMinutes: 90,
    difficulty: 4,
    isFinalProject: true
  },
  {
    day: 64, month: 2, week: 9,
    focus: 'Month 2 Final Project Build Part 2',
    goal: 'Finish the full rough cut.',
    consume: [
      'Only search exact problems encountered'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects polish motion graphics',
      'After Effects sound design edit',
      'After Effects transitions refine'
    ],
    recreate: 'Finish full 30–45 sec rough cut.',
    variation: 'Add improved sound and color pass.',
    output: 'Rough cut v2.',
    reflectionPrompts: [
      'What is weak: design, timing, effects, or story?',
      'Where does viewer attention drop?',
      'What one change would most improve this?'
    ],
    tools: ['Animation', 'Effects', 'Sound', 'Color'],
    estimatedMinutes: 90,
    difficulty: 4,
    isFinalProject: true
  },
  {
    day: 65, month: 2, week: 9,
    focus: 'Month 2 Final Polish and Export',
    goal: 'Polish to a strong intermediate level.',
    consume: [
      'Portfolio critique resources',
      'How to improve edit pacing'
    ],
    platforms: ['YouTube', 'School of Motion', 'Behance'],
    searchKeywords: [
      'motion graphics portfolio critique checklist',
      'After Effects polish final project',
      'how to improve edit pacing'
    ],
    recreate: 'Polish timing, transitions, sound, color, layout.',
    variation: 'Export vertical and horizontal versions.',
    output: 'Month 2 final project.',
    reflectionPrompts: [
      'Score all categories and write next fixes.',
      'What is your strongest moment in this edit?',
      'What would you do differently from the start?'
    ],
    tools: ['Polish', 'Export', 'Critique'],
    estimatedMinutes: 90,
    difficulty: 3,
    isFinalProject: true
  },
  {
    day: 66, month: 2, week: 9,
    focus: 'Month 2 Review and Month 3 Strategy',
    goal: 'Identify specialization direction for Month 3.',
    consume: [
      'Review all Month 2 projects',
      '10 portfolio examples in target style'
    ],
    platforms: ['Behance', 'YouTube', 'Instagram/TikTok'],
    searchKeywords: [
      'After Effects portfolio reel examples',
      'motion designer showreel',
      'video editor portfolio after effects'
    ],
    recreate: 'Create a list of top 10 strengths/weaknesses.',
    variation: 'Choose 2 possible Month 3 portfolio directions.',
    output: 'Month 3 strategy note.',
    reflectionPrompts: [
      'What are you best at so far?',
      'What type of work excites you most?',
      'What skills would make you hirable or shareable in Month 3?'
    ],
    tools: ['Self-review', 'Portfolio planning', 'Direction choice'],
    estimatedMinutes: 75,
    difficulty: 2,
    isReviewDay: true
  }
];
