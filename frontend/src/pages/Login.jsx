import {useState, useEffect} from 'react'
import { FaUser } from 'react-icons/fa'
function Login() {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
  })

  const { email, password} = formData
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
    if(email || ! password ){
        alert("Please fill all the fields")
    }

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
                            type="text" 
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