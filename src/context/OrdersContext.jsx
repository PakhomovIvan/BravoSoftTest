import { createContext } from 'react'

const OrdersContext = createContext({
  orders: '',
  setOrders: () => {},
})

export default OrdersContext
