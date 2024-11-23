import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import OrdersContext from './context/OrdersContext'
import { getData } from './utils/getData.js'
import { checkUser } from './utils/checkUser.js'

function OrderForm() {
  const [data, setData] = useState({ username: '', doctitle: '' })
  const { orders, setOrders } = useContext(OrdersContext)
  const [users, setUsers] = useState('')

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  async function handleOrdersData() {
    setOrders(await getData('orders'))
  }

  async function handleUsersData() {
    setUsers(await getData('users'))
  }

  const testFunc = () => {
    handleOrdersData()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (checkUser(data, orders)) {
      try {
        axios.post('http://localhost:3000/orders', data)
        setData({ username: '', doctitle: '' })
      } catch (error) {
        console.log(error)
      }
      handleOrdersData()
    } else {
      console.log('Заказ уже есть!')
    }
  }

  useEffect(() => {
    handleOrdersData()
    handleUsersData()
  }, [])

  return (
    <div className="order-form">
      <h2>Заявка на документ</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            autoComplete="off"
            placeholder="ФИО конструктора"
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            list="username"
          />
          <datalist id="username">
            {users.length &&
              users.map((user, i) => <option key={i}>{user.username}</option>)}
          </datalist>
        </label>
        <br />
        <label>
          <input
            autoComplete="off"
            placeholder="Наименование документа"
            type="text"
            name="doctitle"
            value={data.doctitle}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Отправить</button>
        <button type="button" onClick={testFunc}>
          Test
        </button>
      </form>
    </div>
  )
}

export default OrderForm
