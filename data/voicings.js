// data/voicings.js

const voicings = {

  /* ================== MAJEURS ================== */
  C: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 3, r: true }, { s: 4, f: 2 }, { s: 3, f: 0 }, { s: 2, f: 1 }, { s: 1, f: 0 }
      ]
    },
    {
      name: 'Barré case 3 (Forme de La)',
      f: [
        { s: 6, f: 3 }, { s: 5, f: 3, r: true }, { s: 4, f: 5 }, { s: 3, f: 5 }, { s: 2, f: 5 }, { s: 1, f: 3 }
      ]
    },
    {
      name: 'Barré case 8 (Forme de Mi)',
      f: [
        { s: 6, f: 8 }, { s: 5, f: 10 }, { s: 4, f: 10 }, { s: 3, f: 9 }, { s: 2, f: 8, r: true }, { s: 1, f: 8 }
      ]
    }
  ],
  D: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: -1 }, { s: 5, f: -1 }, { s: 4, f: 0, r: true }, { s: 3, f: 2 }, { s: 2, f: 3 }, { s: 1, f: 2 }
      ]
    },
    {
      name: 'Barré case 5 (Forme de La)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 5, r: true }, { s: 4, f: 7 }, { s: 3, f: 7 }, { s: 2, f: 7 }, { s: 1, f: 5 }
      ]
    },
    {
      name: 'Barré case 10 (Forme de Mi)',
      f: [
        { s: 6, f: 10, r: true }, { s: 5, f: 12 }, { s: 4, f: 12 }, { s: 3, f: 11 }, { s: 2, f: 10 }, { s: 1, f: 10 }
      ]
    }
  ],
  E: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: 0, r: true }, { s: 5, f: 2 }, { s: 4, f: 2 }, { s: 3, f: 1 }, { s: 2, f: 0 }, { s: 1, f: 0 }
      ]
    },
    {
      name: 'Barré case 7 (Forme de La)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 7, r: true }, { s: 4, f: 9 }, { s: 3, f: 9 }, { s: 2, f: 9 }, { s: 1, f: 7 }
      ]
    }
  ],
  F: [
    {
      name: 'Barré case 1 (Forme de Mi)',
      f: [
        { s: 6, f: 1, r: true }, { s: 5, f: 3 }, { s: 4, f: 3 }, { s: 3, f: 2 }, { s: 2, f: 1 }, { s: 1, f: 1 }
      ]
    },
    {
      name: 'Barré case 8 (Forme de La)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 8, r: true }, { s: 4, f: 10 }, { s: 3, f: 10 }, { s: 2, f: 10 }, { s: 1, f: 8 }
      ]
    }
  ],
  G: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: 3, r: true }, { s: 5, f: 2 }, { s: 4, f: 0 }, { s: 3, f: 0 }, { s: 2, f: 0 }, { s: 1, f: 3 }
      ]
    },
    {
      name: 'Barré case 3 (Forme de Mi)',
      f: [
        { s: 6, f: 3, r: true }, { s: 5, f: 5 }, { s: 4, f: 5 }, { s: 3, f: 4 }, { s: 2, f: 3 }, { s: 1, f: 3 }
      ]
    },
    {
      name: 'Barré case 10 (Forme de La)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 10, r: true }, { s: 4, f: 12 }, { s: 3, f: 12 }, { s: 2, f: 12 }, { s: 1, f: 10 }
      ]
    }
  ],
  A: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 0, r: true }, { s: 4, f: 2 }, { s: 3, f: 2 }, { s: 2, f: 2 }, { s: 1, f: 0 }
      ]
    },
    {
      name: 'Barré case 5 (Forme de Mi)',
      f: [
        { s: 6, f: 5, r: true }, { s: 5, f: 7 }, { s: 4, f: 7 }, { s: 3, f: 6 }, { s: 2, f: 5 }, { s: 1, f: 5 }
      ]
    }
  ],
  B: [
    {
      name: 'Barré case 2 (Forme de La)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 2, r: true }, { s: 4, f: 4 }, { s: 3, f: 4 }, { s: 2, f: 4 }, { s: 1, f: 2 }
      ]
    },
    {
      name: 'Barré case 7 (Forme de Mi)',
      f: [
        { s: 6, f: 7, r: true }, { s: 5, f: 9 }, { s: 4, f: 9 }, { s: 3, f: 8 }, { s: 2, f: 7 }, { s: 1, f: 7 }
      ]
    }
  ],

  /* ================== MINEURS ================== */
  Cm: [
    {
      name: 'Barré case 3 (Forme de Am)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 3, r: true }, { s: 4, f: 5 }, { s: 3, f: 5 }, { s: 2, f: 4 }, { s: 1, f: 3 }
      ]
    },
    {
      name: 'Barré case 8 (Forme de Em)',
      f: [
        { s: 6, f: 8, r: true }, { s: 5, f: 10 }, { s: 4, f: 10 }, { s: 3, f: 8 }, { s: 2, f: 8 }, { s: 1, f: 8 }
      ]
    }
  ],
  Dm: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: -1 }, { s: 5, f: -1 }, { s: 4, f: 0, r: true }, { s: 3, f: 2 }, { s: 2, f: 3 }, { s: 1, f: 1 }
      ]
    },
    {
      name: 'Barré case 5 (Forme de Am)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 5, r: true }, { s: 4, f: 7 }, { s: 3, f: 7 }, { s: 2, f: 6 }, { s: 1, f: 5 }
      ]
    },
    {
      name: 'Barré case 10 (Forme de Em)',
      f: [
        { s: 6, f: 10, r: true }, { s: 5, f: 12 }, { s: 4, f: 12 }, { s: 3, f: 10 }, { s: 2, f: 10 }, { s: 1, f: 10 }
      ]
    }
  ],
  Em: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: 0, r: true }, { s: 5, f: 2 }, { s: 4, f: 2 }, { s: 3, f: 0 }, { s: 2, f: 0 }, { s: 1, f: 0 }
      ]
    },
    {
      name: 'Barré case 7 (Forme de Am)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 7, r: true }, { s: 4, f: 9 }, { s: 3, f: 9 }, { s: 2, f: 8 }, { s: 1, f: 7 }
      ]
    }
  ],
  Fm: [
    {
      name: 'Barré case 1 (Forme de Em)',
      f: [
        { s: 6, f: 1, r: true }, { s: 5, f: 3 }, { s: 4, f: 3 }, { s: 3, f: 1 }, { s: 2, f: 1 }, { s: 1, f: 1 }
      ]
    }
  ],
  Gm: [
    {
      name: 'Barré case 3 (Forme de Em)',
      f: [
        { s: 6, f: 3, r: true }, { s: 5, f: 5 }, { s: 4, f: 5 }, { s: 3, f: 3 }, { s: 2, f: 3 }, { s: 1, f: 3 }
      ]
    },
    {
      name: 'Barré case 10 (Forme de Am)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 10, r: true }, { s: 4, f: 12 }, { s: 3, f: 12 }, { s: 2, f: 11 }, { s: 1, f: 10 }
      ]
    }
  ],
  Am: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 0, r: true }, { s: 4, f: 2 }, { s: 3, f: 2 }, { s: 2, f: 1 }, { s: 1, f: 0 }
      ]
    },
    {
      name: 'Barré case 5 (Forme de Em)',
      f: [
        { s: 6, f: 5, r: true }, { s: 5, f: 7 }, { s: 4, f: 7 }, { s: 3, f: 5 }, { s: 2, f: 5 }, { s: 1, f: 5 }
      ]
    }
  ],
  Bm: [
    {
      name: 'Barré case 2 (Forme de Am)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 2, r: true }, { s: 4, f: 4 }, { s: 3, f: 4 }, { s: 2, f: 3 }, { s: 1, f: 2 }
      ]
    },
    {
      name: 'Barré case 7 (Forme de Em)',
      f: [
        { s: 6, f: 7, r: true }, { s: 5, f: 9 }, { s: 4, f: 9 }, { s: 3, f: 7 }, { s: 2, f: 7 }, { s: 1, f: 7 }
      ]
    }
  ],

  /* ================== MAJEURS ♯ / ♭ ================== */
  'A#': [
    {
      name: 'Barré case 1 (Forme de La)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 1, r: true }, { s: 4, f: 3 }, { s: 3, f: 3 }, { s: 2, f: 3 }, { s: 1, f: 1 }
      ]
    },
    {
      name: 'Barré case 6 (Forme de Mi)',
      f: [
        { s: 6, f: 6, r: true }, { s: 5, f: 8 }, { s: 4, f: 8 }, { s: 3, f: 7 }, { s: 2, f: 6 }, { s: 1, f: 6 }
      ]
    }
  ],
  'C#': [
    {
      name: 'Barré case 4 (Forme de La)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 4, r: true }, { s: 4, f: 6 }, { s: 3, f: 6 }, { s: 2, f: 6 }, { s: 1, f: 4 }
      ]
    },
    {
      name: 'Barré case 9 (Forme de Mi)',
      f: [
        { s: 6, f: 9, r: true }, { s: 5, f: 11 }, { s: 4, f: 11 }, { s: 3, f: 10 }, { s: 2, f: 9 }, { s: 1, f: 9 }
      ]
    }
  ],
  'D#': [
    {
      name: 'Barré case 6 (Forme de La)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 6, r: true }, { s: 4, f: 8 }, { s: 3, f: 8 }, { s: 2, f: 8 }, { s: 1, f: 6 }
      ]
    }
  ],
  'F#': [
    {
      name: 'Barré case 2 (Forme de Mi)',
      f: [
        { s: 6, f: 2, r: true }, { s: 5, f: 4 }, { s: 4, f: 4 }, { s: 3, f: 3 }, { s: 2, f: 2 }, { s: 1, f: 2 }
      ]
    },
    {
      name: 'Barré case 9 (Forme de La)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 9, r: true }, { s: 4, f: 11 }, { s: 3, f: 11 }, { s: 2, f: 11 }, { s: 1, f: 9 }
      ]
    }
  ],
  'G#': [
    {
      name: 'Barré case 4 (Forme de Mi)',
      f: [
        { s: 6, f: 4, r: true }, { s: 5, f: 6 }, { s: 4, f: 6 }, { s: 3, f: 5 }, { s: 2, f: 4 }, { s: 1, f: 4 }
      ]
    }
  ],

  /* ================== MINEURS ♯ ================== */
  'A#m': [
    {
      name: 'Barré case 6 (Forme de Em)',
      f: [
        { s: 6, f: 6, r: true }, { s: 5, f: 8 }, { s: 4, f: 8 }, { s: 3, f: 6 }, { s: 2, f: 6 }, { s: 1, f: 6 }
      ]
    }
  ],
  'C#m': [
    {
      name: 'Barré case 4 (Forme de Am)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 4, r: true }, { s: 4, f: 6 }, { s: 3, f: 6 }, { s: 2, f: 5 }, { s: 1, f: 4 }
      ]
    },
    {
      name: 'Barré case 9 (Forme de Em)',
      f: [
        { s: 6, f: 9, r: true }, { s: 5, f: 11 }, { s: 4, f: 11 }, { s: 3, f: 9 }, { s: 2, f: 9 }, { s: 1, f: 9 }
      ]
    }
  ],
  'D#m': [
    {
      name: 'Barré case 6 (Forme de Am)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 6, r: true }, { s: 4, f: 8 }, { s: 3, f: 8 }, { s: 2, f: 7 }, { s: 1, f: 6 }
      ]
    }
  ],
  'F#m': [
    {
      name: 'Barré case 2 (Forme de Em)',
      f: [
        { s: 6, f: 2, r: true }, { s: 5, f: 4 }, { s: 4, f: 4 }, { s: 3, f: 2 }, { s: 2, f: 2 }, { s: 1, f: 2 }
      ]
    },
    {
      name: 'Barré case 9 (Forme de Am)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 9, r: true }, { s: 4, f: 11 }, { s: 3, f: 11 }, { s: 2, f: 10 }, { s: 1, f: 9 }
      ]
    }
  ],
  'G#m': [
    {
      name: 'Barré case 4 (Forme de Em)',
      f: [
        { s: 6, f: 4, r: true }, { s: 5, f: 6 }, { s: 4, f: 6 }, { s: 3, f: 4 }, { s: 2, f: 4 }, { s: 1, f: 4 }
      ]
    }
  ],

  /* ================== 7 ================== */
  'A#7': [
    {
      name: 'Barré case 1 (Forme de A7)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 1, r: true }, { s: 4, f: 3 }, { s: 3, f: 1 }, { s: 2, f: 3 }, { s: 1, f: 1 }
      ]
    }
  ],
  'C#7': [
    {
      name: 'Barré case 4 (Forme de E7)',
      f: [
        { s: 6, f: 4, r: true }, { s: 5, f: 6 }, { s: 4, f: 4 }, { s: 3, f: 5 }, { s: 2, f: 4 }, { s: 1, f: 4 }
      ]
    }
  ],
  'D#7': [
    {
      name: 'Barré case 6 (Forme de A7)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 6, r: true }, { s: 4, f: 8 }, { s: 3, f: 6 }, { s: 2, f: 8 }, { s: 1, f: 6 }
      ]
    }
  ],
  'F#7': [
    {
      name: 'Barré case 2 (Forme de E7)',
      f: [
        { s: 6, f: 2, r: true }, { s: 5, f: 4 }, { s: 4, f: 2 }, { s: 3, f: 3 }, { s: 2, f: 2 }, { s: 1, f: 2 }
      ]
    }
  ],
  'G#7': [
    {
      name: 'Barré case 4 (Forme de E7)',
      f: [
        { s: 6, f: 4, r: true }, { s: 5, f: 6 }, { s: 4, f: 4 }, { s: 3, f: 5 }, { s: 2, f: 4 }, { s: 1, f: 4 }
      ]
    }
  ],

  /* ================== m7 ================== */
  'A#m7': [
    {
      name: 'Barré case 6 (Forme de Em)',
      f: [
        { s: 6, f: 6, r: true }, { s: 5, f: 8 }, { s: 4, f: 6 }, { s: 3, f: 6 }, { s: 2, f: 6 }, { s: 1, f: 6 }
      ]
    }
  ],
  'C#m7': [
    {
      name: 'Barré case 4 (Forme de Em)',
      f: [
        { s: 6, f: 4, r: true }, { s: 5, f: 6 }, { s: 4, f: 4 }, { s: 3, f: 4 }, { s: 2, f: 5 }, { s: 1, f: 4 }
      ]
    }
  ],
  'D#m7': [
    {
      name: 'Barré case 6 (Forme de Am)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 6, r: true }, { s: 4, f: 8 }, { s: 3, f: 6 }, { s: 2, f: 7 }, { s: 1, f: 6 }
      ]
    }
  ],
  'F#m7': [
    {
      name: 'Barré case 2 (Forme de Em)',
      f: [
        { s: 6, f: 2, r: true }, { s: 5, f: 4 }, { s: 4, f: 2 }, { s: 3, f: 2 }, { s: 2, f: 2 }, { s: 1, f: 2 }
      ]
    }
  ],
  'G#m7': [
    {
      name: 'Barré case 4 (Forme de Em)',
      f: [
        { s: 6, f: 4, r: true }, { s: 5, f: 6 }, { s: 4, f: 4 }, { s: 3, f: 4 }, { s: 2, f: 4 }, { s: 1, f: 4 }
      ]
    }
  ],


  /* ================== 7 DOMINANTE ================== */
  C7: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 3, r: true }, { s: 4, f: 2 }, { s: 3, f: 3 }, { s: 2, f: 1 }, { s: 1, f: 0 }
      ]
    },
    {
      name: 'Barré case 8 (Forme de E7)',
      f: [
        { s: 6, f: 8, r: true }, { s: 5, f: 10 }, { s: 4, f: 8 }, { s: 3, f: 9 }, { s: 2, f: 8 }, { s: 1, f: 8 }
      ]
    }
  ],
  D7: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: -1 }, { s: 5, f: -1 }, { s: 4, f: 0, r: true }, { s: 3, f: 2 }, { s: 2, f: 1 }, { s: 1, f: 2 }
      ]
    },
    {
      name: 'Barré case 5 (Forme de A7)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 5, r: true }, { s: 4, f: 7 }, { s: 3, f: 5 }, { s: 2, f: 7 }, { s: 1, f: 5 }
      ]
    }
  ],
  E7: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: 0, r: true }, { s: 5, f: 2 }, { s: 4, f: 0 }, { s: 3, f: 1 }, { s: 2, f: 0 }, { s: 1, f: 0 }
      ]
    },
    {
      name: 'Barré case 7 (Forme de A7)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 7, r: true }, { s: 4, f: 9 }, { s: 3, f: 7 }, { s: 2, f: 8 }, { s: 1, f: 7 }
      ]
    }
  ],
  F7: [
    {
      name: 'Barré case 1 (Forme de E7)',
      f: [
        { s: 6, f: 1, r: true }, { s: 5, f: 3 }, { s: 4, f: 1 }, { s: 3, f: 2 }, { s: 2, f: 1 }, { s: 1, f: 1 }
      ]
    }
  ],
  G7: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: 3, r: true }, { s: 5, f: 2 }, { s: 4, f: 0 }, { s: 3, f: 0 }, { s: 2, f: 0 }, { s: 1, f: 1 }
      ]
    },
    {
      name: 'Barré case 3 (Forme de E7)',
      f: [
        { s: 6, f: 3, r: true }, { s: 5, f: 5 }, { s: 4, f: 3 }, { s: 3, f: 4 }, { s: 2, f: 3 }, { s: 1, f: 3 }
      ]
    }
  ],
  A7: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 0, r: true }, { s: 4, f: 2 }, { s: 3, f: 0 }, { s: 2, f: 2 }, { s: 1, f: 0 }
      ]
    },
    {
      name: 'Barré case 5 (Forme de E7)',
      f: [
        { s: 6, f: 5, r: true }, { s: 5, f: 7 }, { s: 4, f: 5 }, { s: 3, f: 6 }, { s: 2, f: 5 }, { s: 1, f: 5 }
      ]
    }
  ],
  B7: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 2, r: true }, { s: 4, f: 1 }, { s: 3, f: 2 }, { s: 2, f: 0 }, { s: 1, f: 2 }
      ]
    },
    {
      name: 'Barré case 7 (Forme de E7)',
      f: [
        { s: 6, f: 7, r: true }, { s: 5, f: 9 }, { s: 4, f: 7 }, { s: 3, f: 8 }, { s: 2, f: 7 }, { s: 1, f: 7 }
      ]
    }
  ],

  /* ================== ACCORDS m7 ================== */
  Cm7: [
    {
      name: 'Barré case 3 (Forme de Em)',
      f: [
        { s: 6, f: 3, r: true }, { s: 5, f: 5 }, { s: 4, f: 3 }, { s: 3, f: 5 }, { s: 2, f: 4 }, { s: 1, f: 3 }
      ]
    }
  ],
  Dm7: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: -1 }, { s: 5, f: -1 }, { s: 4, f: 0, r: true }, { s: 3, f: 2 }, { s: 2, f: 1 }, { s: 1, f: 1 }
      ]
    },
    {
      name: 'Barré case 5 (Forme de Em)',
      f: [
        { s: 6, f: 5, r: true }, { s: 5, f: 7 }, { s: 4, f: 5 }, { s: 3, f: 5 }, { s: 2, f: 6 }, { s: 1, f: 5 }
      ]
    }
  ],
  Em7: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: 0, r: true }, { s: 5, f: 2 }, { s: 4, f: 0 }, { s: 3, f: 0 }, { s: 2, f: 0 }, { s: 1, f: 0 }
      ]
    },
    {
      name: 'Barré case 7 (Forme de Am)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 7, r: true }, { s: 4, f: 9 }, { s: 3, f: 7 }, { s: 2, f: 8 }, { s: 1, f: 7 }
      ]
    }
  ],
  Fm7: [
    {
      name: 'Barré case 1 (Forme de Em)',
      f: [
        { s: 6, f: 1, r: true }, { s: 5, f: 3 }, { s: 4, f: 1 }, { s: 3, f: 1 }, { s: 2, f: 1 }, { s: 1, f: 1 }
      ]
    }
  ],
  Gm7: [
    {
      name: 'Barré case 3 (Forme de Em)',
      f: [
        { s: 6, f: 3, r: true }, { s: 5, f: 5 }, { s: 4, f: 3 }, { s: 3, f: 3 }, { s: 2, f: 3 }, { s: 1, f: 3 }
      ]
    }
  ],
  Am7: [
    {
      name: 'Ouverte',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 0, r: true }, { s: 4, f: 2 }, { s: 3, f: 0 }, { s: 2, f: 1 }, { s: 1, f: 0 }
      ]
    },
    {
      name: 'Barré case 5 (Forme de Em)',
      f: [
        { s: 6, f: 5, r: true }, { s: 5, f: 7 }, { s: 4, f: 5 }, { s: 3, f: 5 }, { s: 2, f: 5 }, { s: 1, f: 5 }
      ]
    }
  ],
  Bm7: [
    {
      name: 'Barré case 2 (Forme de Am)',
      f: [
        { s: 6, f: -1 }, { s: 5, f: 2, r: true }, { s: 4, f: 4 }, { s: 3, f: 2 }, { s: 2, f: 3 }, { s: 1, f: 2 }
      ]
    }
  ],



};
