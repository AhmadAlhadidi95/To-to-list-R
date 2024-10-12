import "./InputBox.css";

export function InputBox({handleButton, handleInput, handleValue}) {

    return (
        <div className="inputBox">
            <button onClick={handleButton} disabled={handleValue <= 0}>إضافة</button>

            <input dir="rtl" placeholder="أضف مهمة" value={handleValue} onChange={handleInput}/>
        </div>
    );
    
}