function Contact () {
  return(   
  <>

<title>Mihary'ket - Contact</title>
            
<div className="intro-section site-blocks-cover innerpage" style={{"backgroundImage": "url('/src/images/bg_register-client.jpg')"}}>
    <div className="container">
        <div className="row align-items-center text-center">
            <div className="col-lg-12 mt-5" data-aos="fade-up">
                <h1>Contactez Nous</h1>
                <p className="text-white text-center">
                    <a href="index.html">Accueil</a>
                    <span className="mx-2">/</span>
                    <span>Contact</span>
                </p>
            </div>
        </div>
    </div>
</div>           
            <div className="site-section">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <div className="row">
          <div className="col-md-6 form-group">
            <label htmlFor="fname">Prénom</label>
            <input type="text" id="fname" className="form-control form-control-lg" />
          </div>
          <div className="col-md-6 form-group">
            <label htmlFor="lname">Nom</label>
            <input type="text" id="lname" className="form-control form-control-lg" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 form-group">
            <label htmlFor="eaddress">Adresse Mail</label>
            <input type="text" id="eaddress" className="form-control form-control-lg" />
          </div>
          <div className="col-md-6 form-group">
            <label htmlFor="tel">Numéro de Tel.</label>
            <input type="text" id="tel" className="form-control form-control-lg" />
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="row">
          <div className="col-md-12 form-group">
            <label htmlFor="message">Message</label>
            <textarea name="" id="message" cols="30" rows="10" className="form-control"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-12 d-flex justify-content-center">
        <input type="submit" value="Envoyer" className="btn btn-primary rounded-0 px-3 px-5" />
      </div>
    </div>
  </div>
</div>     
</>
    )
}


export default Contact;