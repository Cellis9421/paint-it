/**
 * Button styles from flowbite.com
 * https://flowbite.com/docs/components/buttons/
 */
const BUTTON_STYLES = "text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-r-lg px-5 py-2.5 text-center mr-2 mb-2"
const SPAN_STYLES = ''//`relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0`
const Button = ({ children, onClick }) => {
    return (
        <button className={BUTTON_STYLES} onClick={onClick}>
            <span className={SPAN_STYLES}>
                {children}
            </span>
        </button>)
}

export default Button;