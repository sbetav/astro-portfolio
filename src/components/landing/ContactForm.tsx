import type { FC, JSX } from "preact/compat";
import * as React from "preact/compat";

interface ContactFormProps {}

const ContactForm: FC<ContactFormProps> = ({}) => {

  const handleSend = () => {};

  return (
    <form onSubmit={handleSend} class="flex flex-col gap-5 w-full">
      <Input placeholder="Your name" />
      <Input placeholder="Your email" />
      <TextArea placeholder="Leave a message" />

      <button
        type="submit"
        class="px-4 py-2 text-center bg-black text-white border-[1.5px] font-semibold border-black rounded hover:bg-white hover:text-black transition-all"
      >
        Submit
      </button>
    </form>
  );
};

export interface InputProps extends JSX.HTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, ...props }, ref) => {
    return (
      <div class="relative h-11 w-full min-w-[200px]">
        <input
          type={type}
          class="peer h-full w-full border-b border-gray-600 bg-transparent pt-4 pb-4 text-lg outline outline-0 transition-all"
          ref={ref}
          id={props.placeholder}
          {...props}
        />
        <label
          for={props.placeholder}
          class="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none !overflow-visible truncate leading-tight transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-focus:after:scale-x-100"
        >
          <span class="sr-only">{props.placeholder}</span>
        </label>
      </div>
    );
  }
);

export interface TextareaProps
  extends JSX.HTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ type, ...props }, ref) => {
    return (
      <div class="relative h-11 w-full min-w-[200px] min-h-[100px]">
        <textarea
          class="peer h-full w-full border-b border-gray-600 bg-transparent pt-4 pb-4 text-lg outline outline-0 transition-all resize-none"
          ref={ref}
          id={props.placeholder}
          {...props}
        />
        <label
          for={props.placeholder}
          class="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none !overflow-visible truncate leading-tight transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-focus:after:scale-x-100"
        >
          <span class="sr-only">{props.placeholder}</span>
        </label>
      </div>
    );
  }
);

export default ContactForm;
