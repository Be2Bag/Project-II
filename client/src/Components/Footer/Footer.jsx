import React, { useEffect } from 'react'
import './footer.css'
import video2 from '../../Assets/video (2).mp4'
import {FiSend} from 'react-icons/fi'
import {FiChevronRight} from 'react-icons/fi'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {AiOutlineTwitter} from 'react-icons/ai'
import {FaTripadvisor} from 'react-icons/fa'
import {MdOutlineRealEstateAgent} from 'react-icons/md'
import Aos from 'aos'
import 'aos/dist/aos.css'
 
const Footer = () => {
   useEffect(()=>{
      Aos.init({duration: 2000})
   }, [])
  return (
    <section id='footer'className='footer'>
      <div className="videoDiv">
        <video src={video2} loop autoPlay muted type="video/mp4"></video>
      </div>
     <div className="secContent container">
      <div className="contactDiv flex">
        <div data-aos="fade-up" data-aos-duration="2000" className="text">
          <small>KEEP IN TOUCH</small>
          <h2>HomeTradeExchange with us</h2>
        </div>
        <div className="inputDiv flex">
          <input data-aos="fade-up" data-aos-duration="2000" type="text" placeholder='Enter Email Address' />
          <button data-aos="fade-up" data-aos-duration="3000" className='btn flex'  type='submit'>SEND  <FiSend className="icon"/></button>
        </div>
      </div>
       
       <div className="footerCard flex">
         <div className="footerIntro flex">
         <div className="logoDiv">
            <a href="#" className="logo flex"><h1><MdOutlineRealEstateAgent className='icon' />  HomeTradeExchange.</h1></a>
          </div>

          <div data-aos="fade-up" data-aos-duration="2000"  className="footerParagraph">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam inventore eos fuga hic cum voluptatem minima, tempore non odio provident nobis ipsam at, doloremque sed cupiditate ipsum in, atque soluta?
          </div>

          <div data-aos="fade-up" data-aos-duration="3000"  className="footerSocials flex">       
          <AiOutlineTwitter className="icon"/>
          <AiFillYoutube className="icon"/>
          <AiFillInstagram className="icon"/>
          <FaTripadvisor className="icon"/>
          </div>

         </div>

         <div className="footerLinks grid">
          {/* Group One */}
           <div data-aos="fade-up" data-aos-duration="4000"  className="linkGroup">
               <span className="groupTitle">
                OUR AGENCY
               </span>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>
           </div>

          {/* Group Two */}
           <div data-aos="fade-up" data-aos-duration="4000"  className="linkGroup">
               <span className="groupTitle">
               PARTNERS
               </span>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>
           </div>

          {/* Group three */}
           <div data-aos="fade-up" data-aos-duration="5000" className="linkGroup">
               <span className="groupTitle">
                LAST MINUTE
               </span>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>

               <li className="footerList flex">
                  <FiChevronRight className="icon"/>
                  Sponsor link
               </li>
           </div>
         </div>

         <div className="footerDiv flex">
           <small>HomeTradeExchange</small>
           <small></small>
         </div>
       </div>

     </div>

    </section>
  )
}

export default Footer