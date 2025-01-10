import React,{useState} from 'react';

interface FormData{
    name:string;
    email:string;
    password:string;
    age:number|string;
    phone:string;
}

 const Form : React.FC = ()=>{
    const [formData,setFormData] = useState<FormData>({
        name:"",
        email:"",
        password:"",
        age:"",
        phone:"",
    });
    const [error,setError] = useState<string>("");
    const [submittedData,setSubmittedData] = useState<FormData | null>(null);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} =  e.target;
        setFormData({
            ...formData,
            [name]: name==="age" ? Number(value) || " " : value,
        });
    };
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!formData.name || formData.age===""|| !formData.password|| !formData.email|| !formData.phone){
            setError("All fileds are required");
            return;
        }
        if(!/\S+@\S+\.\S+/.test(formData.email)){
          setError("Please Enter a valid email address");
          return;
        }
        if (formData.phone.length !== 10 || !/^[0-9]+$/.test(formData.phone)) {
          setError("Phone number must be exactly 10 digits and contain only numbers.");
          return;
        }
    
        if (!/(?=.*[!@#$%^&*])(?=.*\d).{8,}/.test(formData.password)) {
          setError("Password must be at least 8 characters long, include at least one special character, and one digit.");
          return;
        }
    
        
        setError("");
        setSubmittedData(formData);
        setFormData({name:" ",email:" ",password:"   ",age:" ",phone:" "});
    }
    return(
        <div >
      <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>User Form</h1><br></br>
      <form onSubmit={handleSubmit} style={{ maxWidth: "300px",border:"3px solid black",alignContent:"center",marginLeft:"450px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "80%", padding: "8px" }}
          />
        </div>
        <div style={{marginBottom:"15px"}}>
          <label htmlFor='email' style={{display:"block",marginBottom:"5px"}}>
            Email:
          </label>
          <input 
          type='email'
          id="email"
          name='email'
          value={formData.email}
          onChange={handleChange}
          style={{width:"80%",padding:"8px"}}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="age" style={{ display: "block", marginBottom: "5px" }}>
            Password:
          </label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: "80%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="age" style={{ display: "block", marginBottom: "5px" }}>
            Age:
          </label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{ width: "80%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="phone" style={{ display: "block", marginBottom: "5px" }}>
            Phone Number:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: "80%", padding: "8px" }}
          />
        </div>
        {error && (
          <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 15px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        </form>
        </div>
        {submittedData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Submitted Data:</h2>
          <p>
            <strong>Name:</strong> {submittedData.name}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Password:</strong> {submittedData.password}
          </p>
          <p>
            <strong>Age:</strong> {submittedData.age}
          </p>
          <p>
            <strong>Phone:</strong> {submittedData.phone}
          </p>
        </div>
      )}
        </div>
        
       
    )
   
}

export default Form;