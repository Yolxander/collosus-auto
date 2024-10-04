// ServicesSection.tsx
import {Wrench, PaintBucket, Gauge} from 'lucide-react';

const ServicesSection = () => {
    const services = [
        { title: 'Collision Repair', icon: <Wrench className="w-8 h-8 text-[#c95658]" /> },
        { title: 'Painting', icon: <PaintBucket className="w-8 h-8 text-[#c95658]" /> },
        { title: 'Detailing', icon: <Gauge className="w-8 h-8 text-[#c95658]" /> }
    ];

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-[#c95658]">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div key={index} className="p-6 bg-[#4d4d4f] rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center mb-4">
                            {service.icon}
                            <h3 className="text-xl font-bold ml-4">{service.title}</h3>
                        </div>
                        <p>
                            Our dedicated team provides expert services to restore your vehicle's appearance and safety.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesSection;
