import React, { memo } from "react";


const InputForm = ({ label, value, setvalue, keyPayload, invalidFields, setInvalidFields, type , id }) => {
    return (
        <div>
            <label htmlFor={keyPayload} className="text-xs">{label}</label>
            <input
                type={type || 'text'}
                id={id || {keyPayload}}
                // id="phone"
                className="outline-none bg-[#dbdbdb] p-2 rounded-md w-full"
                value={value}
                onChange={(e) => setvalue(prev => ({ ...prev, [keyPayload]: e.target.value }))}
                onFocus={() => setInvalidFields && setInvalidFields([])}  //reset loi
            />
            {invalidFields?.length > 0 && invalidFields.some(i => i.name === keyPayload) && <small className="text-red-500 italic"> {invalidFields.find(i => i.name === keyPayload)?.message} </small>}
        </div>
    )
}

export default memo(InputForm)
