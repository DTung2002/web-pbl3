import React, { useEffect, useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { InputForm, Button } from '../../components'
import { RecaptchaVerifier , signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../components/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'

const LoginOTP  = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isRegister, setIsRegister] = useState(location.state?.flag)

  const [invalidFields, setInvalidFields] = useState([])
  const dispatch = useDispatch()
    const [result, setResult] = useState(null);
    const [otp, setOtp] = useState("");
    const { isLoggedIn } = useSelector(state => state.auth)
    const [payload, setPayload] = useState({
      phone: '',
      password: otp || '',
      name: ''
    })
    useEffect(() => {
      isLoggedIn && navigate('/')
    }, [isLoggedIn])
  
    const validate = (payload) => {
      let invalids = 0
      let fields = Object.entries(payload)
      fields.forEach(item => {
          if (item[1] === '') {
              setInvalidFields(prev => [...prev, {
                  name: item[0],
                  message: 'khong bo trong truong nay'
              }])
              invalids++
          }
      })
      fields.forEach(item => {
          switch (item[0]) {
              case 'phone':
                  if (!+item[1]) {
                      setInvalidFields(prev => [...prev, {
                          name: item[0],
                          message: 'so dien thoai khong hop le'
                      }])
                      invalids++
                  }
                  break;
              default:
                  break;
          }
      })
      return invalids
  }
  const handleChange = (e) =>{
    setPayload(prev => ({
      ...prev,
      phone: "+" 
      +e.target.value,
    }))
  }
  const sendOtp = () =>{
   try {
    const reCaptcha = new RecaptchaVerifier(auth, "reCaptcha", {})
    const confimation = signInWithPhoneNumber (auth, payload.phone,reCaptcha)
    setResult(confimation)
   } catch (error) {
    console.log(error)
   }
  }
    const verifyOtp = async (e) => {
      const otp = e.target.value;
      try {
        await result.confirm(otp)
        let finalPayload = isRegister ? payload : {
          phone: payload.phone,
          password: payload.password
      }
      let invalids = validate(finalPayload)
      if (invalids === 0)
          isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))      } catch (error) {
        console.log(error)
      }
    }
    
    return (
      <div className="flex  w-full  items-center justify-center ">
      <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-md mt-10 ">
      <div className="w-full flex flex-col items-center gap-3">
        <div><h2 className='font-medium text-center mt-8'>Nhập số điện thoại của bạn </h2>
        <PhoneInput
        country={'vn'}
        value={payload.phone}
        onChange={(value) => setPayload((prev) => ({
          ...prev,
          phone: "+" + value
        }))}       />
        </div>
            <Button
                            text={'Send OTP'}
                            textColor='text-white'
                            bgColor='bg-blue-700'
                            px='px-4'
                            onClick={sendOtp}
                        />       <div id='reCaptcha' ></div>
       <div>
        <h2 className='font-medium text-center'>Nhập mã OTP</h2>
        <InputForm
                    setvalue={setOtp}
                />
            </div>
            <Button
                            text={'Verify OTP'}
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