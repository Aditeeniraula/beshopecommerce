import { useContext, useState } from 'react';
import { AuthContext } from 'pages/_app';
import { SocialLogin } from 'components/shared/SocialLogin/SocialLogin';
import router from 'next/router';
import { apiLogin } from 'components/utils/api/auth'; 

export const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiLogin({ email, password });
      // console.log("Login Response:", response); 
      // console.log(response.status)
      const data = await response.json();
      // console.log(data);
      

      if (response.status===200) {
        login(response.token); 
        // alert("Login successful");
        router.push('/shop'); 
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again later.');
    }
  };

  return (
    <>
      <div className='login'>
        <div className='wrapper'>
          <div
            className='login-form js-img'
            style={{ backgroundImage: `url('/assets/img/login-form__bg.png')` }}
          >
            <form onSubmit={handleLogin}>
              <h3>log in with</h3>
              <SocialLogin />
              <div className='box-field'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='box-field'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <label className='checkbox-box checkbox-box__sm'>
                <input type='checkbox' />
                <span className='checkmark'></span>
                Remember me
              </label>
              <button className='btn' type='submit'>
                log in
              </button>
              <div className='login-form__bottom'>
                <span>
                  No account?{' '}
                  <a onClick={() => router.push('/registration')}>
                    Register now
                  </a>
                </span>
                <a href='#'>Lost your password?</a>
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
