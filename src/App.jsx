import OrdersContext from './context/OrdersContext'
import { useState } from 'react'
import MainTabs from './components/Tabs/MainTabs'
import './App.css'

function App() {
  const [orders, setOrders] = useState()

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      <div className="App">
        <MainTabs />
      </div>
    </OrdersContext.Provider>
  )
}

export default App
