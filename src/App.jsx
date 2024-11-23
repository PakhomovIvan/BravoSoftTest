import OrdersContext from './components/context/OrdersContext'
import { useState } from 'react'
import MainTabs from './components/Tabs/MainTabs'
// import TestCont from './components/TestCont'
import './App.css'

function App() {
  const [orders, setOrders] = useState([])

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      <div className="App">
        <MainTabs />
        {/* <TestCont /> */}
      </div>
    </OrdersContext.Provider>
  )
}

export default App
