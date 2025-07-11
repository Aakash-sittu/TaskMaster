import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// Update a task
export async function PUT(
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
    // Get the updated task data from request body
    const taskData = await request.json();

    console.log("Updating task in API:", taskId, "with data:", taskData);

    // Check if the task exists and belongs to this user
    const { data: existingTask, error: checkError } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", taskId)
      .eq("user_id", session.user.id)
      .single();

    if (checkError) {
      console.error("Error finding task:", checkError);
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Prepare update data
    const updateData = {
      title: taskData.title || existingTask.title,
      description: taskData.description,
      status: taskData.status || existingTask.status,
      priority: taskData.priority || existingTask.priority,
      // Don't update created_at or other fields
    };

    console.log("Update data being sent to database:", updateData);

    // Update the task
    const { data: updatedTask, error: updateError } = await supabase
      .from("tasks")
      .update(updateData)
      .eq("id", taskId)
      .select()
      .single();

    if (updateError) {
      console.error("Database update error:", updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    if (!updatedTask) {
      return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }

    console.log("Task updated successfully:", updatedTask);

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error("Unexpected error in task update:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Delete a task
export async function DELETE(
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

  // First check if the task belongs to the user
  const { data: existingTask, error: fetchError } = await supabase
    .from("tasks")
    .select("user_id")
    .eq("id", taskId)
    .single();

  if (fetchError) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  if (existingTask.user_id !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Delete the task
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
