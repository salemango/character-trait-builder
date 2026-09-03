import PositivePlus from '../assets/add-positive.svg';
import NeutralPlus from '../assets/add-neutral.svg';
import NegativePlus from '../assets/add-negative.svg';

function CharacterTraitList ({
    positiveTraits = [], neutralTraits = [], negativeTraits = [],
    chosenPositive = [], chosenNeutral = [], chosenNegative = [],
    onTogglePositive, onToggleNeutral, onToggleNegative
}) {

    const isSelected = (list, item) => list.some(x => x.trait === item.trait);

    return(
        <section className="character-trait-list">
            <h2 className="mobile-no-display">Character Trait List</h2>

            <h3>Positive Traits</h3>
            <ul className="trait-list">
                {positiveTraits.map(positiveTrait => (
                    <li 
                        key={positiveTrait.trait}
                        className={`positive-trait clickable-trait ${isSelected(chosenPositive, positiveTrait)}`}
                        onClick={() => onTogglePositive?.(positiveTrait)}
                    >
                        
                        <img src={PositivePlus} alt="plus icon" className='icon'/>                        
                        <div>
                            <p className='trait-name'>{positiveTrait.trait}</p>
                            <p className='trait-description'>{positiveTrait.description}</p>
                        </div>
                        
                    </li>
                ))}
            </ul>

            <h3>Neutral Traits</h3>
            <ul className="trait-list">
                {neutralTraits.map(neutralTrait => (
                    <li 
                        key={neutralTrait.trait}
                        className={`neutral-trait clickable-trait ${isSelected(chosenNeutral, neutralTrait)}`}
                        onClick={() => onToggleNeutral?.(neutralTrait)}
                    >
                        
                        <img src={NeutralPlus} alt="plus icon" className='icon'/>                        
                        <div>
                            <p className='trait-name'>{neutralTrait.trait}</p>
                            <p className='trait-description'>{neutralTrait.description}</p>
                        </div>
                    </li> 
                ))}
            </ul>

            <h3>Negative Traits</h3>
            <ul className="trait-list">
                {negativeTraits.map(negativeTrait => (
                    <li 
                        key={negativeTrait.trait}
                        className={`negative-trait clickable-trait ${isSelected(chosenNegative, negativeTrait)}`}
                        onClick={() => onToggleNegative?.(negativeTrait)}
                    >
                        
                        <img src={NegativePlus} alt="plus icon" className='icon'/>                        
                        <div>
                            <p className='trait-name'>{negativeTrait.trait}</p>
                            <p className='trait-description'>{negativeTrait.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default CharacterTraitList;