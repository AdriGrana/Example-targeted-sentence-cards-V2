# Example Targeted Sentence Cards V2

A modern and clean Anki card template designed for **sentence mining with up to two target vocabulary words per card**.  
This is a full overhaul of the original [Example Targeted Sentence Cards](https://ankiweb.net/shared/info/1557722832) with improved visuals, functionality, and mobile support.

---

## Features

- Support for **two vocabulary targets** per card  
- Grouped display of **word, pitch accent, audio, and definition**
- **Pitch accent coloring** based on category:
  - 平板 (Heiban)
  - 頭高 (Atamadaka)
  - 中高 (Nakadaka)
  - 尾高 (Odaka)
  - 起伏 (Kifuku)
- **Night and Day mode** support
- **Responsive design** (optimized for mobile)
- Toggleable English translation (click to reveal)
- Support for **images and GIFs**
- Footer with quick access links (e.g., Google Images, online dictionaries)

---

## Night Mode

**Front:**

![Night Front](https://github.com/user-attachments/assets/20872892-ef25-4746-9795-6ad33cad3333)

**Back:**

![Night Back](https://github.com/user-attachments/assets/1e2133c8-4bee-4a86-9076-cb653d2a73cc)

---

## Day Mode

**Front:**

![Day Front](https://github.com/user-attachments/assets/15ad8f88-8e5c-4fb9-a087-3d022388c1e7)

**Back:**

![Day Back](https://github.com/user-attachments/assets/2d7208d1-9c35-41c9-9f9d-8a0d8cea30c3)

---

## Required Fields

Make sure your note type includes all of the following fields:

### Sentence fields
- `SentKanji` — Japanese sentence with kanji (used on front of card)
- `SentFurigana` — Sentence with furigana tags for reading assistance
- `SentEng` — English translation of the sentence
- `SentAudio` — Audio of the full sentence

### Vocabulary target 1
- `VocabKanji` — First target word (kanji form)
- `VocabFurigana` — First target word with furigana
- `VocabReading` — Kana-only reading of the first word
- `VocabPitchPattern` — Pitch accent pattern string for display
- `VocabPitchCategory` — One of: heiban, atamadaka, nakadaka, odaka, kifuku
- `VocabPitchNum` — Numeric pitch drop location for coloring
- `VocabDef` — Definition for the first word
- `VocabAudio` — Audio clip of the first word

### Vocabulary target 2 (optional)
- `VocabKanji2` — Second target word (kanji form)
- `VocabFurigana2` — Second target word with furigana
- `VocabReading2` — Kana-only reading of the second word
- `VocabPitchPattern2` — Pitch accent pattern string for second word
- `VocabPitchCategory2` — Pitch accent category for second word
- `VocabPitchNum2` — Numeric pitch drop location for second word
- `VocabDef2` — Definition for the second word
- `VocabAudio2` — Audio clip of the second word

### Extra
- `Image` — An optional image or GIF for visual context
- `Notes` — Personal notes or additional comments
- `Frequency` — Frequency data used for styling or sorting

---

## Installation

To install the template, you can:

- Manually copy and paste the template code and fields into your collection  
**OR**  
- Download the [example deck from AnkiWeb](https://ankiweb.net/shared/info/2049566114?cb=1728411235877) to import everything (templates, styling, and example cards)
