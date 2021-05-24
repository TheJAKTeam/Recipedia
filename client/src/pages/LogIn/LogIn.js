import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import style from '../../commonStyles/Form.module.css'
import commonStyle from '../../commonStyles/RecipeBrowser.module.css'
import loginStyle from '../../commonStyles/Auth.module.css'
import logo from '../../../src/logo.png'

const LogIn = () => {
  const history = useHistory()
  const { register, handleSubmit } = useForm()

  const [submitting, setSubmitting] = useState(false)

  const sendLogInRequest = async data => {
    setSubmitting(true)

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/api/users/login`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      )

      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', 'true')
        history.push('/')
        window.location.reload()
      } else if (response.status === 401) {
        toast.error('Your email or password is incorrect. Please try again.')
      } else {
        toast.error(
          'An error occurred while trying to log you in. Please try again.'
        )
      }
    } catch (err) {
      toast.error(
        'An error occurred while trying to log you in. Please try again.'
      )
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='row d-flex align-items-center justify-content-center'>
      <div className={`col`}>
        <h1 className={commonStyle.font}>sign in</h1>
        <form
          className={style.authForm}
          onSubmit={handleSubmit(sendLogInRequest)}
        >
          <div>
            <label htmlFor='email'>email</label>
            <input
              className='form-control'
              type='email'
              id='email'
              {...register('email')}
              disabled={submitting}
              required
            />
          </div>

          <div>
            <label htmlFor='password'>password</label>
            <input
              className='form-control'
              type='password'
              id='password'
              {...register('password')}
              disabled={submitting}
              required
            />
          </div>

          <div className={style.submitButtonContainer}>
            <button
              className={`btn btn-primary ${loginStyle.authButton}`}
              type='submit'
              disabled={submitting}
            >
              sign in
            </button>
          </div>
        </form>
      </div>

      <div className={`col-6 ${loginStyle.info}`}>
        <div className='row'>
          <div
            className={`${loginStyle.content} ${loginStyle.alignBothWays} col`}
          >
            <Link to='/'>
              <img src={logo} alt='recipedia logo' width='400px' />
            </Link>
            <div>
              <h2 className={`${commonStyle.font} text-left`}>
                recipes catered to your needs.
              </h2>
              <p className='text-left'>
                Don't have an account? Sign up <Link to='/signup'>here</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn
