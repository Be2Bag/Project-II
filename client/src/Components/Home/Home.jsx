import { useEffect } from 'react'
import { useState } from 'react'
import './home.css'
import video from '../../Assets/video.mp4'
import {GrLocation} from 'react-icons/gr'
import {HiFilter} from 'react-icons/hi'
import {FiFacebook} from 'react-icons/fi'
import {AiOutlineInstagram} from 'react-icons/ai'
import {SiTripadvisor} from 'react-icons/si'
import {BsListTask} from 'react-icons/bs'
import {TbApps} from 'react-icons/tb'
import Aos from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios';
import { useContext } from 'react';
import { ListingContext } from '../../Functions/ListingContext';

const Home = () => {

  const [price, setPrice] = useState(5000);
  const [Provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [areaSize, setAreaSize] = useState('');
  const { setRequestData } = useContext(ListingContext);




    const fetchListings = () => {

      const requestData = {
        selectedProvince,
        areaSize,
        price,
      };

      setRequestData(requestData);

    };
  
  

  const getProvinces = () => {
    axios.get('http://localhost:3001/provinces').then((response) => {
      setProvinces(response.data);
    });
  }  

  useEffect(() => {
    Aos.init({duration: 4000});
    getProvinces(); // เรียกใช้งานฟังก์ชันนี้
  }, []);


  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handlePriceChange = (event) => {
    setPrice(event.target.value); // อัพเดทราคาเมื่อ input เปลี่ยนแปลง
  };

  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])




  return (
    <section id='home' className='home'>
      <div className="overlay"></div>
      <video src={video} autoPlay loop muted type="video/mp4"></video>

      <div data-aos="fade-down" className="homeContent container">
        <div className="textDiv">
        <span  className="smallText">
        ...
        </span>
        <h1 data-aos="fade-down" className="homeTitle">
        ค้นหาอสังหาริมทรัพย์ทั่วประเทศ
        </h1>
        </div>

        <div data-aos="fade-down" className="cardDiv grid">
        <div className="destinationInput">
          <label htmlFor="province">เลือกจังหวัด:</label>
          <div className="input flex">
            <select 
              name="province" 
              onChange={(e) => {
                setSelectedProvince(e.target.value); // อัพเดต state เมื่อผู้ใช้เลือกจังหวัด
              }}
            >
              <option value="">เลือกจังหวัด</option> {/* ตัวเลือกเริ่มต้น */}
              {Provinces.map((province) => (
                <option key={province.id} value={province.name_th}>
                  {province.name_th}
                </option>
              ))}
            </select>
            <GrLocation className="icon"/>
          </div>
        </div>


          <div className="dateInput">
            <label htmlFor="city">ขนาดพื้นที่ :</label>
            <div className="input flex">
            <input   type="number" 
              onChange={(e) => {
              setAreaSize(e.target.value); // อัพเดต state เมื่อมีการป้อนขนาดพื้นที่
              }} />
           
            </div>
          </div>


          <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="city">ราคา:</label>
              <h3 className="total">{price}.-</h3> {/* แสดงราคาจาก state */}
            </div>
            <div className="input flex">
              <input 
                type="range" 
                max="1000000" 
                min="100000" 
                value={price} // ตั้งค่าให้ตรงกับ state
                onChange={handlePriceChange} // ตั้ง event handler เมื่อมีการเปลี่ยนแปลง
              />
            </div>
          </div>

          <div className="searchOptions flex" onClick={fetchListings}>
           <HiFilter className="icon"/>
           <span>MORE FILTERS</span>
          </div>
        </div>

        <div data-aos="fade-up" className="homeFooterIcons flex">
         <div className="rightIcons">
          <FiFacebook className="icon"/>
          <AiOutlineInstagram className="icon"/>
          <SiTripadvisor className="icon"/>
         </div>
         <div className="leftIcons">
            <BsListTask className="icon"/>
            <TbApps className="icon"/>
         </div>
        </div>
      </div>
    </section>
  )
}

export default Home

