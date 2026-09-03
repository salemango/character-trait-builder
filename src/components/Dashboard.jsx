import PositivePlus from '../assets/add-positive.svg';
import NeutralPlus from '../assets/add-neutral.svg';
import NegativePlus from '../assets/add-negative.svg';

function Dashboard({
    chosenPositive = [], chosenNeutral = [], chosenNegative = [], 
    onClear, onRandom,
    onTogglePositive, onToggleNeutral, onToggleNegative,
    onViewChange
}) {
    
    if (chosenPositive.length == 0 && chosenNeutral.length == 0 && chosenNegative.length == 0) {
        return (
            <section className='dashboard desktop-left-flex'>
                <h2 className="mobile-no-display top-level">Dashboard Profile</h2>

                <p className='no-trait-warning'>You currently don't have any traits selected. Select some traits in the character trait list to begin building your profile!</p>

                <div className='button-row'>
                    <button className='green-button' onClick={onRandom}>Generate Random Traits</button>
                </div>
            </section>
        )
    }

    return(
        <section className="dashboard desktop-left-flex">
            <h2 className="mobile-no-display top-level">Dashboard Profile</h2>

            <div className="scrollable-dashboard">
            <h3>Positive Traits</h3>            
            {chosenPositive.length > 0 &&
                <ul className="trait-list">
                    {chosenPositive.map(positiveTrait =>
                        <li 
                            key={positiveTrait.trait}
                            onClick={() => onTogglePositive(positiveTrait)}
                            className="positive-trait clickable-trait"
                        >
                            <img src={PositivePlus} alt="x icon" className="icon x"/>
                            <p className="trait-name">{positiveTrait.trait}</p>                            
                        </li>
                    )}
                </ul>
            }

            <h3>Neutral Traits</h3>
            {chosenNeutral.length > 0 && 
                <ul className="trait-list">
                    {chosenNeutral.map(neutralTrait => 
                        <li 
                            key={neutralTrait.trait}
                            onClick={() => onToggleNeutral(neutralTrait)}
                            className="neutral-trait clickable-trait"
                        >
                            <img src={NeutralPlus} alt="x icon" className='icon x'/>
                            <p className='trait-name'>
                                {neutralTrait.trait}
                            </p>
                            
                        </li>
                    )}
                </ul>
            }        
            
            <h3>Negative Traits</h3>
            {chosenNegative.length > 0 && 
                <ul className="trait-list">
                    {chosenNegative.map(negativeTrait => 
                        <li 
                            key={negativeTrait.trait}
                            onClick={() => onToggleNegative(negativeTrait)}
                            className="negative-trait clickable-trait"
                        >
                            <img src={NegativePlus} alt="x icon" className='icon x'/>
                            <p className="trait-name">
                                {negativeTrait.trait}
                            </p>
                            
                        </li>
                    )}
                </ul>
            }                
            </div>

            <div className="button-row">
                <button onClick={onClear} className="red-button">Clear</button>
                <button onClick={onRandom} className="green-button">Random</button> 
                <button onClick={onViewChange}>Written Profile</button>
            </div>
        </section>
    )
}

export default Dashboard;