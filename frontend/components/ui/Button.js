export default function Button({ children, variant = 'primary', className = '', ...props }) {
    const variants = {
        primary: 'btn-gradient',
        outline: 'border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 px-6 py-3 rounded-2xl font-semibold transition-all duration-300',
        ghost: 'text-gray-300 hover:text-white hover:bg-white/10 px-6 py-3 rounded-2xl transition-all duration-300',
    }

    return (
        <button className={`${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    )
}
