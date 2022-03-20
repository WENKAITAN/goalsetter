import {useState, useEffect} from 'react'
import { FaUser } from 'react-icons/fa'
function Register() {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
  })

  const { name, email, password, password2} = formData
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
        alert("Please fill all the fields")
    }

    if(password !== password2){
        alert("Passwords do not match!")
    }
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
                        <input 
                            type="text" 
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