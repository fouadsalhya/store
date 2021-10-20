let items = JSON.parse(localStorage.getItem('cart')) || []

let myState = {
    foods:items || [],
    count:items.reduce((total,food) => total + food.count,0)

}

const cartReducer = (state = myState,action) => {
         switch(action.type) {
              case 'ADD_ITEM': {
                  return {
                      ...state,
                      foods:action.payload,
                      count:action.payload.reduce((total,food) => total + food.count,0)
                  }
                }
                case 'INC_ITEM': {
                  return {
                      ...state,
                      foods:action.payload,
                      count:state.count +1
                  }
                }
                case 'DEC_ITEM': {
                    return {
                        ...state,
                        foods:action.payload,
                        count:state.count -1
                    }
                }
                case 'REMOVE_ITEM': {
                    return {
                        ...state,
                        foods:action.payload,
                        count:action.payload.reduce((total,food) => total + food.count,0)
                    }
                }
             default : 
             return state
         }
}

export default cartReducer