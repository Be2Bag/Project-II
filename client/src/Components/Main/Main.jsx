import {useEffect} from 'react'
import './main.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiClipboardList} from 'react-icons/hi'
import {BiBed} from 'react-icons/bi'
import {LuBath} from 'react-icons/lu'
import {BiShapeSquare} from 'react-icons/bi'
import {MdCloseFullscreen} from 'react-icons/md'
import {FiPhoneCall} from 'react-icons/fi'
import {FaEdit} from 'react-icons/fa'
import Aos from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios';
import { useState } from 'react'
import Modal from 'react-modal';
import { useContext } from 'react';
import { ListingContext } from '../../Functions/ListingContext';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';





const correctImageUrl = (url) => {
  if (url.startsWith('uploads\\')) {
    return url.replace('uploads\\', 'http://localhost:3001/uploads/');
  }
  return url; // ถ้า URL ไม่เริ่มต้นด้วย 'uploads\', ก็คืนค่า URL เดิม
};



const ListingDetailModal = ({ listing, isOpen, onRequestClose, currentUser, onEdit }) => {
  console.log('currentUser:', currentUser.username);
  console.log('listing:', listing.username);
  console.log('Do usernames match:', currentUser?.id === listing.user_id);

  const [isPhoneVisible, setIsPhoneVisible] = useState(false);

  const showPhoneNumber = () => {
    setIsPhoneVisible(true);
    
    // ตั้งตัวจับเวลาเพื่อเปลี่ยนค่า isPhoneVisible เป็น false หลังจาก 10 วินาที
    setTimeout(() => {
    setIsPhoneVisible(false);
  }, 5000); // 10000 มิลลิวินาที = 10 วินาที
  };

  // ฟังก์ชันช่วยสำหรับการจัดรูปแบบวันที่
const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const date = new Date(dateStr);
  
  // คืนค่าวันที่ที่จัดรูปแบบแล้วในรูปแบบท้องถิ่น
  return date.toLocaleDateString('th-TH', options);
};


  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="MyModal"
      ariaHideApp={false}
      
      // ... other modal props ...
    >
      {/* แสดงรายละเอียดของ listing ที่นี่ */}
      <h2 className="modal-title">{listing.title}</h2>
      <div className="imageDiv"><img src={correctImageUrl(listing.image_url)} alt="" /></div>
      <span><BiBed className="icon"/> <small>{listing.num_bedrooms} </small> </span>
      <span><LuBath className="icon"/> <small>{listing.num_bedrooms} </small> </span>
      <span><BiShapeSquare className="icon"/> <small>{listing.size} ตร.ม. </small> </span>
      <div className="split-view">
      <div className="left-column">
        <h4>ราคา : {listing.price}.-</h4>
        <h4>ประเภท : {listing.type_id}</h4>
        <h4>ที่อยู่ : {listing.address}</h4>
        <h4>ตำบล : {listing.subdistricts}</h4>
        <h4>อำเภอ : {listing.districts}</h4>
        <h4>จังหวัด : {listing.province}</h4>
        <h4>รหัสไปรษณีย์ : {listing.zip_code}</h4>
        <h3>สถานะ : {listing.status}</h3>
      </div>
      <div className="right-column">
        <h4>รายละเอียด : {listing.description}</h4>
        <br/>
        <h4>ลงประกาศ: {formatDate(listing.updated_at)}</h4>
        <h4>ผู้ประกาศ : {listing.username}</h4>
        <h4>อีเมล์ : {listing.email}</h4>
        {
          listing.status !== 'sold' && (
            <>
              {
                !isPhoneVisible ? (
                  <button className="phone-button" onClick={showPhoneNumber}>
                    <FiPhoneCall className="icon"/> โทรเลย 
                  </button>
                ) : (
                  <h4>เบอร์โทร : {listing.phone_number}</h4>
                )
              }
            </>
          )
        }
      </div>
  </div>


      <button onClick={onRequestClose} className="close-button"><MdCloseFullscreen className="icon"/></button>
      {
        currentUser && currentUser.id === listing.user_id && (
          <button className="edit-button" onClick={onEdit}><FaEdit className="icon"/></button>
        )
      }

    </Modal>
  );
}

const Main = () => {

  const [Listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { requestData } = useContext(ListingContext);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/EditListing', { state: { listing: selectedListing } });
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (requestData && Object.keys(requestData).length !== 0) {
          // requestData มีข้อมูล, ทำ POST request
          response = await axios.post('http://localhost:3001/filter', requestData);
        } else {
          // requestData ว่าง, ทำ GET request
          response = await axios.get('http://localhost:3001/listings');
        }
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [requestData]); // Dependency array มี requestData เพื่อทำการอัปเดตเมื่อมันเปลี่ยนแปลง

  // เพิ่ม useEffect สำหรับการจัดการ token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      console.log('Decoded token:', decoded);
      setCurrentUser(decoded); // ตั้งค่าข้อมูลผู้ใช้
    }
  }, []);

  useEffect(()=>{
    Aos.init({duration: 4000})
 }, [])

 const openModal = (listing) => {
  setSelectedListing(listing);
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);
};

  return (
    <section id='main' className='main section container'>
      <div className="secTitle">
        <h3 className="title">
          อสังหาริมทรัพย์ที่น่าสนใจ
        </h3>
      </div>

      <div className="secContent grid">
        {
          Listings.map((val, key)=>{
            return (
              
              <div key={val.listing_id} data-aos="fade-up" className="singleDestination">
      
                 <div className="imageDiv">
                 <img src={correctImageUrl(val.image_url)} alt="" />
                 </div>
      
                <div className="cardInfo">
                 <h4 className="destTitle">{val.title}</h4>
                 <span className="continent flex">
                    <HiOutlineLocationMarker className="icon"/>
                    <span className="name">{val.address}</span>
                 </span>
      
                 <div className="fees flex">
                    <div className="grade">
                      <span><BiBed className="icon"/> <small>{val.num_bedrooms} </small> </span>
                      <span><LuBath className="icon"/> <small>{val.num_bedrooms} </small> </span>
                    </div>
                    <div className="price">
                      <h5>{val.price}.-</h5>
                    </div>
                 </div>
      
                 <div className="desc">
                  <p>{val.description}</p>
                 </div>
      
                 <button className='btn flex' onClick={() => openModal(val)}>DETAILS <HiClipboardList className="icon"/> </button>
                </div>
              </div>
      
            )
          }) 
        }
      </div>
     
      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          currentUser={currentUser} 
          onEdit={handleEditClick} 
        />
      )}  

    </section>
  )
}

export default Main