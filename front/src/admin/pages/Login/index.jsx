import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/login';
import './styles.css';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';

const LoginPage = () => {
    const navigate = useNavigate()
    const { loginHandler: setLoggedIn } = useContext(UserContext);
    const loginHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        try {
            const loginUser = await login(payload)
            if (loginUser.isAdmin) {
                setLoggedIn()
                navigate('/admin')
            }
            console.log('loginUser: ', loginUser)
        } catch (error) {
            console.log('error: ', error)
        }
    }
    return (
        <div className='admin-page'>
            <h1 className="admin-page-title">Admin panel</h1>
            <div className='form-wrapper'>
                <form onSubmit={loginHandler} className='admin-page-form'>
                    <div className='form-login'>
                        <label htmlFor='login'>
                            <p>Login</p>
                            <input name='email' type='email' id='login' />
                        </label>
                    </div>
                    <div className='form-password'>
                        <label htmlFor='password'>
                            <p>Password</p>
                            <input name='password' type='password' id='password' />
                        </label>
                    </div>
                    <div className='submit-btn'>
                        <button className="login-btn" type="submit">Sign in</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default LoginPage