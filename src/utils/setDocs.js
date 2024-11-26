import { getOrdersDataApi } from '../api/getOrdersDataApi.js'
import { getDocsDataApi } from '../api/getDocsDataApi'
import { postDocsDataApi } from '../api/postDocsDataApi'
import { deleteDocsDataApi } from '../api/deleteDocsDataApi'

export async function setDocs() {
  const orders = await getOrdersDataApi()
  const docsArr = orders.map((e) => e.doctitle)
  const docsUniqueArr = Array.from(new Set(docsArr))
  const docList = await getDocsDataApi()

  docList.map(async (_, i) => await deleteDocsDataApi(i))

  docsUniqueArr.map(async (doc, i) => {
    const obj = {
      id: `${i}`,
      title: doc,
      count: docsArr.filter((d) => doc === d).length,
    }

    await postDocsDataApi(obj)
  })
}
