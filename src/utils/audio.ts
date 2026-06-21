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
  private ambientGain: GainNode | null = null;

  startAmbient(isMuted: boolean) {
    if (isMuted) return;
    this.init();
    if (!this.context) return;
    if (this.ambientOsc) return; // Already playing

    const t = this.context.currentTime;
    this.ambientOsc = this.context.createOscillator();
    this.ambientGain = this.context.createGain();

    this.ambientOsc.type = 'sine';
    this.ambientOsc.frequency.setValueAtTime(55, t); // Very low drone

    // Slight LFO on frequency for movement
    const lfo = this.context.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // Slow wave
    const lfoGain = this.context.createGain();
    lfoGain.gain.value = 5; // +/- 5 Hz variation
    lfo.connect(lfoGain);
    lfoGain.connect(this.ambientOsc.frequency);
    lfo.start(t);

    this.ambientGain.gain.setValueAtTime(0, t);
    this.ambientGain.gain.linearRampToValueAtTime(0.05, t + 2); // Fade in over 2s

    this.ambientOsc.connect(this.ambientGain);
    this.ambientGain.connect(this.context.destination);

    this.ambientOsc.start(t);
  }

  setAmbientFrequency(freq: number) {
    if (this.ambientOsc) {
      this.ambientOsc.frequency.setTargetAtTime(freq, this.context!.currentTime, 0.1);
    }
  }

  stopAmbient() {
    if (!this.context || !this.ambientOsc || !this.ambientGain) return;
    const t = this.context.currentTime;
    this.ambientGain.gain.linearRampToValueAtTime(0.001, t + 1); // Fade out over 1s
    this.ambientOsc.stop(t + 1.1);

    setTimeout(() => {
      this.ambientOsc = null;
      this.ambientGain = null;
    }, 1100);
  }
}

export const synthAudio = new SynthAudio();
