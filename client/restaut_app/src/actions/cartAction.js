import { uniqBy } from "lodash"


export const addToCart = (item) => {
   
    let items = JSON.parse(localStorage.getItem('cart')) || []
    items = uniqBy([{...item,count:1},...items],'_id')
    localStorage.setItem('cart',JSON.stringify(items))
    return {
        type: 'ADD_ITEM',
        payload:items
    }
}

export const incItem = (item) => {
    let items = JSON.parse(localStorage.getItem('cart'))
        items = items.map(food => food._id === item._id ? {...item,count:food.count +1}: food)
        localStorage.setItem('cart',JSON.stringify(items))
        return {
            type:'INC_ITEM',
            payload:items
        }       
}

export const decItem = (item) => {
    let items = JSON.parse(localStorage.getItem('cart'))
           if(item.count > 1 ) {
               items = items.map(food => food._id === item._id ? {...item,count:food.count -1}: food)
               localStorage.setItem('cart',JSON.stringify(items))
               return {
                type:'DEC_ITEM',
                payload:items
               }       
           }
           return {type:null}
   
}

export const removeItem = (id) => {
     let items = JSON.parse(localStorage.getItem('cart'))
         items =  items.filter(food => food._id !== id)
         localStorage.setItem('cart',JSON.stringify(items))
         return {
             type:'REMOVE_ITEM',
             payload:items
         }
}

