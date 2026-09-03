export const connectors = ["Additionally", "Also", "Furthermore", "Moreover", "What's more", "On top of that"];

export function randomNumberGenerator(max) {
    return Math.floor(Math.random() * max);
}

// Replaces "character" with character name
export function replaceName(text = "", charName) {
    if (!text) return "";
        const name = charName && charName.trim() ? charName.trim() : "your character";        
        return text.replace(/Character/gi, name).replace(/\{\{\s*name\s*\}\}/gi, name); 
}

// Replaces PRN(x) with pronouns
export function replacePronouns(text = "", charPronouns = "he") {
    if (!text) return ("");

        // Replace pronoun markers with pronouns
        if (charPronouns == "he") {
            text = text.replace(/PRN1/gi, "he");
            text = text.replace(/PRN2/gi, "him");
            text = text.replace(/PRN3/gi, "his");
        } else if (charPronouns == "she") {
            text = text.replace(/PRN1/gi, "she");
            text = text.replace(/PRN2/gi, "her");
            text = text.replace(/PRN3/gi, "her")
        } else {
            text = text.replace(/PRN1/gi, "they");
            text = text.replace(/PRN2/gi, "them");
            text = text.replace(/PRN3/gi, "their");
        }

        return text;
}

// Updates sentence capitalization
export function updateCapitalization(text ="", usage) {
    if (usage == "lowercase") {
            text = String(text).charAt(0).toLowerCase() + String(text).slice(1);
            return text;
        } else if (usage == "uppercase") {
            text = String(text).charAt(0).toUpperCase() + String(text).slice(1);
            return text;
        } else {
            return;
        }
}

// Adds name to the first sentence of certain bio types
export function addNameFirst (text, index, paragraphNum, bioType) {
    if (index !== 0 || paragraphNum !== 1 || bioType !== 2) {
            return text;
        } else {
            const words = text.split(" ");
            
            if (words[0] == "PRN1") {
                words[0] = "Character";
                text = words.join(" ");
                return text;
            } else {
                return text;
            }
        }
}

export function sortParagraph (traits, charName, getSentenceText) {
    const characterName = charName.trim() || "Character";

    if (!characterName) {
        return traits;
    }

    const characterRegex = /^(?:\s*)(?:Character)\b/i;

    const characterIndex = traits.findIndex((trait, index) => characterRegex.test(getSentenceText(trait, index) ?? ""));

    if (characterIndex <= 0) {
        return traits;
    }

    return [
        traits[characterIndex], ...traits.slice(0, characterIndex), ...traits.slice(characterIndex + 1)
    ];
}

export function createConnectorMap (chosenPositive, chosenNeutral, chosenNegative) {
    const nextMap = {};
    const sentenceItems = [
        ...chosenPositive.map((_, index) => ({ id: `positive-${index}`, index })),
        ...chosenNeutral.map((_, index) => ({ id: `neutral-${index}`, index })),
        ...chosenNegative.map((_, index) => ({ id: `negative-${index}`, index })),
    ];
    
    const used = new Set();

    sentenceItems.forEach(({ id, index }) => {
        if (index % 2 !== 1 || randomNumberGenerator(3) !== 1) {
            return;
        }

        const remaining = connectors.filter((connector) => !used.has(connector));

        const pool = remaining.length > 0 ? remaining : connectors;

        const chosen = pool[randomNumberGenerator(pool.length)];

        nextMap[id] = chosen;

        used.add(chosen);
    });

    return nextMap;
}

export function normalizeBioText(text = "", index, id="", charName, charPronouns, connectorMap) {
    
    let normalizedText = updateCapitalization(text, "lowercase");
    normalizedText = replaceName(normalizedText, charName);
    normalizedText = replacePronouns(normalizedText, charPronouns);

    const connector = connectorMap[id];

    if (connector && index % 2 === 1 ) {
        normalizedText = `${connector}, ${normalizedText}`;
    }

    normalizedText = updateCapitalization(normalizedText, "uppercase");

    return normalizedText;
}