import { signUp } from '../app/login/actions'

export default function RegisterForm() {

    return (
        <form action={signUp} className="rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="login-form-label">
                    Full Name:
                </label>
                <input className="login-form-field" id="fullname" name="fullname" type="text" placeholder="Jane Doe"></input>
            </div>

            <div className="mb-4">
                <label className="login-form-label">
                    Email:
                </label>
                <input className="login-form-field" id="email" name="email" type="text" placeholder="example@exmail.com"></input>
            </div>

            <div className="mb-6">
                <label className="login-form-label">
                    Password:
                </label>
                <input className="login-form-field" id="password" name="password" type="password" placeholder="******************"></input>
                {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
            </div>

            <div className="mb-6">
                <label className="login-form-label">
                    Confirm Password:
                </label>
                <input className="login-form-field" id="confirm-password" name="confirm-password" type="password" placeholder="******************"></input>
                {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
            </div>

            <div className="flex items-center">
                <button className="button" type="submit">
                    Register
                </button>
            </div>
        </form>
    )
}