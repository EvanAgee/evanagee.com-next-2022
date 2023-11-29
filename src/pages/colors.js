import React from "react";

const classes = [
  "bg-primary-50",
  "bg-primary-100",
  "bg-primary-200",
  "bg-primary-300",
  "bg-primary-400",
  "bg-primary-500",
  "bg-primary-600",
  "bg-primary-700",
  "bg-primary-800",
  "bg-primary-900",
  "bg-secondary-50",
  "bg-secondary-100",
  "bg-secondary-200",
  "bg-secondary-300",
  "bg-secondary-400",
  "bg-secondary-500",
  "bg-secondary-600",
  "bg-secondary-700",
  "bg-secondary-800",
  "bg-secondary-900",
];

function Colors() {
  return (
    <>
      {["primary", "secondary"].map((color) => (
        <div className="flex">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div className={`bg-${color}-${shade} flex-grow aspect-square`}>
              {color} {shade}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default Colors;
