// js/app.js (version avec calcul de fréquence dynamique)

document.addEventListener('DOMContentLoaded', () => {

//   const AudioContext = window.AudioContext || window.webkitAudioContext;
//   const audioCtx = new AudioContext();

  const themeToggle = document.getElementById('theme-toggle');

  // appliquer le thème sauvegardé
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });


  // === MODIFIÉ : On ne crée PAS le contexte audio tout de suite ===
  let audioCtx = null;

  const chordSelector = document.getElementById("chord");
  const positionSelector = document.getElementById("position");
  const fretboardContainer = document.getElementById("fretboard");
  const waveformSelector = document.getElementById("waveform-type");
  const durationSelector = document.getElementById("note-duration");
  const muteButton = document.getElementById("mute-button");

  let isMuted = false;
  // let isAudioUnlocked = false; // Notre nouveau drapeau pour savoir si le son est débloqué

  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const NOTE_CLASSES = { C: "c", "C#": "cs", D: "d", "D#": "ds", E: "e", F: "f", "F#": "fs", G: "g", "G#": "gs", A: "a", "A#": "as", B: "b" };
  const TUNING = [64, 59, 55, 50, 45, 40];
  let allNoteElements = [];


  function unlockIOSAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // 🔥 SON MUET – obligatoire sur iOS
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    gain.gain.value = 0; // muet
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(0);
    osc.stop(0.01);
  }



  function updateChordPlayControls() {
    const chord = chordSelector.value;
    const enabled = chord && chord !== 'all-notes';

    playChordButton.disabled = !enabled;
    autoPlayCheckbox.disabled = !enabled;

    // Optionnel : décocher auto-play quand désactivé
    if (!enabled) {
      autoPlayCheckbox.checked = false;
    }
  }


  function setupAudioUnlockUX() {
    const button = document.getElementById('unlock-audio');

    const handler = () => {
      if (!audioCtx) unlockIOSAudio();


      // ✅ on cache le bouton
      button.style.display = 'none';

      // ✅ on supprime le message iOS
    //   document.querySelector('.ios-hint')?.remove();

    };

    button.addEventListener('touchstart', handler, { passive:true });
    button.addEventListener('click', handler);
  }



  function generateFretboard() {
      let html = '';
      html += '<div></div>'; // Espace pour les numéros de frette

      // Génération du sillet (frette 0)
      for (let s = 5; s >= 0; s--) {
          // === CORRECTION ICI ===
          const midiNoteForDisplay = TUNING[s];
          const noteName = NOTES[midiNoteForDisplay % 12];
          html += `<div class="cell nut"><div class="note ${NOTE_CLASSES[noteName]}" data-s="${s}" data-f="0">${noteName}</div></div>`;
      }

      // Génération des frettes 1 à 12
      for (let f = 1; f <= 12; f++) {
          html += `<div class="fret-number">${f}</div>`;
          for (let s = 5; s >= 0; s--) {
              // === CORRECTION ICI AUSSI ===
              // On ajoute le numéro de la frette à la note de base de la corde
              const midiNoteForDisplay = TUNING[s] + f;
              const noteName = NOTES[midiNoteForDisplay % 12];
              html += `<div class="cell fret-row"><div class="note ${NOTE_CLASSES[noteName]}" data-s="${s}" data-f="${f}">${noteName}</div></div>`;
          }
      }
      fretboardContainer.innerHTML = html;
      allNoteElements = [...fretboardContainer.querySelectorAll(".note")];
  }

  function playNote(midiNote, duration, waveform) {
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
  }


  // function playNote(midiNote, duration, waveform) {
  //   if (!audioCtx || isMuted) return;

  //   const t = audioCtx.currentTime;

  //   const osc = audioCtx.createOscillator();
  //   const gain = audioCtx.createGain();
  //   const filter = audioCtx.createBiquadFilter();

  //   // osc.type = "triangle"; // meilleur pour guitare
  //   osc.frequency.value = midiToFrequency(midiNote);
  //   osc.detune.value = (Math.random() - 0.5) * 6;

  //   filter.type = "lowpass";
  //   filter.frequency.value = 1800;
  //   filter.Q.value = 0.7;

  //   gain.gain.setValueAtTime(0, t);
  //   gain.gain.linearRampToValueAtTime(0.6, t + 0.015);
  //   gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

  //   osc.connect(filter);
  //   filter.connect(gain);
  //   gain.connect(audioCtx.destination);

  //   osc.start(t);
  //   osc.stop(t + duration);
  // }

  function playChord(voicing) {
    if (!audioCtx || isMuted || !voicing) return;

    // ordre guitare : corde grave → aiguë
    const notes = voicing.f
      .filter(n => n.f >= 0)          // ignore cordes étouffées
      .sort((a, b) => b.s - a.s);     // 6 → 1

    notes.forEach((note, index) => {
      const midi = TUNING[note.s - 1] + note.f;

      // petit délai = strum
      setTimeout(() => {
        playNote(
          midi,
          parseFloat(durationSelector.value),
          waveformSelector.value
        );
      }, index * 30); // 40 ms entre cordes
    });
  }


  function midiToFrequency(midiNote) {
    return 440 * Math.pow(2, (midiNote - 69) / 12);
  }


  function addSoundToNotes() {
    const playFromNote = (noteElement, event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!audioCtx) return; // son pas encore activé

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
        e => playFromNote(noteElement, e),
        { passive:false }
      );

      noteElement.addEventListener(
        'click',
        e => playFromNote(noteElement, e)
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


  const playChordButton = document.getElementById('play-chord');
  const autoPlayCheckbox = document.getElementById('auto-play-chord');

  playChordButton.addEventListener('click', () => {
    const chord = chordSelector.value;
    if (!chord || chord === 'all-notes') return;

    const positions = voicings[chord];
    const positionIndex = positionSelector.value;
    const voicing = positions[positionIndex];

    playChord(voicing);
  });

  muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    muteButton.textContent = isMuted ? '🔇' : '🔊';
  });

  let isUpdatingChord = false;
  chordSelector.addEventListener('change', () => {
    updateChordPlayControls()
    isUpdatingChord = true;
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


    if (autoPlayCheckbox.checked) {
      playChord(selectedVoicings[0]);
    }

    isUpdatingChord = false;

    selectedVoicings.forEach((pos, index) => {
      const opt = document.createElement('option');
      opt.value = index;
      opt.textContent = pos.name;
      positionSelector.appendChild(opt);
    });

    positionSelector.selectedIndex = 0;
    renderChord();


    // 🔊 Auto-play si activé
    if (autoPlayCheckbox.checked) {
      const voicing = selectedVoicings[0];
      playChord(voicing);
}

  });




  // positionSelector.addEventListener('change', renderChord);


  positionSelector.addEventListener('change', () => {
    renderChord();

    // 🔊 Auto-play si activé
    if (autoPlayCheckbox.checked) {
      const chord = chordSelector.value;
      if (!chord || chord === 'all-notes') return;

      const voicing = voicings[chord][positionSelector.value];
      playChord(voicing);

    if (isUpdatingChord) return;
    }
  });


  generateFretboard();
  populateChordSelector();
  addSoundToNotes();
  setupAudioUnlockUX();
  updateChordPlayControls();
  chordSelector.value = 'all-notes';
  chordSelector.dispatchEvent(new Event('change'));
});
