import { Dish } from "./Dish"


export const Dishs = ({dishs}) => {
  return (
    <div className="grid lg:grid-cols-3 gap-x-1 gap-y-12 my-5 p-5">
        {
            dishs.map( dish => (
              <Dish dish={dish} key={dish.id}/>
            ))
        }
    </div>
  )
}
