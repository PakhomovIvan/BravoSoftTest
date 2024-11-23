import { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import OrderForm from '../OrderForm'
import OrderList from '../OrderList'

const MainTabs = () => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Заявка на документ</Tab>
        <Tab>Список заявок</Tab>
      </TabList>
      <TabPanel>
        <OrderForm />
      </TabPanel>
      <TabPanel>
        <OrderList />
      </TabPanel>
    </Tabs>
  )
}

export default MainTabs
