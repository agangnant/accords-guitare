// js/app.js (version avec calcul de fréquence dynamique)

document.addEventListener('DOMContentLoaded', () => {

//   const AudioContext = window.AudioContext || window.webkitAudioContext;
//   const audioCtx = new AudioContext();

  // === MODIFIÉ : On ne crée PAS le contexte audio tout de suite ===
  let audioCtx = null;

  const chordSelector = document.getElementById("chord");
  const positionSelector = document.getElementById("position");
  const fretboardContainer = document.getElementById("fretboard");
  const waveformSelector = document.getElementById("waveform-type");
  const durationSelector = document.getElementById("note-duration");
  const muteButton = document.getElementById("mute-button");

  let isMuted = false;
  let isAudioUnlocked = false; // Notre nouveau drapeau pour savoir si le son est débloqué

  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const NOTE_CLASSES = { C: "c", "C#": "cs", D: "d", "D#": "ds", E: "e", F: "f", "F#": "fs", G: "g", "G#": "gs", A: "a", "A#": "as", B: "b" };
  const TUNING = [64, 59, 55, 50, 45, 40];
  let allNoteElements = [];




  function setupAudioUnlockUX() {
    const button = document.getElementById('unlock-audio');

    button.addEventListener('click', () => {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }

      // ✅ PAS de await sur iOS
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (audioCtx.state === 'running') {
        isAudioUnlocked = true;
        button.style.display = 'none';
      }
    });
  }



  function generateFretboard() {
    let html = '';
    html += '<div></div>';
    for (let s = 5; s >= 0; s--) {
      const midiNoteForDisplay = TUNING[5 - s];
      const noteName = NOTES[midiNoteForDisplay % 12];
      html += `<div class="cell nut"><div class="note ${NOTE_CLASSES[noteName]}" data-s="${s}" data-f="0">${noteName}</div></div>`;
    }
    for (let f = 1; f <= 12; f++) {
      html += `<div class="fret-number">${f}</div>`;
      for (let s = 5; s >= 0; s--) {
        const midiNoteForDisplay = TUNING[5 - s];
        const noteName = NOTES[(midiNoteForDisplay + f) % 12];
        html += `<div class="cell fret-row"><div class="note ${NOTE_CLASSES[noteName]}" data-s="${s}" data-f="${f}">${noteName}</div></div>`;
      }
    }
    fretboardContainer.innerHTML = html;
    allNoteElements = [...fretboardContainer.querySelectorAll(".note")];
  }

  function midiToFrequency(midiNote) {
    return 440 * Math.pow(2, (midiNote - 69) / 12);
  }


    function playNote(midiNote, duration, waveform) {
    // Sécurité : si le contexte n'est pas prêt ou si le son est coupé, on ne fait rien.
    if (!audioCtx || audioCtx.state !== 'running' || isMuted) return;

    const frequency = midiToFrequency(midiNote);
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


  function addSoundToNotes() {
    const unlockAndPlay = (noteElement, event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }

      // ✅ PAS de await ici
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (audioCtx.state !== 'running') return;

      const stringIndex = parseInt(noteElement.dataset.s);
      const fretNumber = parseInt(noteElement.dataset.f);
      const midiNote = TUNING[stringIndex] + fretNumber;

      playNote(
        midiNote,
        parseFloat(durationSelector.value),
        waveformSelector.value
      );
    };

    allNoteElements.forEach(noteElement => {
      noteElement.addEventListener(
        'touchstart',
        e => unlockAndPlay(noteElement, e),
        { passive:false }
      );

      noteElement.addEventListener(
        'click',
        e => unlockAndPlay(noteElement, e)
      );
    });
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

  function renderChord() {
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

  muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    muteButton.textContent = isMuted ? '🔇' : '🔊';
  });

  chordSelector.addEventListener('change', () => {
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
  setupAudioUnlockUX();
  chordSelector.value = 'all-notes';
  chordSelector.dispatchEvent(new Event('change'));
});
