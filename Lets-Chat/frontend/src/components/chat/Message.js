import { format } from "timeago.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Message({ message, self }) {
  return (
    <li
      className={classNames(
        self !== message.sender ? "justify-start" : "justify-end",
        "flex mb-2" // spacing between messages
      )}
    >
      <div>
        <div
          className={classNames(
            self !== message.sender
              ? "text-gray-700 dark:text-gray-400 bg-white border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700"
              : "bg-blue-600 dark:bg-blue-500 text-white",
            // ✅ Add these utility classes:
            "relative px-4 py-2 rounded-lg shadow break-words whitespace-pre-wrap max-w-[80vw] sm:max-w-md"
          )}
        >
          <span className="block font-normal">{message.message}</span>
        </div>
        <span className="block text-xs mt-1 text-gray-500 dark:text-gray-400">
          {format(message.createdAt)}
        </span>
      </div>
    </li>
  );
}
