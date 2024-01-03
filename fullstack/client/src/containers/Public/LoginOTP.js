import React, { useEffect, useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {  Button } from '../../components'
import { RecaptchaVerifier , signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../components/firebase'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'

const LoginOTP  = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
    const [result, setResult] = useState(null);
    const [otp, setOtp] = useState("");
    const { isLoggedIn } = useSelector(state => state.auth)

    const [payload, setPayload] = useState({
      phone: '',
    })
    useEffect(() => {
      isLoggedIn && navigate('/')
    }, [isLoggedIn])
  
    const sendOtp = async () => {
    try {
      const reCaptcha = new RecaptchaVerifier(auth, "reCaptcha", {})
      const confirmation = await signInWithPhoneNumber(auth, payload.phone, reCaptcha)
      setResult(confirmation)
    } catch (error) {
      console.log(error)
    }
  }

  
    const verifyOtp = async (e) => {
        await result.confirm(otp).then((result) => {
          result.payload = {
          phone: payload.phone,
      }
        dispatch(actions.loginotp(result.payload))     
       }).catch((error) => {
        console.log(error)
         })
      }
    
    return (
      <div className="flex  w-full  items-center justify-center ">
      <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-md mt-10 ">
      <div className="w-full flex flex-col items-center gap-3">
        
        <div>
          <h2 className='font-medium text-center mt-8'>Nhập số điện thoại của bạn </h2>
        <PhoneInput
        country={'vn'}
        value={payload.phone}
        onChange={(value) => setPayload((prev) => ({
          phone: "+" + value
        }))}       />
        </div>
            <Button
                            text={'Gửi OTP xác nhận'}
                            textColor='text-white'
                            bgColor='bg-blue-700'
                            px='px-4'
                            onClick={sendOtp}
                        />       <div id='reCaptcha' ></div>
       <div>
        <h2 className='font-medium text-center'>Kiểm tra và nhập mã OTP</h2>
        <input className="w-full text-center"
          style={{ bgColor:"grey",
      padding:"5px 5px",
      borderRadius:'10px',
      border: '2px solid grey',}}

        onChange={(e)=>setOtp(e.target.value)}
                />
            </div>
            <Button
                            text={'Xác nhận mã OTP'}
                            textColor='text-white'
                            bgColor='bg-blue-700'
                            px='px-4'
                            onClick={verifyOtp}
                        />
      </div>
      </div>
      </div>

    )
}

export default LoginOTP