import React, { useState } from 'react'
import { Overview, Address, Loading, Button } from '../../components'
import { apiUploadImages } from '../../services'
import icons from '../../ultils/icons'
import { getCodes, getCodesArea } from '../../ultils/Common/getCodes'
import { useSelector } from 'react-redux'
const LSGD = () =>{
    return (
        <div className='flex flex-col items-center'>
        <h1 className=' text-3xl w-full text-start font-medium border-b border-gray-200 py-4 mb-10'>Lịch sử giao dịch</h1>
        <table className="table-auto w-full ">
                <thead>
                    <tr className="border bg-gray-200">
                    <th className="text-center p-2">Loại hình</th>

                        <th className="text-center p-2">Địa điểm</th>
                        <th className="text-center p-2">Giá thuê</th>
                        <th className="text-center p-2">Trạng thái</th>
                        <th className="text-center p-2">Thời gian</th>

                    </tr>
                </thead>
                <tbody>
                <tr className="border bg-gray-100">
                        <th className='font-medium'>Kiot</th>
                        <th className="text-center p-2 font-medium"></th>
                        <th className="text-center p-2 font-medium"></th>
                        <th className="text-center p-2 font-medium">Chưa thanh toán</th>
                        <th className="text-center p-2 font-medium"></th>

                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default LSGD;