import { useState, useEffect, useContext } from "react"
import { Button, Tooltip } from "@nextui-org/react"
import { FaPlus } from "react-icons/fa6"
import { Link } from "react-router-dom"
import FirebaseContext from "../../firebase/FirebaseContext"
import { Dishs } from "../ui/Dishs"

export const Menu = () => {

  const [ dishs, setDishs ] = useState([])
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const getDish = () => {
      firebase.db.collection('products').onSnapshot(handleSnapshot)
    }
    getDish()
  }, [])
  
  function handleSnapshot(snapshot) {
    const dish = snapshot.docs.map( doc => (
      {
        id: doc.id,
        ...doc.data(),
      }
    ))
    setDishs(dish)
  }

    return (
      <div className="w-full px-5">
        <h1 className="text-center font-bold text-4xl text-slate-800 bg-neutral-50 w-32 rounded-bl-md rounded-br-md mx-auto">Menu</h1>

        <div>
          <Tooltip placement={'right'} content={'Add new dish'} color="primary">
            <Button 
              className="rounded-full h-20 w-20 text-3xl text-white flex justify-center items-center p-0 bg-default-100"
            ><Link to="/new-dish" className="w-full h-full flex justify-center items-center"><FaPlus /></Link>
            </Button>
          </Tooltip>
        </div>

        <div className={`${dishs.length > 6 && 'overflow-y-auto'} max-h-full mt-5`}>
          <Dishs dishs={dishs} />
        </div>

      </div>
    )
  }
  