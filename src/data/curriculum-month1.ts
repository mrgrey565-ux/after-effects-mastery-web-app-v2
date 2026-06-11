import type { CurriculumDay } from '../types';

export const month1Days: CurriculumDay[] = [
  // WEEK 1
  {
    day: 1, month: 1, week: 1,
    focus: 'AE Workspace and Mental Model',
    goal: 'Understand how AE thinks: comp, layer, timeline, keyframe, preview, render.',
    consume: [
      'AE interface beginner walkthrough',
      'Composition/layer/timeline explanation',
      'Workspace overview from Adobe Help'
    ],
    platforms: ['YouTube', 'Adobe Help', 'Envato Tuts+'],
    searchKeywords: [
      'After Effects beginner interface tutorial',
      'After Effects composition timeline layers explained',
      'After Effects workspace for beginners'
    ],
    recreate: 'Create a 5-second comp with background, moving square, and text.',
    variation: 'Square moves diagonally, scales up, and fades out.',
    output: '5-second MP4 or screenshot.',
    reflectionPrompts: [
      'What is a comp?',
      'What is a layer?',
      'What is a keyframe?',
      'What confused you most about the interface?'
    ],
    tools: ['Workspace', 'Project panel', 'Composition panel', 'Timeline', 'Preview', 'Render Queue'],
    estimatedMinutes: 75,
    difficulty: 1
  },
  {
    day: 2, month: 1, week: 1,
    focus: 'Transform Properties and Keyframes',
    goal: 'Control position, scale, rotation, opacity, anchor point.',
    consume: [
      'Transform properties and keyframe basics',
      'Easy Ease introduction'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects transform properties beginner',
      'After Effects keyframes explained beginner',
      'After Effects easy ease tutorial beginner'
    ],
    recreate: 'Animate a logo/text from left to center with fade and scale.',
    variation: 'Add overshoot: 110% scale then settle to 100%.',
    output: '5-second logo/text reveal.',
    reflectionPrompts: [
      'What makes motion smooth instead of robotic?',
      'What is the difference between easy ease in and out?',
      'Which properties did you find hardest to control?'
    ],
    tools: ['Transform properties', 'Keyframes', 'Anchor point', 'Easy Ease'],
    estimatedMinutes: 75,
    difficulty: 1
  },
  {
    day: 3, month: 1, week: 1,
    focus: 'Text and Shape Layers',
    goal: 'Create basic lower thirds and clean title cards.',
    consume: [
      'Text layer basics',
      'Shape tools overview',
      'Fill/stroke controls'
    ],
    platforms: ['YouTube', 'Behance', 'Dribbble'],
    searchKeywords: [
      'After Effects text animation beginner',
      'After Effects shape layers beginner tutorial',
      'After Effects lower third tutorial beginner'
    ],
    recreate: 'Clean lower-third title animation.',
    variation: 'Create 3 color/theme versions.',
    output: '3 lower-third exports or screenshots.',
    reflectionPrompts: [
      'Which design looks most professional and why?',
      'How does color choice affect readability?',
      'What font choice worked best?'
    ],
    tools: ['Text layers', 'Shape layers', 'Fill', 'Stroke'],
    estimatedMinutes: 75,
    difficulty: 1
  },
  {
    day: 4, month: 1, week: 1,
    focus: 'Easy Ease and Graph Editor Basics',
    goal: 'Improve timing and movement quality.',
    consume: [
      'Easy Ease explained in depth',
      'Speed graph vs value graph basics'
    ],
    platforms: ['YouTube', 'School of Motion'],
    searchKeywords: [
      'After Effects graph editor beginner',
      'After Effects speed graph easy ease tutorial',
      'After Effects smooth animation tutorial'
    ],
    recreate: 'Pop-up title animation with smooth ease.',
    variation: 'One slow luxury version and one fast energetic version.',
    output: 'Before/after easing comparison.',
    reflectionPrompts: [
      'How did timing change the feeling?',
      'What is the difference between the speed graph and value graph?',
      'Which timing felt more "expensive"?'
    ],
    tools: ['Easy Ease', 'Graph Editor', 'Motion timing'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 5, month: 1, week: 1,
    focus: 'Precomps, Parenting, and Null Objects',
    goal: 'Organize layers and control groups.',
    consume: [
      'Precompose tutorial',
      'Parenting in AE',
      'Null object workflow'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects precomp explained beginner',
      'After Effects parenting null object tutorial',
      'After Effects null object beginner'
    ],
    recreate: 'Parent 3 text/shape elements to one null and animate the null.',
    variation: 'Precomp the whole title and animate it like a card.',
    output: 'Grouped animation export.',
    reflectionPrompts: [
      'Why are precomps useful?',
      'What is the difference between parenting and precomposing?',
      'When would you use a null object instead of direct parenting?'
    ],
    tools: ['Precomps', 'Parenting', 'Null objects'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 6, month: 1, week: 1,
    focus: 'Export Workflow and Mini Project 1',
    goal: 'Export properly for horizontal and vertical formats.',
    consume: [
      'Render Queue walkthrough',
      'Adobe Media Encoder basics',
      'H.264/MP4 export settings'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects export MP4 beginner',
      'After Effects render queue vs media encoder',
      'best export settings After Effects Instagram reels'
    ],
    recreate: '10-second intro using text, shapes, easing, precomps.',
    variation: 'Export 1080x1920 vertical and 1920x1080 horizontal.',
    output: 'Mini Project 1.',
    reflectionPrompts: [
      'What setting gave the best quality/file size?',
      'What would you change in the animation if you had more time?',
      'What was the hardest part of this week?'
    ],
    tools: ['Render Queue', 'Media Encoder', 'Composition settings'],
    estimatedMinutes: 90,
    difficulty: 2,
    isWeeklyProject: true
  },
  {
    day: 7, month: 1, week: 1,
    focus: 'Review, Organize, and Idea Bank',
    goal: 'Build reference collection habit.',
    consume: [
      'Watch 10 short motion references',
      'Study motion design inspiration galleries'
    ],
    platforms: ['Behance', 'Dribbble', 'Pinterest', 'Instagram/TikTok', 'YouTube'],
    searchKeywords: [
      'motion graphics reel After Effects',
      'After Effects intro animation inspiration',
      'kinetic typography reel'
    ],
    recreate: 'Recreate first 2 seconds of one simple reference.',
    variation: 'Change text to your own name/brand.',
    output: '5 references saved, 1 micro-recreation.',
    reflectionPrompts: [
      'Why did the reference catch attention?',
      'What motion techniques appeared most often?',
      'Which reference would you most like to recreate fully?'
    ],
    tools: ['Reference analysis', 'Creative observation'],
    estimatedMinutes: 75,
    difficulty: 1,
    isReviewDay: true
  },

  // WEEK 2
  {
    day: 8, month: 1, week: 2,
    focus: 'Masks and Reveals',
    goal: 'Reveal text/images with masks.',
    consume: [
      'Mask path tutorial',
      'Feather and expansion controls',
      'Reveal animation with masks'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects mask reveal tutorial beginner',
      'After Effects text reveal with mask',
      'After Effects image reveal mask animation'
    ],
    recreate: 'Text revealing from behind a rectangle/mask.',
    variation: 'Vertical wipe, horizontal wipe, circular reveal.',
    output: '3 mask reveals.',
    reflectionPrompts: [
      'When should you use a mask instead of opacity?',
      'What is mask feathering and when would you use it?',
      'Which reveal felt most polished?'
    ],
    tools: ['Masks', 'Mask path', 'Feather', 'Expansion'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 9, month: 1, week: 2,
    focus: 'Track Mattes: Alpha and Luma',
    goal: 'Use mattes for modern design and reveals.',
    consume: [
      'Alpha matte explained',
      'Luma matte tutorial',
      'Mask vs matte comparison'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects track matte explained beginner',
      'After Effects alpha matte luma matte tutorial',
      'After Effects text fill video track matte'
    ],
    recreate: 'Put video/image texture inside text.',
    variation: 'Luma matte reveal using black/white shapes.',
    output: 'Matte-based text reveal.',
    reflectionPrompts: [
      'Why are mattes powerful in modern edits?',
      'What is the difference between alpha and luma mattes?',
      'How could you combine masks and mattes for a complex reveal?'
    ],
    tools: ['Alpha matte', 'Luma matte', 'Track matte workflow'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 10, month: 1, week: 2,
    focus: 'Adjustment Layers, Blur, Glow, Color',
    goal: 'Apply global effects and basic looks.',
    consume: [
      'Adjustment layers overview',
      'Blur and glow effects',
      'Lumetri Color basics',
      'Blending modes explained'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects adjustment layer beginner',
      'After Effects glow effect tutorial beginner',
      'After Effects color correction Lumetri beginner',
      'After Effects blending modes explained'
    ],
    recreate: 'Before/after color grade with glow and blur transition.',
    variation: 'Dark cinematic version and bright social version.',
    output: 'Two looks from same footage.',
    reflectionPrompts: [
      'What color choices changed the mood most?',
      'How does an adjustment layer differ from applying effects directly?',
      'Which blending mode surprised you most?'
    ],
    tools: ['Adjustment layers', 'Glow', 'Blur', 'Lumetri Color', 'Blending modes'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 11, month: 1, week: 2,
    focus: 'Beginner Modern Transitions',
    goal: 'Build useful social/video transitions.',
    consume: [
      'Whip pan transition tutorial',
      'Zoom transition tutorial',
      'Blur and Motion Tile transitions'
    ],
    platforms: ['YouTube', 'TikTok/Reels', 'Instagram'],
    searchKeywords: [
      'After Effects whip pan transition tutorial',
      'After Effects zoom transition beginner',
      'After Effects motion tile transition',
      'After Effects smooth transition tutorial beginner'
    ],
    recreate: '3 transitions between two clips/images: zoom, whip, blur.',
    variation: 'Sync one transition to a sound effect or beat.',
    output: 'Transition pack v1.',
    reflectionPrompts: [
      'Which transition feels most modern and why?',
      'How does sound affect the perceived quality of a transition?',
      'What makes a transition feel overused?'
    ],
    tools: ['Transform transitions', 'Directional Blur', 'Motion Tile', 'Motion blur'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 12, month: 1, week: 2,
    focus: 'Time Remapping and Speed Feel',
    goal: 'Control pacing and attention.',
    consume: [
      'Time remapping tutorial',
      'Freeze frame technique',
      'Speed ramping basics'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects time remapping beginner tutorial',
      'After Effects freeze frame tutorial',
      'After Effects speed ramp beginner'
    ],
    recreate: 'Clip freezes, zooms, text appears, then continues.',
    variation: 'Add text callout during freeze moment.',
    output: 'Freeze-frame callout edit.',
    reflectionPrompts: [
      'How does speed control viewer attention?',
      'What moment in your footage deserved the freeze?',
      'How could you use speed ramps in a future project?'
    ],
    tools: ['Time Remapping', 'Freeze frame', 'Pacing'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 13, month: 1, week: 2,
    focus: 'Mini Project 2: Trendy Short Edit',
    goal: 'Combine transitions, grade, title, and pacing.',
    consume: [
      '5 trendy short-form transition examples',
      'Viral edit pacing breakdown'
    ],
    platforms: ['YouTube', 'TikTok', 'Instagram'],
    searchKeywords: [
      'After Effects trendy transitions reels',
      'After Effects viral edit breakdown',
      'After Effects short form editing tutorial'
    ],
    recreate: '10–15 sec edit with 3 shots, 2 transitions, color grade, title.',
    variation: 'Make another version with different pacing.',
    output: 'Weekly short edit.',
    reflectionPrompts: [
      'Which version holds attention better?',
      'Did the color grade match the energy of the edit?',
      'What would make this shareable?'
    ],
    tools: ['Transitions', 'Timing', 'Color', 'Title animation'],
    estimatedMinutes: 90,
    difficulty: 2,
    isWeeklyProject: true
  },
  {
    day: 14, month: 1, week: 2,
    focus: 'Week 2 Review and Reference Vault',
    goal: 'Analyze masks/mattes/transitions in real edits.',
    consume: [
      '10 examples of masks, mattes, transitions in professional work'
    ],
    platforms: ['Behance', 'Dribbble', 'Pinterest', 'YouTube'],
    searchKeywords: [
      'After Effects mask transition inspiration',
      'After Effects matte transition inspiration',
      'motion design transition reel'
    ],
    recreate: '2 seconds from one reference.',
    variation: 'Change color, speed, subject.',
    output: '10 references tagged, 1 improved export.',
    reflectionPrompts: [
      'Which tool appeared most often in professional work?',
      'What made the best transitions feel invisible vs obvious?',
      'What is your current biggest skill gap?'
    ],
    tools: ['Review', 'Tagging', 'Critique'],
    estimatedMinutes: 75,
    difficulty: 1,
    isReviewDay: true
  },

  // WEEK 3
  {
    day: 15, month: 1, week: 3,
    focus: 'Kinetic Typography Basics',
    goal: 'Animate words with emphasis and rhythm.',
    consume: [
      'Text animators overview',
      'Position/scale/opacity animation with text',
      'Word-by-word timing techniques'
    ],
    platforms: ['YouTube', 'Behance', 'Dribbble'],
    searchKeywords: [
      'After Effects kinetic typography beginner',
      'After Effects text animator tutorial beginner',
      'After Effects word by word text animation'
    ],
    recreate: 'Animate a 5–7 word quote.',
    variation: 'Minimal version and bold viral version.',
    output: '2 kinetic typography clips.',
    reflectionPrompts: [
      'Which words deserve emphasis?',
      'How does rhythm in text animation relate to music?',
      'Which version felt more emotionally resonant?'
    ],
    tools: ['Text animators', 'Range selector basics', 'Timing'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 16, month: 1, week: 3,
    focus: 'Captions and Social Text Style',
    goal: 'Make readable modern captions.',
    consume: [
      'Animated captions tutorial',
      'Highlight word techniques',
      'Pop caption styles'
    ],
    platforms: ['YouTube', 'TikTok/Reels'],
    searchKeywords: [
      'After Effects animated captions tutorial',
      'After Effects reels captions tutorial',
      'After Effects pop up subtitles',
      'Ali Abdaal style captions After Effects'
    ],
    recreate: '8–10 sec animated captions with highlighted keywords.',
    variation: 'Clean, bold, meme/viral caption versions.',
    output: 'Caption style pack v1.',
    reflectionPrompts: [
      'Which is easiest to read on mobile?',
      'What font size works best at arm\'s length?',
      'How does caption style affect brand perception?'
    ],
    tools: ['Text animation', 'Subtitle timing', 'Style systems'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 17, month: 1, week: 3,
    focus: 'Shape Animation and Trim Paths',
    goal: 'Animate icons, lines, strokes.',
    consume: [
      'Trim Paths tutorial',
      'Stroke animation techniques',
      'Icon animation basics'
    ],
    platforms: ['YouTube', 'Dribbble', 'Behance'],
    searchKeywords: [
      'After Effects trim paths beginner tutorial',
      'After Effects line animation tutorial',
      'After Effects animated icons beginner'
    ],
    recreate: 'Animate an outline icon or line path drawing on.',
    variation: 'Add text and turn it into a title card.',
    output: 'Animated icon/title card.',
    reflectionPrompts: [
      'What makes shape animation feel premium?',
      'How does stroke weight affect the feel of animation?',
      'What icons or shapes would be most useful for your style?'
    ],
    tools: ['Shape layers', 'Paths', 'Strokes', 'Trim Paths'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 18, month: 1, week: 3,
    focus: '3D Layers, Camera, and Parallax Basics',
    goal: 'Add depth with 2.5D scenes.',
    consume: [
      '3D layer switch tutorial',
      'Camera basics in AE',
      'Z position and depth tutorial',
      '2.5D parallax technique'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects 3D layers beginner tutorial',
      'After Effects camera animation beginner',
      'After Effects parallax effect tutorial',
      'After Effects 2.5D animation beginner'
    ],
    recreate: '2.5D parallax scene using 3–5 flat layers.',
    variation: 'Add foreground blur/depth.',
    output: 'Parallax scene.',
    reflectionPrompts: [
      'How does depth improve visual interest?',
      'What real-world camera behavior does AE\'s camera simulate?',
      'What types of images work best for 2.5D?'
    ],
    tools: ['3D layers', 'Camera', 'Z-space', 'Null controls'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 19, month: 1, week: 3,
    focus: 'Basic Expressions for Editors',
    goal: 'Use simple expressions to save time.',
    consume: [
      'wiggle() expression tutorial',
      'loopOut() basics',
      'time expression',
      'Slider control concept'
    ],
    platforms: ['YouTube', 'Adobe docs'],
    searchKeywords: [
      'After Effects expressions beginner wiggle loopOut',
      'After Effects wiggle expression tutorial',
      'After Effects loopOut expression beginner',
      'After Effects slider control expression beginner'
    ],
    recreate: 'Add wiggle to camera/text and create looping icon animation.',
    variation: 'Subtle professional wiggle and chaotic viral wiggle.',
    output: 'Expression micro-pack.',
    reflectionPrompts: [
      'When should expressions be avoided?',
      'What is the syntax structure of wiggle()?',
      'Which expression could save you the most time?'
    ],
    tools: ['Expressions', 'wiggle', 'loopOut', 'Sliders'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 20, month: 1, week: 3,
    focus: 'Mini Project 3: Typography/Motion Graphics',
    goal: 'Combine type, shapes, camera, transitions.',
    consume: [
      '5 modern typography/motion graphics references'
    ],
    platforms: ['YouTube', 'Behance', 'Dribbble', 'Pinterest'],
    searchKeywords: [
      'kinetic typography reel After Effects',
      'After Effects motion graphics ad tutorial',
      'modern text animation After Effects'
    ],
    recreate: '15-second text/motion graphics reel intro.',
    variation: 'Brand ad version and creator/reel version.',
    output: 'Weekly typography edit.',
    reflectionPrompts: [
      'What style feels closest to your identity?',
      'How did combining tools change the final result?',
      'What would you add if you had another hour?'
    ],
    tools: ['Typography', 'Shapes', 'Camera', 'Transitions'],
    estimatedMinutes: 90,
    difficulty: 3,
    isWeeklyProject: true
  },
  {
    day: 21, month: 1, week: 3,
    focus: 'Week 3 Review and Animation Principles',
    goal: 'Improve an old project using better animation principles.',
    consume: [
      'Timing/spacing critique resources',
      'Animation principles for motion design'
    ],
    platforms: ['YouTube', 'School of Motion'],
    searchKeywords: [
      'motion design critique checklist',
      'animation principles timing spacing After Effects',
      'how to improve motion graphics timing'
    ],
    recreate: 'Improve one old project with better easing and motion blur.',
    variation: 'Export before/after comparison.',
    output: 'Before/after improvement video.',
    reflectionPrompts: [
      'What is your biggest repeated mistake?',
      'How much did easing improvement change the quality?',
      'What animation principle will you focus on next week?'
    ],
    tools: ['Critique', 'Timing', 'Spacing', 'Refinement'],
    estimatedMinutes: 75,
    difficulty: 2,
    isReviewDay: true
  },

  // WEEK 4
  {
    day: 22, month: 1, week: 4,
    focus: 'Motion Tracking Basics',
    goal: 'Attach graphics to footage.',
    consume: [
      'Point tracking tutorial',
      'Attaching text/object to tracked point'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects motion tracking beginner tutorial',
      'After Effects attach text to moving object',
      'After Effects tracking text to footage beginner'
    ],
    recreate: 'Track text to a moving object/person/phone.',
    variation: 'Add glow, shadow, or callout line.',
    output: 'Tracked text shot.',
    reflectionPrompts: [
      'What makes tracking look fake?',
      'What type of footage is easiest to track?',
      'How would you fix tracking drift?'
    ],
    tools: ['Tracker panel', 'Point tracking', 'Null target'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 23, month: 1, week: 4,
    focus: 'Roto Brush and Manual Mask Cleanup',
    goal: 'Separate a subject from background.',
    consume: [
      'Roto Brush basics',
      'Refine edge workflow',
      'Manual mask cleanup techniques'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'After Effects Roto Brush beginner tutorial',
      'After Effects remove background roto brush',
      'After Effects rotoscoping beginner'
    ],
    recreate: 'Cut subject from background for 3–5 seconds.',
    variation: 'Add colored background, shadow, and outline.',
    output: 'Roto cutout shot.',
    reflectionPrompts: [
      'What footage makes roto easier?',
      'What was the most time-consuming part?',
      'How would better source footage improve this?'
    ],
    tools: ['Roto Brush', 'Masks', 'Refine edge'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 24, month: 1, week: 4,
    focus: 'Screen Replacement / Mocha AE Intro',
    goal: 'Replace a screen with planar tracking.',
    consume: [
      'Mocha AE basics tutorial',
      'Planar tracking explained',
      'Corner pin workflow'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      'Mocha AE screen replacement beginner',
      'After Effects phone screen replacement tutorial',
      'After Effects planar tracking beginner Mocha'
    ],
    recreate: 'Replace a phone/laptop screen with image/video.',
    variation: 'Add reflection/glare and slight blur.',
    output: 'Screen replacement shot.',
    reflectionPrompts: [
      'What makes it believable?',
      'How does planar tracking differ from point tracking?',
      'What elements would you add to make it more realistic?'
    ],
    tools: ['Mocha AE', 'Planar tracking', 'Corner pin'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 25, month: 1, week: 4,
    focus: 'Beginner Compositing Realism',
    goal: 'Make inserted elements feel integrated.',
    consume: [
      'Color matching for compositing',
      'Shadow integration',
      'Grain/noise matching',
      'Glow and blur for realism'
    ],
    platforms: ['YouTube', 'Video Copilot basics', 'Adobe Help'],
    searchKeywords: [
      'After Effects compositing beginner tutorial',
      'After Effects color match composite tutorial',
      'After Effects shadow grain blur compositing'
    ],
    recreate: 'Composite text/object into real shot with shadow, blur, grain, color match.',
    variation: 'Realistic version and stylized cyber/glow version.',
    output: 'Composite comparison.',
    reflectionPrompts: [
      'Which small detail improved realism most?',
      'What does "integrating into a scene" really mean visually?',
      'What would a VFX professional critique first?'
    ],
    tools: ['Color matching', 'Shadows', 'Grain', 'Blur', 'Blending'],
    estimatedMinutes: 75,
    difficulty: 3
  },
  {
    day: 26, month: 1, week: 4,
    focus: 'Sound Design for Edits',
    goal: 'Add energy and polish with audio.',
    consume: [
      'Whooshes, hits, risers tutorial',
      'Beat sync and markers workflow',
      'Ambient sound layering'
    ],
    platforms: ['YouTube', 'TikTok/Reels', 'Sound library sites'],
    searchKeywords: [
      'After Effects sound design for edits',
      'motion graphics sound design tutorial',
      'After Effects sync animation to beat beginner',
      'video editing whoosh hit riser sound design'
    ],
    recreate: 'Add sound effects to one previous transition/text animation.',
    variation: 'Export with and without sound.',
    output: 'Sound-designed transition.',
    reflectionPrompts: [
      'How much did sound improve the edit?',
      'Which sound types (hit, whoosh, riser) had the biggest impact?',
      'How early should you think about sound when planning an edit?'
    ],
    tools: ['Audio layers', 'Markers', 'Timing to sound'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 27, month: 1, week: 4,
    focus: 'Creative Ideation System',
    goal: 'Learn to collect, analyze, and remix ideas.',
    consume: [
      'Editor/motion designer creative-process videos',
      'How to analyze motion reference'
    ],
    platforms: ['YouTube', 'Behance', 'Dribbble', 'Pinterest', 'TikTok/Instagram'],
    searchKeywords: [
      'how motion designers find inspiration',
      'video editing creative process',
      'how to analyze motion graphics reference',
      'creative ideation for video editors'
    ],
    recreate: 'Analyze 3 references: hook, movement, text, effects, color, sound, transition.',
    variation: 'Combine 2 references into one new idea.',
    output: '3 deconstructed references + 1 new concept.',
    reflectionPrompts: [
      'What style do you naturally like most?',
      'What is your "signature" tendency in your edits so far?',
      'How do you convert inspiration into original work?'
    ],
    tools: ['Reference analysis', 'Idea remixing'],
    estimatedMinutes: 75,
    difficulty: 1
  },
  {
    day: 28, month: 1, week: 4,
    focus: 'Month 1 Final Project Planning',
    goal: 'Plan a 15–30 sec beginner edit.',
    consume: [
      'Beginner portfolio projects/reels',
      'Short form edit breakdowns'
    ],
    platforms: ['YouTube', 'Behance', 'Instagram/TikTok'],
    searchKeywords: [
      'After Effects beginner portfolio project',
      'After Effects 30 second motion graphics project',
      'After Effects short form edit breakdown'
    ],
    recreate: 'Storyboard final project with 5–7 scenes/cards.',
    variation: 'Create vertical-first and horizontal-safe plan.',
    output: 'Storyboard + asset list.',
    reflectionPrompts: [
      'What is the goal of this final edit?',
      'Who is the audience?',
      'What is the one thing viewers should remember?'
    ],
    tools: ['Planning', 'Storyboard', 'Asset organization'],
    estimatedMinutes: 75,
    difficulty: 2
  },
  {
    day: 29, month: 1, week: 4,
    focus: 'Month 1 Final Project Build',
    goal: 'Build the final Month 1 project.',
    consume: [
      'Only search if stuck on specific techniques'
    ],
    platforms: ['YouTube', 'Adobe Help'],
    searchKeywords: [
      '[effect name] After Effects beginner tutorial',
      '[problem] After Effects fix'
    ],
    recreate: 'Build 15–30 sec edit with hook, text, shapes, 2 transitions, mask/matte, color, sound, tracking/roto/composite attempt.',
    variation: 'Make 9:16 vertical version.',
    output: 'Final project draft.',
    reflectionPrompts: [
      'What needs polish?',
      'Did you use all the tools from Month 1?',
      'What surprised you during the build?'
    ],
    tools: ['All Month 1 tools'],
    estimatedMinutes: 90,
    difficulty: 3,
    isFinalProject: true
  },
  {
    day: 30, month: 1, week: 4,
    focus: 'Export, Critique, and Month 2 Prep',
    goal: 'Polish, export, critique, and prepare for intermediate month.',
    consume: [
      'Critique checklist resources',
      'How to improve edit pacing'
    ],
    platforms: ['YouTube', 'School of Motion'],
    searchKeywords: [
      'motion graphics self critique checklist',
      'After Effects portfolio review checklist',
      'how to improve video edit pacing'
    ],
    recreate: 'Polish final project and export clean + energetic versions.',
    variation: 'Create before/after revision notes.',
    output: 'Month 1 final export.',
    reflectionPrompts: [
      'Score timing, smoothness, design, creativity, technical execution, sound.',
      'What would a professional change first?',
      'What are your top 3 skills after Month 1?',
      'What are your top 3 weaknesses going into Month 2?'
    ],
    tools: ['Export', 'Critique', 'Revision'],
    estimatedMinutes: 90,
    difficulty: 2,
    isFinalProject: true
  }
];
