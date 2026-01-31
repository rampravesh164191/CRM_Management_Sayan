import { ArrowRight, ChartColumn, Mail, Play, Target, Users } from "lucide-react";
import AnimatedBars from "../../components/AnimatedBars";
import {Link} from "react-router-dom";

function LandingPage(){
    return (
        <>
        {/* navbar  */}
        <div className="border-b border-gray-300 sticky top-0 bg-white z-50">
            <nav className="w-[1450px] h-[60px] m-auto flex justify-between items-center">
                <div className="w-[15%] h-full flex items-center">
                    <p className="px-3.5 py-2.5 bg-sky-600 mx-2 rounded-2xl flex justify-center items-center text-white hover:cursor-pointer">SF</p>
                    <p>Sales Flow CRM</p>
                </div>
                <div className="w-[20%] h-full flex items-center justify-between text-teal-700 max-sm:hidden">
                    <p className="hover:text-black hover:cursor-pointer">Features</p>
                    <p className="hover:text-black hover:cursor-pointer">Benefits</p>
                    <p className="hover:text-black hover:cursor-pointer">Testimonial</p>
                </div>
                <div className="w-[13%] h-full flex justify-between items-center">
                    <Link to="/signup"><button className="border border-gray-400 hover:border-0 hover:bg-green-400 hover:text-white px-3.5 py-2.5 rounded-2xl cursor-pointer">Sign Up</button></Link>
                    <Link to="/login"><button className="bg-sky-600 px-3.5 py-2.5 rounded-2xl text-white cursor-pointer hover:bg-sky-500">Login</button></Link>
                </div>
            </nav>
        </div>

        {/* main 1  */}
            <div className="h-[450px] w-[1000px] m-auto flex flex-col">
                <div className="m-auto mt-4 flex justify-center items-center px-3 py-1 rounded-2xl bg-gray-100">
                    <p className="animate-ping w-1 h-1 bg-green-600 rounded-full mr-2"></p>
                    <p>Now with AI-powered lead scoring</p>
                </div>
                <h1 className="text-[70px] font-bold text-center leading-[75px] ">Streamline Your Sales. <span className="bg-linear-to-r from-sky-500 to-green-500 bg-clip-text text-transparent">Close More Deals.</span></h1>
                <p className="text-[24px] w-[800px] m-auto text-center text-gray-500">The modern CRM that helps sales teams organize leads, track customer interactions, and visualize their pipeline—all in one intuitive platform.</p>
                <div className="m-auto flex ">
                    <Link to="/signup">
                    <button className="bg-sky-600 flex px-7 py-2 rounded-lg text-white items-center hover:bg-sky-500 cursor-pointer mr-5">
                        <p className="pr-1">Get Started</p>
                        <ArrowRight className="size-[20px] text-white" />
                    </button>
                    </Link>
                    <button className="flex px-7 py-2 rounded-lg items-center hover:bg-green-400 hover:text-white cursor-pointer border border-gray-400 hover:border-white">
                        <Play className="pr-1 size-[20px]" />
                        <p>Watch Demo</p>
                    </button>
                </div>
                <p className="text-center mb-[10px]">No credit card required • Free 14-day trial • Cancel anytime</p>
            </div>

            {/* main 2  */}
            <div className="border border-gray-300 w-[1100px] m-auto mt-[50px] h-[400px] mb-[100px] rounded-lg shadow-2xl">
                <div className="border-b border-gray-300 w-full h-[40px] flex items-center gap-2">
                    <div className="w-[17px] h-[17px] rounded-full ml-2 bg-red-300"></div>
                    <div className="w-[17px] h-[17px] rounded-full bg-green-300"></div>
                    <div className="w-[17px] h-[17px] rounded-full bg-blue-300"></div>
                </div>
                <div className="h-[100px] w-[95%] m-auto mt-8 flex justify-between items-center gap-4">
                    <div className="border border-gray-300 w-[33%] h-full rounded-lg flex flex-col justify-center p-3">
                        <p className="text-gray-500">Total Leads</p>
                        <div className="flex items-end">
                            <p className="text-[25px] font-bold">2,847</p>
                            <p className="text-green-500">+12.5%</p>
                        </div>
                    </div>
                    <div className="border border-gray-300 w-[33%] h-full rounded-lg flex flex-col justify-center p-3">
                        <p className="text-gray-500">Conversion Rate</p>
                        <div className="flex items-end">
                            <p className="text-[25px] font-bold">24.8%</p>
                            <p className="text-green-500">+3.2%</p>
                        </div>
                    </div>
                    <div className="border border-gray-300 w-[33%] h-full rounded-lg flex flex-col justify-center p-3">
                        <p className="text-gray-500">Revenue</p>
                        <div className="flex items-end">
                            <p className="text-[25px] font-bold">$847K</p>
                            <p className="text-green-500">+18.7%</p>
                        </div>
                    </div>
                </div>
                <AnimatedBars/>
            </div>
            {/* main 3  */}
            <p className="w-[600px] m-auto text-[30px] text-center font-bold mt-16">Everything You Need to <span className="bg-linear-to-r from-sky-500 to-green-500 bg-clip-text text-transparent">Close More Deals</span></p>
            <p className="text-center text-[15px] mt-5 mb-14 text-gray-500">Powerful features designed for modern sales teams. Built to scale from startup to enterprise.</p>

            <div className="w-[1100px] m-auto mb-14 flex justify-center flex-wrap gap-2">
                <div className="border border-gray-300 w-[49%] flex flex-col items-start p-5 rounded-lg">
                    <div className="bg-gray-200 p-3 rounded-lg">
                        <Target className="text-blue-500" />
                    </div>
                    <p className="font-semibold text-[20px] mt-5 mb-5">Lead Management & Scoring</p>
                    <p className="text-gray-500">Capture, organize, and prioritize leads with intelligent scoring. Track every interaction and never miss a follow-up opportunity.</p>
                </div>
                <div className="border border-gray-300 w-[49%] flex flex-col items-start p-5 rounded-lg">
                    <div className="bg-gray-200 p-3 rounded-lg">
                        <ChartColumn className="text-blue-500" />
                    </div>
                    <p className="font-semibold text-[20px] mt-5 mb-5">Pipeline Visualization</p>
                    <p className="text-gray-500">Get real-time insights into your sales pipeline with intuitive dashboards. Track conversion rates, deal stages, and team performance at a glance.</p>
                </div>
                <div className="border border-gray-300 w-[49%] flex flex-col items-start p-5 rounded-lg">
                    <div className="bg-gray-200 p-3 rounded-lg">
                        <Mail className="text-blue-500" />
                    </div>
                    <p className="font-semibold text-[20px] mt-5 mb-5">Email & SMS Integration</p>
                    <p className="text-gray-500">Connect Gmail, Outlook, and Twilio for seamless communication tracking. See every email and message in one unified timeline.</p>
                </div>
                <div className="border border-gray-300 w-[49%] flex flex-col items-start p-5 rounded-lg">
                    <div className="bg-gray-200 p-3 rounded-lg">
                        <Users className="text-blue-500" />
                    </div>
                    <p className="font-semibold text-[20px] mt-5 mb-5">Team Collaboration</p>
                    <p className="text-gray-500">Role-based access, document sharing, and team performance tracking. Empower your entire sales organization to work together.</p>
                </div>
            </div>
        </>
    )
}
export default LandingPage;