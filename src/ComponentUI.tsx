import React,{useState} from "react";
import {
    InputComponent,
    PlusComponent,
    ResultComponent,
    ButtonComponent,
} from "./Components";

const ComponentUI : React.FC=()=> {

    const [value1,setValue1] = useState<number>(0);
    const [value2,setValue2] = useState<number>(0);
    const [result,setResult] = useState<number | null>(null);

    const handleCalculate = () =>{
        setResult(value1+value2);
    };
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Simple Addition App</h3>
      <InputComponent  value={value1} onChange={ (value:number) => { if(value>0) setValue1(value)}}/>
      <InputComponent  value={value2} onChange={setValue2}/>
      <PlusComponent />
      <ButtonComponent onClick={handleCalculate}/>
      {result !==null && <ResultComponent result={result}/>}
    </div>
  )
}

export default ComponentUI
