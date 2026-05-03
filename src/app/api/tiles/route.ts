import { NextResponse } from "next/server";
import { getAllTiles, getFeaturedTiles } from "@/lib/tiles";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");
  const search = searchParams.get("search");

  if (featured === "true") {
    return NextResponse.json(getFeaturedTiles());
  }

  if (search) {
    const { searchTiles } = await import("@/lib/tiles");
    return NextResponse.json(searchTiles(search));
  }

  return NextResponse.json(getAllTiles());
}
