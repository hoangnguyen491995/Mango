import React from 'react'

function LableInput(props) {
  return (
    <div className='flex w-full text-lable'>
        <span className='w-1/4 flex justify-start cursor-default ' >{props.label}</span>
        {props.disable == true ? props.value ? 
         <input 
          className={`input-profile w-3/4 h-5 p-1 ${props.read}`} 
        placeholder = {props.placeholder}
        value={props.value} 
        type={props.type} 
        disabled
        /> : 
        
        <input  className={`input-profile w-3/4 h-5 p-1 ${props.read}`} 
        placeholder = {props.placeholder}
        type={props.type} 
        disabled
        /> 


        : props.value ? 
        <input  className={`input-profile w-3/4 h-5 p-1 ${props.read}`} 
       placeholder = {props.placeholder}
       value={props.value} 
       type={props.type} 
       onChange={(e)=>props.onChange(e.target.value)}
       maxLength={props.maxLength}
       /> : 
       
       <input  className={`input-profile w-3/4 h-5 p-1 ${props.read}`} 
       placeholder = {props.placeholder}
       type={props.type} 
       onChange={(e)=>props.onChange(e.target.value)}
       maxLength={props.maxLength}
       /> 
      }
        
    
       
    </div>
  )
}

export default LableInput