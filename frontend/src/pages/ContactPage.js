import React from 'react'
import facebook from '../images/logos/Facebook_f_logo_(2021).svg'
import insta from '../images/logos/icons8-instagram-240.svg'
import twitter from '../images/logos/Twitter-logo.svg'

function ContactPage() {
  return (
        <div className="Commitment_To_Safety row pb-5 ">
            <div className="mt-5 d-flex justify-content-center"><h4>Telphone Number: +673 432 5325</h4></div>
            <div className="mt-3 d-flex justify-content-center"><h4>Address: Simpang 781 No 27 Jalan Bukit Nangka Kampung Durian</h4></div>
            <div className="mt-3 d-flex justify-content-center"><h4>Email: HSEBrunei@gmail.com</h4></div>
            <div className="mt-3 d-flex justify-content-center">
                <div className="social_bar p-3">
                    <img className="icon" src={facebook} alt="facebook"/>
                    <img className="icon ms-5" src={insta} alt="insta"/>
                    <img className="icon ms-5" src={twitter} alt="twitter"/>
                </div>
            </div>

        </div>
  )
}

export default ContactPage
