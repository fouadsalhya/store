import React, { useState } from 'react'
import { isAuthenticated } from '../user/userToken'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../actions/userAction'
import { useHistory } from 'react-router'
const Dashbord = () => {  

    const dispatch = useDispatch()
    const { user , token } = isAuthenticated()

    
   
    return (
        <div>
            <div className="container" style={{marginTop:150}}>
                <div className="row">
                    <div className="col-md-5" >
                        <h4>Bonjour {isAuthenticated() && isAuthenticated().user.name}</h4>
                         <div className="card" style={{width:"18rem", marginTop:20, cursor:'pointer'}}>
                           <div className="card-body">
                             <h5 className="card-title">
                                 Name: {isAuthenticated().user.name}
                                 <i 
                                    class="fa fa-trash" 
                                    style={{float:'right',color:'red'}} 
                                    aria-hidden="true">
                                
                                 </i>
                             </h5>
                             <h6 className="card-subtitle mb-2 text-muted pt-2">
                                 Email: {isAuthenticated().user.email}
                             </h6>
                             <p className="card-text pt-2">
                                 Role: {isAuthenticated().user.role ? 'Admin' : 'Client'}
                             </p>
                           </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashbord
