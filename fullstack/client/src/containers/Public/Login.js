import React, { useEffect, useState } from "react";
import { InputForm, Button } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import PhoneInput from 'react-phone-input-2'

import Swal from 'sweetalert2'

const Login = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth)
    const [isRegister, setIsRegister] = useState(location.state?.flag)
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({
        phone: '',
        password: '',
        name: ''

    })


    useEffect(() => {
        setIsRegister(location.state?.flag)
    }, [location.state?.flag])

    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn])

    useEffect(() => {
        msg && Swal.fire('lỗi', msg, 'error')
    }, [msg, update])

    const handleClick =() =>{
        navigate('/login-with-otp')
    }
    const handleSumit = async () => {

        let finalPayload = isRegister ? payload : {
            phone: payload.phone,
            password: payload.password
        }
        let invalids = validate(finalPayload)
        if (invalids === 0)
            isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
        // console.log(finalPayload)

    }


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
                case 'password':
                    if (item[1].length < 6) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'mat khau phai co 6 ki tu'
                        }])
                        invalids++
                    }
                    break;
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

    return (
        <div className="flex w-full items-center justify-center">
            <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-md mt-10">
            <h3 className="font-semibold text-2xl mb-3"> {isRegister ? 'Đăng kí tài khoản' : 'Đăng nhập'} </h3>

            <div className="w-full flex flex-col gap-3">
              
                <PhoneInput
                
setInvalidFields={setInvalidFields}
invalidFields={invalidFields}
        country={'vn'}
        value={payload.phone}
        onChange={(value) => setPayload((prev) => ({
            ...prev,
          phone: "+" + value
        }))}       />
                {/* <InputForm
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    label={'Số điện thoại'}
                    value={payload.phone}
                    setvalue={setPayload}
                    keyPayload={'phone'}
                /> */}
                <InputForm
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    label={'Mật khẩu'}
                    value={payload.password}
                    setvalue={setPayload}
                    keyPayload={'password'}
                    type='password'
                />
                  {isRegister && <InputForm
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    label={'HỌ TÊN'}
                    value={payload.name}
                    setvalue={setPayload}
                    keyPayload={'name'}
                />}
                <Button
                    text={isRegister ? 'Đăng kí' : 'Đăng nhập'}
                    bgColor='bg-secondary1'
                    textColor='text-white'
                    fullwidth
                    onClick={handleSumit}
                />
            </div>
            <div>
            <small className="text-[blue] hover:text-[red] cursor-pointer "
                            onClick={() => handleClick()} // Show password form on click
                            >Đăng nhập với số điện thoại của bạn
                  </small>
            </div>
            <div className="mt-7 flex items-center justify-between " >
                {isRegister
                    ? <small> Bạn đã có tài khoản <span
                        onClick={() => {
                            setIsRegister(false)
                            setPayload({
                                phone: '',
                                password: '',
                                name: ''
                            })
                        }}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Đăng nhập ngay
                    </span> </small>
                    : <>
                
                                                <small
                            onClick={() => {
                                setIsRegister(true)
                                setPayload({
                                    phone: '',
                                    password: '',
                                    name: ''
                                })
                            }}
                            className="text-[blue] hover:text-[red] cursor-pointer ">Đăng kí tài khoản</small>
                    </>
                    
                }

            </div>
        </div>
        </div>
    )
}

export default Login