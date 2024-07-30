import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Clone the request body before reading it
  const clonedRequest = request.clone();

  const apiKey = process.env.GRAPHQL_API_KEY;
  const apiUrl = process.env.GRAPHQL_API_URL;
  const isDevelopment = process.env.NEXT_PUBLIC_NETWORK === "development";
  console.log(apiUrl);
  console.log(apiKey);

  if (!apiUrl) {
    return NextResponse.json(
      { error: "API URL not configured" },
      { status: 500 }
    );
  }

  const body = await clonedRequest.json();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Only add the API key if it exists and we're not in development mode
  if (apiKey && !isDevelopment) {
    headers["X-API-Key"] = apiKey;
  }

  console.log(isDevelopment);
  console.log(headers);

  const response = await fetch(apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  console.log(response);

  const data = await response.json();

  return NextResponse.json(data);
}
