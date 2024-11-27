import OrdersContext from './context/OrdersContext'
import { useState } from 'react'
import MainTabs from './components/Tabs/MainTabs'
import './App.css'
import { getUsersDataApi } from './api/getUsersDataApi'

function App() {
  const [orders, setOrders] = useState()

  setInterval(async () => await getUsersDataApi(), 30000) // чтобы API не перестало отдавать данные по истечении 50с неактивности

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      <div className="App">
        <MainTabs />
      </div>
    </OrdersContext.Provider>
  )
}

export default App
