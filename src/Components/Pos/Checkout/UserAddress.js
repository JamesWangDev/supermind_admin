import React from 'react'
import AddressComponent from '../../InputFields/AddressComponent'
import SimpleInputField from '../../InputFields/SimpleInputField'

function UserAddress({ values }) {

  return (
    <>
      <SimpleInputField nameList={[{ name: 'title' }, { name: 'city' }, { name: 'address', type: 'textarea' }]} />
      <AddressComponent values={values} />
    </>
  )
}

export default UserAddress