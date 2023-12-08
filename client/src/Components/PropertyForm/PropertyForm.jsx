import React from 'react';
import './PropertyForm.scss';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PropertyForm = () => {

  const navigate = useNavigate();

  const [images, setImages] = useState([]); 

  const handleImageChange = (e) => {
    setImages([...e.target.files]); // จัดเก็บไฟล์รูปภาพในสถานะ
  };

  const [listing, setListing] = useState({
    title: '',
    description: '',
    type_id: '',
    price: '',
    size: '',
    num_bathrooms: '',
    num_bedrooms: '',
    address: '',
    subdistricts: '',
    districts: '',
    province: '',
    zip_code: ''
  });

  const handleChange = (e) => {
    setListing({
      ...listing,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData(); // สร้างอินสแตนซ์ของ FormData
      Object.keys(listing).forEach((key) => {
        formData.append(key, listing[key]); // เพิ่มข้อมูล listing ใน formData
      });
  
      images.forEach((image) => {
        formData.append('images', image); // เพิ่มไฟล์รูปภาพใน formData
      });

      const token = localStorage.getItem('token'); // หรือที่ไหนที่คุณเก็บ token
        const response = await axios.post('http://localhost:3001/create-listing', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token // ส่ง token ใน header
        }
      });
      console.log(response.data);
      // เพิ่ม logic สำหรับแจ้งผู้ใช้หรือ redirect หลังจากสร้าง listing สำเร็จ
      navigate('/');
    } catch (error) {
      console.error("There was an error creating the listing!", error);
      // เพิ่มการจัดการข้อผิดพลาด, เช่น แจ้งผู้ใช้
    }
  }


  return (
      <form className='property-form' onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="property-general-info">
        <h2>ข้อมูลทั่วไป</h2>
        <input type="text" name='title' placeholder="ชื่อทรัพย์สิน" value={listing.title} onChange={handleChange} required className="wide-title" />
        <input type="text" name='description' placeholder="รายละเอียด" listing={listing.description} onChange={handleChange} required  className="wide-description" />

      </div>

      <div className="property-details">
        <h2>รายละเอียดทรัพย์สิน</h2>
        <input type="text" name='type_id' placeholder="ประเภท" value={listing.type_id} onChange={handleChange} required />
        <input type="number" name='price' placeholder="ราคา" value={listing.price} onChange={handleChange} required />
        <input type="number" name='size' placeholder="ขนาด" value={listing.size} onChange={handleChange} required />
        <input type="number" name='num_bathrooms' placeholder="ห้องน้ำ" value={listing.num_bathrooms} onChange={handleChange} required />
        <input type="number" name='num_bedrooms' placeholder="ห้องนอน" value={listing.num_bedrooms} onChange={handleChange} required />
      </div>

      <div className="property-location-contact">
        <h2>ข้อมูลที่ตั้งและติดต่อ</h2>
        <input type="text" name='address' placeholder="ที่อยู่" value={listing.address} onChange={handleChange} required />
        <input type="text" name='subdistricts' placeholder="ตำบล" value={listing.subdistricts} onChange={handleChange} required />
        <input type="text" name='districts' placeholder="อำเภอ" value={listing.districts} onChange={handleChange} required />
        <input type="text" name='province' placeholder="จังหวัด" value={listing.province} onChange={handleChange} required />
        <input type="text" name='zip_code' placeholder="รหัสไปรษณีย์" value={listing.zip_code} onChange={handleChange} required />
      </div>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} className="property-image-upload" />
      
      <button type="submit">ส่งประกาศ</button>
    </form>
  )
}

export default PropertyForm;
