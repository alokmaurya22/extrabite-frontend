import React from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    Github,
    Linkedin,
    Mail,
    Globe,
    Star,
    Heart,
    Code
} from 'lucide-react';
import Nav from '../components/Header/Nav';
import Footer from '../components/Footer/Footer';

const OurTeam = () => {
    const teamMembers = [
        {
            name: "Alok Kumar Maurya",
            role: "Lead Developer, Architect & Backend Developer",
            description: "The mastermind behind ExtraBite's architecture and backend systems. Alok orchestrated the entire project, designed the API structure, built the robust backend infrastructure, and led the development from conception to deployment.",
            skills: ["Backend Development", "System Architecture", "API Design", "Project Leadership"],
            image: "/src/assets/team/alok.jpg",
            img_url: "https://res.cloudinary.com/dl1dutqmd/image/upload/v1752781540/alok_wbvsgw.jpg",
            gradient: "from-blue-500 to-purple-600",
            bgGradient: "from-blue-500/10 to-purple-600/5",
            borderGradient: "from-blue-500/20 to-purple-600/20",
            social: {
                github: "https://github.com/alokmaurya22",
                linkedin: "https://linkedin.com/in/alok22",
                email: "er.alokmaurya22@gmail.com",
                website: "https://alokdata.netlify.app"
            }
        },
        {
            name: "Akhilesh Gupta",
            role: "Frontend Specialist & UX Designer",
            description: "The creative force behind ExtraBite's beautiful interface. Akhilesh crafted the smooth UI/UX, implemented stunning animations, and ensured the platform is both visually appealing and highly functional.",
            skills: ["React.js", "JavaScript", "UI/UX Design", "Animation", "Responsive Design"],
            image: "/src/assets/team/akhilesh.jpg" || "https://res.cloudinary.com/dl1dutqmd/image/upload/v1752781535/akhilesh_omhteg.jpg",
            img_url: "https://res.cloudinary.com/dl1dutqmd/image/upload/v1752781535/akhilesh_omhteg.jpg",
            gradient: "from-pink-500 to-orange-600",
            bgGradient: "from-pink-500/10 to-orange-600/5",
            borderGradient: "from-pink-500/20 to-orange-600/20",
            social: {
                github: "https://github.com/Akhilesh10gupta",
                linkedin: "https://www.linkedin.com/in/akhilesh-gupta-826067228",
                email: "gakhilesh946@gmail.com",
                website: "https://portfolio-akhilesh-gupta.vercel.app/"
            }
        },
        {
            name: "Shresth Singh Verma",
            role: "Support Specialist, Figma Designer & Documentator",
            description: "The supportive foundation of ExtraBite's development process. Shresth created comprehensive design mockups in Figma, maintained detailed project documentation, and provided crucial support throughout the development lifecycle.",
            skills: ["Figma Design", "Documentation", "Project Support", "Design Systems"],
            image: "/src/assets/team/shresth.jpg",
            img_url: "https://res.cloudinary.com/dl1dutqmd/image/upload/v1752781501/Shresth_lwkdhj.jpg",
            gradient: "from-green-500 to-emerald-600",
            bgGradient: "from-green-500/10 to-emerald-600/5",
            borderGradient: "from-green-500/20 to-emerald-600/20",
            social: {
                github: "https://github.com/Ungiest333",
                linkedin: "https://www.linkedin.com/in/shresth-singh-verma-55baa122b/",
                email: "ds8957589@gmail.com",
                website: "#"
            }
        }
    ];

    const achievements = [
        {
            title: "Full-Stack Excellence",
            description: "Built a complete food donation ecosystem from scratch",
            icon: <Star className="w-6 h-6" />
        },
        {
            title: "Social Impact",
            description: "Created a platform that can genuinely help fight hunger",
            icon: <Heart className="w-6 h-6" />
        },
        {
            title: "Technical Innovation",
            description: "Implemented modern tech stack with best practices",
            icon: <Code className="w-6 h-6" />
        }
    ];

    return (
        <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] via-50% to-[#0A1A3C] min-h-screen flex flex-col">
            <Nav />

            {/* Hero Section */}
            <section className="px-4 py-16 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        to="/about"
                        className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to About
                    </Link>
                </div>

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-6">
                        Meet Our Team
                    </h1>
                    <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        The passionate minds behind ExtraBite. A dedicated team of developers who came together
                        with a shared vision to make a meaningful impact in the fight against hunger and food waste.
                    </p>
                </div>

                {/* Team Members */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {teamMembers.map((member, index) => (
                        <div key={index} className={`bg-gradient-to-br ${member.bgGradient} rounded-2xl p-8 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 hover:transform hover:scale-105`}>
                            <div className="text-center mb-6">
                                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${member.gradient} mb-4`}>
                                    <img
                                        src={(member.img_url) ? (member.img_url) : (member.image)}
                                        alt={member.name}
                                        className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                                <p className={`text-transparent bg-clip-text bg-gradient-to-r ${member.gradient} font-semibold`}>
                                    {member.role}
                                </p>
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-6 text-center">
                                {member.description}
                            </p>

                            <div className="space-y-2 mb-6">
                                <h4 className="text-orange-400 font-semibold text-sm uppercase tracking-wide">Core Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {member.skills.map((skill, skillIndex) => (
                                        <span key={skillIndex} className="px-3 py-1 bg-slate-800/60 rounded-full text-sm text-gray-300 border border-slate-700/50">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center gap-3">
                                <a
                                    href={member.social.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-slate-800/60 rounded-lg hover:bg-slate-700/60 transition-colors text-gray-300 hover:text-white"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href={member.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-slate-800/60 rounded-lg hover:bg-slate-700/60 transition-colors text-gray-300 hover:text-white"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href={`mailto:${member.social.email}`}
                                    className="p-2 bg-slate-800/60 rounded-lg hover:bg-slate-700/60 transition-colors text-gray-300 hover:text-white"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                                <a
                                    href={member.social.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-slate-800/60 rounded-lg hover:bg-slate-700/60 transition-colors text-gray-300 hover:text-white"
                                >
                                    <Globe className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Team Achievements */}
                <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
                    <h2 className="text-3xl font-bold text-orange-400 text-center mb-8">Team Achievements</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 mb-4">
                                    <div className="text-white">{achievement.icon}</div>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                                <p className="text-gray-300">{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Philosophy */}
                <div className="text-center mt-16">
                    <h2 className="text-3xl font-bold text-orange-400 mb-6">Our Philosophy</h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-gray-300 leading-relaxed mb-8">
                            We believe that technology should serve humanity. ExtraBite isn't just a project for us—it's a
                            mission to create meaningful change in the world. Every line of code we write, every feature we
                            build, and every problem we solve is guided by one simple principle:
                        </p>
                        <div className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                            "If we can save just one meal and feed one hungry person, our work has meaning."
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default OurTeam;