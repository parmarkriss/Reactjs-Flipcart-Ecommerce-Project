import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Otp = () => {
    const navigate = useNavigate()
    const [otps, setOtp] = useState("");
    let isOtpSent = (false); 
    
    const Otp = () => {
      if (!isOtpSent) {
        isOtpSent = true; 
        let userdata = JSON.parse(localStorage.getItem('checkUserLogin'));
        let otp = Math.floor(Math.random() * 10000);
        let obj = {
          otp: otp,
          email: userdata.email
        };
        localStorage.setItem("userotp", JSON.stringify(obj));
        toast.success("Your OTP: " + otp, {
          position: "top-center",
          autoClose: 5000,
        });
      }
    };

    const handleSubmit = () => {
        let otp = JSON.parse(localStorage.getItem('userotp'))
        if (otp.otp === parseInt(otps)) {
            toast.success("Successfully Otp ");
            navigate('/newpasswords')
            return false
        } else {
            toast.error("OTP is not valid");
            return false
        }                         
    }
    
    useEffect(() => {
        Otp();
    }, []);

    return (
        <>
            <div className='register'>
                <div className="testbox-1">
                    <h1 className='pb-2'>Login In</h1>
                    <hr />
                    <form action="/" className='pt-2'>
                        <label id="icon" htmlFor="name"><i className="icon-envelope " /></label>
                        <input type="text" name="otp" id="name" placeholder="Otp" required onChange={(e) => setOtp(e.target.value)} value={otps} />



                        <button type="button" className="btn-1 w-75 mt-3" onClick={() => handleSubmit()}>Otp send</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Otp