import { voicings } from '../data/voicings.js';
import AudioEngine from './AudioEngine.js';
import Fretboard from './Fretboard.js';

// Le reste du code est bon, mais je l'ai nettoyé pour être sûr.
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Récupération des éléments du DOM ---
    const chordSelector = document.getElementById("chord");
    const positionSelector = document.getElementById("position");
    const fretboardContainer = document.getElementById("fretboard");
    const waveformSelector = document.getElementById("waveform-type");
    const durationSelector = document.getElementById("note-duration");
    const muteButton = document.getElementById("mute-button");
    const themeToggle = document.getElementById('theme-toggle');
    const unlockButton = document.getElementById('unlock-audio');
    const playChordButton = document.getElementById('play-chord');
    const autoPlayCheckbox = document.getElementById('auto-play-chord');

    // --- 2. Initialisation des modules ---
    Fretboard.init({
        container: fretboardContainer,
        onNoteClick: (midiNote) => {
            if (AudioEngine.isReady()) {
                AudioEngine.playNote(
                    midiNote,
                    parseFloat(durationSelector.value),
                    waveformSelector.value
                );
            } else {
                unlockButton.style.transform = 'scale(1.1)';
                setTimeout(() => unlockButton.style.transform = 'scale(1)', 200);
            }
        }
    });

    // --- 3. Logique de l'application et gestion des événements ---

    // Thème
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeToggle.textContent = '☀️';
    } else {
        // CORRECTION : Il manquait l'emoji lune pour le thème clair
        themeToggle.textContent = '🌙';
    }
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        // CORRECTION : Il manquait l'emoji lune ici aussi
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Déblocage audio
    const unlockHandler = () => {
        AudioEngine.init();
        unlockButton.style.display = 'none';
    };
    unlockButton.addEventListener('touchstart', unlockHandler, { passive: true });
    unlockButton.addEventListener('click', unlockHandler);

    // Mute
    // CORRECTION : Initialiser le bouton au chargement
    muteButton.textContent = '🔊';
    muteButton.addEventListener('click', () => {
        const isMuted = AudioEngine.toggleMute();
        // CORRECTION : Il manquait les emojis ici
        muteButton.textContent = isMuted ? '🔇' : '🔊';
    });

    // Sélection d'accord
    chordSelector.addEventListener('change', () => {
        const chordKey = chordSelector.value;
        const positions = voicings[chordKey];

        positionSelector.innerHTML = '';
        if (!positions) {
            positionSelector.style.display = 'none';
            Fretboard.renderChord(chordKey === 'all-notes' ? null : undefined);
        } else {
            positionSelector.style.display = 'block';
            positions.forEach((pos, index) => {
                const opt = document.createElement('option');
                opt.value = index;
                opt.textContent = pos.name;
                positionSelector.appendChild(opt);
            });
            positionSelector.dispatchEvent(new Event('change'));
        }
        updateChordPlayControls();
    });

    // Sélection de position
    positionSelector.addEventListener('change', () => {
        const chordKey = chordSelector.value;
        const positionIndex = positionSelector.value;
        const voicing = voicings[chordKey]?.[positionIndex];
        Fretboard.renderChord(voicing);

        if (autoPlayCheckbox.checked && voicing) {
            playCurrentChord();
        }
    });

    // Outils de lecture d'accord
    function playCurrentChord() {
        const chordKey = chordSelector.value;
        const positionIndex = positionSelector.value;
        const voicing = voicings[chordKey]?.[positionIndex];
        if (voicing) {
            AudioEngine.playChord(
                voicing,
                [64, 59, 55, 50, 45, 40],
                parseFloat(durationSelector.value),
                waveformSelector.value
            );
        }
    }

    function updateChordPlayControls() {
        const enabled = chordSelector.value && chordSelector.value !== 'all-notes';
        playChordButton.disabled = !enabled;
        autoPlayCheckbox.disabled = !enabled;
        if (!enabled) autoPlayCheckbox.checked = false;
    }

    playChordButton.addEventListener('click', playCurrentChord);

    // --- 4. État initial de l'application ---

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

    // Lancement
    populateChordSelector();
    updateChordPlayControls();
    chordSelector.value = 'all-notes';
    chordSelector.dispatchEvent(new Event('change'));
    // document.querySelector('h1').textContent = "Guitare App - Test " + Math.floor(Math.random() * 100);
});
