import { useContext, useState } from 'react';
import { AuthContext } from 'pages/_app';
import { SocialLogin } from 'components/shared/SocialLogin/SocialLogin';
import router from 'next/router';
import { apiRegister } from 'components/utils/api/auth'; 

export const Registration = () => {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
const handleRegistration = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const userData = {
    username: name, 
    first_name: name,
    last_name: lastName,
    phone_number: phone,
    email: email,
    password: password,
    confirm_password: confirmPassword, 
  };

  try {
    const response = await apiRegister(userData);
    // console.log("registration Response:", response); 
    // console.log(response.status)
    const data = await response.json();
    // console.log(data);

    if (response.status===201)  {
      login(response.token); 
      // alert("Registration successful");
      router.push('/login');
    
    } else {
      alert('Registration failed. Please try again.');
    }
  } catch (error) {
    console.error('Registration error:', error);
    alert('An error occurred during registration. Please try again later.');
  }
};


  return (
    <>
      <div className='login registration'>
        <div className='wrapper'>
          <div
            className='login-form js-img'
            style={{
              backgroundImage: `url('/assets/img/registration-form__bg.png')`,
            }}
          >
            <form onSubmit={handleRegistration}>
              <h3>register now</h3>
              <SocialLogin />
              <div className='box-field__row'>
                <div className='box-field'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='box-field'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className='box-field__row'>
                <div className='box-field'>
                  <input
                    type='tel'
                    className='form-control'
                    placeholder='Enter your phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className='box-field'>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className='box-field__row'>
                <span>password</span>
                <div className='box-field'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='box-field'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <label className='checkbox-box checkbox-box__sm'>
                <input type='checkbox' />
                <span className='checkmark'></span>
                Remember me
              </label>
              <button className='btn' type='submit'>
                registration
              </button>
              <div className='login-form__bottom'>
                <span>
                  Already have an account?{' '}
                  <a onClick={() => router.push('/login')}>Log in</a>
                </span>
              </div>
            </form>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
    </>
  );
};
