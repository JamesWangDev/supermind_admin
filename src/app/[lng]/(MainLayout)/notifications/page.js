'use client'

import NotificationsData from "@/Components/Notifications/NotificationsData"
import FormWrapper from "@/Utils/HOC/FormWrapper"
import { Col } from "reactstrap"

const Notifications = () => {
  return (
    <Col sm="12">
      <FormWrapper title="Notifications">
        <NotificationsData />
      </FormWrapper>
    </Col>
  )
}

export default Notifications