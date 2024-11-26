import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import { ToastContainer } from 'react-toastify'
import { notify } from '../utils/Notification/notification.js'
import 'react-toastify/dist/ReactToastify.css'

import { useState, useContext, useEffect } from 'react'

import OrdersContext from '../context/OrdersContext.jsx'
import { getOrdersDataApi } from '../api/getOrdersDataApi.js'
import { getUsersDataApi } from '../api/getUsersDataApi.js'
import { postOrdersDataApi } from '../api/postOrdersDataApi.js'
import { checkUser } from '../utils/checkUser.js'
import { setDocs } from '../utils/setDocs.js'

function OrderForm() {
  const [data, setData] = useState({ username: '', doctitle: '' })
  const { orders, setOrders } = useContext(OrdersContext)
  const [users, setUsers] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    if (data.username.length === 0 || data.doctitle.length === 0) {
      notify('error', 'Заполните поля формы')
    } else if (checkUser(data, orders)) {
      await postOrdersDataApi(data)
      handleOrdersData()
      await setDocs()
      notify(
        'success',
        `Заявка на документ ${data.doctitle} от ${data.username} отправлена`
      )
      setData({ username: '', doctitle: '' })
      setIsLoading(false)
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
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
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
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-file-pdf"></i>
          </span>
          <InputText
            autoComplete="off"
            placeholder="Название документа"
            name="doctitle"
            value={data.doctitle}
            onChange={handleChange}
          />
        </div>
        {isLoading ? (
          <Button
            label="Загрузка..."
            severity="secondary"
            type="submit"
            disabled
          />
        ) : (
          <Button label="Отправить" severity="secondary" type="submit" />
        )}
      </form>
      <ToastContainer draggable />
    </div>
  )
}

export default OrderForm
