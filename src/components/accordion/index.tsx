import { useState } from "react";
import dataBrazil from "./dataBrazil";
import './style.css';

export default function Accordion() {

    const [selected, setSelected] = useState(null); 
    const [enableMultiSelection, setMultipleSelection] = useState(false);
    const [multipleSelected, setMultipleSelected] = useState<string[]>([]);

    function handleSingleSelection(currentId : any) {
        setSelected(currentId === selected ? null : currentId);
    }

    function handleMultipleSelection(currentId : any) {
        let copyMultiple : string[] = [...multipleSelected]
        const indexOfCurrentId = copyMultiple.indexOf(currentId);
        if(indexOfCurrentId === -1)
        {
            copyMultiple.push(currentId);
        }
        else
        {
            copyMultiple.splice(indexOfCurrentId, 1);
        }
        setMultipleSelected(copyMultiple)
    }


    

    return (
    <div className="wrapper">
             <button onClick={() => setMultipleSelection(!enableMultiSelection) } className={enableMultiSelection ? "button multiselection" : "button singleselection"}>
                    select multiple items
            </button>
            <div className="accordion">
                {dataBrazil && dataBrazil.length > 0 ? (
                    dataBrazil.map(dataItem => <div className ="item">
                        <div onClick={enableMultiSelection ? 
                            () => handleMultipleSelection(dataItem.id) :
                            () => handleSingleSelection(dataItem.id)} 
                            className = "title">
                            <h3>{dataItem.question}</h3>
                            <span>+</span>
                        </div>
                        {
                            enableMultiSelection ? multipleSelected.indexOf(dataItem.id) !== -1 
                            && (<div className = "content" >{dataItem.answer}</div>)
                            : selected === dataItem.id 
                            && (<div className = "content" >{dataItem.answer}</div>) 
                            
                        }
                    </div>
                    ))
                    : (
                    <div>No data found!</div>
                )}
            </div>            
        </div>
    );
}