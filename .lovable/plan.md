

# Alternative Minds Library Feature

## Summary
Create a library of 28 alternative historical minds organized into 7 subject categories. Each category contains 7 experts: 4 from before the Industrial Revolution (~1760) and 3 from after. Users can swap any of the 8 default Pantheon members with alternatives from this library while retaining full cognitive trait customization and AI provider configuration.

---

## The 7 Subject Categories and 28 Alternative Minds

### 1. Philosophy and Ethics
**Pre-Industrial Revolution:**
- Aristotle (384-322 BC) - Greek philosopher, systematic logic
- Plato (428-348 BC) - Greek philosopher, idealism and forms
- Marcus Aurelius (121-180 AD) - Roman Stoic philosopher-emperor
- Thomas Aquinas (1225-1274) - Medieval scholastic theologian

**Post-Industrial Revolution:**
- Immanuel Kant (1724-1804) - German philosopher, categorical imperative
- Friedrich Nietzsche (1844-1900) - German philosopher, will to power
- Simone de Beauvoir (1908-1986) - French existentialist, feminist philosophy

### 2. Science and Natural Philosophy
**Pre-Industrial Revolution:**
- Archimedes (287-212 BC) - Greek mathematician, physics pioneer
- Galileo Galilei (1564-1642) - Italian astronomer, scientific method
- Isaac Newton (1643-1727) - English physicist, laws of motion
- Ibn al-Haytham (965-1040) - Arab polymath, optics and scientific method

**Post-Industrial Revolution:**
- Charles Darwin (1809-1882) - English naturalist, evolution theory
- Nikola Tesla (1856-1943) - Serbian-American inventor, electrical engineering
- Richard Feynman (1918-1988) - American physicist, quantum mechanics

### 3. Arts and Creativity
**Pre-Industrial Revolution:**
- Michelangelo (1475-1564) - Italian sculptor, painter, architect
- William Shakespeare (1564-1616) - English playwright and poet
- Johann Sebastian Bach (1685-1750) - German composer, Baroque music
- Murasaki Shikibu (978-1014) - Japanese novelist, Tale of Genji

**Post-Industrial Revolution:**
- Frida Kahlo (1907-1954) - Mexican painter, surrealism and identity
- Pablo Picasso (1881-1973) - Spanish painter, cubism pioneer
- Maya Angelou (1928-2014) - American poet and civil rights activist

### 4. Mathematics and Logic
**Pre-Industrial Revolution:**
- Euclid (300 BC) - Greek mathematician, father of geometry
- Al-Khwarizmi (780-850) - Persian mathematician, algebra founder
- Fibonacci (1170-1250) - Italian mathematician, number sequences
- Rene Descartes (1596-1650) - French mathematician, analytical geometry

**Post-Industrial Revolution:**
- Carl Friedrich Gauss (1777-1855) - German mathematician, number theory
- Alan Turing (1912-1954) - British mathematician, computer science pioneer
- Emmy Noether (1882-1935) - German mathematician, abstract algebra

### 5. Leadership and Governance
**Pre-Industrial Revolution:**
- Sun Tzu (544-496 BC) - Chinese military strategist, Art of War
- Cleopatra VII (69-30 BC) - Egyptian pharaoh, diplomat
- Elizabeth I (1533-1603) - English queen, political strategist
- Genghis Khan (1162-1227) - Mongol emperor, empire builder

**Post-Industrial Revolution:**
- Abraham Lincoln (1809-1865) - American president, unity and abolition
- Mahatma Gandhi (1869-1948) - Indian leader, nonviolent resistance
- Nelson Mandela (1918-2013) - South African leader, reconciliation

### 6. Innovation and Technology
**Pre-Industrial Revolution:**
- Archimedes (287-212 BC) - Greek inventor, mechanical devices
- Zhang Heng (78-139) - Chinese polymath, seismograph inventor
- Ismail al-Jazari (1136-1206) - Arab engineer, automata pioneer
- Johannes Gutenberg (1400-1468) - German inventor, printing press

**Post-Industrial Revolution:**
- Thomas Edison (1847-1931) - American inventor, practical innovation
- Grace Hopper (1906-1992) - American computer scientist, programming
- Steve Jobs (1955-2011) - American entrepreneur, design innovation

### 7. Social and Economic Thought
**Pre-Industrial Revolution:**
- Ibn Khaldun (1332-1406) - Arab historian, social theory pioneer
- John Locke (1632-1704) - English philosopher, liberalism
- Adam Smith (1723-1790) - Scottish economist, market theory
- Mary Wollstonecraft (1759-1797) - English philosopher, women's rights

**Post-Industrial Revolution:**
- Karl Marx (1818-1883) - German philosopher, economic theory
- John Maynard Keynes (1883-1946) - British economist, macroeconomics
- Hannah Arendt (1906-1975) - German-American political theorist

---

## Architecture and Implementation

### New Files to Create

**1. `src/config/alternativeMinds.ts`**
Central configuration file containing all 28 alternative experts with:
- Unique identifiers
- Full names and eras
- Domain/category classification
- Era designation (pre/post Industrial Revolution)
- Cognitive trait defaults (creativity, skepticism, optimism)
- Famous quotes
- Brief descriptions
- Image URLs (Wikipedia Commons)

**2. `src/components/ExpertSwapDialog.tsx`**
A dialog component that allows users to:
- Browse alternative minds by category (7 tabs)
- Filter by era (pre/post Industrial Revolution)
- Preview expert details before swapping
- Confirm the swap with a single click

**3. `src/services/expertPromptTemplates.ts`**
Extended prompt templates for all 28 new experts:
- Detailed personality prompts matching the existing format
- Historical context and methodologies
- Response guidelines specific to each expert

### Files to Modify

**1. `src/config/defaultExperts.ts`**
- Export a new `getExpertById()` function that retrieves any expert (default or alternative) by ID
- Create merged expert lookup capability

**2. `src/utils/expertUtils.ts`**
- Add functions to retrieve images, domains, and colors for all 56 experts (8 default + 28 alternative + 20 duplicates avoided)
- Dynamic color assignment for alternative minds by category

**3. `src/components/ExpertProfiles.tsx`**
- Add "Swap" button to each expert card
- Integrate ExpertSwapDialog for expert replacement

**4. `src/components/ExpertCardList.tsx`**
- Add "Swap Expert" action to each expert configuration card
- Handle expert replacement while preserving API settings

**5. `src/components/DiscussionConfigPanel.tsx`**
- Integrate expert swap functionality into the configuration drawer
- Support for swapped expert persistence

**6. `src/services/expertConfig.ts`**
- Add EXPERT_PROMPTS entries for all 28 new experts
- Maintain consistent prompt quality and depth

**7. `src/pages/Index.tsx`**
- Support dynamic expert arrays with swapped members
- Pass updated expert configurations through the system

---

## User Experience Flow

```text
User Journey for Expert Swap:

1. Homepage Display
   +---------------------------+
   | The Eight Immortal Minds  |
   +---------------------------+
   | [Marie Curie] [Swap]      |
   | [Leonardo]    [Swap]      |
   | ...                       |
   +---------------------------+

2. Click "Swap" Button
   +---------------------------+
   | Select Alternative Mind   |
   +---------------------------+
   | Tabs: [Philosophy] [Science] [Arts] ...
   | Filter: [All] [Pre-1760] [Post-1760]
   |
   | +-----------------------+
   | | Aristotle             |
   | | Ancient Greece        |
   | | "We are what we..."   |
   | | [Select]              |
   | +-----------------------+
   +---------------------------+

3. Confirm Selection
   - Expert card updates immediately
   - Cognitive traits reset to new expert defaults
   - API configuration preserved
   - System prompts updated automatically
```

---

## Technical Implementation Details

### Expert Data Structure
```text
AlternativeExpert {
  id: string                    // unique identifier (e.g., "aristotle")
  name: string                  // "Aristotle"
  era: string                   // "Ancient Greece (384-322 BC)"
  eraType: "pre" | "post"       // Industrial Revolution marker
  category: string              // "philosophy" | "science" | "arts" | etc.
  domain: string                // "Philosophy, Logic"
  description: string           // Brief 2-sentence description
  quote: string                 // Famous quote
  traits: {
    creativity: number          // 0-100 default value
    skepticism: number          // 0-100 default value
    optimism: number            // 0-100 default value
  }
  imageUrl: string              // Wikipedia Commons URL
}
```

### Swap Operation Logic
When a user swaps an expert:
1. The expert's ID, name, and cognitive traits update to the new selection
2. The position in the array remains the same (preserves order)
3. API key and provider settings are preserved (user's BYOK configuration)
4. The system prompt generator looks up the new expert's prompt template
5. All UI components re-render with the new expert's appearance

### Prompt Generation
The `metaPromptService.ts` will be updated to:
1. Check if expert ID exists in default EXPERT_PROMPTS
2. Fall back to alternative expert prompts if not found
3. Apply cognitive trait modifiers consistently regardless of expert type

---

## Deliverables Summary

| File | Action | Purpose |
|------|--------|---------|
| `src/config/alternativeMinds.ts` | Create | 28 alternative expert definitions |
| `src/components/ExpertSwapDialog.tsx` | Create | UI for browsing and selecting alternatives |
| `src/services/expertPromptTemplates.ts` | Create | AI prompts for 28 new experts |
| `src/config/defaultExperts.ts` | Modify | Add expert lookup utilities |
| `src/utils/expertUtils.ts` | Modify | Extend for all 56 experts |
| `src/components/ExpertProfiles.tsx` | Modify | Add swap buttons to cards |
| `src/components/ExpertCardList.tsx` | Modify | Integrate swap in config panel |
| `src/components/DiscussionConfigPanel.tsx` | Modify | Support swapped experts |
| `src/services/expertConfig.ts` | Modify | Add 28 new expert prompts |
| `src/pages/Index.tsx` | Modify | Handle dynamic expert state |

