const AudioEngine = {
    audioCtx: null,
    isMuted: false,

    init() {
        if (this.audioCtx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();

        // Buffer silencieux pour débloquer l'audio sur iOS
        const buffer = this.audioCtx.createBuffer(1, 1, 22050);
        const source = this.audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioCtx.destination);
        source.start(0);
        console.log("Audio context débloqué.");
    },

    midiToFrequency(midiNote) {
        return 440 * Math.pow(2, (midiNote - 69) / 12);
    },

    playNote(midiNote, duration, waveform) {


        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }

        if (!this.audioCtx || this.isMuted) return;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = waveform;
        osc.frequency.value = this.midiToFrequency(midiNote);

        gain.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
        },

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }
};
