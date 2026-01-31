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
        <input
          placeholder="Search leads..."
          style={{ padding: "8px", width: "250px" }}
        />
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
    </div>
  );
};

export default LeadsData;