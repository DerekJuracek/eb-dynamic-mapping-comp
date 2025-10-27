import { NextResponse } from "next/server";
import { pool } from "@/lib/db"; // if you're using Postgres

export async function POST(req: Request) {
  try {
    // 1️⃣ Parse the JSON body from the request
    const { uniqueid } = await req.json();

    console.log("Received uniqueid:", uniqueid);

    // 2️⃣ Query your DB or handle logic
    const { rows } = await pool.query(
      "SELECT title, geom, place_id, url, show, zoom, lang, display_type FROM update_map_location WHERE id = $1",
      [uniqueid]
    );

    // 3️⃣ Return the data (or an error if not found)
    if (rows.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err: unknown) {
    console.error("Error in getLocation:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

