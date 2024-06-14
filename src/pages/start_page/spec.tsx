import React from 'react';

const specialists = [
    { name: 'Darrell Steward', role: 'UI Designer & Co-founder', image: 'path_to_image', socials: ['linkedin', 'twitter', 'instagram', 'facebook'] },
    // Add more specialists here
];

const Specialists: React.FC = () => {
    return (
        <section className=" py-8">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-4">Топ лучших специалистов</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {specialists.map((specialist, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded shadow-md">
                            <img src={specialist.image} alt={specialist.name} className="w-full h-48 object-cover rounded" />
                            <h3 className="text-xl font-bold mt-2">{specialist.name}</h3>
                            <p className="text-gray-600">{specialist.role}</p>
                            <div className="flex space-x-2 mt-2">
                                {specialist.socials.map((social, i) => (
                                    <a key={i} href={`#${social}`} className="text-gray-600">{social}</a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Specialists;
