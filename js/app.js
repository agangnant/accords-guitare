// js/app.js (version mise à jour)

document.addEventListener('DOMContentLoaded', () => {

  // ... (Toutes les constantes et les fonctions generateFretboard et populateChordSelector restent identiques) ...
  const chordSelector = document.getElementById("chord");
  const positionSelector = document.getElementById("position");
  const fretboardContainer = document.getElementById("fretboard");
  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const NOTE_CLASSES = { C: "c", "C#": "cs", D: "d", "D#": "ds", E: "e", F: "f", "F#": "fs", G: "g", "G#": "gs", A: "a", "A#": "as", B: "b" };
  const TUNING = [40, 45, 50, 55, 59, 64];
  let allNoteElements = [];

  function generateFretboard() {
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

  function populateChordSelector() {
    // Cette fonction ne change pas, elle construit le menu comme avant.
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

  // ================== LOGIQUE D'AFFICHAGE DES ACCORDS (MODIFIÉE) ==================
  function renderChord() {
    // 1. On efface toujours le manche pour commencer
    allNoteElements.forEach(n => n.classList.remove("active", "root"));

    // 2. CAS SPÉCIAL : Si l'utilisateur a choisi "Toutes les notes"
    if (chordSelector.value === 'all-notes') {
      allNoteElements.forEach(n => n.classList.add('active'));
      return; // On arrête la fonction ici, on n'a pas besoin d'aller plus loin.
    }

    // 3. CAS NORMAL : Afficher un accord (le code que vous aviez déjà)
    const selectedVoicings = voicings[chordSelector.value];
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

  // ... (Les gestionnaires d'événements et l'initialisation ne changent pas) ...
  chordSelector.addEventListener('change', () => {
    positionSelector.innerHTML = '';
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
  // === LES 2 LIGNES AJOUTÉES SONT ICI ===
  // 1. On définit la valeur du sélecteur sur "all-notes" par défaut.
  chordSelector.value = 'all-notes';

  // 2. On appelle manuellement la fonction d'affichage pour que le changement soit pris en compte.
  chordSelector.dispatchEvent(new Event('change'));
});
