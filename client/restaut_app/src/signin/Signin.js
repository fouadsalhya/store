import React, { useState } from 'react'
import { useHistory } from 'react-router'

const Signin = () => {

    const history = useHistory()
    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const handlInput = (e) => {
        setUser({...user,[e.target.id]:e.target.value})
   }
   const signinUser = (e) => {
       e.preventDefault()
       fetch("http://localhost:2000/api/auth/signin", {
        method: "POST",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json"
        },body:JSON.stringify(user)
       }).then(res => res.json())
         .then(res => {
             if (res.errors) {
                 return console.error(res.errors)
             }
              else {
                localStorage.setItem('JWT_INFO',JSON.stringify(res))
                 history.push('/')
              }
          
         })
   }

    
    const formSignin = () => (
        <div className="container" style={{marginTop:150}}>
             <div className="col-md-6 mx-auto">
                 <h4 style={{textAlign:'center', fontSize:35 }}>
                     <i className="fa fa-user-circle" aria-hidden="true" style={{fontSize:60, color:'darkblue'}}></i>
                     <br />
                     Signin
                 </h4>
                  <form  >
                      <div className="form-group p-2">
                          <label htmlFor="email" className="form-label" style={{fontSize:22}}> Email </label>
                          <input 
                              autoFocus 
                              onChange={handlInput} 
                              type="text" 
                              className="form-control" 
                              id="email"
                              placeholder="saisir votre email" 
                              />
                      </div>
                      <div className="form-group p-2">
                          <label htmlFor="password" className="form-label" style={{fontSize:22}}> Password </label>
                          <input 
                              autoFocus 
                              onChange={handlInput} 
                              type="text" 
                              className="form-control" 
                              id="password" 
                              placeholder="saisir votre password" 

                              />
                      </div>
                      <div class="d-grid gap-2 mt-3 p-2">
                             <button onClick={signinUser} className="btn btn-outline-primary" type="button">
                                 Signin
                             </button>
                    </div>  
                  </form>
             </div>
        </div>
    )
    return (
        <div>
            {formSignin()}
        </div>
    )
}

export default Signin
