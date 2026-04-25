// --- Variables privées ---
let fretboardContainer;
let allNoteElements = [];
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NOTE_CLASSES = { C: "c", "C#": "cs", D: "d", "D#": "ds", E: "e", F: "f", "F#": "fs", G: "g", "G#": "gs", A: "a", "A#": "as", B: "b" };

// --- Objet public ---
const Fretboard = {
    // On passe les éléments du DOM et les callbacks en paramètre
    init({ container, onNoteClick }) {
        fretboardContainer = container;
        this.generate();
        this.addNoteEventListeners(onNoteClick);
    },

    generate(tuning = [64, 59, 55, 50, 45, 40]) { // Accordage standard par défaut
        let html = '<div></div>';
        for (let s = 5; s >= 0; s--) {
            const midiNote = tuning[s];
            const noteName = NOTES[midiNote % 12];
            html += `<div class="cell nut"><div class="note ${NOTE_CLASSES[noteName]}" data-s="${s}" data-f="0" data-midi="${midiNote}">${noteName}</div></div>`;
        }

        for (let f = 1; f <= 12; f++) {
            html += `<div class="fret-number">${f}</div>`;
            for (let s = 5; s >= 0; s--) {
                const midiNote = tuning[s] + f;
                const noteName = NOTES[midiNote % 12];
                html += `<div class="cell fret-row"><div class="note ${NOTE_CLASSES[noteName]}" data-s="${s}" data-f="${f}" data-midi="${midiNote}">${noteName}</div></div>`;
            }
        }
        fretboardContainer.innerHTML = html;
        allNoteElements = [...fretboardContainer.querySelectorAll(".note")];
    },

    addNoteEventListeners(onNoteClick) {
        allNoteElements.forEach(noteElement => {
            const playHandler = (event) => {
                event.preventDefault();
                const midiNote = parseInt(noteElement.dataset.midi);
                onNoteClick(midiNote); // On appelle le callback fourni à l'init
            };
            noteElement.addEventListener('touchstart', playHandler, { passive: false });
            noteElement.addEventListener('click', playHandler);
        });
    },

    renderChord(voicing) {
        const isRealChord = !!voicing;
        fretboardContainer.classList.toggle('chord-active', isRealChord);
        allNoteElements.forEach(n => n.classList.remove("active", "root"));

        if (!isRealChord) {
            // Si on veut afficher toutes les notes (cas "all-notes")
            if (voicing === null) { // On utilise null comme convention pour "all-notes"
                allNoteElements.forEach(n => n.classList.add('active'));
            }
            return;
        }

        voicing.f.forEach(note => {
            const element = fretboardContainer.querySelector(`.note[data-s="${note.s - 1}"][data-f="${note.f}"]`);
            if (element) {
                element.classList.add("active");
                if (note.r) element.classList.add("root");
            }
        });
    }
};

export default Fretboard;
