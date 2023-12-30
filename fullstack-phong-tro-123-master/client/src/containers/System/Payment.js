import React from 'react';
import { InputForm, Button, Paypal } from '../../components';
import {useNavigate} from 'react-router-dom'
const Payment = () => {
  const navigate = useNavigate();
  const handleBack = () =>{
    navigate("/")
  }
  return (

    <div  className='flex flex-col items-center gap-4'>
      <h1 className='font-bold text-center text-xl py-6'>Chọn hình thức thanh toán</h1>
<div>
    <Paypal/>
  </div>
  <div>        <button 
      style={{ fontSize: '1em', padding: '10px 20px' }}

  className="bg-blue-600 text-white w-full" 
  
  onClick={handleBack}
  
>  Hủy giao dịch
</button></div>
</div>


  )
}
export default Payment;