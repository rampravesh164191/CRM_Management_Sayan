// src/pages/LeadsPage.tsx
import { useEffect, useState } from "react";
import { baseURL } from "../../utils/constants";
import "./leadsPage.css";

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

interface LeadsResponse {
  message?: string;
  leads?: Lead[];
}

interface LeadDetailResponse {
  message?: string;
  lead: Lead[];
}

const LeadsData = () => {
  const [message, setMessage] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //just for controlling form visibility
  const [isVisible, setIsVisible] = useState<string | null>(null);

  //generate lead part
  const [newLead, setNewLead] = useState<Omit<Lead, "_id" | "createdBy" | "assignedTo">>({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    location: "",
    dealValue: 0,
    stage: "",
    leadScore: 0,
    source: "",
  });

  //let's say if i want something to change even after generation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLead({ ...newLead, [e.target.name]: e.target.value });
  };

  //changes made after auto lead generation
  const fillWithGeneratedLead = () => {
    setNewLead(generateLead());
  };

  const submitNewLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken")
      const res = await fetch(`${baseURL}/api/addlead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newLead),
      });
      const data = await res.json();
      setMessage(data.message || "Lead added");
      // setIsVisible(null);
      getLeads(); // refresh table
    } catch (err) {
      setError("Failed to add lead");
    }
  };

  //auto lead genetator
  function generateLead(): Omit<Lead, "_id" | "createdBy" | "assignedTo"> {
    const names = ["Lucas Martinez", "Hiroshi Tanaka", "Fatima Al-Sayed", "Elena Petrova", "Kwame Mensah", "Isabella Rossi",
      "Diego Fernandez", "Mei Ling Chen", "Omar Hassan", "Sophia Müller", "Jean Dupont", "Aisha Bello", "Carlos Silva", "Nora Johansson",
      "Rajesh Iyer", "Leila Haddad", "Tomás Oliveira", "Anna Kowalska", "Mohammed Rahman", "Chloe Anderson"];
    const industries = ["Retail", "IT Services", "Manufacturing", "Freelancer", "Creative Agency"];
    const locations = ["Delhi", "Mumbai", "Ahmedabad", "Bangalore", "Chennai"];
    const sources = ["website", "linkedin", "referral", "event", "cold_call"];
    const stages = ["new", "contacted", "qualified", "proposal", "negotiation", "closed"];

    const name = names[Math.floor(Math.random() * names.length)];
    const email = name.toLowerCase().replace(" ", ".") + "@gmail.com";
    const phone = "9" + Math.floor(100000000 + Math.random() * 900000000).toString();

    return {
      name,
      email,
      phone,
      company: "Demo Company",
      industry: industries[Math.floor(Math.random() * industries.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      dealValue: Math.floor(Math.random() * 200000),
      stage: stages[Math.floor(Math.random() * stages.length)],
      leadScore: Math.floor(Math.random() * 100),
      source: sources[Math.floor(Math.random() * sources.length)],
    };
  }
  //generate lead part end
  const getLeads = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${baseURL}/api/leads`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch leads");
      }
      const data: LeadsResponse = await res.json();
      console.log("API data :", data);

      setLeads(data.leads ?? []);
      setMessage(data.message ?? "Fetched leads");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

  const viewDetail = async (id: string) => {
    try {
      const res = await fetch(`${baseURL}/api/leads/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch lead details");
      }

      const data: LeadDetailResponse = await res.json();
      console.log(data.lead);

      setViewLead(data.lead[0] ?? null);
      setShowDetail(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Could not load lead details");
      }
    }
  };

  const hideDetail = () => {
    setShowDetail(false);
    setViewLead(null);
  };

  return (
    <div>
      <h2>All Leads</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && !error && <p>{message}</p>}

      {/* Search & Filter */}
      <div style={{ margin: "16px 0" }}>
        {/* <input
          placeholder="Search leads..."
          style={{ padding: "8px", width: "250px" }}
        /> */}
        <span>Auto Generate Lead feature also available : </span>
        <button
        className="border flex flex-row items-center justify-center px-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 active:bg-green-800 outline-2 outline-offset-2 active:outline-green-500"
        onClick={()=>setIsVisible("visible")}
        ><span className="text-[20px]">+</span>Add leads</button>
      </div>

      {/* Lead Detail Modal/Box */}
      {showDetail && viewLead && (
        <div id="viewBox" className="viewBox">
          <div key={viewLead._id}>
            <h4>Name: {viewLead.name}</h4>
            <h4>Email: {viewLead.email}</h4>
            <h4>Phone: {viewLead.phone}</h4>
            <h4>Company: {viewLead.company}</h4>
            <h4>Industry: {viewLead.industry}</h4>
            <h4>Location: {viewLead.location}</h4>
            <h4>Deal Value: {viewLead.dealValue}</h4>
            <h4>Stage: {viewLead.stage}</h4>
            <h4>Lead Score: {viewLead.leadScore}</h4>
            <h4>Source: {viewLead.source}</h4>
            <h4>Created By: {viewLead.createdBy}</h4>
            <h4>Assigned To: {viewLead.assignedTo}</h4>
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-3 py-1 text-white rounded-full" onClick={hideDetail}>X</button>
        </div>
      )}

      {/* Leads Table */}
      <table className="border" width="100%" border={1} cellPadding={8}>
        <thead className="border">
          <tr>
            <th className="border p-1">Name</th>
            <th className="border p-1">Email</th>
            <th className="border p-1">Phone</th>
            <th className="border p-1">Deal Value</th>
            <th className="border p-1">Stage</th>
            <th className="border p-1">View</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td className="border p-1 text-center">{lead.name}</td>
              <td className="border p-1 text-center">{lead.email}</td>
              <td className="border p-1 text-center">{lead.phone}</td>
              <td className="border p-1 text-center">{lead.dealValue}</td>
              <td className="border p-1 text-center">{lead.stage}</td>
              <td className="border p-1 text-center bg-blue-500 hover:bg-blue-600 cursor-pointer">
                <button className="" onClick={() => viewDetail(lead._id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* generate lead  */}
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-[400px]">
          <span 
          onClick={()=>setIsVisible(null)}
          className="border absolute right-5 inline-block px-3 rounded-full bg-red-500 text-white hover:bg-red-600 cursor-pointer">X</span>
          <h3 className="text-center my-2">Add New Lead</h3>
          <form onSubmit={submitNewLead}>
            <input
            className="border w-full px-2 py-1 rounded-lg my-1" 
            name="name" value={newLead.name} onChange={handleChange} placeholder="Name" required />
            <input 
            className="border w-full px-2 py-1 rounded-lg my-1" 
            name="email" value={newLead.email} onChange={handleChange} placeholder="Email" required />
            <input 
            className="border w-full px-2 py-1 rounded-lg my-1" 
            name="phone" value={newLead.phone} onChange={handleChange} placeholder="Phone" required />
            <input 
            className="border w-full px-2 py-1 rounded-lg my-1" 
            name="company" value={newLead.company} onChange={handleChange} placeholder="Company" required />
            <input 
            className="border w-full px-2 py-1 rounded-lg my-1" 
            name="industry" value={newLead.industry} onChange={handleChange} placeholder="Industry" required />
            <input 
            className="border w-full px-2 py-1 rounded-lg my-1" 
            name="location" value={newLead.location} onChange={handleChange} placeholder="Location" required />
            <input 
            className="border w-full px-2 py-1 rounded-lg my-1" 
            name="dealValue" type="number" value={newLead.dealValue} onChange={handleChange} placeholder="Deal Value" required />
            <input 
            className="border w-full px-2 py-1 rounded-lg my-1" 
            name="stage" value={newLead.stage} onChange={handleChange} placeholder="Stage" required />
            <input 
            className="border w-full px-2 py-1 rounded-lg my-1" 
            name="leadScore" type="number" value={newLead.leadScore} onChange={handleChange} placeholder="Lead Score" required />
            <input 
            className="border w-full px-2 py-1 rounded-lg my-1" 
            name="source" value={newLead.source} onChange={handleChange} placeholder="Source" required />

            <div className="flex items-center justify-between my-1">
              <button className="border px-2 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white outline-2 active:bg-blue-800 active:outline-blue-500 active:outline-offset-2" type="button" onClick={fillWithGeneratedLead}>Generate Lead</button>
              <button
              // just giving any random string to run 
              onClick={()=>setIsVisible("visible")}
               className="border px-2 py-1 rounded-lg bg-green-500 active:bg-green-800 hover:bg-green-600 text-white outline-2 active:outline-green-500 active:outline-offset-2" type="submit">Submit Lead</button>
            </div>
          </form>
          {message != "lead added" ? (
                <h3 className="text-center my-2 text-red-500">{message}</h3>
            ) : (
                <h3 className="text-center my-2 text-green-500">{message}</h3>
            )}
        </div>
      </div>
      )}
    </div>
  );
};

export default LeadsData;