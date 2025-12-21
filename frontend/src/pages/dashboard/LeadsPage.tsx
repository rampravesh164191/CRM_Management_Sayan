import { useEffect, useState } from "react";
import { baseURL } from "../../utils/constants";
import "./leadsPage.css"

//typescript ke samajhne ke liye
//bohot error show kr rha tha
interface Lead {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    industry: string;
    location: string;
    dealValue: number;
    stage: string;
    leadScore: number;
    source: string;
    createdBy: string;
    assignedTo: string;
}

// src/pages/LeadsPage.tsx
const LeadsPage = () => {
    const [message, setMessage] = useState("");
    const [leads, setLeads] = useState<Lead[]>([]);
    const [viewLead, setViewLead] = useState<Lead | null>(null);
    const getLeads = async () => {
        const userId = localStorage.getItem("_id");
        try {
            const res = await fetch(`${baseURL}/api/users/${userId}/lead-count`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            const data = await res.json();
            console.log("API data :", data);
            setLeads(data.leads || []);
            setMessage(data.message || "Fetched leads")

            //redirect
            // window.location.href = "/dashboard"
        } catch (err) {
            setMessage("Login Failed")
        }
    }
    useEffect(() => {
        getLeads();
    }, [])

    async function viewDetail(id: string) {
        const box = document.getElementById("viewBox");
        console.log(box); // MUST NOT be null
        // box.style.display = "block"; didn't worked
        if (box) box.style.display = "block";
        const res = await fetch(`${baseURL}/api/leads/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        const data = await res.json();
        console.log(data.lead);
        setViewLead(data.lead[0]);
    }
    function hideAndSeek() {
        const box = document.getElementById("viewBox");
        if (box) box.style.display = "none";
    }

    return (
        <div>
            <h2>My Leads</h2>
            {message && <p>{message}</p>}
            {/* Search & Filter */}
            <div style={{ margin: "16px 0" }}>
                <input
                    placeholder="Search leads..."
                    style={{ padding: "8px", width: "250px" }}
                />
            </div>

            {/* Leads Table */}
            {viewLead && (
                <div id="viewBox">
                    <div key={viewLead._id}>
                        <h4>Name : {viewLead.name}</h4>
                        <h4>Email : {viewLead.email}</h4>
                        <h4>Phone : {viewLead.phone}</h4>
                        <h4>Company : {viewLead.company}</h4>
                        <h4>Industry : {viewLead.industry}</h4>
                        <h4>Location : {viewLead.location}</h4>
                        <h4>Deal Value : {viewLead.dealValue}</h4>
                        <h4>Stage : {viewLead.stage}</h4>
                        <h4>Lead Score : {viewLead.leadScore}</h4>
                        <h4>Source : {viewLead.source}</h4>
                        <h4>Created By : {viewLead.createdBy}</h4>
                        <h4>Assigned TO : {viewLead.assignedTo}</h4>
                    </div>
                    <button onClick={hideAndSeek}>X</button>
                </div>
            )}
            <table width="100%" border={1} cellPadding={8}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Deal Value</th>
                        <th>Stage</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead._id}>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.phone}</td>
                            <td>{lead.dealValue}</td>
                            <td>{lead.stage}</td>
                            <td><button onClick={() => viewDetail(lead._id)}>view</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeadsPage;
