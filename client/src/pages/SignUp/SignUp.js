import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import style from '../../commonStyles/Form.module.css'
import commonStyle from '../../commonStyles/RecipeBrowser.module.css'
import signupStyle from '../../commonStyles/Auth.module.css'
import logo from '../../../src/logo.png'

const SignUp = () => {
  const history = useHistory()
  const { register, handleSubmit } = useForm()

  const [submitting, setSubmitting] = useState(false)

  const sendSignUpRequest = async data => {
    setSubmitting(true)

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/api/users/signup`,
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
        toast.success(
          'Your account has successfully been created! Please log in.'
        )
        history.push('/login')
      } else {
        toast.error(
          'An error occurred while trying to sign you up. Please try again.'
        )
      }
    } catch (err) {
      toast.error(
        'An error occurred while trying to sign you up. Please try again.'
      )
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='row d-flex align-items-center justify-content-center'>
      <div className={`d-none d-sm-block col-md-6 ${signupStyle.info}`}>
        <div className='row'>
          <div
            className={`${signupStyle.content} ${signupStyle.alignBothWays} col`}
          >
            <Link to='/'>
              <img src={logo} alt='recipedia logo' width='400px' />
            </Link>
            <div>
              <h2 className={`${commonStyle.font} text-left`}>
                recipes catered to your needs.
              </h2>
              <p className='text-left'>
                Already have an account? Sign in <Link to='/login'>here</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`col-xs-12 col-md-6`}>
        <h1 className={commonStyle.font}>sign up</h1>
        <form
          className={style.authForm}
          onSubmit={handleSubmit(sendSignUpRequest)}
        >
          <div>
            <label htmlFor='firstName'>first name</label>
            <input
              className='form-control'
              type='text'
              id='firstName'
              {...register('firstName')}
              disabled={submitting}
              required
            />
          </div>

          <div>
            <label htmlFor='lastName'>last name</label>
            <input
              className='form-control'
              type='text'
              id='lastName'
              {...register('lastName')}
              disabled={submitting}
              required
            />
          </div>

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
              className={`btn btn-primary ${signupStyle.authButton}`}
              type='submit'
              disabled={submitting}
            >
              sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
