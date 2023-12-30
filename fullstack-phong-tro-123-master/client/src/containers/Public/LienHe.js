import React, { useState } from 'react'
import { InputForm, Button } from '../../components'
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom'
const LienHe = () => {
  const navigate = useNavigate()

  const [payload, setPayload]= useState({
    name:'',
    phone:'',
    content:''
  })
  const handleSubmit = () =>{
      Swal.fire('', 'Phản hồi của bạn đã được chúng tôi ghi nhận', 'success').then(()=>{
        setPayload({
          name: '',
          phone:'',
          content:''
        })
      })
  }
  const handleClick = () =>{
    navigate("/lien-he/ho-tro")
  }

  return (

    <div className='w-full'>
      <h1 className='text-2xl font-semibold mb-6'>Liên hệ với chúng tôi</h1>
      <div className='flex gap-4'>
      <div className='flex-1 flex flex-col gap-4 h-fit bg-red-400 rounded-3xl p-4 text-white bg-gradient-to-br from-blue-700 to-cyan-450'>
        <h3 className='font-medium'>Thông tin liên hệ</h3>
        <span>Cảm ơn vì đã lựa chọn chúng tôi</span>
        <span>Hỗ trợ đăng tin: Hotline 0902657123/0901424123</span>
        <span>Phản ánh/Khiếu nại: Hotline 0917686101</span>

        <span>Email: cskh@gmail.com</span>
        <span>Đ/c: 28 Đường Điện Biên Phủ, thuộc phường Thạc Gián, Thanh Khê, Đà Nẵng </span>
        
        </div>
        
        <div className='flex-1 bg-white shadow-md rounded-md p-4 mb-4'>
          <h3 className='font-medium text-lg mg-4'>Liên hệ trực tuyến</h3>
          <small
                className="flex-auto text-blue-500 cursor-pointer font-medium text-xl"
                onClick={() => handleClick()} // Show password form on click
              >
                Hỗ trợ trực tuyến 24/7 tại đây
              </small>
        <h2 className='font-medium'>Hoặc gửi liên hệ cho chúng tôi</h2>
          <div className='flex flex-col gap-3'>
            <h3>Họ tên</h3>
            <InputForm
            value={payload.name}
            setvalue={setPayload}
            keyPayload='name'
            />
            <h3>Số điện thoại</h3>
            <InputForm
            value={payload.phone}
            setvalue={setPayload}
            keyPayload='phone'
            />
            <div>
              <h3>Mô tả</h3>
  <label  htmlFor="desc"></label>
  <textarea
    className="outline-none bg-[#dbdbdb] p-3 rounded-md w-full"
    value={payload.content}
    onChange={e => setPayload(prev => ({ ...prev, content: e.target.value }))}
    name="content"
    id="desc"
    cols="30"
    row="3"
  ></textarea>
  </div>
  <Button
                            text={'Gửi liên hệ'}
                            textColor='text-white'
                            bgColor='bg-blue-700'
                            px='px-4'
                            // IcAfter={BsChevronDown}
                            onClick={handleSubmit}
                        />  
</div>
           
          </div>
          
        </div>
      </div>      
  )

  }
export default LienHe