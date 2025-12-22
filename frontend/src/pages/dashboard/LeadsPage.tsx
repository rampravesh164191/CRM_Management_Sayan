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

const LeadsPage = () => {
  const [message, setMessage] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLeads = async () => {
    setLoading(true);
    setError("");
    const userId = localStorage.getItem("_id");

    try {
      const res = await fetch(`${baseURL}/api/users/${userId}/lead-count`, {
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
      <h2>My Leads</h2>

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
          <button onClick={hideDetail}>Close</button>
        </div>
      )}

      {/* Leads Table */}
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
              <td>
                <button onClick={() => viewDetail(lead._id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsPage;