export default function Card({ children, className = '', hover = true }) {
    return (
        <div
            className={`glass rounded-2xl p-6 ${hover ? 'card-hover glass-hover' : ''
                } ${className}`}
        >
            {children}
        </div>
    )
}
