"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Heart, Award, Users, TrendingUp } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            <div className="max-w-6xl mx-auto py-6 md:py-10 px-4 space-y-12">
                {/* Hero Section */}
                <div className="text-center space-y-4 py-8">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                        <Zap className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About TechStore</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Your trusted destination for premium tech products since 2024
                    </p>
                </div>

                {/* Our Story */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Our Story</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p className="text-base leading-relaxed">
                            TechStore was founded with a simple mission: make cutting-edge technology accessible to everyone.
                            We believe that great tech shouldn't be complicated or overpriced.
                        </p>
                        <p className="text-base leading-relaxed">
                            What started as a passion project has grown into a trusted e-commerce platform serving thousands
                            of customers worldwide. We carefully curate every product in our catalog, ensuring quality,
                            performance, and value.
                        </p>
                    </CardContent>
                </Card>

                {/* Values Grid */}
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Why Choose Us</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">Secure Shopping</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Your data is protected with industry-standard encryption. Shop with confidence.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">Fast Delivery</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Quick processing and worldwide shipping. Get your tech when you need it.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <Award className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">Quality Guarantee</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Every product is verified for authenticity and quality before shipping.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <Heart className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">Customer First</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    24/7 support team ready to help. Your satisfaction is our priority.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">Trusted Community</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Join thousands of satisfied customers who trust TechStore.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <TrendingUp className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">Best Prices</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Competitive pricing on all products. Get more value for your money.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-primary">10K+</CardTitle>
                            <CardDescription className="text-base">Happy Customers</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-primary">500+</CardTitle>
                            <CardDescription className="text-base">Products</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-primary">99%</CardTitle>
                            <CardDescription className="text-base">Satisfaction Rate</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    );
}
