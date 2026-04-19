// js/app.js (version avec contrôles audio)

document.addEventListener('DOMContentLoaded', () => {

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  const NOTE_FREQUENCIES = {
    'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13, 'E': 329.63,
    'F': 349.23, 'F#': 369.99, 'G': 392.00, 'G#': 415.30, 'A': 440.00,
    'A#': 466.16, 'B': 493.88
  };

  // === On récupère les nouveaux sélecteurs ===
  const chordSelector = document.getElementById("chord");
  const positionSelector = document.getElementById("position");
  const fretboardContainer = document.getElementById("fretboard");
  const waveformSelector = document.getElementById("waveform-type");
  const durationSelector = document.getElementById("note-duration");
  const muteButton = document.getElementById("mute-button"); // <-- On récupère le bouton

  let isMuted = false; // <-- Notre variable d'état pour le mute
  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const NOTE_CLASSES = { C: "c", "C#": "cs", D: "d", "D#": "ds", E: "e", F: "f", "F#": "fs", G: "g", "G#": "gs", A: "a", "A#": "as", B: "b" };
  const TUNING = [40, 45, 50, 55, 59, 64];
  let allNoteElements = [];

  function generateFretboard() { /* ...code identique... */
    let html = '';
    html += '<div></div>';
    for (let s = 5; s >= 0; s--) {
      const noteName = NOTES[TUNING[s] % 12];
      html += `<div class="cell nut"><div class="note ${NOTE_CLASSES[noteName]}" data-s="${s}" data-f="0">${noteName}</div></div>`;
    }
    for (let f = 1; f <= 12; f++) {
      html += `<div class="fret-number">${f}</div>`;
      for (let s = 5; s >= 0; s--) {
        const noteName = NOTES[(TUNING[s] + f) % 12];
        html += `<div class="cell fret-row"><div class="note ${NOTE_CLASSES[noteName]}" data-s="${s}" data-f="${f}">${noteName}</div></div>`;
      }
    }
    fretboardContainer.innerHTML = html;
    allNoteElements = [...fretboardContainer.querySelectorAll(".note")];
  }

  // === MODIFIÉ : La fonction accepte maintenant la durée et le type d'onde ===
  function playNote(noteName, duration, waveform) {
    if (isMuted) return; // Si le son est coupé, on ne fait rien.

    const frequency = NOTE_FREQUENCIES[noteName];
    if (!frequency) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
  }

  // === MODIFIÉ : On lit les valeurs des nouveaux contrôles avant de jouer le son ===
  function addSoundToNotes() {
    const resumeAudio = () => {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      document.removeEventListener('click', resumeAudio);
    };
    document.addEventListener('click', resumeAudio);

    allNoteElements.forEach(noteElement => {
      noteElement.addEventListener('click', () => {
        const noteName = noteElement.textContent;

        // On récupère les valeurs actuelles des contrôles
        const waveform = waveformSelector.value;
        const duration = parseFloat(durationSelector.value); // parseFloat convertit le texte "0.5" en nombre 0.5

        playNote(noteName, duration, waveform);
      });
    });
  }

  function populateChordSelector() { /* ...code identique... */
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

  function renderChord() { /* ...code identique... */
    const selectedValue = chordSelector.value;
    const isRealChord = selectedValue && selectedValue !== 'all-notes';
    if (isRealChord) {
      fretboardContainer.classList.add('chord-active');
    } else {
      fretboardContainer.classList.remove('chord-active');
    }
    allNoteElements.forEach(n => n.classList.remove("active", "root"));
    if (selectedValue === 'all-notes') {
      allNoteElements.forEach(n => n.classList.add('active'));
      return;
    }
    if (isRealChord) {
      const selectedVoicings = voicings[selectedValue];
      if (!selectedVoicings) return;
      const selectedPosition = selectedVoicings[positionSelector.value];
      if (!selectedPosition) return;
      selectedPosition.f.forEach(note => {
        const element = fretboardContainer.querySelector(`.note[data-s="${note.s - 1}"][data-f="${note.f}"]`);
        if (element) {
          element.classList.add("active");
          if (note.r) element.classList.add("root");
        }
      });
    }
  }

    // === NOUVEAU : On ajoute l'écouteur pour le bouton Mute ===
  muteButton.addEventListener('click', () => {
    isMuted = !isMuted; // On inverse l'état (true -> false, false -> true)
    muteButton.textContent = isMuted ? '🔇' : '🔊'; // On change l'icône
  });

  chordSelector.addEventListener('change', () => { /* ...code identique... */
    positionSelector.innerHTML = '';
    if (chordSelector.value === 'all-notes' || chordSelector.value === '') {
        positionSelector.style.display = 'none';
    } else {
        positionSelector.style.display = 'block';
    }
    const selectedVoicings = voicings[chordSelector.value];
    if (!selectedVoicings) {
      renderChord();
      return;
    }
    selectedVoicings.forEach((pos, index) => {
      const opt = document.createElement('option');
      opt.value = index;
      opt.textContent = pos.name;
      positionSelector.appendChild(opt);
    });
    positionSelector.selectedIndex = 0;
    renderChord();
  });

  positionSelector.addEventListener('change', renderChord);

  generateFretboard();
  populateChordSelector();
  addSoundToNotes();
  chordSelector.value = 'all-notes';
  chordSelector.dispatchEvent(new Event('change'));
});
