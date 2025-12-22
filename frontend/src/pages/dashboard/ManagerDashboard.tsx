import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface SalesData {
  month: string;
  sales: number;
}

interface PipelineData {
  stage: string;
  count: number;
}

const data: SalesData[] = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 600 },
  { month: "Mar", sales: 800 },
  { month: "Apr", sales: 700 },
];

const pipelineData: PipelineData[] = [
  { stage: "Qualified", count: 10 },
  { stage: "Proposal", count: 7 },
  { stage: "Negotiation", count: 5 },
  { stage: "Won", count: 3 },
];

export default function ManagerDashboard() {
  return (
    <div>
      <h4>Manager Dashboard</h4>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#007bff" />
      </LineChart>
      <BarChart width={500} height={300} data={pipelineData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stage" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
}