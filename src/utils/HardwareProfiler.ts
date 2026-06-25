export type HardwareTier = 1 | 2 | 3;

export interface WebGLSettings {
  dpr: number | [number, number];
  effectsEnabled: boolean;
  particleCount: number;
  geometrySegments: number;
}

class HardwareProfiler {
  private tier: HardwareTier | null = null;
  private isMobileDevice: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.isMobileDevice = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
    }
  }

  /**
   * Run a lightweight hardware benchmark/check.
   * Caches the result so it stays permanently allocated.
   */
  public runBenchmark(): HardwareTier {
    if (this.tier !== null) return this.tier;

    if (this.isMobileDevice) {
      this.tier = 3;
      return this.tier;
    }

    const nav = navigator as any;
    const ram = nav.deviceMemory || 4; // Defaults to 4GB if API not supported
    const cores = nav.hardwareConcurrency || 4;

    if (ram >= 8 && cores >= 8) {
      this.tier = 1; // High-end PC
    } else if (ram >= 4 && cores >= 4) {
      this.tier = 2; // Mid-range PC
    } else {
      this.tier = 3; // Low-end PC
    }

    return this.tier;
  }

  public getSettings(): WebGLSettings {
    const tier = this.tier || this.runBenchmark();

    switch (tier) {
      case 1:
        return {
          dpr: [1, 1], // Capped at 1.0 to prevent GPU driver crashes on 4K screens with post-processing
          effectsEnabled: true,
          particleCount: 500, // Reduced from 1000 to prevent WebGL memory spikes
          geometrySegments: 32,
        };
      case 2:
        return {
          dpr: [1, 1], // Cap at 1.0 for mid-range to ensure 60fps
          effectsEnabled: true,
          particleCount: 500,
          geometrySegments: 32,
        };
      case 3:
      default:
        return {
          dpr: [0.8, 1], // Lower DPR
          effectsEnabled: false, // Turn off post-processing
          particleCount: 300,
          geometrySegments: 16, // Simpler geometry
        };
    }
  }
}

export const hardwareProfiler = new HardwareProfiler();
