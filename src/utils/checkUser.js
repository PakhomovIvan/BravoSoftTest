export function checkUser(data, orders) {
  const ordersNew = JSON.parse(JSON.stringify(orders))

  ordersNew.forEach((order) => delete order.id)

  const filtredOrder = ordersNew.filter(
    (order) =>
      order.username === data.username && order.doctitle === data.doctitle
  )

  return filtredOrder.length ? false : true
}
