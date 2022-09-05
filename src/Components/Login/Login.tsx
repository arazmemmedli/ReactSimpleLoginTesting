import React, { SyntheticEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Validation } from '../../hooks/Validation';

export interface IUser {
    email: string;
    password: string;
}

const Login = ({ userData }: { userData?: (value: IUser) => void }) => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPasword] = useState('');
    const [error, setError] = useState<IUser>({} as IUser);
    const isInvalid = password === '' || emailAddress === '';

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("button clicked")
        const authData: IUser = {
            email: emailAddress,
            password: password
        }
        const validate = Validation(authData);
        if (validate.email || validate.password) {
            setError(validate);
            return;
        }
        if (emailAddress === "arazmemmedli@gmail.com" && password === "11may2002") {
            if (userData) {
                userData(authData)
            }
        } else {
            return;
        }
    }

    return (
        <div className="flex login_bg items-center justify-center relative bg-cover bg-center bg-no-repeat w-full min-h-[100vh]">
            <div className="flex max-w-md w-full flex-col items-center bg-white p-4 border border-solid border-gray-primary rounded mb-4">
                <h1 className="flex justify-center w-full mb-3">
                    <img src="/logo192.png" alt="Logo" className="mt-2 max-w-[150px] mb-4" />
                </h1>
                <div className="w-full block">
                    <form onSubmit={handleSubmit}>
                        <input aria-label="Enter your email address" value={emailAddress} required={false} type="text" name="email" id="email" onChange={(e) => setEmailAddress(e.target.value)} placeholder="Email address" className="block w-full text-base font-normal rounded-md text-[#333] mb-2 outline-none py-3 px-7 min-h-[50px] bg-[#f6f6f6]" />
                        <p className='text-[red] mb-3 text-center' data-testid="error-text">{error.email}</p>
                        <input aria-label="Enter your password" value={password} type="password" name="password" id="password" onChange={(e) => setPasword(e.target.value)} placeholder="Password" className="block w-full text-base outline-none font-normal mr-3 rounded-md mb-2 text-[#333] py-3 px-7 min-h-[50px] bg-[#f6f6f6]" />
                        <p className='text-[red] mb-3 text-center' data-testid="error-password">{error.password}</p>
                        <button disabled={!emailAddress || !password} type="submit" className={`bg-[#176CA6] text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}>Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;