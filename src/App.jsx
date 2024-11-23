import { useState } from 'react'
import MainTabs from './components/Tabs/MainTabs'
import OrdersContext from './components/context/OrdersContext'
import './App.css'

function App() {
  const [orders, setOrders] = useState('')

  return (
    <OrdersContext.Provider
      value={{ ordersName: orders, setOrdersName: setOrders }}
    >
      <div className="App">
        <MainTabs />
      </div>
    </OrdersContext.Provider>
  )
}

export default App
