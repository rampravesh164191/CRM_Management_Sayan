import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const pipelineData = [
  { stage: 'Qualified', count: 10 },
  { stage: 'Proposal', count: 7 },
  { stage: 'Negotiation', count: 5 },
  { stage: 'Won', count: 3 },
];

export default function SalesPipelineChart() {
  return (
    <BarChart width={500} height={300} data={pipelineData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="stage" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}

// --------------------------
/*
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const pipelineData = [
  { stage: 'Qualified', count: 10 },
  { stage: 'Proposal', count: 7 },
  { stage: 'Negotiation', count: 5 },
  { stage: 'Won', count: 3 },
];

export default function SalesPipelineChart() {
  return (
    <BarChart width={500} height={300} data={pipelineData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="stage" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}
  */