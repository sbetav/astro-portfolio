import type { FC } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface ContactFormProps {}

const formSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(1, "Please enter a message"),
});

const ContactForm: FC<ContactFormProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSend = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <form onSubmit={handleSend} className="flex flex-col gap-4 w-full">
      <div>
        <Input placeholder="Your name" {...register("name")} />
        {errors.name && (
          <p className="text-red-400 text-xs mt-2">
            {errors.name.message as string}
          </p>
        )}
      </div>
      <div>
        <Input placeholder="Your email" {...register("email")} />
        {errors.email && (
          <p className="text-red-400 text-xs mt-2">
            {errors.email.message as string}
          </p>
        )}
      </div>
      <div>
        <TextArea placeholder="Leave a message" {...register("message")} />
        {errors.message && (
          <p className="text-red-400 text-xs mt-2">
            {errors.message.message as string}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 text-center bg-black text-white border-[1.5px] font-semibold border-black rounded hover:bg-white hover:text-black transition-all"
      >
        Submit
      </button>
    </form>
  );
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, ...props }, ref) => {
    return (
      <div className="relative h-11 w-full min-w-[200px]">
        <input
          type={type}
          className="peer h-full w-full border-b border-gray-600 bg-transparent pt-4 pb-4 text-lg outline outline-0 transition-all"
          ref={ref}
          id={props.placeholder}
          {...props}
        />
        <label
          htmlFor={props.placeholder}
          className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none !overflow-visible truncate leading-tight transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-focus:after:scale-x-100"
        >
          <span className="sr-only">{props.placeholder}</span>
        </label>
      </div>
    );
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ ...props }, ref) => {
    return (
      <div className="relative h-11 w-full min-w-[200px] min-h-[100px]">
        <textarea
          className="peer h-full w-full border-b border-gray-600 bg-transparent pt-4 pb-4 text-lg outline outline-0 transition-all resize-none"
          ref={ref}
          id={props.placeholder}
          {...props}
        />
        <label
          htmlFor={props.placeholder}
          className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none !overflow-visible truncate leading-tight transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-focus:after:scale-x-100"
        >
          <span className="sr-only">{props.placeholder}</span>
        </label>
      </div>
    );
  }
);

export default ContactForm;
