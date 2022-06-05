import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const remainingItemsInCart = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: remainingItemsInCart})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(eachProduct => {
        if (eachProduct.id === id) {
          const updateQuantity = eachProduct.quantity + 1
          return {...eachProduct, quantity: updateQuantity}
        }
        return eachProduct
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productItem = cartList.find(eachItem => eachItem.id === id)

    if (productItem.quantity > 1) {
      this.setState(prev => ({
        cartList: prev.cartList.map(eachItem => {
          if (eachItem.id === id) {
            const updatedList = eachItem.quantity - 1
            return {...eachItem, quantity: updatedList}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const productUpdate = cartList.find(eachItem => eachItem.id === product.id)
    if (productUpdate) {
      this.setState(prev => ({
        cartList: prev.cartList.map(eachItem => {
          if (eachItem.id === productUpdate.id) {
            const updateData = eachItem.quantity + product.quantity
            return {...eachItem, quantity: updateData}
          }
          return eachItem
        }),
      }))
    } else {
      const updatedData = [...cartList, product]
      this.setState({cartList: updatedData})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
