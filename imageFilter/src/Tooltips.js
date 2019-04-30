import React from 'react'
import PropTypes from 'prop-types'


import { ToastContainer, toast } from 'react-toastify';


toast.configure({
    autoClose: 300
})


export const Toast = (...rest) => toast(...rest)

Toast.Error = (...rest) => toast.error(...rest)

Toast.Success = (...rest) => toast.success(...rest)

Toast.Info = (...rest) => toast.info(...rest)

export default {
    Toast,
    Error: Toast.Error,
    Info: Toast.Info,
    Success: Toast.Success,
    toast
}
