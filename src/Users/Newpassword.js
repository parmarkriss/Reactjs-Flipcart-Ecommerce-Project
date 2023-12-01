import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Newpassword = () => {

    const navigate = useNavigate()

    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");

    const handleSubmit = () => {

       let emaildata = JSON.parse(localStorage.getItem('checkUserLogin'))
    
    if (password === confirmpassword) {
        axios.patch(`http://localhost:8000/users/${emaildata.id}`, {
            password: password,
            confirmpassword: confirmpassword
        })
        .then((res) => {
            localStorage.setItem('checkUserLogin', JSON.stringify(res.data));
            toast.success("Successfully Password Changed")
            navigate(`/login`);
        })
        .catch((err) => {
            toast.error("Password update failed");
        });
    } else {
        toast.error("Passwords do not match");
    }

    }

  

    return (
        <>
            <div className='register'>
                <div className="testbox-1">
                    <h1 className='pb-2'>Login In</h1>
                    <hr />
                    <form action="/" className='pt-2'>
                        <label id="icon" htmlFor="name"><i className="icon-shield" /></label>
                        <input type="text" name="password" id="name" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password} />

                        <label id="icon" htmlFor="name"><i className="icon-shield" /></label>
                        <input type="text" name="password" id="name" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpassword}/>

                        <button type="button" className="btn-1 w-75 mt-3" onClick={() => handleSubmit()}>Submit</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Newpassword