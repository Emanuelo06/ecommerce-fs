import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
    return (
        <footer className="bg-zinc-50 dark:bg-zinc-900 border-t">
            <div className="container px-4 py-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Brand Column */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <ShoppingBag className="h-6 w-6" />
                            <span className="text-xl font-bold">Store</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Premium quality products for your lifestyle.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h3 className="font-semibold mb-3">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/products" className="text-muted-foreground hover:text-foreground">All Products</Link></li>
                            <li><Link href="/categories" className="text-muted-foreground hover:text-foreground">Categories</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Featured</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h3 className="font-semibold mb-3">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQs</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Shipping Returns</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h3 className="font-semibold mb-3">Stay Updated</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                            Subscribe for latest updates.
                        </p>
                        <div className="flex space-x-2">
                            <Input type="email" placeholder="Enter your email" className="bg-background" />
                            <Button>Subscribe</Button>
                        </div>
                    </div>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>&copy; 2025 E-Commerce Store. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-foreground">Terms</Link>
                        <Link href="#" className="hover:text-foreground">Privacy</Link>
                        <Link href="#" className="hover:text-foreground">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
