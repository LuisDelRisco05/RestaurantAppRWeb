import { useContext, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react"
import { FaClock } from 'react-icons/fa6'
import Countdown from 'react-countdown';


export const Order = ({activeOrder, firebase}) => {

    const [ time, setTime ] = useState(0)


    const { deliveryTime, completed, create, order, total, id } = activeOrder

    const handleClick = (id) => {

        if(deliveryTime === 0){
            try {
                firebase.db.collection('orders')
                        .doc(id)
                        .update({
                            deliveryTime: time
                        })
            } catch (error) {
                console.log("🚀 ~ file: Order.jsx:23 ~ handleClick ~ error:", error)
                
            }
            return
        }

        if(deliveryTime > 0){
            try {
                firebase.db.collection('orders')
                        .doc(id)
                        .update({
                            completed: true
                        })
            } catch (error) {
                console.log("🚀 ~ file: Order.jsx:37 ~ handleClick ~ error:", error)
                
            }
            return
        }
    }

    const renderer = ({minutes, seconds}) => {
        return(
            <div className='font-bold text-lg flex'>
                Delivery Time: 
                <span className='font-bold ml-2'>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                <div className='loader w-4 h-7 ml-3'></div>
            </div>
        )
    }
    
  return (
    <Card className='card bg-secondary text-white w-11/12 h-[350px]'>
        <CardHeader>
            <h3 className='font-semibold text-lg'>ID: {id}</h3>
        </CardHeader>

        <Divider />

        <div className='h-24 overflow-y-auto w-[96%] mx-auto'>
            {
                order.map( (item, i) => <p className='font-bold text-base truncate' key={item.id + i}>Unit/s ({item.quantity}) - {item.name}</p>)
            }
        </div>

        <Divider />

        <div className="mx-auto w-[94%] h-10 flex items-center text-lg">
            <p className="font-bold">Total Payable: ${total}</p>
        </div>

        <Divider />

        {
           deliveryTime === 0 
           ?    (
                    <Input 
                        label="Delivery time here"
                        type="number"
                        min="1"
                        max="20"
                        className="w-[94%] rounded-xl h-14 my-2 mx-auto"
                        variant="faded"
                        onChange={ e => setTime(parseInt(e.target.value)) }
                        value={ time }
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">Minutes: </span>
                            </div>
                        }
                    />

                )
            :   (
                    <div className="w-[94%] rounded-xl h-14 my-2 mx-auto flex items-center">
                        <Countdown
                            date={ Date.now() + time * 60000 }
                            renderer={renderer}
                        />
                    </div>

                )
        }    
       

        <Divider />

        
             
        <CardFooter>
            {
                deliveryTime === 0 
                ?   (
                    <Button 
                        className={`w-[100%] rounded-xl h-14 text-lg text-white font-bold tracking-wider ${ time === 0 ? 'bg-slate-600' : 'bg-slate-800 hover:bg-slate-700'} `}
                        onClick={ () => handleClick(id) }
                        disabled={ time === 0 ? true : false}
                    >
                        Set Time <FaClock />
                    </Button>
                    )   
                :   (
                    <Button 
                        className='w-[100%] rounded-xl h-14 text-lg text-white font-bold tracking-wider bg-primary'
                        onClick={ () => handleClick(id)}
                    >
                       <span>Mark As Completed</span>
                    </Button>

                    )

            }
            
        </CardFooter>
            
        


    </Card>
  )
}
