export default function Page({ params }: { params: { id: string } }) {
  return <div>Car ID: {params.id}</div>;
}
