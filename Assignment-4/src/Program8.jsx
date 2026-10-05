import { useState } from 'react'

const products = [
  { id: 1, name: 'Notebook', price: 50 },
  { id: 2, name: 'Pen', price: 10 },
  { id: 3, name: 'Backpack', price: 800 },
  { id: 4, name: 'Water Bottle', price: 150 },
]

function ProductList({ onAddToCart }) {
  return (
    <div>
      <h3>Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ₹{product.price}{' '}
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Cart({ cartItems, onRemoveFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div>
      <h3>Cart</h3>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ₹{item.price}{' '}
              <button onClick={() => onRemoveFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: ₹{total}</p>
    </div>
  )
}

function Program8() {
  const [cartItems, setCartItems] = useState([])

  function handleAddToCart(product) {
    setCartItems([...cartItems, product])
  }

  function handleRemoveFromCart(index) {
    setCartItems(cartItems.filter((_, i) => i !== index))
  }

  return (
    <div>
      <ProductList onAddToCart={handleAddToCart} />
      <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
    </div>
  )
}

export default Program8
