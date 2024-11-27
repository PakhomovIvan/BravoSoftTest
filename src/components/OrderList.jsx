// import { resetDocsList } from '../utils/resetDocsList'
import { setDocs } from '../utils/setDocs'
import MainTable from './Table/MainTable'

const OrderList = () => {
  return (
    <div className="order-table">
      <MainTable />
      <button type="button" onClick={setDocs}>
        Сбросить значения
      </button>
    </div>
  )
}

export default OrderList
