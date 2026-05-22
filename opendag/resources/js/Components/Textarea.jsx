import { useEffect, useRef, useState } from "react";

const Textarea = ({value, onChange, formatChange}) => {
    const [selected, setSelected] = useState(null);
    const ref = useRef();
    const format = (type) => {
        let start = ref.current.selectionStart;
        let end = ref.current.selectionEnd;
        if(type == 'bold'){
            let newtext = value.substring(start, end);
            // console.log(newtext);
            let thisis = `${value.slice(0, start)}**${value.slice(start, end)}**${value.slice(end, value.length)}`;
            formatChange(thisis);
        }
        else if(type == 'italic'){
            let thisis = `${value.slice(0, start)}<i>${value.slice(start, end)}<i>${value.slice(end, value.length)}`;
            formatChange(thisis);
        }
        else if(type == 'underline'){
            let thisis = `${value.slice(0, start)}__${value.slice(start, end)}__${value.slice(end, value.length)}`;
            formatChange(thisis);
        }
    }

// onSelect={(event) => console.log(event)}
    // useEffect(() => {
    //     console.log(ref.current.selectionStart);
    //     console.log(ref.current.selectionEnd);
    //     console.log(value.substring(ref.current.selectionStart, ref.current.selectionEnd));
    // }, [ref.current.selectionStart]);
    return (
        <div className="textarea">
            <span className="textarea__panel">
                <button type="button" onClick={() => format('bold')} className="textarea__panel--button textarea__bold">
                    B
                </button>
                <button type="button" onClick={() => format('italic')} className="textarea__panel--button textarea__italic">
                    I
                </button>
                <button type="button" onClick={() => format('underline')} className="textarea__panel--button textarea__underline">
                    U
                </button>
                <button type="button" onClick={() => format('link')} className="textarea__panel--button textarea__bold">
                    U
                </button>
            </span>
            <textarea ref={ref} name="" id="" value={value} onSelect={() => setSelected(value.substring(ref.current.selectionStart, ref.current.selectionEnd))} onChange={onChange} className="textarea__box">
            </textarea>
        </div>
    );
}

export default Textarea;