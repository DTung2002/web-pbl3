import React from 'react'

const InputRead1 = ({label, value, direction, editPhone}) => {
    return (
        <div className='flex flex-col gap-4 py-4'>
            <label htmlFor="address">{label}</label>
            <input type="text" id='address'
                readOnly value={value}
                className='border border-gray-300 ontline-none bg-gray-100 p-2 w-full rounded-md ' />
            {editPhone && <small className='text-blue-500 cursor-pointer' >Đổi số điện thoại</small>}
        </div>
    )
}

export default InputRead1