// Tools
import { usePositiveTraits, useNeutralTraits, useNegativeTraits } from "./functions/FetchData"; 
import { SortTraits, PickUnique, ToggleTrait, FilterAvailableTraits } from "./functions/DataHandlers";
import { useState, useCallback, useEffect } from 'react';
import './styles/main.css';


// Components
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import CharacterTraitList from "./components/CharacterTraitList"
import WrittenProfile from "./components/WrittenProfile"

function App() {
  /* TRAIT HANDLING */
    // Trait data container variables
    const positive = usePositiveTraits();
    const neutral = useNeutralTraits();
    const negative = useNegativeTraits();

    // Chosen trait setters
    const [ chosenPositive, setChosenPositive ] = useState([]);
    const [ chosenNeutral, setChosenNeutral ] = useState([]);
    const [ chosenNegative, setChosenNegative ] = useState([]);

    // Lets CharacterTraitList.jsx set chosen pos/neu/neg traits
    const toggleItem = useCallback((setFn, item) => {
      setFn(prev => ToggleTrait(prev, item));
    }, []);

    const onTogglePositive = (item) => toggleItem(setChosenPositive, item);
    const onToggleNeutral = (item) => toggleItem(setChosenNeutral, item);
    const onToggleNegative = (item) => toggleItem(setChosenNegative, item);

    // Clears chosen traits from trait list
    const availablePositive = FilterAvailableTraits(positive.data ?? [], chosenPositive);

    const availableNeutral = FilterAvailableTraits(neutral.data ?? [], chosenNeutral);

    const availableNegative = FilterAvailableTraits(negative.data ?? [], chosenNegative);

    // Lets Dashboard clear all chosen traits
    const clearAll = useCallback(() => {
      setChosenPositive([]);
      setChosenNeutral([]);
      setChosenNegative([]);
    }, [])

    // Lets Dashboard randomize all chosen traits 
    const randomizeAll = useCallback(() => {
      setChosenPositive(PickUnique(positive.data ?? [], 6));
      setChosenNeutral(PickUnique(neutral.data ?? [], 6));
      setChosenNegative(PickUnique(negative.data ?? [], 6));
    }, [positive.data, neutral.data, negative.data]);
    

    const sortedPositive = SortTraits(chosenPositive);
    const sortedNeutral = SortTraits(chosenNeutral);
    const sortedNegative = SortTraits(chosenNegative);

  /* VIEW HANDLING */
    // Active view & mobile / not mobile trackers
    const [ activeView, setActiveView] = useState('traits'); // 'traits', 'dashboard', 'written'
    const [ isMobile, setIsMobile ] = useState(window.innerWidth < 1200);
    
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 1200);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  /* RETURNS */
  // "Loading screen"
  if (positive.isLoading || neutral.isLoading || negative.isLoading) {
    return <div>Loading traits...</div>
  }

  // Errors screen
  if (positive.error || neutral.error || negative.error) {
    return (
      <div>
        {positive.error?.message && <div>Positive trait retrieval error: {positive.error.message}</div>}
        
        {neutral.error?.message && <div>Neutral trait retrieval error: {neutral.error.message}</div>}

        {negative.error?.message && <div>Negative trait retrieval error: {negative.error.message}</div>}
      </div>
    )
  }
 
  return (
      <>

      {isMobile ? (
        // Mobile layout
        <main id="main-content"> 
          <div className="top-area">
            <Header/>
          

            <nav className="mobile-nav" aria-label="Mobile navigation">
              <button 
                onClick={() => setActiveView('traits')}
                className={activeView === 'traits' ? "active-button" : ''}
                aria-current={activeView === "traits" ? "page" : undefined}
                type="button"
              >Trait List</button>
              
              <button 
                onClick={() => setActiveView('dashboard')}
                className={activeView !== 'traits' ? "active-button" : ''}
                aria-current={activeView === "dashboard" ? "page" : undefined}
                type="button"
              >{activeView !== 'written' ? "Dashboard Profile" : "Written Profile"}</button>
            </nav>
          </div>

          <div className="main-content">
            {activeView === 'traits' && 
              (<CharacterTraitList
                positiveTraits={availablePositive}
                neutralTraits={availableNeutral}
                negativeTraits={availableNegative}
                
                chosenPositive={sortedPositive}
                chosenNeutral={sortedNeutral}
                chosenNegative={sortedNegative}

                onTogglePositive={onTogglePositive}
                onToggleNeutral={onToggleNeutral}
                onToggleNegative={onToggleNegative}
              />)
              }

              {activeView === 'dashboard' && (
                <div> 
                  <Dashboard 
                    chosenPositive={sortedPositive}
                    chosenNeutral={sortedNeutral}
                    chosenNegative={sortedNegative}

                    onClear={clearAll}
                    onRandom={randomizeAll}

                    onTogglePositive={onTogglePositive}
                    onToggleNeutral={onToggleNeutral}
                    onToggleNegative={onToggleNegative}

                    onViewChange={() => setActiveView('written')}
                  />
                </div>
              )}

              {activeView === 'written' && (
                <div> 
                  <WrittenProfile
                    chosenPositive={sortedPositive}
                    chosenNeutral={sortedNeutral}
                    chosenNegative={sortedNegative}

                    onViewChange={() => setActiveView('dashboard')}
                  />
                </div>
              )}
          </div>          
        </main>
      ) : (
        <main id="main-content">
          <Header/>
          <div className="desktop-grid">
            <div className="desktop-left">
              {activeView === 'dashboard' || activeView === 'traits' ? (
                  <Dashboard 
                    chosenPositive={sortedPositive}
                    chosenNeutral={sortedNeutral}
                    chosenNegative={sortedNegative}

                    onClear={clearAll}
                    onRandom={randomizeAll}
                  
                    onTogglePositive={onTogglePositive}
                    onToggleNeutral={onToggleNeutral}
                    onToggleNegative={onToggleNegative}

                    onViewChange={() => setActiveView('written')}

                    
                  />                  
              ) : (
                  <WrittenProfile 
                    chosenPositive={sortedPositive}
                    chosenNeutral={sortedNeutral}
                    chosenNegative={sortedNegative}

                    onViewChange={() => setActiveView('dashboard')}

                    
                  />                
              )}
            </div>

              <div className="desktop-right">
                <CharacterTraitList 
                positiveTraits={availablePositive}
                neutralTraits={availableNeutral}
                negativeTraits={availableNegative}
                
                chosenPositive={sortedPositive}
                chosenNeutral={sortedNeutral}
                chosenNegative={sortedNegative}

                onTogglePositive={onTogglePositive}
                onToggleNeutral={onToggleNeutral}
                onToggleNegative={onToggleNegative}
              />
              </div>
            </div>            
          </main>
        )}
      </>
  )
}

export default App
