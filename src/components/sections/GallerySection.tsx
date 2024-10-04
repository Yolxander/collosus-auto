// GallerySection.tsx
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const GallerySection = () => {
    const images = [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2022-03-18-TWnipBrRwCIfDLSWTcv8ebywJFdJFw.webp",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2017-08-31%20(2)-UlGpTFOzZS5NP5z6MPRuJW7wZxMFju.webp",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2017-08-31%20(1)-csnrcD5UpWlnbkRyx7dbVkANrRyIwM.webp",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-03%20at%2012.03.16%E2%80%AFPM-bywbOtGWiLWMAEPRgNPQYfj7AyOTed.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2017-08-31%20(3)-r8fY5JvJ3iroIoGadlOZdR8g6ASS6u.webp",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2017-10-18-KQ6z7xZ5CcDRDEBp39XHMTBvvrNIaZ.webp"
    ];

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-[#c95658]">Our Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {images.map((src, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg max-h-[300px]">
                        <Image
                            src={src}
                            alt={`Gallery Image ${index + 1}`}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                    </div>
                ))}
            </div>
            <div className="text-center mt-12">
                <Button className="bg-[#c95658] text-white hover:bg-[#4d4d4f]">
                    View Full Gallery
                </Button>
            </div>
        </div>
    );
};

export default GallerySection;
