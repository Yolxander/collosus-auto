// BookAppointmentSection.tsx
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BookAppointmentSection = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

    const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'];

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setSelectedDate(date);
            console.log("Selected Date:", date); // Debugging log
            // Prevent page reload and jumping
            window.history.pushState(null, '', `#book?date=${date.toISOString().split('T')[0]}`);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-[#c95658]">Book an Appointment</h2>
            <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <h3 className="text-2xl font-semibold mb-4 text-[#c95658]">Select A Date and Time</h3>
                    <div className="bg-[#343438] p-4 rounded-lg">
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect} // Updated to use a separate function
                            className="text-white"
                            classNames={{
                                months: "flex flex-wrap justify-center",
                                month: "m-2",
                                caption: "flex justify-center pt-1 relative items-center",
                                caption_label: "text-sm font-medium",
                                nav: "space-x-1 flex items-center",
                                nav_button: cn(
                                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                                    "text-white hover:bg-[#c95658] hover:text-white rounded-full transition-colors"
                                ),
                                nav_button_previous: "absolute left-1",
                                nav_button_next: "absolute right-1",
                                table: "w-full border-collapse space-y-1",
                                head_row: "flex",
                                head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                                row: "flex w-full mt-2",
                                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                day: cn(
                                    "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                                    "hover:bg-[#c95658] hover:text-white rounded-full transition-colors"
                                ),
                                day_selected: "bg-[#c95658] text-white hover:bg-[#c95658] hover:text-white focus:bg-[#c95658] focus:text-white",
                                day_today: "bg-[#4d4d4f] text-white",
                                day_outside: "text-muted-foreground opacity-50",
                                day_disabled: "text-muted-foreground opacity-50",
                                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                                day_hidden: "invisible",
                            }}
                        />
                    </div>
                    <div className="mt-4 bg-[#343438] p-4 rounded-lg">
                        <h4 className="text-xl font-semibold mb-2 text-[#c95658]">Select A Time</h4>
                        <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time) => (
                                <Button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    variant={selectedTime === time ? "default" : "outline"}
                                    className={cn(
                                        "text-white border-[#c95658]",
                                        selectedTime === time ? 'bg-[#c95658]' : 'bg-[#4d4d4f] hover:bg-[#c95658] hover:text-white'
                                    )}
                                >
                                    {time}
                                </Button>
                            ))}
                        </div>
                    </div>
                    {selectedDate && selectedTime && (
                        <div className="mt-4 p-4 bg-[#c95658] text-white rounded-lg">
                            <p className="font-semibold">Selected Appointment:</p>
                            <p>{format(selectedDate, 'PPP')} at {selectedTime}</p>
                        </div>
                    )}
                </div>
                <div className="md:w-1/2 md:pl-8">
                    <form className="space-y-4 bg-[#343438] p-6 rounded-lg">
                        <input type="text" placeholder="Name *" className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" required />
                        <input type="text" placeholder="Vehicle *" className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" required />
                        <input type="email" placeholder="Email" className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" />
                        <input type="tel" placeholder="Phone *" className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" required />
                        <div className="flex items-center">
                            <input type="checkbox" id="allowText" className="mr-2" />
                            <label htmlFor="allowText" className="text-white">Allow text messages (cell phone)</label>
                        </div>
                        <input type="text" placeholder="Insurance Co." className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" />
                        <input type="text" placeholder="Policy #" className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" />
                        <input type="text" placeholder="Claim #" className="w-full p-2 rounded-md bg-[#4d4d4f] text-white" />
                        <textarea placeholder="Comment" rows={4} className="w-full p-2 rounded-md bg-[#4d4d4f] text-white"></textarea>
                        <Button type="submit" className="w-full bg-[#c95658] text-white hover:bg-[#343438]">
                            Book Appointment
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookAppointmentSection;
