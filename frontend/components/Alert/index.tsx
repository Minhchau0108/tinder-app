import React from 'react'
import { Toaster } from 'react-hot-toast'

const Alert = () => {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 1000,
            icon: '👏',
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          error: {
            duration: 1000,
            icon: '💔',
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </div>
  )
}

export default Alert
