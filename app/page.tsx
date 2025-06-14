import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h2>Home Page</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
