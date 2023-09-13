import { useState, useContext, useEffect} from "react"
import { Card, CardHeader, CardBody, Image, Switch } from "@nextui-org/react"
import { FirebaseContext } from "../../firebase"


export const Dish = ({dish}) => {

  const [isAvailable, setIsAvailable] = useState(dish.exist)

  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    updateAvailable()
  }, [isAvailable])
  

  const updateAvailable = () => {
    
    try {
      
      firebase.db.collection('products')
                    .doc(dish.id)
                    .update({
                      exist: isAvailable
                    })

    } catch (error) {
      console.log("🚀 ~ file: Dish.jsx:16 ~ updateAvailable ~ error:", error)
      
    }
  }

  return (
    <Card
      className="card bg-primary w-11/12 h-[400px] flex items-center justify-center"
    >
      <CardHeader className="pb-0 pt-2 px-4 flex justify-between">
        <h1 className="font-bold text-large capitalize text-neutral-50">{dish.name}</h1>
        <span className="font-bold text-neutral-50">Price: ${dish.price}</span>
      </CardHeader>
      <CardBody className="flex items-center justify-start h-12">
        <div className="w-full">
          <Image
            isZoomed
            alt="Card background"
            className="object-cover rounded-xl h-56 w-full"
            src={dish.image}
            width='100%'
          />
        </div>
        <div className="w-full mt-6 flex flex-col">
          <div className="w-full flex flex-row justify-between items-center">
            <p className="italic text-neutral-200 capitalize">{dish.category}</p>
            <div className="flex flex-col w-24 justify-center items-end">
              <Switch size="sm" color="secondary" isSelected={isAvailable} onValueChange={setIsAvailable}></Switch>  
              <p className="text-small text-default-500">{isAvailable ? "available" : "not available"}</p>
            </div>
          </div>
          <div className="w-full text-xs">
            <p className="text-neutral-50">{dish.description}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
