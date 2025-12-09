"use client";

import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useCreateOrderMutation } from "@/services/orderQueries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutPage() {
    const { cart, isLoading } = useCart();
    const { token, user } = useAuth(); // Assuming we use user address or prompt for it
    const router = useRouter();
    const { mutate: createOrder, isPending } = useCreateOrderMutation();

    const total = cart?.totalPrice || 0;

    const handlePlaceOrder = () => {
        if (!token || !cart || cart.items.length === 0) return;

        // Construct order payload. 
        // Backend expects Order object. 
        // Usually backend creates order from Cart content automatically on a specific endpoint 
        // OR we send the items. 
        // Checking orderQueries.ts -> useCreateOrderMutation takes 'Order' data.
        // This implies we need to construct the full order object or the backend logic is thin.
        // However, usually checkout is "convert cart to order".
        // I will assume for now we send the basic structure required.

        // If backend requires full Order object with items, we map cart items.
        interface CreateOrderPayload {
            items: {
                product: string;
                quantity: number;
                price: number;
            }[];
            totalPrice: number;
            status: string;
            shippingAddress: string;
            paymentMethod: string;
        }

        const orderData: CreateOrderPayload = {
            // user: user?._id, // Backend likely extracts from token
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.price
            })),
            totalPrice: total,
            status: 'pending',
            shippingAddress: user?.address || "123 Main St, Tech City", // Mock or user address
            paymentMethod: "Credit Card"
        };

        createOrder(
            { data: orderData, token },
            {
                onSuccess: () => {
                    toast.success("Order placed successfully!");
                    router.push("/orders"); // Or confirmation page
                },
                onError: (err) => {
                    toast.error("Failed to place order: " + err.message);
                }
            }
        );
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="container py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Button onClick={() => router.push("/")}>Start Shopping</Button>
            </div>
        )
    }

    return (
        <div className="container py-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                {user?.address || "No address saved. We will use: 123 Main St, Mock City"}
                            </p>
                            {/* Add Address Form here if needed */}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Mock Payment (Credit Card)</p>
                            {/* Stripe Elements would go here */}
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {cart.items.map((item) => (
                                <div key={item.product._id} className="flex justify-between text-sm">
                                    <span>{item.product.title} x {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={isPending}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Place Order
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
