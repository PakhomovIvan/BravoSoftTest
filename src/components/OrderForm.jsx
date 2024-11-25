import { useState, useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import OrdersContext from './context/OrdersContext'
import { getOrdersDataApi } from './api/getOrdersDataApi.js'
import { getUsersDataApi } from './api/getUsersDataApi.js'
import { postOrdersDataApi } from './api/postOrdersDataApi.js'
import { checkUser } from './utils/checkUser.js'
import { setDocs } from './utils/setDocs.js'
import { notify } from './utils/Notification/notification.js'

function OrderForm() {
  const [data, setData] = useState({ username: '', doctitle: '' })
  const { orders, setOrders } = useContext(OrdersContext)
  const [users, setUsers] = useState('')

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  async function handleOrdersData() {
    setOrders(await getOrdersDataApi())
  }

  async function handleUsersData() {
    setUsers(await getUsersDataApi())
  }

  // const testFunc = () => {
  //   console.log(data.username.length)
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (data.username.length === 0 || data.doctitle.length === 0) {
      notify('error', 'Заполните поля формы')
    } else if (checkUser(data, orders)) {
      await postOrdersDataApi(data)
      notify(
        'success',
        `Заявка на документ ${data.doctitle} от ${data.username} отправлена`
      )
      handleOrdersData()
      await setDocs()
      setData({ username: '', doctitle: '' })
    } else {
      notify(
        'warning',
        `Заявка на документ ${data.doctitle} от ${data.username} уже зведена`
      )
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
        {/* <button type="button" onClick={testFunc}>
          Test
        </button> */}
      </form>
      <ToastContainer />
    </div>
  )
}

export default OrderForm
