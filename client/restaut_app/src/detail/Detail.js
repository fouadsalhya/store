import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../user/userToken'
const Detail = () => {
      
     const [food,setFood] = useState({})
     const [formData,setFormData] = useState(new FormData())
     const {id} = useParams() 
     const { user, token } = isAuthenticated()

     useEffect(() => {
         getFoodById()
     },[])
   
      const [status,setStatus] = useState(false)
 
      const showForm = () => {
        setStatus(!status)
        console.log(status)
      }
     
   
        
       const getFoodById = () => {
            fetch(`http://localhost:2000/api/foods/${id}`, {
                method: "GET",
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            }).then(res => res.json())
              .then(res => {
                  setFood(res.food)
              })
       }
        const handlInput = (e) => {
          const value = e.target.id === 'image' ? e.target.files[0] : e.target.value
          formData.set(e.target.id,value)
          setFood({...food,[e.target.id]:e.target.value})
        }

     
        
     
    return (
        <div> 
            <div className="container" style={{marginTop:150}}>
                  <div className="row">
                      <div className="col-md-6">
                      <Card sx={{ maxWidth: 345 }} style={{marginTop:44}}>
       <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:2000/api/foods/image/${id}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
             {food.name}
          </Typography>
          <Typography variant="body2" color="inherit">
             {food.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="inherit">
            <Link to="/">
               <i className="fa fa-arrow-circle-left" aria-hidden="true" style={{fontSize:30}}></i>
            </Link>
        </Button>
         <Button onClick={showForm} size="small">
           <i className="fa fa-edit"  style={{fontSize:22, color:'orange', cursor:'pointer'}}></i>
         </Button>
      </CardActions>
    </Card>
  </div>
  <div className="col-md-6">
  { status &&  user.role === 1 && (
                  
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
                           <button className="btn btn-warning" type="button">Update</button>
                        </div>                  
                  </form>             
                )}
        
  </div>
</div>          
</div>
</div>
    )
}

export default Detail
