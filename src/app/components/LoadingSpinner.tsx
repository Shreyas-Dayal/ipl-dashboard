// LoadingSpinner.tsx

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-96" role="status" aria-label="Loading cricket data">
      <svg
        className="w-36 h-36 animate-spin text-yellow-600" // Use a wood-like color
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Group the stumps */}
        <g>
          {/* Middle Stump */}
          <rect x="11" y="4" width="2" height="16" rx="1" />
          {/* Left Stump */}
          <rect x="7" y="4" width="2" height="16" rx="1" />
          {/* Right Stump */}
          <rect x="15" y="4" width="2" height="16" rx="1" />
           {/* Optional: Bails (simple lines) */}
          <line x1="8.5" y1="4" x2="11.5" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="11.5" y1="4" x2="15.5" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      </svg>
    </div>
  );
};

export default LoadingSpinner;