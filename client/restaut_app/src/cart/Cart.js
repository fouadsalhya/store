import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { decItem, incItem, removeItem } from '../actions/cartAction';
import { useDispatch } from 'react-redux';
import { emptyCard, getBraintreeToken, processPayment } from '../braintree/braintree';
import { isAuthenticated } from '../user/userToken';
import DropIn from 'braintree-web-drop-in-react';
import { createOrder } from '../order/order';
const Cart = () => {
    const dispatch = useDispatch()
    const foods = useSelector(state => state.cart.foods)

    const [data, setData] = useState({
        braintreeToken:null,
        error:null,
        instance: {}
    })

    let userId = isAuthenticated() && isAuthenticated().user._id
    let token = isAuthenticated() && isAuthenticated().token

    useEffect(() => {
        getBraintreeToken(userId,token)
          .then(res => setData({...data,braintreeToken:res.token}))
          .catch(err => setData({...data,error:err}))
    },[])

    const dropIn = () => (
        <>
        {data.braintreeToken !== null && foods.length > 0 && (
            <DropIn options={{
                authorization:data.braintreeToken,
            }}
            onInstance={instance => data.instance = instance}
            />
        )}
        </>
    )
    const totalPriceToPay = (foods) => {
        return foods.reduce((total,food) => total + (food.count * food.price ) ,0)
    }

    const buy = () => {
        data.instance.requestPaymentMethod()
           .then(data => {
               let paymentData = {
                   amount:totalPriceToPay(foods),
                   paymentMethodNonce:data.nonce
               }
               processPayment(userId,token,paymentData)
                .then(res => {
                    console.log(res)
                     let orderData = {
                         foods,
                         transactionId:res.transaction.id,
                         amount:res.transaction.amount
                     }
                    createOrder(userId,token,orderData)
                       .then(res => console.log(res))
                    emptyCard(() => {
                        console.log('ok')
                    })
                })
           })
    }
      
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 ">
                        <h4 style={{marginTop:50}}> Votre Cart </h4>
                    <TableContainer component={Paper} style={{marginTop:50}}>
                 <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                   <TableHead>
                     <TableRow>
                       <TableCell>Name</TableCell>
                       <TableCell align="center">Price</TableCell>
                       <TableCell align="center">Quantity</TableCell>
                       <TableCell align="center">Total</TableCell>
                       <TableCell align="right"> </TableCell>

                     </TableRow>
                   </TableHead>
                   <TableBody>
                      {foods.map((food) => (
                      <TableRow
                         key={food.name}
                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                       <TableCell component="th" scope="row">
                            {food.name}
                       </TableCell>
                       <TableCell align="center">{food.price}dh</TableCell>
                       <TableCell align="center">
                           {food.count}
                           
                          <br />   
                          <Button  onClick={() => dispatch(incItem(food))} variant="outlined" size="small">
                          <i 
                              className="fa fa-plus  " 
                              aria-hidden="true" 
                              style={{color:'green', cursor:'pointer'}}>
                           </i>
                          </Button>

                          
                           {food.count > 1 && (
                               <Button onClick={() => dispatch(decItem(food))} variant="outlined" size="small">
                                <i  
                                   className="fa fa-minus " 
                                   aria-hidden="true"  
                                   style={{color:'red', cursor:'pointer'}}>
                                </i>
                                </Button>
                           )}
                         
                        </TableCell>
                       <TableCell align="center">
                           {food.count * food.price}dh
                       </TableCell>
                       <TableCell align="right">
                           <i onClick={() => dispatch(removeItem(food._id))} 
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
                    <div className="col-md-4" style={{marginTop:70}}>
                    <>
                    <h4>Total : {totalPriceToPay(foods)}dh</h4>
                    {dropIn()}
                    <div className="d-grid gap-2 mt-3 p-2">
                             <button onClick={buy} className="btn btn-success" type="button">
                                 Pay
                             </button>
                          </div>  
                    </>
                    </div>
                </div>
            </div>
           </div>
    )
}
    
export default Cart
