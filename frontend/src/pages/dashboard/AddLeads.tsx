import { useState } from "react";
import { baseURL } from "../../utils/constants";

interface AddLeadsResponse {
    message?: string;
    accessToken: string;
    refreshToken: string;
}

function AddLeads() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [industry, setIndustry] = useState("");
    const [location, setLocation] = useState("");
    const [dealValue, setDealValue] = useState("");
    const [stage, setStage] = useState("");
    const [leadScore, setLeadScore] = useState("");
    const [source, setSource] = useState("");
    // const [createdBy, setCreatedBy] = useState("");
    // const [assignedTo, setAssignedTo] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userObj = { name, email, phone, company, industry, location, dealValue, stage, leadScore, source };

        try {
            const token = localStorage.getItem("accessToken")
            const res = await fetch(`${baseURL}/api/addlead`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(userObj),
            });
            const data: AddLeadsResponse = await res.json();
            setMessage(data.message || "Success");
            //saving last lead to get quick access
            localStorage.setItem("userObj", JSON.stringify(userObj));
        } catch (error) {
            setMessage("Failed Adding Lead");
            console.error(error);
        }
    };

    return (
        <div className="border w-[400px] p-3 rounded-lg">
            <h1 className="text-[30px] text-center mb-2 font-extrabold bg-linear-to-r from-red-500 to-blue-500 bg-clip-text text-transparent font-serif">Add Leads</h1>
            <form onSubmit={handleSubmit}>
                <input
                    id="i1"
                    className="border w-full p-2 mb-2 rounded-lg"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    id="i2"
                    className="border w-full p-2 mb-2 rounded-lg"
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    id="i3"
                    className="border w-full p-2 mb-2 rounded-lg"
                    type="text"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    id="i4"
                    className="border w-full p-2 mb-2 rounded-lg"
                    type="text"
                    placeholder="Enter company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <input
                    id="i5"
                    className="border w-full p-2 mb-2 rounded-lg"
                    type="text"
                    placeholder="Enter industry name"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                />
                <input
                    id="i6"
                    className="border w-full p-2 mb-2 rounded-lg"
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    id="i7"
                    className="border w-full p-2 mb-2 rounded-lg"
                    type="text"
                    placeholder="Enter deal value"
                    value={dealValue}
                    onChange={(e) => setDealValue(Number(e.target.value))}
                />
                <input
                    id="i8"
                    className="border w-full p-2 mb-2 rounded-lg"
                    type="text"
                    placeholder="Enter stage"
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                />
                <input
                    id="i9"
                    className="border w-full p-2 mb-2 rounded-lg"
                    type="text"
                    placeholder="Enter lead score"
                    value={leadScore}
                    onChange={(e) => setLeadScore(Number(e.target.value))}
                />
                <input
                    id="i10"
                    className="border w-full p-2 mb-2 rounded-lg"
                    type="text"
                    placeholder="Enter source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                />
                <input
                    className="border w-full h-[50px] rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                    type="submit"
                    value="Add Lead"
                />
                
            </form>
            {message != "lead added" ? (
                <h3 className="text-center my-2 text-red-500">{message}</h3>
            ) : (
                <h3 className="text-center my-2 text-green-500">{message}</h3>
            )}
        </div>
    )

}
export default AddLeads