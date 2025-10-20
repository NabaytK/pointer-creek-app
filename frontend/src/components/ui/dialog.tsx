import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef((props: any, ref: any) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className="fixed inset-0 z-50 bg-black/80"
    {...props}
  />
));

const DialogContent = React.forwardRef((props: any, ref: any) => {
  const { children, ...rest } = props;
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg rounded-lg"
        {...rest}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

const DialogHeader = (props: any) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left" {...props} />
);

const DialogTitle = React.forwardRef((props: any, ref: any) => (
  <DialogPrimitive.Title
    ref={ref}
    className="text-lg font-semibold leading-none tracking-tight"
    {...props}
  />
));

const DialogDescription = React.forwardRef((props: any, ref: any) => (
  <DialogPrimitive.Description ref={ref} className="text-sm text-gray-500" {...props} />
));

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
