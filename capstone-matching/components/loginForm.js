// import Navbar from '../components/navbar'

export default function LoginForm() {

    return (
            <form className="rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="login-form-label">
                        Email:
                    </label>
                    <input className="login-form-field" id="username" type="text" placeholder="example@exmail.com"></input>
                </div>
                <div className="mb-6">
                    <label className="login-form-label">
                        Password:
                    </label>
                    <input className="login-form-field" id="password" type="password" placeholder="******************"></input>
                    {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                </div>
                <div className="flex items-center">
                    <button className="button" type="button">
                        Log In
                    </button>
                </div>
            </form>
    )
}