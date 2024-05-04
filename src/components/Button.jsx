import clsx from "clsx";


const variants = {
  primary: "bg-indigo-600 active:bg-indigo-700 text-white p-2 rounded",
  danger: "bg-red-500 active:bg-red-600 text-white p-2 rounded",
};


export const Button = ({ className, variant, ...otherProps }) => (
  <button className={clsx(variants[variant], className)} {...otherProps} />
);
