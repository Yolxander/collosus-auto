// AboutSection.tsx
import Image from 'next/image';

const AboutSection = () => {
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-[#c95658]">About Us</h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2017-08-31%20(4)-V8YsfnDZcpCHJGIOeN2iX2bEeDIWNI.webp"
                        alt="Collosus Auto Collision Shop Interior"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-xl"
                    />
                </div>
                <div className="md:w-1/2 md:pl-12">
                    <p className="text-lg mb-6">
                        At Collosus Auto Collision, we have been restoring vehicles to their former glory for over two decades. Our team of skilled technicians combines traditional craftsmanship with cutting-edge technology to deliver unparalleled results.
                    </p>
                    <p className="text-lg">
                        From minor dings to major repairs, we treat every vehicle as if it is our own. Trust us to bring your car back to its pristine condition, ensuring both aesthetic and structural integrity.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
