const Fretboard = {
    container: null,
    allNoteElements: [],

    SHARP_TO_FLAT: {
        "C#": "Db",
        "D#": "Eb",
        "F#": "Gb",
        "G#": "Ab",
        "A#": "Bb"
    },
    FLAT_TO_SHARP: {
        "Db": "C#",
        "Eb": "D#",
        "Gb": "F#",
        "Ab": "G#",
        "Bb": "A#"
    },

    NOTES: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    NOTE_CLASSES: { C: "c", "C#": "cs", D: "d", "D#": "ds", E: "e", F: "f", "F#": "fs", G: "g", "G#": "gs", A: "a", "A#": "as", B: "b" },
    TUNING: [64, 59, 55, 50, 45, 40],
    BASS_TUNING: [55, 50, 45, 40],

    init(containerElement) {
        this.container = containerElement;
        this.generate();
    },


    getTuning(isBassMode = false) {
        return isBassMode ? this.BASS_TUNING : this.TUNING;
    },


    generate(isBassMode = false) {
        const tuning = isBassMode ? this.BASS_TUNING : this.TUNING;
        const stringCount = isBassMode ? 4 : 6;
        this.container.style.gridTemplateColumns = `24px repeat(${stringCount}, 40px)`;
        let html = '<div></div>';
        for (let s = stringCount - 1; s >= 0; s--) {
            const midiNote = tuning[s];
            const noteName = this.NOTES[midiNote % 12];
            const originalStringIndex = isBassMode ? s + 2 : s;
            html += `<div class="cell nut"><div class="note ${this.NOTE_CLASSES[noteName]}" data-s="${originalStringIndex}" data-f="0">${noteName}</div></div>`;
        }
        for (let f = 1; f <= 12; f++) {
            let rowClass = '';
            const markedFrets = [3, 5, 7, 9];
            if (markedFrets.includes(f)) {
                rowClass = ' marked';
            } else if (f === 12) {
                rowClass = ' marked-octave';
            }
            html += `<div class="fret-number fret-row${rowClass}">${f}</div>`;
            for (let s = stringCount - 1; s >= 0; s--) {
                const midiNote = tuning[s] + f;
                const noteName = this.NOTES[midiNote % 12];
                const originalStringIndex = isBassMode ? s + 2 : s;
                html += `<div class="cell fret-row${rowClass}"><div class="note ${this.NOTE_CLASSES[noteName]}" data-s="${originalStringIndex}" data-f="${f}">${noteName}</div></div>`;
            }
        }
        this.container.innerHTML = html;
        this.allNoteElements = [...this.container.querySelectorAll(".note")];
    },
    renderChord(voicing) {
        // === NETTOYAGE ===
        this.container.classList.remove('filter-active'); // On retire le mode filtre
        this.allNoteElements.forEach(n => n.classList.remove("active", "root"));

        // === LOGIQUE D'AFFICHAGE ===
        const isRealChord = !!voicing;
        this.container.classList.toggle('chord-active', isRealChord);

        if (voicing === 'all-notes') {
            this.allNoteElements.forEach(n => n.classList.add('active'));
            return;
        }

        if (isRealChord) {
            voicing.f.forEach(note => {
                const element = this.container.querySelector(`.note[data-s="${note.s - 1}"][data-f="${note.f}"]`);
                if (element) {
                    element.classList.add("active");
                    if (note.r) element.classList.add("root");
                }
            });
        }
    },



    updateNoteLabels(useFlats = false) {
        this.allNoteElements.forEach(noteEl => {
            const current = noteEl.textContent;

            if (useFlats && this.SHARP_TO_FLAT[current]) {
                noteEl.textContent = this.SHARP_TO_FLAT[current];
            }
            else if (!useFlats && this.FLAT_TO_SHARP[current]) {
                noteEl.textContent = this.FLAT_TO_SHARP[current];
            }
        });
    },

    renderFilteredNotes(notesToFilter) {
        // === NETTOYAGE ===
        this.container.classList.remove('chord-active'); // On retire le mode accord
        this.allNoteElements.forEach(n => n.classList.remove("root"));

        // === LOGIQUE D'AFFICHAGE ===
        const showAll = notesToFilter.length === 0;
        this.container.classList.add('filter-active'); // On s'assure que le mode filtre est actif

        this.allNoteElements.forEach(noteEl => {
            const noteName = noteEl.textContent;
            if (showAll || notesToFilter.includes(noteName)) {
                noteEl.classList.add('active');
            } else {
                noteEl.classList.remove('active');
            }
        });
    }
};
