import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Target, Workflow, Star, Code, Rocket, ArrowRight, CheckCircle, Clock, MapPin, Shield } from 'lucide-react';
import Nav from '../components/Header/Nav';
import Footer from '../components/Footer/Footer';
import logo from '../assets/logo2.png';

const AboutUs = () => {
    const features = [
        {
            icon: <Users className="w-6 h-6" />,
            title: "Role-based Dashboards",
            description: "Tailored interfaces for donors, receivers, and admins"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Smart Expiry Tracking",
            description: "Intelligent food expiry based on type and storage"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "OTP-Verified Handover",
            description: "Secure pickup system with trust verification"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Location-based Matching",
            description: "Connect nearby donors with receivers efficiently"
        }
    ];

    const technologies = [
        {
            category: "Frontend",
            items: ["React.js", "Tailwind CSS", "Vite", "Framer Motion"]
        },
        {
            category: "Backend",
            items: ["Java 17", "Spring Boot 3.5", "PostgreSQL", "Hibernate"]
        },
        {
            category: "Integration",
            items: ["Axios", "RESTful APIs", "Swagger UI", "JWT Security"]
        },
        {
            category: "Deployment",
            items: ["Vercel", "Render", "Cloudinary", "Geolocation API"]
        }
    ];

    const steps = [
        {
            step: "01",
            title: "Sign Up & Choose Role",
            description: "Register as Donor, Receiver, or Admin based on your needs"
        },
        {
            step: "02",
            title: "List or Browse Food",
            description: "Donors list surplus food, receivers browse available items"
        },
        {
            step: "03",
            title: "Request & Accept",
            description: "Receivers request items, donors accept or reject requests"
        },
        {
            step: "04",
            title: "Secure Pickup",
            description: "OTP verification ensures safe and tracked food transfer"
        }
    ];

    return (
        <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] via-50% to-[#0A1A3C] min-h-screen flex flex-col">
            <Nav />

            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center px-4 py-16">

                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-6 text-center">
                    About ExtraBite
                </h1>

                <p className="text-lg text-gray-200 max-w-4xl text-center leading-relaxed mb-8">
                    <span className="font-semibold text-[#FF7401]">ExtraBite</span> is a revolutionary food donation platform
                    that transforms surplus food into hope. We connect generous donors with those in need, creating a sustainable
                    ecosystem that fights hunger while reducing food waste.
                </p>

                <div className="flex gap-4 mb-16">
                    <Link
                        to="/our-team"
                        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                        Meet Our Team <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Mission Section */}
            <section className="px-4 py-16 max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Target className="w-8 h-8 text-orange-500" />
                            <h2 className="text-3xl font-bold text-orange-400">Our Mission</h2>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            Every day, tons of perfectly edible food is discarded while millions face hunger.
                            Our mission is to bridge this gap by creating meaningful connections that give surplus
                            food a second chance and provide someone their next meal.
                        </p>
                        <div className="flex items-center gap-3 text-orange-300">
                            <Heart className="w-5 h-5" />
                            <span className="font-semibold">Every bite matters. Every person counts.</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-2xl p-8 border border-orange-500/20">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-400 mb-2">1M+</div>
                                <div className="text-gray-300">Meals Saved</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-400 mb-2">10K+</div>
                                <div className="text-gray-300">Active Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-400 mb-2">500+</div>
                                <div className="text-gray-300">Cities</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-400 mb-2">95%</div>
                                <div className="text-gray-300">Success Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="px-4 py-16 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <Workflow className="w-8 h-8 text-orange-500" />
                        <h2 className="text-3xl font-bold text-orange-400">How It Works</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 h-full">
                                    <div className="text-orange-500 font-bold text-2xl mb-4">{step.step}</div>
                                    <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="px-4 py-16 max-w-7xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-12">
                    <Star className="w-8 h-8 text-orange-500" />
                    <h2 className="text-3xl font-bold text-orange-400">Key Features</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 hover:transform hover:scale-105">
                            <div className="text-orange-500 mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-300">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Technologies */}
            <section className="px-4 py-16 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <Code className="w-8 h-8 text-orange-500" />
                        <h2 className="text-3xl font-bold text-orange-400">Technologies Used</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {technologies.map((tech, index) => (
                            <div key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-slate-700/50">
                                <h3 className="text-lg font-semibold text-orange-400 mb-4">{tech.category}</h3>
                                <ul className="space-y-2">
                                    {tech.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-center gap-2 text-gray-300">
                                            <CheckCircle className="w-4 h-4 text-orange-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Future Plans */}
            <section className="px-4 py-16 max-w-7xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-12">
                    <Rocket className="w-8 h-8 text-orange-500" />
                    <h2 className="text-3xl font-bold text-orange-400">Future Plans</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        "Real-time notifications for seamless communication",
                        "Mobile app for Android and iOS platforms",
                        "NGO partnerships and volunteer delivery network",
                        "AI-powered analytics for waste pattern identification",
                        "Multilingual support for global accessibility",
                        "Blockchain integration for donation transparency"
                    ].map((plan, index) => (
                        <div key={index} className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                                    {index + 1}
                                </div>
                                <p className="text-gray-300 leading-relaxed">{plan}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="px-4 py-16 ">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-orange-400 mb-6">Join the Movement</h2>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                        No act of kindness is ever too small. Every donation, every pickup, every shared meal
                        brings us closer to a world without hunger.
                    </p>
                    <div className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                        Join ExtraBite — Empower Change, Transform Lives.
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;