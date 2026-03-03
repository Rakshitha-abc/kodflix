import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify({ email: data.email }));
                toast.success("Signed in successfully");
                navigate("/");
            } else {
                toast.error(data.message || "Invalid credentials");
            }
        } catch (error) {
            toast.error("Failed to sign in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative min-h-screen w-full flex flex-col bg-black overflow-x-hidden font-sans"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-aca1-07f4f4644b76/f3621431-13d0-47b5-8191-8816157a4c40/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_large.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Signature Netflix Gradient Overlays */}
            <div className="fixed inset-0 z-0 bg-black/40" />
            <div className="fixed inset-0 z-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />

            {/* Logo: Top-left corner */}
            <header className="relative z-20 px-4 py-6 md:px-12 md:py-6">
                <h1
                    className="text-[#E50914] font-display text-4xl md:text-5xl tracking-widest font-black cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    KODFLIX
                </h1>
            </header>

            {/* Layout: Form in center */}
            <main className="relative z-20 w-full flex-grow flex items-center justify-center pb-20 px-4">
                {/* Form container: rgba(0,0,0,0.75), 40px padding, 4px radius, ~350px width */}
                <div className="w-full max-w-[350px] p-[40px] bg-[rgba(0,0,0,0.75)] rounded-[4px] flex flex-col min-h-[500px]">
                    <h2 className="text-[32px] font-bold text-white mb-7">Sign In</h2>

                    <form onSubmit={handleSignin} className="flex flex-col">
                        <div className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Email or phone number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="!bg-[#333] border-none text-white h-[50px] rounded-[4px] focus-visible:ring-0 placeholder:text-[#8c8c8c] text-base px-5"
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="!bg-[#333] border-none text-white h-[50px] rounded-[4px] focus-visible:ring-0 placeholder:text-[#8c8c8c] text-base px-5"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#E50914] hover:bg-[#E50914]/90 text-white font-bold h-[50px] mt-10 text-base rounded-[4px]"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>

                        <div className="flex items-center justify-between text-[#b3b3b3] text-sm mt-3">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 bg-[#737373] border-none rounded-sm accent-[#E50914] cursor-pointer"
                                    id="remember"
                                    defaultChecked
                                />
                                <label htmlFor="remember" className="cursor-pointer text-[#b3b3b3] text-[13px]">Remember me</label>
                            </div>
                            <Link to="#" className="hover:underline text-[13px]">Need help?</Link>
                        </div>

                        <div className="mt-14 text-[#737373] text-base">
                            New to Kodflix?{" "}
                            <Link to="/signup" className="text-white hover:underline font-medium">
                                Sign up now.
                            </Link>
                        </div>

                        <p className="text-[13px] text-[#737373] mt-4 leading-tight">
                            This page is protected by Google reCAPTCHA to ensure you're not a bot.
                            <button type="button" className="text-[#0071eb] hover:underline ml-1">Learn more.</button>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Signin;
