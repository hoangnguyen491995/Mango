import React, {useEffect} from 'react'

const DayColumnWrapper = ({ children, className, style, innerRef, id, type }) => {
  useEffect(() => {
    
    setTimeout(() => {
      // document.getElementById("current-time-indicator").scrollIntoView();
      const tixPos = document.getElementById("current-time-indicator");
      tixPos?.scrollIntoView({
        
        block: "nearest",
        inline: "center",
      });

    }, 50);
  }, []);
  return (
    <div className={className}  ref={innerRef} id={id} type={type} style= {{         
      left : `${style}px`
     }}>
      {children}
    </div>
  )
}

export default React.forwardRef((props, ref) => (
  <DayColumnWrapper {...props} innerRef={ref} />
))
