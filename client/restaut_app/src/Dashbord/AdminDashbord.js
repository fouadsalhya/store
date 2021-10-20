import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../user/userToken'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../actions/userAction'
import { removeUser } from '../actions/userAction';
const AdminDashbord = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const users = useSelector(state => state.users.users)
    const [food, setFood] = useState({
        name:'',
        description:'',
        price:'',
        image:''
    })
    const [formData,setFormData] = useState(new FormData())
    const [status, setStatus] = useState(false)

    const showForm = () => {
      setStatus(!status)
    }
    const { user , token } = isAuthenticated()

    useEffect(() => {
        dispatch(getAllUsers(user._id,token))
    },[])
    
    
     
    const handlInput = (e) => {
         const value = e.target.id === 'image' ? e.target.files[0] : e.target.value
         formData.set(e.target.id,value)
         setFood({...food,[e.target.id]:e.target.value})
    }  

    const createFood = (e) => {
          e.preventDefault()
          fetch(`http://localhost:2000/api/foods/create`, {
              method: "POST",
              headers: {
                  "Accept":"application/json",
              },body:formData
          }).then(res => res.json())
            .then(res => {
                console.log(res.food)
                setFood({
                    name:'',
                    description:'',
                    price:'',
                    image:''
                })
                setFormData(new FormData())
                history.push('/')
                setStatus(!status)

            })
            .catch(err => console.error(err))
    }

   
    return (
        <div>
              <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-7 ">
                        <h4 style={{marginTop:50}}> Liste des Clients Mr.{user.name} </h4>
                    <TableContainer component={Paper} style={{marginTop:50}}>
                 <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                   <TableHead>
                     <TableRow>
                       <TableCell>Name</TableCell>
                       <TableCell align="center">Email</TableCell>
                       <TableCell align="center">Role</TableCell>
                       <TableCell align="right"> </TableCell>

                     </TableRow>
                   </TableHead>
                   <TableBody>
                      {users.map((user) => (
                      <TableRow
                         key={user.name}
                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                       <TableCell component="th" scope="row">
                            {user.name}
                       </TableCell>
                       <TableCell align="center">{user.email}</TableCell>
                       <TableCell align="center">
                           {user.role ? 'Admin' : 'Client'}
                        </TableCell>  
                       <TableCell align="right">
                           <i  
                              onClick={() => dispatch(removeUser(user._id))}
                              className="fa fa-trash" 
                              style={{color:'red', cursor:'pointer'}} 
                              aria-hidden="true">
                           </i>
                       </TableCell>
                        </TableRow>
                        ))}
                   </TableBody>
                 </Table>
             </TableContainer>
                    </div>
                 
                        <div className="col-md-5">
                          {!status && (
                                <button onClick={showForm} className="btn btn-outline-secondary" style={{float:'right', marginTop:47}}>
                                <i className="fa fa-plus" aria-hidden="true"></i>
                             </button>
                          )}
                     
                          {status && (
                            <>
                        <h4 style={{marginTop:50}}>Creer un Food</h4>
                        <form style={{marginTop:19}}>
                              <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input value={food.name} onChange={handlInput} type="text" className="form-control" id="name"  />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input value={food.description} onChange={handlInput} type="text" className="form-control" id="description" />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input value={food.price} onChange={handlInput} type="number" className="form-control" id="price" />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image de votre Product</label>
                                <input  onChange={handlInput} type="file" className="form-control" id="image" />
                              </div>
                              <div className="d-grid gap-2">
                                 <button onClick={createFood} className="btn btn-secondary" type="button">Create</button>
                              </div>              
                        </form>
                          </>
                           )}
                        </div>
                 
                    
                </div>
            </div>
        </div>
    )
}

export default AdminDashbord
