import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import { useState, useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import OrdersContext from '../context/OrdersContext.jsx'
import { getOrdersDataApi } from '../api/getOrdersDataApi.js'
import { getUsersDataApi } from '../api/getUsersDataApi.js'
import { postOrdersDataApi } from '../api/postOrdersDataApi.js'
import { checkUser } from '../utils/checkUser.js'
import { setDocs } from '../utils/setDocs.js'
import { notify } from '../utils/Notification/notification.js'
import 'react-toastify/dist/ReactToastify.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

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
        <Dropdown
          value={data.username}
          onChange={handleChange}
          name="username"
          options={
            users.length
              ? users.map((user) => user.username)
              : console.log('Нет юзеров')
          }
          optionLabel="name"
          placeholder="ФИО конструктора"
          className="dropdown-name"
        />
        <InputText
          autoComplete="off"
          placeholder="Название документа"
          name="doctitle"
          value={data.doctitle}
          onChange={handleChange}
        />
        <Button label="Отправить" severity="secondary" type="submit" />
      </form>
      <ToastContainer />
    </div>
  )
}

export default OrderForm
