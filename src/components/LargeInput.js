


/**
 * Input styles from flowbite.com
 * https://flowbite.com/docs/components/forms/
 */
const LargeInput = ({ value, setValue, title, disabled }) => {
    const bgClass = disabled ? 'bg-slate-300' : 'bg-gray-50'
    const inputClasses = `block w-full p-4 text-gray-900 border border-gray-300 rounded-l-lg ${bgClass} sm:text-md focus:ring-blue-500 focus:border-blue-500`;
    return (
        <div className="mb-2 w-full max-w-xl">
            <input disabled={disabled} placeholder={title} value={value} onChange={(e) => setValue(e.target.value)} type="text" id="large-input" className={inputClasses} />
        </div>
    )
}

export default LargeInput;