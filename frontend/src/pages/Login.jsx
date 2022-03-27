import {useState, useEffect} from 'react'
import { FaUser } from 'react-icons/fa'
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
function Login() {

  const [formData, setFormData] = useState({
      email: '',
      password: ''
  })

  const { email, password } = formData
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData({
        ...formData,
        [name]: value
    })
  }
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if( !email || ! password ){
        toast.error("Please fill all the fields")
    }
    const userData = {email, password}
    dispatch(login(userData))


  }
  if(isLoading){
    return <Spinner />
  }

  return (
    <>
        <section className="heading">
            <h1>
                <FaUser/> Login
            </h1>
            <p>Login and start setting goal</p>
            <section className="form">
                <form onSubmit={handleSubmit}>
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
                        <button type="submit" className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>


        </section>
    </>
  )
}

export default Login