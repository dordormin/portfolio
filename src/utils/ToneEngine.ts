import * as Tone from 'tone';

class ToneEngine {
  private isInitialized = false;
  private isMuted = true;
  
  // Synths
  private padSynth: Tone.PolySynth | null = null;
  private clickSynth: Tone.Synth | null = null;
  private hoverSynth: Tone.PluckSynth | null = null;
  
  // FX
  private masterReverb: Tone.Reverb | null = null;
  private eq: Tone.EQ3 | null = null;
  private compressor: Tone.Compressor | null = null;

  // Music Logic
  private chords = [
    ['D3', 'F3', 'A3', 'C4'], // D minor 7
    ['A2', 'C3', 'E3', 'G3'], // A minor 7
    ['C3', 'E3', 'G3', 'B3'], // C major 7
    ['G2', 'B2', 'D3', 'F3'], // G dominant 7
  ];
  private chordIndex = 0;
  private loop: Tone.Loop | null = null;
  
  public async init() {
    if (this.isInitialized) return;
    
    await Tone.start();
    
    // 1. Setup Master Bus for "Dolby" warmth
    this.masterReverb = new Tone.Reverb({
      decay: 6,
      preDelay: 0.1,
      wet: 0.4
    });
    
    this.eq = new Tone.EQ3({
      low: 2,
      mid: -2,
      high: 1
    });
    
    this.compressor = new Tone.Compressor({
      threshold: -20,
      ratio: 4
    });

    Tone.Destination.chain(this.eq, this.compressor);

    // 2. Setup Synths
    // Pad (Warm Baroque Cello/Organ vibe)
    this.padSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'fatcustom',
        partials: [1, 0.5, 0.2, 0.1]
      },
      envelope: {
        attack: 4,
        decay: 2,
        sustian: 0.8,
        release: 6
      },
      volume: -20
    });
    // Add specific deep reverb to pad
    const padReverb = new Tone.Reverb({ decay: 8, wet: 0.6 });
    const padFilter = new Tone.Filter(600, 'lowpass');
    this.padSynth.chain(padFilter, padReverb, Tone.Destination);

    // Click ("Claque" / Percussive Baroque Hit)
    this.clickSynth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0,
        release: 0.1
      },
      volume: -5
    });
    this.clickSynth.chain(this.masterReverb, Tone.Destination);

    // Hover (Light Harpsichord pluck)
    this.hoverSynth = new Tone.PluckSynth({
      attackNoise: 1,
      dampening: 4000,
      resonance: 0.8,
      volume: -15
    });
    this.hoverSynth.chain(this.masterReverb, Tone.Destination);

    // 3. Setup Generative Loop
    Tone.Transport.bpm.value = 40; // Very slow majestic tempo
    
    this.loop = new Tone.Loop((time) => {
      const currentChord = this.chords[this.chordIndex];
      // Play chord
      this.padSynth?.triggerAttackRelease(currentChord, '1m', time);
      
      // Advance chord progression
      this.chordIndex = (this.chordIndex + 1) % this.chords.length;
    }, '2m'); // Every 2 measures

    await padReverb.generate();
    await this.masterReverb.generate();

    this.isInitialized = true;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      Tone.Transport.stop();
      this.loop?.stop();
      this.padSynth?.releaseAll();
    } else {
      if (!this.isInitialized) {
        this.init().then(() => this.startGenerativeMusic());
      } else {
        this.startGenerativeMusic();
      }
    }
  }

  private startGenerativeMusic() {
    if (this.isMuted) return;
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    
    // Start Transport and loop
    Tone.Transport.start();
    this.loop?.start(0);
  }

  public playHover() {
    if (this.isMuted || !this.isInitialized || Tone.context.state !== 'running') return;
    
    // Play a high note from the current chord to harmonize
    const currentChord = this.chords[this.chordIndex];
    const baseNote = currentChord[2]; // 3rd note of the chord
    // Extract pitch and octave (e.g. 'A3' -> 'A', '3')
    const pitch = baseNote.slice(0, -1);
    const octave = parseInt(baseNote.slice(-1)) + 2; // Shift up 2 octaves
    
    this.hoverSynth?.triggerAttack(`${pitch}${octave}`, Tone.now());
  }

  public playClick() {
    if (this.isMuted || !this.isInitialized || Tone.context.state !== 'running') return;
    
    // Play the root note deeply as a "claque"
    const currentChord = this.chords[this.chordIndex];
    const rootNote = currentChord[0];
    const pitch = rootNote.slice(0, -1);
    
    // Drop down an octave for the heavy hit
    const octave = parseInt(rootNote.slice(-1)) - 1; 
    
    this.clickSynth?.triggerAttackRelease(`${pitch}${octave}`, '8n', Tone.now());
  }

  // Allow BackgroundCanvas to subtly modulate the filter based on scroll
  public setModulation(value: number) {
    // Value between 0 and 1
    if (this.padSynth && this.isInitialized) {
      // Not strictly necessary since we use a static filter now, 
      // but we can adjust master volume slightly or tempo
      Tone.Transport.bpm.rampTo(40 + (value * 20), 0.5);
    }
  }
}

export const toneEngine = new ToneEngine();
