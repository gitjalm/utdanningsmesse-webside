export async function GET() {
  const response = await fetch("https://external-api.com/example");

  return Response.json(await response.json());
}

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch("https://external-api.com/example", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return Response.json(await response.json(), {
    status: response.status,
  });
}
