import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";


// Save a new template
export async function POST(request: any) {
  const context = await request.json(); // Get context from the request body
  const templateID = uuidv4(); // Generate a unique ID
  const filePath = path.join(process.cwd(), "templates", `${templateID}.json`); // Path to save the file

  const baseUrl = 'localhost:30000'
  // Save the context with the generated templateID
  await writeFile(filePath, JSON.stringify({ templateID, ...context }, null, 2));

  return NextResponse.json({ url: `${baseUrl}/${templateID}`, templateID });
}

// Fetch an existing template by templateID

// Fetch an existing template by templateID
export async function GET(request:any) {
  try {
    const { searchParams } = new URL(request.url);
    const templateID = searchParams.get("templateID"); // Extract templateID from query parameters

    if (!templateID) {
      return NextResponse.json(
        { error: "templateID is required" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "templates", `${templateID}.json`); // Construct the file path

    // Read the template file
    const fileData = await readFile(filePath, "utf-8");

    // Parse the JSON data
    const templateData = JSON.parse(fileData);
    console.log(templateData)
    return NextResponse.json(templateData); // Return the template data
  } catch (error) {
    console.error("Error fetching template:", error);

    // Return a 404 response if the template is not found
    return NextResponse.json(
      { error: "Template not found or an error occurred" },
      { status: 404 }
    );
  }
}

