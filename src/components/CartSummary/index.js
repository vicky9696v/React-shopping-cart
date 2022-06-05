import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let total = 0
      cartList.forEach(eachList => {
        total += eachList.price * eachList.quantity
      })

      return (
        <div className="checkout-container">
          <h1>
            Order Total: <span className="total-amount-text">Rs {total}/-</span>
          </h1>
          <p>{cartList.length} Items in cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
