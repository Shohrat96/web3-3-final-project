import './styles.css';

const LoginPage = () => {

    const loginHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formEntries = [...formData.entries()]
        console.log('form data: ', formEntries)
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
                        <button type="submit">Sign in</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default LoginPage