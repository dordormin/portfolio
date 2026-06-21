// A utility class to generate procedural Sci-Fi / Glassy UI sounds using the Web Audio API

class SynthAudio {
  private context: AudioContext | null = null;

  init() {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  getContext() {
    return this.context;
  }

  // A subtle, glassy hover sound
  playHover(isMuted: boolean, pan: number = 0) {
    if (isMuted) return;
    this.init();
    if (!this.context) return;

    const t = this.context.currentTime;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const panner = this.context.createStereoPanner();

    osc.type = 'sine';
    // Frequency sweep for a glassy "pip"
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);

    // Envelope
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.1, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    panner.pan.value = pan;

    osc.connect(gain);
    gain.connect(panner);
    panner.connect(this.context.destination);

    osc.start(t);
    osc.stop(t + 0.1);
  }

  // A futuristic click sound
  playClick(isMuted: boolean) {
    if (isMuted) return;
    this.init();
    if (!this.context) return;

    const t = this.context.currentTime;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.1);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(gain);
    gain.connect(this.context.destination);

    osc.start(t);
    osc.stop(t + 0.1);
  }

  // A continuous ambient drone
  private ambientOsc: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private ambientGain: GainNode | null = null;

  startAmbient(isMuted: boolean) {
    if (isMuted) return;
    this.init();
    if (!this.context) return;
    if (this.ambientOsc) return; // Already playing

    const t = this.context.currentTime;
    
    // Create two oscillators for a richer, softer "pad" effect
    this.ambientOsc = this.context.createOscillator();
    this.ambientOsc2 = this.context.createOscillator();
    
    this.ambientFilter = this.context.createBiquadFilter();
    this.ambientGain = this.context.createGain();

    this.ambientOsc.type = 'sine';
    this.ambientOsc2.type = 'triangle'; // adds soft harmonics

    // Healing/Calming frequency base (e.g., 198Hz - half of 396Hz)
    this.ambientOsc.frequency.setValueAtTime(198, t);
    this.ambientOsc2.frequency.setValueAtTime(198.5, t); // Slight detune for chorus

    // Lowpass filter to make it very soft and distant
    this.ambientFilter.type = 'lowpass';
    this.ambientFilter.frequency.setValueAtTime(300, t);
    this.ambientFilter.Q.value = 1;

    // Slow LFO for filter modulation (waves of sound)
    const lfo = this.context.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.05; // Very slow wave
    const lfoGain = this.context.createGain();
    lfoGain.gain.value = 100; // +/- 100 Hz variation on filter
    lfo.connect(lfoGain);
    lfoGain.connect(this.ambientFilter.frequency);
    lfo.start(t);

    // Fade in gently over 3s with a lower max volume
    this.ambientGain.gain.setValueAtTime(0, t);
    this.ambientGain.gain.linearRampToValueAtTime(0.015, t + 3);

    this.ambientOsc.connect(this.ambientFilter);
    this.ambientOsc2.connect(this.ambientFilter);
    this.ambientFilter.connect(this.ambientGain);
    this.ambientGain.connect(this.context.destination);

    this.ambientOsc.start(t);
    this.ambientOsc2.start(t);
  }

  setAmbientFrequency(baseFreq: number) {
    if (this.ambientOsc && this.ambientOsc2 && this.context) {
      // Smoothly transition frequencies, keeping a 0.5Hz detune
      this.ambientOsc.frequency.setTargetAtTime(baseFreq, this.context.currentTime, 0.5);
      this.ambientOsc2.frequency.setTargetAtTime(baseFreq + 0.5, this.context.currentTime, 0.5);
    }
  }

  stopAmbient() {
    if (!this.context || !this.ambientOsc || !this.ambientGain) return;
    const t = this.context.currentTime;
    this.ambientGain.gain.linearRampToValueAtTime(0.001, t + 1.5); // Fade out over 1.5s
    
    this.ambientOsc.stop(t + 1.6);
    if (this.ambientOsc2) this.ambientOsc2.stop(t + 1.6);

    setTimeout(() => {
      this.ambientOsc = null;
      this.ambientOsc2 = null;
      this.ambientFilter = null;
      this.ambientGain = null;
    }, 1600);
  }
}

export const synthAudio = new SynthAudio();
