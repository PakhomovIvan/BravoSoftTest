import { deleteDocsDataApi } from '../api/deleteDocsDataApi'
import { deleteOrdersDataApi } from '../api/deleteOrdersDataApi'
import { getDocsDataApi } from '../api/getDocsDataApi'
import { getOrdersDataApi } from '../api/getOrdersDataApi'
import { postOrdersDataApi } from '../api/postOrdersDataApi'
import JSON_DATA from '../data/preset.json'

export async function resetJson() {
  const orders = await getOrdersDataApi()
  console.log('Заказы', orders)

  orders.map(async (order) => await deleteOrdersDataApi(order.id))
  console.log('Документы', orders)

  const docs = await getDocsDataApi()
  docs.map(async (docItem) => await deleteDocsDataApi(docItem.id))

  JSON_DATA.map(async (jsData) => await postOrdersDataApi(jsData))

  setTimeout(() => {
    location.reload()
  }, 4000)
}
