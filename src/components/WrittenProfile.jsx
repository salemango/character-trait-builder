import { useState, useMemo, useRef} from "react";
import { sortParagraph, createConnectorMap, normalizeBioText } from "../functions/BioDataHandlers";

function WrittenProfile ({chosenPositive, chosenNeutral, chosenNegative, onViewChange}) {
    const [ charName, setCharName ] = useState("");
    const [ charPronouns, setCharPronouns ] = useState("he");
    const [ bioType, setBioType ] = useState(2);
    const paragraphRef = useRef(null);

    const connectorMap = useMemo(
        () => createConnectorMap(chosenPositive, chosenNeutral, chosenNegative), [chosenPositive, chosenNeutral, chosenNegative]
    );

    const orderedPositive = sortParagraph(
        chosenPositive, charName,
        (trait) => bioType === 1 ? trait?.bio?.group1 : trait?.bio?.group2
    );

    const orderedNeutral = sortParagraph(
        chosenNeutral, charName,
        (trait) => bioType === 1 ? trait?.bio?.group1 : trait?.bio?.group2
    );

    const orderedNegative = sortParagraph(
        chosenNegative, charName,
        (trait) => trait?.bio?.[bioType === 1 ? "group1" : "group2"]
    ) 


    const handleCopy = async () => {
        const text = paragraphRef.current?.innerText.trim();

        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            console.log("copied successfully");
        } catch (error) {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            console.log(error);
        }
    }

    if (chosenPositive.length == 0 && chosenNeutral.length == 0 && chosenNegative.length == 0) {
        return (
            <section className="desktop-left-flex">
                <h2 className="mobile-no-display">Written Profile</h2>

                <p className="no-trait-warning">You currently don't have any traits selected. Select some traits in the character trait list to begin building your profile!</p>
            </section>
        )
    }

    
    return (
        <section className="desktop-left-flex">
            <div className="top-level">
                <h2 className="mobile-no-display">Written Profile</h2>

                <fieldset className="form-row">
                    <label className="label" htmlFor="charName">My character's name is: </label>
                    <input 
                        type="text" 
                        name="charName"
                        id="charName"
                        value={charName}
                        onChange={(e) => {setCharName(e.target.value)}}
                    />
                </fieldset>

                <fieldset className="form-row">
                    <p className="label">My character's pronouns are: </p>

                    <label className={charPronouns === 'he' ? "active-radio" : ''}>
                        <input type="radio" name="pronouns" value="he" id="he"
                            checked={charPronouns === "he"}
                            onChange={(e) => {setCharPronouns(e.target.value); setBioType(2)}}
                        /> he/him
                    </label>

                    <label className={charPronouns === 'she' ? "active-radio" : ''}>
                        <input type="radio" name="pronouns" value="she" id="she"
                            checked={charPronouns === "she"}
                            onChange={(e) => {setCharPronouns(e.target.value); setBioType(2)}}
                        /> she/her
                    </label>

                    <label className={charPronouns === 'they' ? 'active-radio' : ''}>
                        <input type="radio" name="pronouns" value="they" id="they"
                            checked={charPronouns === "they"}
                            onChange={(e) => {setCharPronouns(e.target.value); setBioType(1)}}
                        /> they/them
                    </label>
                </fieldset>
            </div>

            <div className="paragraph-container scrollable-dashboard" ref={paragraphRef}>
                { bioType == 1 && 
                    <div className="written-paragraphs">
                        <p>
                            {orderedPositive.map((trait, index) => (
                                <span key={trait.trait}>{normalizeBioText(
                                    trait?.bio?.group1, 
                                    index, 
                                    `positive-${index}`, 
                                    charName, 
                                    charPronouns, 
                                    connectorMap
                                )} </span>
                            ))}
                        </p>

                        <p>
                            {orderedNeutral.map((trait, index) => (
                                <span key={trait.trait}>{normalizeBioText(
                                    trait?.bio?.group1, 
                                    index, 
                                    `neutral-${index}`,
                                    charName,
                                    charPronouns,
                                    connectorMap
                                )} </span>
                            ))}
                        </p>

                        <p>
                            {orderedNegative.map((trait, index) => (
                                <span key={trait.trait}>{normalizeBioText(
                                    trait?.bio?.group1, 
                                    index, 
                                    `negative-${index}`,
                                    charName,
                                    charPronouns,
                                    connectorMap
                                )} </span>
                            ))}
                        </p>
                    </div>
                }


                { bioType == 2 && 
                    <div className="written-paragraphs">
                        <p>
                            {orderedPositive.map((trait, index) => (
                                <span key={trait.trait}>{normalizeBioText(
                                    trait?.bio?.group2, 
                                    index, 
                                    `positive-${index}`,
                                    charName,
                                    charPronouns,
                                    connectorMap
                                )} </span>
                            ))}
                        </p>

                        <p>
                            {orderedNeutral.map((trait, index) => (
                                <span key={trait.trait}>{normalizeBioText(
                                    trait?.bio?.group2, 
                                    index, 
                                    `neutral-${index}`,
                                    charName,
                                    charPronouns,
                                    connectorMap
                                )} </span>
                            ))}
                        </p>

                        <p>
                            {orderedNegative.map((trait, index) => (
                                <span key={trait.trait}>{normalizeBioText(
                                    trait?.bio?.group2, 
                                    index, 
                                    `negative-${index}`,
                                    charName,
                                    charPronouns,
                                    connectorMap
                                )} </span>
                            ))}
                        </p>
                    </div>
                }
            </div>

            <div className="button-row">
                <button className="green-button" onClick={handleCopy}>Copy to Clipboard</button>
                <button onClick={onViewChange}>Dashboard Profile</button>
            </div>

        </section>
    )
}

export default WrittenProfile;