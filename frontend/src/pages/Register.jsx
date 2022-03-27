import {useState, useEffect} from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
function Register() {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
  })

  const { name, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
      (state) => state.auth
  )

  useEffect(() => {
      if(isError) {
          toast.error(message)
      }

      if(isSuccess || user) {
        navigate('/')
      }

      dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData({
        ...formData,
        [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    if(! name || ! email || ! password || ! password2){
        toast.error("Please fill all the fields")
    }

    if(password !== password2){
        toast.error("Password do not match")
    }else{
        const userData = {
            name, email, password
        }

        dispatch(register(userData))
    }
  }

  if(isLoading){
      return <Spinner />
  }


  return (
    <>
        <section className="heading">
            <h1>
                <FaUser/> Register
            </h1>
            <p>Please create an account</p>

            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={name} 
                            className="form-control" 
                            placeholder="Enter your name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            value={email} 
                            className="form-control" 
                            placeholder="Enter your email address"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password} 
                            className="form-control" 
                            placeholder="Enter your password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            id="password2" 
                            name="password2" 
                            value={password2} 
                            className="form-control" 
                            placeholder="Confirm password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>


        </section>
    </>
  )
}

export default Register