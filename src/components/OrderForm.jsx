import { useState, useContext } from 'react'
import OrdersContext from './context/OrdersContext'
import axios from 'axios'

function OrderForm() {
  const [data, setData] = useState({ username: '', doctitle: '' })
  const { orders, setOrders } = useContext(OrdersContext)
  const [users, setUsers] = useState(getUsersData)

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  async function getOrdersData() {
    try {
      const orders = await axios.get('http://localhost:3000/orders')
      setOrders(orders.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  async function getUsersData() {
    try {
      const users = await axios.get('http://localhost:3000/users')
      setUsers(users.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const checkUser = () => {
    const ordersNew = JSON.parse(JSON.stringify(orders))
    ordersNew.forEach((order) => delete order.id)
    return ordersNew.filter(
      (order) =>
        order.username === data.username && order.doctitle === data.doctitle
    )
  }

  const testFunc = () => {}

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!checkUser().length) {
      try {
        axios.post('http://localhost:3000/orders', data)
        setData({ username: '', doctitle: '' })
        getOrdersData() // разобраться с вызовом
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('Заказ уже есть!')
    }
  }

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
