// --- Variables privées au module ---
let audioCtx = null;
let isMuted = false;

// --- Fonctions privées ---
function midiToFrequency(midiNote) {
    return 440 * Math.pow(2, (midiNote - 69) / 12);
}

// --- Objet public que l'on va exporter ---
const AudioEngine = {
    // Initialise le contexte audio (action de l'utilisateur requise sur iOS)
    init() {
        if (audioCtx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();

        // Buffer silencieux pour débloquer l'audio sur iOS
        const buffer = audioCtx.createBuffer(1, 1, 22050);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
        console.log("Audio context unlocked.");
    },

    playNote(midiNote, duration, waveform) {
        if (!audioCtx || isMuted) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = waveform;
        osc.frequency.value = midiToFrequency(midiNote);

        gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    },

    playChord(voicing, tuning, duration, waveform) {
        if (!audioCtx || isMuted || !voicing) return;

        const notes = voicing.f.filter(n => n.f >= 0).sort((a, b) => b.s - a.s);

        notes.forEach((note, index) => {
            const midi = tuning[note.s - 1] + note.f;
            setTimeout(() => {
                this.playNote(midi, duration, waveform);
            }, index * 30);
        });
    },

    toggleMute() {
        isMuted = !isMuted;
        return isMuted;
    },

    isReady() {
        return !!audioCtx;
    }
};

// On exporte l'objet pour qu'il soit utilisable ailleurs
export default AudioEngine;
