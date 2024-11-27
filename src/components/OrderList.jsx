import { Button } from 'primereact/button'
import { resetJson } from '../utils/resetJson'
import MainTable from './Table/MainTable'

const OrderList = () => {
  return (
    <div className="order-table">
      <MainTable />
      <Button
        icon="pi pi-sync"
        rounded
        outlined
        severity="secondary"
        aria-label="Cancel"
        onClick={resetJson}
        loadingIcon
      />
    </div>
  )
}

export default OrderList
