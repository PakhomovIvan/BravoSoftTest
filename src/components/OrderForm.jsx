import { useState, useContext, useEffect } from 'react'
import OrdersContext from './context/OrdersContext'
import { getDataApi } from './api/getDataApi.js'
import { postDataApi } from './api/postDataApi.js'
import { checkUser } from './utils/checkUser.js'
import { setDocs } from './utils/setDocs.js'

function OrderForm() {
  const [data, setData] = useState({ username: '', doctitle: '' })
  const { orders, setOrders } = useContext(OrdersContext)
  const [users, setUsers] = useState('')

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  async function handleOrdersData() {
    setOrders(await getDataApi('orders'))
  }

  async function handleUsersData() {
    setUsers(await getDataApi('users'))
  }

  const testFunc = () => {
    setDocs()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (checkUser(data, orders)) {
      await postDataApi(data)
      handleOrdersData()
      setData({ username: '', doctitle: '' })
    } else {
      console.log('Заказ уже есть!')
    }
  }

  useEffect(() => {
    handleUsersData()
    handleOrdersData()
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
        <div></div>
        <button type="submit">Отправить</button>
        <button type="button" onClick={testFunc}>
          Test
        </button>
      </form>
    </div>
  )
}

export default OrderForm
