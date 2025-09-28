import React from 'react'

export default function Loading() {
  return (
     <div style={{
      position: 'fixed', 
      top: 0, left: 0, right: 0, bottom: 0, 
      background: 'rgba(0,0,0,0.2)', 
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="loader"></div>
    </div>
  )
}
