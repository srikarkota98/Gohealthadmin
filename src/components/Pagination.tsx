interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const progress =
    totalPages > 0 ? Math.min((page / totalPages) * 100, 100) : 0;

  return (
    <div className="w-full flex flex-col items-center gap-2">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:text-black"
        >
          Previous
        </button>

        <span className="px-4 py-2 border rounded-md text-sm font-medium">
          {page}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:text-black"
        >
          Next
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
