import React, { useEffect, useState } from 'react';
import './Admin.scss'


const Admin = () => {
    const [listings, setListings] = useState([]);
    const [error, setError] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [activeMenu, setActiveMenu] = useState('listings');
    const [members, setMembers] = useState([]);



    const switchMenu = (menu) => {
        setActiveMenu(menu);
    };

    const handleDelete = (listingId) => {
        fetch(`http://localhost:3001/listings/${listingId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting the listing');
            }
            setListings(listings.filter(listing => listing.listing_id !== listingId));
            setIsDeleted(true);
            alert('Listing deleted successfully');
            window.location.reload(); // หรือเทคนิคการเรียกดึงข้อมูลใหม่
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleDeleteMember = (userId) => {
        fetch(`http://localhost:3001/users/${userId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting the user');
            }
            setMembers(members.filter(member => member.user_id !== userId));
            alert('User deleted successfully');
            // window.location.reload(); // Consider avoiding reload, it's not the best practice in React apps.
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    useEffect(() => {
        fetch('http://localhost:3001/listings') // Adjust the URL based on your server configuration
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setListings(data))
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
            });
            fetch('http://localhost:3001/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setMembers(data))
            .catch(error => {
                console.error('Error fetching members:', error);
                // จัดการข้อผิดพลาดที่นี่
            });
    }, []);

    return (
        <div className="admin-page">
            <h1>Admin Dashboard</h1>
            <div className="menu-buttons">
                <button onClick={() => switchMenu('listings')}>Listings</button>
                <button onClick={() => switchMenu('members')}>Members</button>
            </div>
            {activeMenu === 'listings' && (
            <>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ชื่อทรัพย์สิน</th>
                            <th>ขนาด</th>
                            <th>ห้องนอน</th>
                            <th>ห้องน้ำ</th>
                            <th>ที่อยู่</th>
                            <th>ตำบล</th>
                            <th>อำเภอ</th>
                            <th>จังหวัด</th>
                            <th>รหัสไปรษณีย์</th>
                            <th>ราคา</th>
                            <th>รายละเอียด</th>
                            <th>สถานะ</th>
                            <th>จัดการ</th>
                            {/* Add other headers based on your data */}
                        </tr>
                    </thead>
                    <tbody>
                        {listings.map(listing => (
                            <tr key={listing.listing_id}>
                                <td>{listing.title}</td>
                                <td>{listing.size}</td>
                                <td>{listing.num_bedrooms}</td>
                                <td>{listing.num_bathrooms}</td>
                                <td>{listing.address}</td>
                                <td>{listing.subdistricts}</td>
                                <td>{listing.districts}</td>
                                <td>{listing.province}</td>
                                <td>{listing.zip_code}</td>
                                <td>{listing.price}</td>
                                <td>{listing.description}</td>
                                <td>{listing.status}</td>
                                <td>
                                <button className="delete-button" onClick={() => handleDelete(listing.listing_id)}>ลบ</button>
                                </td>
                                {/* Add other data cells based on your data */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </>
            )}
            {activeMenu === 'members' && (
            <>
            <table>
                    <thead>
                        <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Created At</th>
                                <th>จัดการ</th>
                                {/* เพิ่มหัวข้ออื่นๆ ตามความจำเป็น */}
                        </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member.user_id}>
                                    <td>{member.username}</td>
                                    <td>{member.password}</td>
                                    <td>{member.email}</td>
                                    <td>{member.phone_number}</td>
                                    <td>{member.created_at}</td>
                                    <td>
                                    <button className="delete-member" onClick={() => handleDeleteMember(member.user_id)}>ลบ</button>
                                </td>
                                    {/* เพิ่มเซลล์ข้อมูลอื่นๆ ตามความจำเป็น */}
                        </tr>
                            ))}
                    </tbody>
            </table>
             </>
            )}

        </div>
    );
};

export default Admin;
