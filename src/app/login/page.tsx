import React from 'react';

const LoginPage: React.FC = () => {
    return (

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Fts Miami Admin" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-white-900">Email address</label>
                        <div className="mt-2">
                            <input type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-white-900">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-white-600 hover:text-gray-500">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-[#A0153E] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#FF204E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF204E]">Sign in</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-md/6 text-white-500">
                    License
                    <br />
                    <a href="#" className="font-semibold text-black-600 hover:text-gray-500">B 2500149</a>
                </p>
            </div>
        </div>

    );
};

export default LoginPage;