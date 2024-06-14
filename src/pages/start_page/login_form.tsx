import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apple from '../imgs/apple.svg';
import google from '../imgs/google.svg';
import { useAuth } from '../auth/auth_context';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin' && password === 'admin') {
            login('recruiter');
            navigate('/news');
        } else if (email === 'user' && password === 'user') {
            login('user');
            navigate('/news');
        } else {
            alert('Неправильный логин или пароль');
        }
    };

    return (
        <div className="px-[0px] flex w-full justify-center">
            <div className="bg-bg1 shadow-md rounded-[22px] px-[80px] py-[52px] h-[620px] w-full max-w-[1280px] flex justify-start items-center">
                <div className="w-full max-w-[560px] h-full">
                    <h1 className="text-[42px] text-[#2A5AB8] font-extrabold mb-[8px]">Добро пожаловать!</h1>
                    <p className="font-normal text-[18px] text-[#21272A] mb-[20px]">Давайте быстро найдем возможность приносить пользу миру</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email" className="mb-[8px] text-[#21272A]">Почта</label>
                        <input
                            type="text"
                            placeholder="Введите логин"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#F2F4F8] h-[48px] mb-[16px] p-[15px] border border-[#C1C7CD] rounded-[7px]"
                        />
                        <label htmlFor="password" className="mb-[8px] text-[#21272A]">Пароль</label>
                        <input
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#F2F4F8] h-[48px] p-[15px] border border-[#C1C7CD] rounded-[7px]"
                        />
                        <p className="text-[12px] mb-[16px] text-[#697077]">Пароль должен включать от 8 символов и заглавные буквы</p>
                        <div className="flex items-center justify-between mb-[16px]">
                            <div className="flex items-center">
                                <input type="checkbox" id="remember" className="mr-2" />
                                <label htmlFor="remember" className="text-[#21272A]">Запомнить меня</label>
                            </div>
                            <div>
                                <button type="button" className="text-[#001D6C] font-medium">Забыл пароль?</button>
                            </div>
                        </div>
                        <button type="submit" className="bg-[#2A5AB8] text-white text-[16px] font-medium h-[48px] w-full py-2 rounded-[7px] mb-[20px]">Войти</button>
                        <div className="flex gap-[16px]">
                            <button className="w-full flex items-center justify-center gap-[16px] py-2 border-[1px] text-[16px] font-medium border-[#2A5AB8] text-[#2A5AB8] rounded-[7px]">
                                <img src={google} alt="Google" />
                                <h1>Зайти через Google</h1>
                            </button>
                            <button className="w-full flex items-center justify-center gap-[16px] py-2 border-[1px] text-[16px] font-medium border-[#2A5AB8] text-[#2A5AB8] rounded-[7px]">
                                <img src={apple} alt="Apple" />
                                <h1>Зайти через Apple</h1>
                            </button>
                        </div>
                    </form>
                    <p className="mt-4 text-start text-gray-600">Нет аккаунта? <a href="#" className="text-[#2A5AB8]">Зарегистрируйтесь</a></p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;

