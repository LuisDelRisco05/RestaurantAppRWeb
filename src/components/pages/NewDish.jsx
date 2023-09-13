import { useContext, useState, useEffect } from "react"
import FirebaseContext from "../../firebase/FirebaseContext"
import { Button, Input, Textarea, Spinner, Progress } from "@nextui-org/react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom"
import FileUploader  from 'react-firebase-file-uploader'


export const NewDish = () => {

  const [ isLoading, setIsLoading ] = useState(false)
  const [ upload, setUpload ] = useState(false)
  const [ progress, setProgress ] = useState(0)
  const [ urlImg, setUrlImg ] = useState('')


  const { firebase } = useContext(FirebaseContext)
  
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: '',
      image: '',
      description: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
                .min(3, 'The dish must have a minimum of three characters')
                .required('Dish name is required'),
      price: Yup.number()
                .min(1, 'You must add a number')
                .required('Price is required'),
      category: Yup.string()
                .required('Category is required'),
      description: Yup.string()
                .min(10, 'Description should be longer')
                .required('Description is required')
    }),
    onSubmit: dish => {
      try {
        dish.exist = true
        dish.image = urlImg
        firebase.db.collection('products').add(dish)
        setIsLoading(true)

        setTimeout(() => {
          setIsLoading(false)
          navigate('/menu')
        }, 3000)
        
      } catch (error) {
        console.log("🚀 ~ file: NewDish.jsx:39 ~ NewDish ~ error:", error)
        
      }
    }
  })

  const handleUploadStart = () => {
    setProgress(0)
    setUpload(true)
  }

  const handleUploadError = error => {
    setUpload(false)
    console.log(error)
  }

  const handleUploadSuccess = async urlName => {
    setProgress(100)
    setUpload(false)

    const url = await firebase
              .storage
              .ref("productos")
              .child(urlName)
              .getDownloadURL()
    setUrlImg(url)
  }

  const handleProgress = progress => {
    setProgress(progress)
  }
 
    return (
      <div className="w-full min-h-full px-5">
        <h1 className="text-slate-800 bg-neutral-50 w-32 rounded-bl-md rounded-br-md mx-auto text-2xl font-extrabold h-10 my-10">New dish</h1>
        <form 
          className="flex flex-col flex-wrap items-center justify-center gap-4"
          onSubmit={formik.handleSubmit}
        >
          <Input 
            autoComplete="off"
            id="name"
            isClearable
            type="text" 
            label="Name"
            className="w-1/3 font-semibold shadow-container bg-primary rounded-xl"
            variant="faded"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.name && formik.errors.name && (
              <div className="border-2 border-red-600 bg-red-500 text-neutral-50 font-medium w-1/3 h-9 flex justify-center items-center rounded-xl">
                <p>{formik.errors.name}</p>
              </div>
            )
          }
          <Input 
            id="price"
            isClearable
            type="number" 
            label="Price"
            className="w-1/3 shadow-container bg-primary rounded-xl"
            variant="faded"
            min="0"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
          {
            formik.touched.price && formik.errors.price && (
              <div className="border-2 border-red-600 bg-red-500 text-neutral-50 font-medium w-1/3 h-9 flex justify-center items-center rounded-xl">
                <p>{formik.errors.price}</p>
              </div>
            )
          }
          <div className="w-1/3 bg-primary h-14 flex flex-col justify-center items-center shadow-container rounded-xl px-4 hover:border-white hover:border-2">
            <select 
              className="capitalize bg-primary w-full text-xs border-none text-neutral-50 font-medium" 
              id="category" 
              value={formik.values.category} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">category</option>
              <option value="breakfast">breakfast</option>
              <option value="lunch">lunch</option>
              <option value="dinner">dinner</option>
              <option value="beverage">beverage</option>
              <option value="dessert">dessert</option>
              <option value="salad">salad</option>
            </select>
          </div>

          {
            formik.touched.category && formik.errors.category && (
              <div className="border-2 border-red-600 bg-red-500 text-neutral-50 font-medium w-1/3 h-9 flex justify-center items-center rounded-xl">
                <p>{formik.errors.category}</p>
              </div>
            )
          }

          {/* <Input 
            id="image"
            type="file" 
            className="w-1/3 appearance-none leading-tight"
            variant="faded"
            color="primary"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />  */}
          <FileUploader 
            accept="image/*"
            id="image"
            name="image"
            randomizeFilename
            storageRef={firebase.storage.ref("productos")}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
            className='w-1/3 bg-neutral-50 text-slate-700 font-medium shadow-container rounded-lg' 
          />
          {
            upload && (
              <div className="w-1/3 h-14 flex justify-center items-center">
                <Progress
                  aria-label="Downloading..."
                  size="sm"
                  value={progress}
                  color="primary"
                  showValueLabel={true}
                  className="w-1/3 h-14"
                />
              </div>
            )
          }

          {
            formik.touched.image && formik.errors.image && (
              <div className="border-2 border-red-600 bg-red-500 text-neutral-50 font-medium w-1/3 h-9 flex justify-center items-center rounded-xl">
                <p>{formik.errors.image}</p>
              </div>
            )
          }

          <Textarea
            id="description"
            className="w-1/3 leading-tight bg-default-100 rounded-xl"
            label="Description"
            variant="faded"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          /> 

          {
            formik.touched.description && formik.errors.description && (
              <div className="border-2 border-red-600 bg-red-500 text-neutral-50 font-medium w-1/3 h-9 flex justify-center items-center rounded-xl">
                <p>{formik.errors.description}</p>
              </div>
            )
          }

          <Button type="submit" color="primary" className="w-1/3 font-bold bg-default-100">
            ADD DISH
          </Button> 

        </form>
        {
          isLoading && (
            <div className="flex justify-center items-center mt-10">
              <Spinner color="primary" size="lg"/>
            </div>
          )
        }
      </div>

    )
  }
  