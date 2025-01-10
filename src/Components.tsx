import React from "react";

type InputProps = {
    value : number | string;
    onChange: (val : number)=> void;
};

type ResultProps = {
    result : number;
}

export const InputComponent : React.FC<InputProps> =({value,onChange})=>(
    <input 
    type="number"
    value={value}
    onChange={(e)=>onChange(parseFloat(e.target.value))}
    style={{margin:"5px",padding:"5px",width:"50px"}}
    />
);

export const PlusComponent : React.FC = ()=>(
    <span style={{margin:"5px"}}>+</span>
);

export const ResultComponent:React.FC<ResultProps> = ({result})=>(
    <div style={{marginTop:"10px" , fontSize:"18px"}}>
        Result:<strong>{result}</strong>
    </div>
);

export const ButtonComponent : React.FC<{onClick : ()=>void}> = ({
    onClick,
}) =>(
    <button onClick={onClick} 
    style={{ margin: "10px", padding: "5px 10px", cursor: "pointer" }}>
        Calculate
    </button>
)