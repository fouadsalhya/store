import React, { useState , useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartAction';
import { isAuthenticated } from '../user/userToken';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router';
import { Fragment } from 'react';
import Detail from '../detail/Detail';
const  Home = () => {
const dispatch = useDispatch()
const history =  useHistory()
const [foods, setFoods] = useState([])
const [formData,setFormData] = useState(new FormData())

useEffect(() => {
    getAllFood()
},[])

const getAllFood = () => {
    fetch("http://localhost:2000/api/foods/all", {
        method: "GET",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json"
        }
    }).then(res => res.json())
      .then(res => setFoods(res.foods))
      .catch(err => console.error(err))
}

const { user, token } = isAuthenticated()

const removeFood = (id) => {
    fetch(`http://localhost:2000/api/foods/${id}/${user._id}`, {
      method: "DELETE",
      headers: {
        "Authorization":`Bearer ${token}`
      }
    }).then(res => res.json())
      .then(res => {
        let foodResult = foods.filter(food => food._id !== id)
        setFoods(foodResult)
      })
}




const detailFood = (id) => {
      history.push(`/detail/${id}`)
}

    return (
        <div>
                    <div className="container-fluid mt-5">
                <div className="row">
                    <h4 style={{textAlign:'center' ,marginTop:60}}>Voici le Menu</h4>
                    {foods.map((food,i) => (
                          <div className="col-md-4 mx-auto mt-3" key={i}>
                          <Card sx={{ maxWidth: 345 }} style={{margin:7}}>
                              <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image={`http://localhost:2000/api/foods/image/${food._id}`}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                  {food.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={{fontSize:15}}>
                                   Price: {food.price}dh
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button size="small" onClick={() => dispatch(addToCart(food))}>
                                  Ajouter au Panier
                                </Button>
                                <Button onClick={() => detailFood(food._id)} size="small" style={{float:'right'}}>
                                    Detail
                                 </Button>
                                  {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                  <Fragment>
                                  <Button onClick={() => removeFood(food._id)} size="small">
                                    Delete
                                 </Button>
                                 <Button onClick={() => detailFood(food._id)} size="small">
                                   Edit
                                 </Button>
                                   </Fragment>

                                  )}
                              </CardActions>
                            </Card>
                          </div>
                    ))}
                   
                </div>
            </div>
        </div>
    )
}

export default Home
