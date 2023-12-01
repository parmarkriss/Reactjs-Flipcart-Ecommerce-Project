import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        let emailData = JSON.parse(localStorage.getItem('checkUserLogin'))
        if(emailData.email === email){
            toast.success("Successfully Forget");
            navigate('/otp');
            setEmail("");
        }else{
            toast.error("Email is not valid");
            setEmail("");
        }
    }

    

    return (
        <>
            <div className='register'>
            <div className="testbox-1">
                <h1 className='pb-2'>Login In</h1>
                <hr />
                <form action="/" className='pt-2'>
                    <label id="icon" htmlFor="name"><i className="icon-envelope " /></label>
                    <input type="text" name="email" id="name" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} value={email} />

                   
                    <button type="button"  className="btn-1 w-75 mt-3" onClick={() => handleSubmit()}>Forget</button>
                </form>
            </div>
        </div>
            <ToastContainer />
        </>
    )
}

export default Forgot