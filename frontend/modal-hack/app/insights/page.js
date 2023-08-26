'use client'
import InsightsWindow from '../components/InsightsWindow';

/*
export const getServerSideProps = async () => {
  console.log("BEING CALLED");
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  return { props: { repo } }
}
*/

export default function Insights({data}) {
  return (
    <InsightsWindow data={data} />
  );
}