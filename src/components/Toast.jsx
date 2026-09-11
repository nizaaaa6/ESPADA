import { useEffect, useState } from "react";

export default function Toast({ message, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t1 = requestAnimationFrame(() => setShow(true));
    const t2 = setTimeout(() => setShow(false), 2600);
    const t3 = setTimeout(onClose, 2900);
    return () => {
      cancelAnimationFrame(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col gap-3 w-[min(20rem,calc(100vw-3rem))]">
      <div
        className={`toast px-4 py-3 rounded-lg text-sm font-medium shadow-lg bg-gray-900 border border-gray-700 text-white ${show ? "toast--show" : ""}`}
      >
        {message}
      </div>
    </div>
  );
}
