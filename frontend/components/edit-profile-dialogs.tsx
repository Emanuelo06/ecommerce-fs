"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateUserMutation } from "@/services/userQueries";
import { useAuth } from "@/context/auth-context";
import { Loader2, Phone } from "lucide-react";
import { toast } from "sonner";

interface EditPhoneDialogProps {
    currentPhone?: string;
}

// Common country codes - can be expanded
const COUNTRY_CODES = [
    { code: "+1", country: "US/Canada", flag: "🇺🇸", format: "(XXX) XXX-XXXX" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧", format: "XXXX XXX XXXX" },
    { code: "+39", country: "Italy", flag: "🇮🇹", format: "XXX XXX XXXX" },
    { code: "+33", country: "France", flag: "🇫🇷", format: "X XX XX XX XX" },
    { code: "+49", country: "Germany", flag: "🇩🇪", format: "XXX XXXXXXX" },
    { code: "+34", country: "Spain", flag: "🇪🇸", format: "XXX XX XX XX" },
    { code: "+81", country: "Japan", flag: "🇯🇵", format: "XX-XXXX-XXXX" },
    { code: "+86", country: "China", flag: "🇨🇳", format: "XXX XXXX XXXX" },
    { code: "+91", country: "India", flag: "🇮🇳", format: "XXXXX XXXXX" },
    { code: "+61", country: "Australia", flag: "🇦🇺", format: "XXX XXX XXX" },
];

export function EditPhoneDialog({ currentPhone }: EditPhoneDialogProps) {
    const [open, setOpen] = useState(false);

    // Parse existing phone to split country code and number
    const parsePhone = (phone?: string) => {
        if (!phone) return { countryCode: "+1", number: "" };
        const match = phone.match(/^(\+\d+)\s*(.+)$/);
        if (match) {
            return { countryCode: match[1], number: match[2] };
        }
        return { countryCode: "+1", number: phone };
    };

    const parsed = parsePhone(currentPhone);
    const [countryCode, setCountryCode] = useState(parsed.countryCode);
    const [phone, setPhone] = useState(parsed.number);

    const { user, token, updateUserData } = useAuth();
    const { mutate: updateUser, isPending } = useUpdateUserMutation();

    const formatPhoneNumber = (value: string, code: string) => {
        const cleaned = value.replace(/\D/g, "");

        // Format based on country code
        if (code === "+1") {
            // US/Canada format: (XXX) XXX-XXXX
            const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
            if (match) {
                return !match[2] ? match[1] :
                    `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`;
            }
        } else if (code === "+44") {
            // UK format: XXXX XXX XXXX
            const match = cleaned.match(/^(\d{0,4})(\d{0,3})(\d{0,4})$/);
            if (match) {
                return [match[1], match[2], match[3]].filter(Boolean).join(" ");
            }
        } else {
            // Default: add space every 3 digits
            return cleaned.match(/.{1,3}/g)?.join(" ") || cleaned;
        }
        return value;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value, countryCode);
        setPhone(formatted);
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCode = e.target.value;
        setCountryCode(newCode);
        // Reformat existing number with new country code
        if (phone) {
            setPhone(formatPhoneNumber(phone, newCode));
        }
    };

    const handleSave = () => {
        if (!user || !token) return;

        const cleanedNumber = phone.replace(/\D/g, "");
        if (!phone || cleanedNumber.length < 6) {
            toast.error("Please enter a valid phone number");
            return;
        }

        // Save as: +1 (555) 123-4567
        const fullPhone = `${countryCode} ${phone}`;

        updateUser(
            {
                userId: user._id,
                data: { phoneNumber: fullPhone },
                token,
            },
            {
                onSuccess: (updatedUser) => {
                    updateUserData(updatedUser);
                    toast.success("Phone number updated successfully");
                    setOpen(false);
                },
                onError: (error: any) => {
                    toast.error("Failed to update phone number", {
                        description: error?.response?.data?.message || error.message,
                    });
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    {currentPhone ? "Edit Phone" : "Add Phone"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Phone Number</DialogTitle>
                    <DialogDescription>
                        Enter your phone number for account security and order updates
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                            Mobile Phone Number
                        </Label>
                        <div className="flex gap-2">
                            <select
                                value={countryCode}
                                onChange={handleCountryChange}
                                className="flex h-10 w-[140px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                                {COUNTRY_CODES.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.flag} {country.code}
                                    </option>
                                ))}
                            </select>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder={COUNTRY_CODES.find(c => c.code === countryCode)?.format || "(555) 123-4567"}
                                value={phone}
                                onChange={handlePhoneChange}
                                className="flex-1 text-base"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            We'll use this number to contact you about orders
                        </p>
                    </div>
                </div>
                <DialogFooter className="sm:justify-between">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isPending}
                        className="sm:flex-1"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isPending} className="sm:flex-1">
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Phone Number
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface EditAddressDialogProps {
    currentAddress?: string;
}

export function EditAddressDialog({ currentAddress }: EditAddressDialogProps) {
    const [open, setOpen] = useState(false);

    // Parse existing address if it exists
    const parseAddress = (addr?: string) => {
        if (!addr) return { street: "", city: "", state: "", zip: "", country: "United States" };
        const parts = addr.split(", ");
        return {
            street: parts[0] || "",
            city: parts[1] || "",
            state: parts[2] || "",
            zip: parts[3] || "",
            country: parts[4] || "United States"
        };
    };

    const parsed = parseAddress(currentAddress);
    const [street, setStreet] = useState(parsed.street);
    const [city, setCity] = useState(parsed.city);
    const [state, setState] = useState(parsed.state);
    const [zip, setZip] = useState(parsed.zip);
    const [country, setCountry] = useState(parsed.country);

    const { user, token, updateUserData } = useAuth();
    const { mutate: updateUser, isPending } = useUpdateUserMutation();

    const handleSave = () => {
        if (!user || !token) return;

        if (!street || !city || !state || !zip) {
            toast.error("Please fill in all required fields");
            return;
        }

        // Format address as comma-separated string
        const formattedAddress = `${street}, ${city}, ${state}, ${zip}, ${country}`;

        updateUser(
            {
                userId: user._id,
                data: { address: formattedAddress },
                token,
            },
            {
                onSuccess: (updatedUser) => {
                    updateUserData(updatedUser);
                    toast.success("Address updated successfully");
                    setOpen(false);
                },
                onError: (error: any) => {
                    toast.error("Failed to update address", {
                        description: error?.response?.data?.message || error.message,
                    });
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="w-full gap-2">
                    {currentAddress ? "Update Address" : "Add Address"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Shipping Address</DialogTitle>
                    <DialogDescription>
                        Enter your shipping address for order delivery
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="street" className="text-sm font-medium">
                            Street Address <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="street"
                            placeholder="123 Main Street, Apt 4B"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="text-base"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city" className="text-sm font-medium">
                                City <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="city"
                                placeholder="New York"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="text-base"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="state" className="text-sm font-medium">
                                State/Province/Region <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="state"
                                placeholder="NY, California, Lombardy, etc."
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="text-base"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="zip" className="text-sm font-medium">
                                Postal Code <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="zip"
                                placeholder="10001, SW1A 1AA, etc."
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                className="text-base uppercase"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="country" className="text-sm font-medium">
                                Country <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="United States, Italy, Japan, etc."
                                className="text-base"
                            />
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground pt-2">
                        This will be used as your default shipping address
                    </p>
                </div>
                <DialogFooter className="sm:justify-between">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isPending}
                        className="sm:flex-1"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isPending} className="sm:flex-1">
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Address
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
