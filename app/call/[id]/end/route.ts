import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("live_help_sessions")
    .update({
      status: "completed",
      ended_at: now,
    })
    .eq("id", id)
    .eq("status", "connected")
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    session: data,
  });
}