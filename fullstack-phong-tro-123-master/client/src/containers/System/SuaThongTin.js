import React, { useState } from 'react'
import { InputRead1 } from '../../components'
import {InputFormV2} from '../../components'
import { useSelector } from 'react-redux'
import {updateUser} from '../../services'
import avt from '../../assets/anon-avatar.png'
import { apiUploadImages } from '../../services'
const SuaThongTin = () => {
  const [invalidFields, setInvalidFields] = useState([])
  const {currentData} = useSelector(state=> state.user)
  const [payload, setPayload] = useState({
    name: currentData?.name || '',
    phone: currentData?.phone || '',
    password: '',
    avatar: currentData?.avatar,
    Zalo: currentData?.Zalo || ''

  })
  const handleUploadfile = async (e) => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)
    const response = await apiUploadImages(formData)
    if (response.status === 200) {
      setPayload(prev =>({
        ...prev,
        avatar: response?.data.secure_url
      }))
    }
}
  const handleSubmit = async () =>{
    const response = await updateUser(payload)
    window.location.reload();
  }

  const [showPasswordForm, setShowPasswordForm] = useState(false); // Add state for showing password form

  return (
    <div className='flex flex-col items-center'>
      <h1 className=' text-3xl w-full text-start font-medium border-b border-gray-200 py-4'>Cập nhật thông tin cá nhân</h1>
      <div className='w-3/5 flex items-center justify-center'>
      <div className='py-6 flex flex-col gap-4 w-4/5 '>
      <InputRead1 value={'#'+currentData?.id?.slice(0,6) || ''} label='Mã thành viên'/>

      <InputFormV2
      name='name'
       setValue={setPayload}
       value={payload.name}
        setInvalidFields={setInvalidFields}
         invalidFields={invalidFields} label='Tên hiển thị'/>
      <div className="flex flex-col">
            <label className="w-48 flex-none" htmlFor="password">
              Mật khẩu
            </label>
            {showPasswordForm ? ( // Conditionally render password form
              <InputFormV2
              type={'password'}
                name="password"
                setValue={setPayload}
                value={payload.password}
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label='Nhập mật khẩu mới'
              />
              
            ) : (
              <small
                className="flex-auto text-blue-500 cursor-pointer"
                onClick={() => setShowPasswordForm(true)} // Show password form on click
              >
                Đổi mật khẩu
              </small>
            )}
          </div>

      <InputFormV2
      name='phone'
       setValue={setPayload}
       value={payload.phone}
        setInvalidFields={setInvalidFields}
         invalidFields={invalidFields} label='Số điện thoại'/>
         <InputFormV2
      name='Zalo'
       setValue={setPayload}
       value={payload.Zalo}
        setInvalidFields={setInvalidFields}
         invalidFields={invalidFields} label='Zalo'/>
      <div className='flex mb-6'>
        <label className='w-48 flex-none' htmlFor='avatar'>Ảnh đại diện</label>
        <div>
        <img src={payload.avatar || avt} alt="avatar" className='w-20 h-20 rounded-full object-cover'></img>
        <input onChange={handleUploadfile} type='file' className='my-4' id='avatar'/>
        </div>
      </div>
      <button 
      style={{ fontSize: '1em', padding: '10px 20px' }}
       className="bg-blue-600 text-white" 
      onClick={handleSubmit}>Cập nhật</button>
      </div>
      </div>
    </div>
  )
}

export default SuaThongTin