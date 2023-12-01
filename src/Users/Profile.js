import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState("");
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    const getUser = () => {
        let userData = JSON.parse(localStorage.getItem('checkUserLogin'));
        setProfile(userData);
    }

    const getUserProfile = async () => {
        let record = JSON.parse(localStorage.getItem('checkUserLogin'));
        let products = await axios.get(`http://localhost:8000/carts?userId=${record.id}`);
        setCart(products.data);
    
        const calculatedSubtotal = products.data.reduce((acc, item) => acc + item.price * item.qty, 0);
        setSubtotal(calculatedSubtotal);
    }

    useEffect(() => {
        getUser();
        getUserProfile();
    }, []);

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1 style={{ color: "Black" }}>Your Profile</h1>
            </div>
            <div className="profile-content">
                <h4>Name:- {profile.name}</h4>
                <h4>Email:- {profile.email}</h4>
                <h4>Password:- {profile.password}</h4>

                {cart.length === 0 ? (
                    <h3 className='p-3 text-center'>No Data</h3>
                ) : (
                    <table className='mt-4'>
                        <thead className='text-center'>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((val) => (
                                <tr className='border-2 border-top-0 border-start-0 border-end-0 text-center' style={{ height: "140px", borderColor: "#aaaaaa85" }} key={val.id}>
                                    <td className='p-3'>
                                        <h4>{val.name}</h4>
                                        <p>{val.category}</p>
                                    </td>
                                    <td>
                                        <img src={val.image} style={{ width: "140px" }} alt={val.name} />
                                    </td>
                                    <td><h4 >{subtotal}</h4></td>
                                    <td>
                                        <h5 style={{ width: "100px" }} className='text-center'>{val.qty}</h5>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Profile;
