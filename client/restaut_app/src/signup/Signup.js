import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
const Signup = () => {
     const history = useHistory()
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:''
    })


    const handlInput = (e) => {
         setUser({...user,[e.target.id]:e.target.value})
    }

    const signupUser = (e) => {
        e.preventDefault()
        fetch("http://localhost:2000/api/auth/signup", {
            method: "POST",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },body:JSON.stringify(user)
        }).then(res => res.json())
          .then(res => console.log(res.user))
          .catch(err => console.error(err))
          setUser({
            name:'',
            email:'',
            password:''
          })
          history.push('/signin')
    }


  


    const formSignup = () => (
        <div className="container" style={{marginTop:150}}>
             <div className="col-md-6 mx-auto">
             <h4 style={{textAlign:'center', fontSize:35 }}>
                     <i className="fa fa-user-circle" aria-hidden="true" style={{fontSize:60, color:'darkblue'}}></i>
                     <br />
                     Signup
                 </h4>
                  <form >
                      <div className="form-group p-1">
                          <label htmlFor="name"  style={{fontSize:22}}>Name</label>
                          <input
                               autoFocus 
                               onChange={handlInput} 
                               type="text" 
                               className="form-control" 
                               id="name" 
                               placeholder="saisir votre name"
                               />
                      </div>
                      <div className="form-group p-1">
                          <label htmlFor="email"  style={{fontSize:22}}>Email</label>
                          <input
                               autoFocus 
                               onChange={handlInput} 
                               type="text" 
                               className="form-control" 
                               id="email"
                               placeholder="saisir votre email"
                               />
                      </div>
                      <div className="form-group p-1">
                          <label htmlFor="password"  style={{fontSize:22}}>Password</label>
                          <input
                               autoFocus 
                               onChange={handlInput} 
                               type="text" 
                               className="form-control" 
                               id="password"
                               placeholder="saisir votre password"
                                 />
                      </div>
                      <div class="d-grid gap-2 mt-3 p-1">
                             <button onClick={signupUser} className="btn btn-outline-primary" type="button">
                                 Signup
                             </button>
                          </div>  
                  </form>
             </div>
        </div>
    )



    return (
        <div>
             {formSignup()}
        </div>
    )
}

export default Signup
