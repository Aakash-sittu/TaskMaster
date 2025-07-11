"use client";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Task } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.boolean().default(false),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

interface TaskDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSave: (task: Partial<Task>) => void;
  task?: Task | null;
}

export function TaskDialog({ isOpen, setIsOpen, onSave, task }: TaskDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: false,
      priority: "medium",
    },
  });
  
  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description || "",
        status: typeof task.status === "boolean" ? task.status : task.status === "completed",
        priority: task.priority || "medium",
      });
    } else {
      form.reset({
        title: "",
        description: "",
        status: false,
        priority: "medium",
      });
    }
  }, [task, form, isOpen]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave({
      ...values,
      description: values.description || '',
      status: values.status ? "completed" : "pending",
      priority: values.priority,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Create Task"}</DialogTitle>
          <DialogDescription>
            {task ? "Update the details of your task." : "Add a new task to your list."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter task description (optional)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Set the priority level for this task
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Mark as completed
                    </FormLabel>
                    <FormDescription>
                      Check this if the task is already completed
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{task ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
