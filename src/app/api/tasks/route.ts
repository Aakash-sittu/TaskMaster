import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  
  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ tasks });
}

// Create a new task
export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const requestData = await request.json();
    const { title, description, priority, due_date } = requestData;
    
    // Validate required fields
    if (!title || title.trim() === '') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    
    // Create task data with forced 'pending' status
    const taskData = {
      user_id: session.user.id,
      title,
      description,
      status: 'pending',
      priority: priority || 'medium', // Make sure priority is included
      due_date: due_date || null
    };
    
    console.log('Creating task with data:', taskData);
    
    // Insert the task
    const { data: task, error } = await supabase
      .from('tasks')
      .insert(taskData)
      .select()
      .single();
    
    if (error) {
      console.error('Task creation error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    console.log('Task created:', task);
    
    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Example client-side function to toggle task status
// async function toggleTaskStatus(taskId) {
//   try {
//     const response = await fetch(`/api/tasks/${taskId}/toggle-status`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });

//     const data = await response.json();
    
//     if (!response.ok) {
//       throw new Error(data.error || 'Failed to toggle task status');
//     }
    
//     // Return the updated task with its new status
//     return data.task;
//   } catch (error) {
//     console.error('Error toggling task status:', error);
//     throw error;
//   }
// }

