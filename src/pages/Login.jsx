import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
}
from 'mdb-react-ui-kit';
import Register from './Register';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login () {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [user, setUser] = useState(null);
  const [typeUtilisateur, setType] = useState("")

  let navigate = useNavigate()

  const Log = async (e) => {
    e.preventDefault()
    if (validate()) {
      const user = { username: email, password, typeUtilisateur };
      fetch("http://localhost:8085/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Email ou mot de passe incorrect");
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token)
        sessionStorage.setItem("username", email)
        sessionStorage.setItem("token", data.token)
  
        // Fetch user information
        fetch(`http://localhost:8085/api/utilisateurs/email/${email}`)
        .then(response => response.json())
        .then(data => {
          setUser(data);
          // Store user info in sessionStorage
          sessionStorage.setItem('user', JSON.stringify(data));
          const typeUser = user.typeUtilisateur; 

          // Redirect user based on user type
          if (typeUser === "AGRICULTEUR") {
            navigate("/dashboard-aggro");
          } else if (typeUser === "COOPERATIVE") {
            navigate("/dashboard-coop");
          } else {
            toast.success("Connecté, vous allez être redirigé dans quelques secondes");
            // Reload the page after 3 seconds
            setTimeout(() => {
              navigate('/')
              window.location.reload(true)
            }, 3000)
          }
          console.log(typeUser)
        });        
      })
      .catch((err) => {
        toast.error("Erreur : " + err.message);
      });
    }
  };
  
  const validate = () => {
    let result = true
    if (email === '' || email === null) {
      result = false
      toast.warning('Veuillez entrer votre adresse mail')
    }
    if (password === '' || password === null) {
      result = false
      toast.warning('Veuillez entrer votre mot de passe')
    }
    return result
  }

  const refresh = () => {
      navigate('/')
      window.location.reload(true)
  }

  return (
    <div>
    <title>Mihary'ket - Authentification</title>
      <section className="intro">
        <div className="bg-image h-100" 
        style={{
          backgroundImage: "url('/src/images/bg_login.jpg')",
          position : "fixed",
          minWidth : "100%",
          minHeight : "100%",
          backgroundSize : "cover",
          backgroundPosition : "center"
          }}>
          <div className="mask d-flex align-items-center h-100" style={{"backgroundColor": "rgba(139, 195, 74, .6)"}}>
          <ToastContainer />
            <MDBContainer fluid data-aos="fade-right">

              <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                  <MDBCard className='gradient-custom text-white my-3' style={{borderRadius: '1rem', maxWidth: '450px'}}>
                    <MDBCardBody className='p-3 d-flex flex-column align-items-center mx-auto w-100'>

                    <div className='d-flex flex-row ps-5 pt-5' data-aos="fade-right">
                      <MDBIcon fas icon="fa-solid fa-tractor fa-3x" style={{ color: '#fff' }}/>
                    </div><br/>

                      <h2 className="fw-bold mb-2 text-uppercase" data-aos="fade-right">Authentification</h2>
                      <p className="text-white-50" data-aos="fade-right">Se connecter avec :</p>

                      <div className='d-flex flex-row'>
                        <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                          <MDBIcon fab icon='facebook-f' size='lg' style={{cursor : "pointer"}}/>
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                          <MDBIcon fab icon='twitter' size='lg' style={{cursor : "pointer"}}/>
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                          <MDBIcon fab icon='google' size='lg' style={{cursor : "pointer"}}/>
                        </MDBBtn>
                      </div>

                      <label style={{marginRight : "auto"}}>Adresse mail</label>
                      <MDBInput className='input text-white' wrapperClass='mb-4 mx-5 w-100' type='email' size='lg' placeholder='Entrez votre email' required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
                      <label style={{marginRight : "auto"}}>Mot de passe</label>
                      <MDBInput className='input text-white' wrapperClass='mb-4 mx-5 w-100' type='password' size='lg' placeholder='Entrez votre mot de passe' required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      />

                      <p className="mb-3 pb-lg-2"><a className="text-white" href="#!" data-aos="fade-right">Mot de passe oublié?</a></p>
                      <div className="text-center" data-aos="fade-right">
                        <button className="btn btn-white btn-rounded px-5 button mb-3" type="submit" onClick={Log}>se connecter</button>                        
                      </div>

                      <div>
                        <p className="mb-2">Pas encore de compte? <Link to='/inscription' className="text-success fw-bold">S'inscrire</Link></p>
                      </div>

                      <div>
                        <p className="mb-3">Retourner à l'<Link className="text-success fw-bold" to="/" onClick={refresh}>accueil</Link></p>
                      </div>
                    </MDBCardBody>
                  </MDBCard>

                </MDBCol>
              </MDBRow>

            </MDBContainer>
          </div>
        </div>
      </section>

      <Routes>
        <Route to="/inscription" element={<Register />}/>
      </Routes>
    </div>
  )
}
  
export default Login