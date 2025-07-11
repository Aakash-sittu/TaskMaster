import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const taskId = params.id;
  const supabase = createRouteHandlerClient({ cookies });

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // First fetch the current task to get its status
    const { data: existingTask, error: fetchError } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", taskId)
      .eq("user_id", session.user.id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Toggle the status between 'completed' and 'pending'
    const newStatus =
      existingTask.status === "completed" ? "pending" : "completed";
    console.log(
      `Toggling task ${taskId} from ${existingTask.status} to ${newStatus}`
    );

    // Update the task with the new status
    const { data: updatedTask, error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", taskId)
      .eq("user_id", session.user.id)
      .select()
      .single();

    if (error) {
      console.error("Status update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
