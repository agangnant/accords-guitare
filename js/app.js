document.addEventListener('DOMContentLoaded', () => {
    // --- 1. RÉCUPÉRATION DES ÉLÉMENTS DU DOM ---
    const themeToggle = document.getElementById('theme-toggle');
    const chordSelector = document.getElementById("chord");
    const positionSelector = document.getElementById("position");
    const fretboardContainer = document.getElementById("fretboard");
    const waveformSelector = document.getElementById("waveform-type");
    const durationSelector = document.getElementById("note-duration");
    const muteButton = document.getElementById("mute-button");
    const unlockButton = document.getElementById('unlock-audio');
    const playChordButton = document.getElementById('play-chord');
    const autoPlayCheckbox = document.getElementById('auto-play-chord');
    const bassModeToggle = document.getElementById('bass-mode-toggle');
    const noteFilterControls = document.getElementById('note-filter-controls');
    const noteFilterButtons = noteFilterControls.querySelectorAll('.note-filter-btn');
    const enharmonicToggle = document.getElementById('enharmonic-toggle');

    let activeFilterNotes = [];

    // --- 2. INITIALISATION ---
    Fretboard.init(fretboardContainer);
    // --- 3. DÉCLARATION DES FONCTIONS "HELPER" ---

    function addNoteClickEvents() {
        Fretboard.allNoteElements.forEach(noteElement => {
            const playHandler = (event) => {
                if (!AudioEngine.audioCtx) return;
                event.preventDefault();
                const stringIndex = parseInt(noteElement.dataset.s);
                const fretNumber = parseInt(noteElement.dataset.f);

                const isBassMode = bassModeToggle.checked;
                const tuning = Fretboard.getTuning(isBassMode);
                const midiNote = tuning[stringIndex] + fretNumber;

                AudioEngine.playNote(midiNote, parseFloat(durationSelector.value), waveformSelector.value);
            };
            noteElement.addEventListener('pointerdown', playHandler);
        });
    }

    function playCurrentChord() {


        if (!AudioEngine.audioCtx) return;
        if (AudioEngine.audioCtx.state === 'suspended') {
            AudioEngine.audioCtx.resume();
        }

        const chord = chordSelector.value;


        if (!chord || chord === 'all-notes') return;

        if (!voicings[chord] || !voicings[chord][positionSelector.value]) return;

        const voicing = voicings[chord][positionSelector.value];
        const isBassMode = bassModeToggle.checked;

        let notes = voicing.f.filter(n => n.f >= 0).sort((a, b) => b.s - a.s);

        if (isBassMode) {
            notes = notes.filter(n => n.s >= 3);
        }

        notes.forEach((note, index) => {
            const tuning = Fretboard.getTuning(isBassMode);
            const midi = tuning[note.s - 1] + note.f;
            setTimeout(() => {
                AudioEngine.playNote(midi, parseFloat(durationSelector.value), waveformSelector.value);
            }, index * 30);
        });
    }

    function updateChordPlayControls() {
        const chord = chordSelector.value;
        const enabled = chord && chord !== 'all-notes';
        playChordButton.disabled = !enabled;
        autoPlayCheckbox.disabled = !enabled;
        if (!enabled) {
            autoPlayCheckbox.checked = false;
        }
    }

    function populateChordSelector() {
        const chordGroups = {
            "Accords Majeurs": { chords: ["C", "D", "E", "F", "G", "A", "B"] },
            "Accords Mineurs": { chords: ["Cm", "Dm", "Em", "Fm", "Gm", "Am", "Bm"] },
            "Accords Majeurs ♯ / ♭": { chords: ["A#", "C#", "D#", "F#", "G#"], names: {"A#": "Bb / A#", "C#": "Db / C#", "D#": "Eb / D#", "F#": "Gb / F#", "G#": "Ab / G#"} },
            "Accords Mineurs ♯ / ♭": { chords: ["C#m", "D#m", "F#m", "G#m", "A#m"], names: {"C#m": "Dbm / C#m", "D#m": "Ebm / D#m", "F#m": "Gbm / F#m", "G#m": "Abm / G#m", "A#m": "Bbm / A#m"} },
            "Accords Majeurs 7": { chords: ["C7", "D7", "E7", "F7", "G7", "A7", "B7"] },
            "Accords Mineurs 7": { chords: ["Cm7", "Dm7", "Em7", "Fm7", "Gm7", "Am7", "Bm7"] },
            "Accords 7 (♯ / ♭)": { chords: ["A#7", "C#7", "D#7", "F#7", "G#7"], names: {"A#7": "Bb7 / A#7", "C#7": "Db7 / C#7", "D#7": "Eb7 / D#7", "F#7": "Gb7 / F#7", "G#7": "Ab7 / G#7"} },
            "Accords mineurs 7 (♯ / ♭)": { chords: ["A#m7", "C#m7", "D#m7", "F#m7", "G#m7"], names: {"A#m7": "Bbm7 / A#m7", "C#m7": "Dbm7 / C#m7", "D#m7": "Ebm7 / D#m7", "F#m7": "Gbm7 / F#m7", "G#m7": "Abm7 / G#m7"} }
        };
        for (const groupLabel in chordGroups) {
            const group = chordGroups[groupLabel];
            const optgroup = document.createElement('optgroup');
            optgroup.label = groupLabel;
            group.chords.forEach(chordValue => {
                if (voicings[chordValue]) {
                    const option = document.createElement('option');
                    option.value = chordValue;
                    option.textContent = (group.names && group.names[chordValue]) ? group.names[chordValue] : chordValue;
                    optgroup.appendChild(option);
                }
            });
            chordSelector.appendChild(optgroup);
        }
    }


    function updateFilterButtons(useFlats) {
        noteFilterButtons.forEach(button => {
            const current = button.dataset.note;

            if (useFlats && Fretboard.SHARP_TO_FLAT[current]) {
                const flat = Fretboard.SHARP_TO_FLAT[current];
                button.dataset.note = flat;
                button.textContent = flat;
            }
            else if (!useFlats && Fretboard.FLAT_TO_SHARP[current]) {
                const sharp = Fretboard.FLAT_TO_SHARP[current];
                button.dataset.note = sharp;
                button.textContent = sharp;
            }
        });
    }

    // --- 4. GESTION DES ÉVÉNEMENTS ---
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    const unlockHandler = () => { AudioEngine.init(); unlockButton.style.display = 'none'; };
    unlockButton.addEventListener('touchstart', unlockHandler, { passive: true });
    unlockButton.addEventListener('click', unlockHandler);

    muteButton.addEventListener('click', () => {
        const isMuted = AudioEngine.toggleMute();
        muteButton.textContent = isMuted ? '🔇' : '🔊';
    });

    bassModeToggle.addEventListener('change', () => {
        const isBass = bassModeToggle.checked;
        Fretboard.generate(isBass);
        addNoteClickEvents();
        chordSelector.dispatchEvent(new Event('change'));
    });



    enharmonicToggle.addEventListener('change', () => {
        const useFlats = enharmonicToggle.checked;

        Fretboard.updateNoteLabels(useFlats);
        updateFilterButtons(enharmonicToggle.checked);
        updateFilterButtons(useFlats);

        // Recalcule le filtre actif avec les nouveaux noms
        Fretboard.renderFilteredNotes(activeFilterNotes);
    });


    noteFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const note = button.dataset.note;
            button.classList.toggle('active');
            if (activeFilterNotes.includes(note)) {
                activeFilterNotes = activeFilterNotes.filter(n => n !== note);
            } else {
                activeFilterNotes.push(note);
            }
            Fretboard.renderFilteredNotes(activeFilterNotes);
        });
    });
    chordSelector.addEventListener('change', () => {
        updateChordPlayControls();
        const selectedValue = chordSelector.value;
        positionSelector.innerHTML = '';

        // Cas 1 : Un accord est sélectionné
        if (selectedValue && selectedValue !== 'all-notes' && selectedValue !== '') {
            noteFilterControls.style.display = 'none';
            positionSelector.style.display = 'block';

            const selectedVoicings = voicings[selectedValue];
            selectedVoicings.forEach((pos, index) => {
                const opt = document.createElement('option');
                opt.value = index;
                opt.textContent = pos.name;
                positionSelector.appendChild(opt);
            });
            positionSelector.dispatchEvent(new Event('change')); // Déclenche le rendu de l'accord

            // // ✅ AUTO-PLAY
            // if (autoPlayCheckbox.checked) {
            //     playCurrentChord();
            // }
        }
        // Cas 2 : "Toutes les notes" est sélectionné
        else if (selectedValue === 'all-notes') {
            noteFilterControls.style.display = 'none';
            positionSelector.style.display = 'none';
            Fretboard.renderChord('all-notes'); // Appelle la fonction de rendu
        }
        // Cas 3 : "— Filtrer par note —" est sélectionné (mode filtre)
        else {
                noteFilterControls.style.display = 'flex';
                fretboardContainer.classList.add('filter-active');
                positionSelector.style.display = 'none';
                Fretboard.renderFilteredNotes(activeFilterNotes);
            }
    });

    positionSelector.addEventListener('change', () => {
        const chord = chordSelector.value;
        if (!chord || chord === 'all-notes') return;

        const positionIndex = positionSelector.value;
        const voicing = voicings[chord][positionIndex];

        Fretboard.renderChord(voicing);

        // ✅ AUTO-PLAY
        if (autoPlayCheckbox.checked) {
            playCurrentChord();
        }
    });

    playChordButton.addEventListener('click', playCurrentChord);

    // --- 5. LANCEMENT DE L'APPLICATION ---
    populateChordSelector();
    updateChordPlayControls();
    addNoteClickEvents();
    noteFilterControls.style.display = 'none';
    chordSelector.value = 'all-notes';
    chordSelector.dispatchEvent(new Event('change'));
});
