import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [credentials, setcredentials] = useState({name:"", email:"", password:"", cpassword:""})
    const navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const {name, email, password} = credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            // redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e) => {
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <h1 className='my-3'>Signup to iNotebook</h1>
            <form className='my-3' onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} minLength={3} id="name" name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="Password" className="form-control" value={credentials.password} onChange={onChange} minLength={5} required id="password" name="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="Password" className="form-control" value={credentials.cpassword} onChange={onChange} minLength={5} required id="cpassword" name="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup
