// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white p-8">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between items-center mb-8">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-2xl font-bold">Rekru</h1>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Enter your email to get the latest news..."
                            className="p-2 w-full md:w-auto border border-gray-600 rounded-l-md"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-md">
                            Subscribe
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h2 className="font-bold mb-4">Column One</h2>
                        <ul>
                            <li>Twenty One</li>
                            <li>Thirty Two</li>
                            <li>Fourty Three</li>
                            <li>Fifty Four</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-bold mb-4">Column Two</h2>
                        <ul>
                            <li>Sixty Five</li>
                            <li>Seventy Six</li>
                            <li>Eighty Seven</li>
                            <li>Ninety Eight</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-bold mb-4">Column Three</h2>
                        <ul>
                            <li>One Two</li>
                            <li>Three Four</li>
                            <li>Five Six</li>
                            <li>Seven Eight</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-bold mb-4">Column Four</h2>
                        <div className="flex space-x-2 mb-4">
                            <img src="/path/to/app-store.png" alt="App Store" className="h-10" />
                            <img src="/path/to/play-store.png" alt="Play Store" className="h-10" />
                        </div>
                        <div>
                            <h3 className="font-bold">Join Us</h3>
                            <div className="flex space-x-4 mt-2">
                                <a href="#" className="text-white"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="text-white"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between items-center text-gray-500">
                    <p>Rekru © 2024, All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="text-gray-500 hover:text-white">Eleven</a>
                        <a href="#" className="text-gray-500 hover:text-white">Twelve</a>
                        <a href="#" className="text-gray-500 hover:text-white">Thirteen</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
