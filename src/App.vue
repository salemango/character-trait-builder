<template>
  <div>
    <div class="page-header">
        <header>
            <h1>Character Trait Builder</h1>
            <ul>
                <li><img :src="getToggleIcon()" @click="toggleDarkMode" alt="Toggle dark mode" title="Toggle dark mode" class="dark-mode-toggle"></li>
            </ul>
        </header>
        <p>
            <img :src="getInfoIcon()" alt="info">
            Click or tap on a <span>Character Trait</span> to add it to your <span>Personality Sheet</span>. Perform the same action again to remove it. The trait limit for each category is 8.
        </p>
    </div>

    <div class="trait-list">
      <h2>Positive Traits</h2>
      <ul>
        <li v-for="(posTrait, index) in positiveTraits" :key="posTrait.id" class="trait positive-trait"  @click="sendPositiveTrait(posTrait, index)"> <img :src="getPlusIcon()"> {{ posTrait.word }} </li>
      </ul>

      <h2>Neutral Traits</h2>
      <ul>
        <li v-for="(neuTrait, index) in neutralTraits" :key="neuTrait.id" class="trait neutral-trait" @click="sendNeutralTrait(neuTrait, index)"> <img :src="getPlusIcon()"> {{ neuTrait.word }} </li>
      </ul>

      <h2>Negative Traits</h2>
      <ul>
        <li v-for="(negTrait, index) in negativeTraits" :key="negTrait.id" class="trait negative-trait" @click="sendNegativeTrait(negTrait, index)"> <img :src="getPlusIcon()"> {{ negTrait.word }} </li>
      </ul>
    </div>

    <div class="personality-sheet" :class="{ 'collapsed-sheet': collapsed && !desktop }">
        <img src="./assets/chevron-down.svg" class="sheet-handle" :class="{'icon-expand' : collapsed && !desktop}" @click="toggleSheet()" alt="collapse">
        <div class="scrollable">
          <h2>Personality Sheet</h2>
          <div class="saved-positive-traits saved">
              <h3>Positive Traits:</h3>
              <ul>
                  <li v-for="(posTrait, index) in savedPositiveTraits" :key="posTrait.id" class="trait positive-trait" @click="sendPositiveTraitBack(posTrait, index)"><img :src="getPlusIcon()"> {{ posTrait.word }}</li>
              </ul>
          </div>

          <div class="saved-neutral-traits saved">
              <h3>Neutral Traits:</h3>
              <ul>
                  <li v-for="(neuTrait, index) in savedNeutralTraits" :key="neuTrait.id" class="trait neutral-trait" @click="sendNeutralTraitBack(neuTrait, index)"> <img :src="getPlusIcon()"> {{ neuTrait.word }} </li>
              </ul>
          </div>

          <div class="saved-negative-traits saved">
              <h3>Negative Traits:</h3>
              <ul>
                  <li v-for="(negTrait, index) in savedNegativeTraits" :key="negTrait.id" class="trait negative-trait" @click="sendNegativeTraitBack(negTrait, index)"> <img :src="getPlusIcon()"> {{ negTrait.word }} </li>
              </ul>
          </div>
        
        </div>
          <div class="control-buttons">
            <button title="Generate Random" @click="randomizeAllTraits">Random</button>
            <button title="Clear All" @click="clearAllTraits">Clear All</button>
          </div>
        
    </div>

  </div>

</template>

<script>
// Library imports
import axios from 'axios';
import { useDark, useToggle } from '@vueuse/core';

// Image Imports - For dark/light mode toggle
import darkModeToggle from './assets/dark-mode.svg'
import lightModeToggle from './assets/light-mode.svg';
import plus from './assets/plus.svg';
import plusDarkMode from './assets/plus-dark-mode.svg';
import info from './assets/info.svg';
import infoDarkMode from './assets/info-dark-mode.svg';


const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light'
});
const toggleDark = useToggle(isDark);

export default {
  data() {
    return {
        // Styling values
        darkMode: isDark,
        collapsed: false,
        desktop: false,
        windowWidth: null,
        // Traits for Trait list
        positiveTraits: [ ],
        neutralTraits: [ ],
        negativeTraits: [ ],
        // Saved traits
        savedPositiveTraits: [ ],
        savedNeutralTraits: [ ],
        savedNegativeTraits: [ ],
        // Image data for dark/light mode toggle
        darkModeToggle: darkModeToggle,
        lightModeToggle: lightModeToggle,
        info: info,
        infoDarkMode: infoDarkMode,
        plus: plus,
        plusDarkMode: plusDarkMode
    }
  },
  methods: {
    toggleDarkMode() {
      this.getToggleIcon();
      toggleDark();
    },
    // Get traits from json database
    getPositiveTraits: function() {
      axios.get('http://localhost:3000/positive-traits')
        .then((response) => this.positiveTraits = response.data)
        .catch(error => console.log(error.message));
      return;
    },
    getNeutralTraits: function() {
      axios.get('http://localhost:3000/neutral-traits')
        .then((response) => this.neutralTraits = response.data)
        .catch(error => console.log(error.message));
      return;      
    },
    getNegativeTraits: function() {
      axios.get('http://localhost:3000/negative-traits')
        .then((response) => this.negativeTraits = response.data)
        .catch(error => console.log(error.message));
      return;
    },
    // Send traits to personality sheet
    sendPositiveTrait(posTrait, index) {
      console.log(posTrait.word, posTrait.id, index);
      this.savedPositiveTraits.push(posTrait);
      if (this.savedPositiveTraits.length > 8) { // Enforces trait limit for formatting
        window.alert("POSITIVE: The trait limit for each category is 8. You need to remove a trait before you can add another.")
        this.savedPositiveTraits.splice(8);
        return;
      }
      this.positiveTraits.splice(index, 1);
      this.savedPositiveTraits.sort((a, b) => a.word > b.word ? 1: -1);
    },
    sendNeutralTrait(neuTrait, index) {
      console.log(neuTrait.word, neuTrait.id, index);
      this.savedNeutralTraits.push(neuTrait);
      if (this.savedNeutralTraits.length > 8) { // Enforces trait limit for formatting
        window.alert("NEUTRAL: The trait limit for each category is 8. You need to remove a trait before you can add another.")
        this.savedNeutralTraits.splice(8);
        return;
      }
      this.neutralTraits.splice(index, 1);
      this.savedNeutralTraits.sort((a, b) => a.word > b.word ? 1: -1);
    },
    sendNegativeTrait(negTrait, index) {
      console.log(negTrait.word, negTrait.id, index);
      this.savedNegativeTraits.push(negTrait);
      if (this.savedNegativeTraits.length > 8 ) { // Enforces trait limit for formatting
        window.alert("NEGATIVE: The trait limit for each category is 8. You need to remove a trait before you can add another.");
        this.savedNegativeTraits.splice(8);
        return;
      }
      this.negativeTraits.splice(index, 1);
      this.savedNegativeTraits.sort((a, b) => a.word > b.word ? 1: -1);
    },
    // Remove saved traits and send them back to trait list 
    sendPositiveTraitBack(posTrait, index) {
      console.log(posTrait.word, posTrait.id, index);
      this.savedPositiveTraits.splice(index, 1);
      this.positiveTraits.push(posTrait);
      this.positiveTraits.sort((a, b) => a.word > b.word ? 1: -1);
      return;
    },
    sendNeutralTraitBack(neuTrait, index) {
      console.log(neuTrait.word, neuTrait.id, index);
      this.savedNeutralTraits.splice(index, 1);
      this.neutralTraits.push(neuTrait);
      this.neutralTraits.sort((a, b) => a.word > b.word ? 1: -1);
      return;
    },
    sendNegativeTraitBack(negTrait, index) {
      console.log(negTrait.word, negTrait.id, index);
      this.savedNegativeTraits.splice(index, 1);
      this.negativeTraits.push(negTrait);
      this.negativeTraits.sort((a, b) => a.word > b.word ? 1: -1);
      return;
    },
    // Clears all traits in the Personality Sheet
    clearAllTraits() {
      // Clear positive traits 
      let i = 0;
      let arrayLength = this.savedPositiveTraits.length; 
      if (arrayLength > 0) {
        while (i < arrayLength) {
          this.sendPositiveTraitBack(this.savedPositiveTraits[0], 0);
          i++;
        }
      }
      i = 0;
      arrayLength = this.savedNeutralTraits.length;
      if (arrayLength > 0) {
        while (i < arrayLength) {
          this.sendNeutralTraitBack(this.savedNeutralTraits[0], 0);
          i++;
        }
      }
      i = 0;
      arrayLength = this.savedNegativeTraits.length;
      if (arrayLength > 0) {
        while (i < arrayLength) {
          this.sendNegativeTraitBack(this.savedNegativeTraits[0], 0);
          i++;
        }
      } 
    },
    randomizeAllTraits() {
      this.clearAllTraits();
      let i = 0, arrayLength = 0, r = 0;
      // Randomize positive traits
      while (i < 8) {
        arrayLength = this.positiveTraits.length;
        r = Math.floor(Math.random() * arrayLength);
        this.sendPositiveTrait(this.positiveTraits[r], r);
        i++;
      }
      i = 0;
      while (i < 8) {
        arrayLength = this.neutralTraits.length;
        r = Math.floor(Math.random() * arrayLength);
        this.sendNeutralTrait(this.neutralTraits[r], r);
        i++;
      }
      i = 0;
      while (i < 8) {
        arrayLength = this.negativeTraits.length;
        r = Math.floor(Math.random() * arrayLength);
        this.sendNegativeTrait(this.negativeTraits[r], r);
        i++;
      }

    },
    // Collapse and uncollapse personality sheet on mobile viewports only
    toggleSheet() {
        this.collapsed = !this.collapsed;
    },
    checkScreen() {
        this.windowWidth = window.innerWidth;
        if (this.windowWidth <= 900 ) {
            this.desktop = false;
            return;
        }
        this.desktop = true;
        return;
    },
    // Dark/light mode image exchange methods
    getToggleIcon() {
      if ( !this.darkMode ) {
          return darkModeToggle;
      }
      else {
          return lightModeToggle;
      }
    },
    getInfoIcon() {
      if (!this.darkMode ) {
        return info;
      }
      else {
        return infoDarkMode;
      }
    },
    getPlusIcon() {
      if ( !this.darkMode ) {
        return plus;
      }
      else {
        return plusDarkMode;
      }
    }
  },
  computed: {
    sortedItems() {
      return this.positiveTraits;
    }
  },
  mounted() {
    this.getPositiveTraits();
    this.getNeutralTraits();
    this.getNegativeTraits();
  },
  created() {
      window.addEventListener('resize', this.checkScreen);
      this.checkScreen;
  },
  unmounted() {
    window.removeEventListener('resize', this.checkScreen);
  },
  name: 'App',
}
</script>
