export default function Input({ label, error, ...props }) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    {label}
                </label>
            )}
            <input
                className="w-full glass glass-hover px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                {...props}
            />
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
    )
}
