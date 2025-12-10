"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !message) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);

        // Simulate sending (replace with actual API call later)
        setTimeout(() => {
            toast.success("Message sent successfully! We'll get back to you soon.");
            setName("");
            setEmail("");
            setMessage("");
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            <div className="max-w-6xl mx-auto py-6 md:py-10 px-4 space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Contact Us</h1>
                    <p className="text-muted-foreground text-lg">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">Email</CardTitle>
                                        <CardDescription className="text-sm">Send us an email</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <a
                                    href="mailto:support@techstore.com"
                                    className="text-base font-medium hover:text-primary transition-colors"
                                >
                                    support@techstore.com
                                </a>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                        <Phone className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">Phone</CardTitle>
                                        <CardDescription className="text-sm">Mon-Fri 9am-6pm</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <a
                                    href="tel:+15551234567"
                                    className="text-base font-medium hover:text-primary transition-colors"
                                >
                                    +1 (555) 123-4567
                                </a>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">Office</CardTitle>
                                        <CardDescription className="text-sm">Visit us</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base text-muted-foreground">
                                    123 Tech Street<br />
                                    San Francisco, CA 94105<br />
                                    United States
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-2xl">Send us a Message</CardTitle>
                            <CardDescription>
                                Fill out the form below and we'll get back to you within 24 hours
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium">
                                            Name <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder="Your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="text-base"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium">
                                            Email <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="text-base"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-sm font-medium">
                                        Message <span className="text-destructive">*</span>
                                    </Label>
                                    <Textarea
                                        id="message"
                                        placeholder="How can we help you?"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={6}
                                        className="text-base resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full md:w-auto gap-2"
                                    disabled={isSubmitting}
                                >
                                    <Send className="h-4 w-4" />
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
