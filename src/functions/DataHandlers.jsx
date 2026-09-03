// Sorts all traits alphabetically
export function SortTraits(traits = []) {
    return [...traits].sort((a, b) => a.trait.localeCompare(b.trait));
}

// Lets the app pick traits randomly from each set
export function PickUnique(source = [], count = 6) {
  const traitsAmount = Math.min(count, source.length);
  
  const takenTraits = new Set();
  const result = [];
  while (result.length < traitsAmount) {
    const i = Math.floor(Math.random() * source.length);
    if (!takenTraits.has(i)) {
      takenTraits.add(i);
      result.push(source[i]);
    }
  }

  return result;
}

// Lets CharacterTraitList.jsx set chosen pos/neu/neg traits
export function ToggleTrait(array = [], item) {
    const exists = array.some(x => x.trait === item.trait);
    return exists ? array.filter(x => x.trait !== item.trait) : [...array, item];
}

// Clears chosen traits from trait list
export function FilterAvailableTraits(allTraits = [], chosenTraits = []) {
    return allTraits.filter(
        (trait) => !chosenTraits.some((chosen) => chosen.trait === trait.trait)
    );
}