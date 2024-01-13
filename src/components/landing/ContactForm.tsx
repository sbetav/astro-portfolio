import type { FC, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useState, forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "../../pages/api/contact";

interface ContactFormProps {}

const ContactForm: FC<ContactFormProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSend = handleSubmit(async (data) => {
    try {
      setLoading(true);
      setError(false);
      setSuccess(false);
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setSuccess(true);
      reset();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (errors.name) {
      setSuccess(false);
      setError(false);
    }
  }, [errors]);

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

      {success && <p className="text-xs text-green-500">Message sent!</p>}
      {error && (
        <p className="text-xs text-red-500">
          Something went wrong, please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 px-4 py-2 text-center bg-black text-white border-[1.5px] font-semibold border-black rounded hover:bg-white hover:text-black transition-all disabled:pointer-events-none disabled:bg-white disabled:text-black"
      >
        {loading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=" animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        )}
        Submit
      </button>
    </form>
  );
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
