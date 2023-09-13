import { useEffect, useContext, useState } from 'react'
import { FirebaseContext } from '../../firebase'
import { Order } from '../ui/Order'


export const Orders = () => {

  const [ activeOrders, setActiveOrders ] = useState([])

  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const getOrders = () => {
      firebase.db.collection('orders').where('completed', "==", false).onSnapshot(handleSnapshot)
    }
    getOrders()
  }, [])

  function handleSnapshot(snapshot) {
    const order = snapshot.docs.map( doc => (
      {
        id: doc.id,
        ...doc.data()
      }
    ))

    setActiveOrders(order)

  }

  return (
    <div className="w-full px-5">
      <h1 className="text-center font-bold text-4xl text-slate-800 bg-neutral-50 w-32 rounded-bl-md rounded-br-md mx-auto">Orders</h1>
      <div className='grid lg:grid-cols-3 gap-x-1 gap-y-12 my-5 p-5'>
        {
          activeOrders.map( act => (
            <Order activeOrder={ act } key={act.id} firebase={firebase} />
          ))
        }
      </div>

    </div>
  )
}
