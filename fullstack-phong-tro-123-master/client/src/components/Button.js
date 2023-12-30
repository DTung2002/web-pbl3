import React, { memo } from "react";

const Button = ({ text, textColor, bgColor, onClick, fullwidth, px, After }) => {
    // console.log('re-render');
    return (
        <button

            type='Button'
            className={`py-2 ${px ? px : 'px-4'}  ${textColor} ${bgColor} ${fullwidth && 'w-full'} outline-none rounded-md hover:[red] flex items-center justify-center gap-2`}
            onClick={onClick}
        >
            <span>{text}</span>
            <span className="pt-1"> {After}</span>
        </button>
    )
}

export default memo(Button)