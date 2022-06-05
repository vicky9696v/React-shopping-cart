import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const clickToRemoveAll = () => {
        removeAllCartItems()
      }
      return (
        <div>
          <button
            type="button"
            className="remove-all-button"
            onClick={clickToRemoveAll}
          >
            Remove All
          </button>
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
