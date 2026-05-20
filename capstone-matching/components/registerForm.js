// import Navbar from '../components/navbar'

export default function RegisterForm() {

    return (
        <form class="rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="login-form-label">
                    Full Name:
                </label>
                <input class="login-form-field" id="fullname" type="text" placeholder="Jane Doe"></input>
            </div>

            <div class="mb-4">
                <label class="login-form-label">
                    Email:
                </label>
                <input class="login-form-field" id="username" type="text" placeholder="example@exmail.com"></input>
            </div>

            <div class="mb-6">
                <label class="login-form-label">
                    Password:
                </label>
                <input class="login-form-field" id="password" type="password" placeholder="******************"></input>
                {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
            </div>

            <div class="mb-6">
                <label class="login-form-label">
                    Confirm Password:
                </label>
                <input class="login-form-field" id="confirm-password" type="password" placeholder="******************"></input>
                {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
            </div>

            <div class="flex items-center">
                <button class="button" type="button">
                    Register
                </button>
            </div>
        </form>
    )
}