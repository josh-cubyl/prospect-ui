import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { SendIcon, TimerIcon, TrashIcon } from "lucide-react";
import { EmailRepository } from "@/api/repositories/email.respository";
import { z } from "zod";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { updateEmail } from "@/api/endpoints/email/update-email";
import { approveEmail } from "@/api/endpoints/email/approve-email";
import { denyEmail } from "@/api/endpoints/email/deny-email";

type Props = {
  email: EmailRepository;
};

const formSchema = z.object({
  emailAddress: z.string().email(),
  subject: z.string(),
  content: z.string(),
});

export default function EmailEditor({ email }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: email.emailAddress,
      subject: email.subject,
      content: email.content,
    },
  });

  // Status states: "unsaved", "saving", "saved"
  const [status, setStatus] = useState<"unsaved" | "saving" | "saved">("saved");

  // Keep track of last saved values so we know if anything has changed
  const [lastSavedValues, setLastSavedValues] = useState(form.getValues());

  // Prevent editing if email is already approved or denied
  const canEdit = email.isApproved === false && email.isDenied === false;

  // Mutations
  const { mutate } = useMutation({
    mutationFn: updateEmail,
    onMutate: () => {
      setStatus("saving");
    },
    onSuccess: () => {
      setStatus("saved");
      // Update last saved values to current values
      setLastSavedValues(form.getValues());
    },
  });

  const { mutate: approveMutate, isPending: isPendingApprove } = useMutation({
    mutationFn: approveEmail,
  });

  const { mutate: denyMutate, isPending: isPendingDeny } = useMutation({
    mutationFn: denyEmail,
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Compare current values to lastSavedValues
    const currentValues = form.getValues();

    const hasChanges = Object.keys(currentValues).some((key) => {
      const k = key as keyof typeof currentValues;
      return currentValues[k] !== lastSavedValues[k];
    });

    // Only mutate if something has changed
    if (hasChanges && canEdit) {
      const { resourceId } = email;
      mutate({ resourceId, ...data });
    }
  };

  const handleApprove = (e: FormEvent) => {
    e.preventDefault();
    approveMutate(email.resourceId);
  };

  const handleDeny = (e: FormEvent) => {
    e.preventDefault();
    denyMutate(email.resourceId);
  };

  const handleRestoreOriginal = (e: React.MouseEvent) => {
    e.preventDefault();
    form.setValue("content", email.content);
    // If we restore to original which is presumably the last saved state, it should now be considered "unsaved"
    // since we may have changed something before. If restoring makes it identical to lastSavedValues, we should check:
    const currentValues = form.getValues();
    const identicalToLastSaved = Object.keys(currentValues).every((key) => {
      const k = key as keyof typeof currentValues;
      return currentValues[k] === lastSavedValues[k];
    });
    setStatus(identicalToLastSaved ? "saved" : "unsaved");
  };

  // ---- Auto-save logic ----
  const watchFields = form.watch();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentValues = form.getValues();
    const hasChanges = Object.keys(currentValues).some((key) => {
      const k = key as keyof typeof currentValues;
      return currentValues[k] !== lastSavedValues[k];
    });

    // If fields changed and not currently saving, mark as unsaved if there are actually changes
    if (hasChanges && status !== "saving") {
      setStatus("unsaved");
    } else if (!hasChanges && status !== "saving") {
      // If no changes and not saving, then it's saved
      setStatus("saved");
    }

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer for 5 seconds after last change
    timerRef.current = setTimeout(() => {
      // If no changes for 5 seconds, submit automatically
      form.handleSubmit(handleSubmit)();
    }, 5000);

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchFields]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="mb-4">
          <CardContent className="px-2 gap-2 pt-2 flex flex-col">
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <Input
                    className="rounded border-none focus-visible:ring-none focus-visible:ring-0 focus-visible:outline-none"
                    placeholder="Email Address"
                    {...field}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <Input
                    className="rounded border-none focus-visible:ring-none focus-visible:ring-0 focus-visible:outline-none"
                    placeholder="Subject"
                    {...field}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <textarea
                    className="p-4 h-[500px] w-full"
                    {...field}
                    placeholder="Content"
                  >
                    {email.content}
                  </textarea>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="px-4 flex justify-between items-center gap-4">
            <div className="text-muted-foreground text-xs flex gap-1 items-center">
              <TimerIcon className="w-4 h-4" />
              {status === "unsaved" && "Unsaved"}
              {status === "saving" && "Saving..."}
              {status === "saved" && "Saved"}
            </div>
            <div className="flex items-start gap-4">
              <Button
                variant="ghost"
                onClick={handleRestoreOriginal}
                disabled={!canEdit}
              >
                Restore Original
                <TimerIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive-outline"
                onClick={handleDeny}
                disabled={isPendingDeny || !canEdit}
              >
                Deny
                <TrashIcon className="w-4 h-4" />
              </Button>
              <div className="flex flex-col gap-1">
                <Button
                  variant="default"
                  className="group"
                  disabled={isPendingApprove || !canEdit}
                  onClick={handleApprove}
                >
                  Schedule Send
                  <SendIcon className="w-4 h-4 group-hover:rotate-45 transition-all" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
