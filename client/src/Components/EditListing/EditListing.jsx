import React from 'react'
import './EditListing.scss';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditListing = () => {

  const location = useLocation();
  const initialListing = location.state.listing;

  // สร้าง state สำหรับแต่ละ field
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [typeId, setTypeId] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [numBathrooms, setNumBathrooms] = useState('');
  const [numBedrooms, setNumBedrooms] = useState('');
  const [address, setAddress] = useState('');
  const [subdistricts, setSubdistricts] = useState('');
  const [districts, setDistricts] = useState('');
  const [province, setProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  // ใช้ useEffect เพื่อกำหนดค่าเริ่มต้นให้กับ state
  useEffect(() => {
    setTitle(initialListing.title);
    setDescription(initialListing.description);
    setTypeId(initialListing.type_id);
    setPrice(initialListing.price);
    setSize(initialListing.size);
    setNumBathrooms(initialListing.num_bathrooms);
    setNumBedrooms(initialListing.num_bedrooms);
    setAddress(initialListing.address);
    setSubdistricts(initialListing.subdistricts);
    setDistricts(initialListing.districts);
    setProvince(initialListing.province);
    setZipCode(initialListing.zip_code);
    setStatus(initialListing.status);
  }, [initialListing]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const listingData = {
        title, 
        description, 
        type_id: parseInt(typeId), // Assuming type_id is an integer
        price: parseFloat(price), // Assuming price is a decimal
        size: parseFloat(size), // Assuming size is a decimal
        num_bedrooms: parseInt(numBedrooms), 
        num_bathrooms: parseInt(numBathrooms),
        address, 
        subdistricts, 
        districts, 
        province, 
        zip_code: zipCode,
        status
    };

    try {
        const response = await axios.put(`http://localhost:3001/update-listing/${initialListing.listing_id}`, listingData);
        console.log(response.data);
        // Handle successful update here
        navigate('/');
    } catch (error) {
        console.error('Error updating listing:', error);
        // Handle error here
    }
};



  return (
    <form  className="edit-listing" onSubmit={handleSubmit}>
    <div >
      <h2>ข้อมูลทั่วไป</h2>
      <input type="text" name='title' placeholder="ชื่อทรัพย์สิน" required className="wide-title" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <input type="text" name='description' placeholder="รายละเอียด"  required  className="wide-description" value={description} onChange={(e) => setDescription(e.target.value)} />

    </div>

    <div className="property-details">
      <h2>รายละเอียดทรัพย์สิน</h2>
      <input type="text" name='type_id' placeholder="ประเภท"  required value={typeId} onChange={(e) => setTypeId(e.target.value)}/>
      <input type="number" name='price' placeholder="ราคา"  required value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="number" name='size' placeholder="ขนาด"  required value={size} onChange={(e) => setSize(e.target.value)}/>
      <input type="number" name='num_bathrooms' placeholder="ห้องน้ำ"  required value={numBathrooms} onChange={(e) => setNumBathrooms(e.target.value)}/>
      <input type="number" name='num_bedrooms' placeholder="ห้องนอน"  required value={numBedrooms} onChange={(e) => setNumBedrooms(e.target.value)}/>
    </div>

    <div className="property-location-contact">
      <h2>ข้อมูลที่ตั้งและติดต่อ</h2>
      <input type="text" name='address' placeholder="ที่อยู่"  required value={address} onChange={(e) => setAddress(e.target.value)}/>
      <input type="text" name='subdistricts' placeholder="ตำบล" required value={subdistricts} onChange={(e) => setSubdistricts(e.target.value)}/>
      <input type="text" name='districts' placeholder="อำเภอ"  required value={districts} onChange={(e) => setDistricts(e.target.value)}/>
      <input type="text" name='province' placeholder="จังหวัด"  required value={province} onChange={(e) => setProvince(e.target.value)}/>
      <input type="text" name='zip_code' placeholder="รหัสไปรษณีย์"  required value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
    </div>
    <label htmlFor="status">สถานะทรัพย์สิน:</label>
      <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="available">Available</option>
        <option value="sold">Sold</option>
      </select>
    
    <button type="submit">แก้ประกาศ</button>
  </form>
  )
}

export default EditListing