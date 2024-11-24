import { getDataApi } from '../api/getDataApi'

export async function setDocs() {
  const DATA_S = await getDataApi('orders')
  const docsArr = DATA_S.map((e) => e.doctitle)
  const docsUniq = Array.from(new Set(docsArr))
  console.log(docsUniq)
}
