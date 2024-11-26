import { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import OrderForm from '../OrderForm'
import OrderList from '../OrderList'
import { setDocs } from '../../utils/setDocs'
import 'react-tabs/style/react-tabs.css'

const MainTabs = () => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Заявка на документ</Tab>
        <Tab onClick={() => setDocs()}>Список заявок</Tab>
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
