export default function Addbutton({onClick}){
    return (<div className="absolute inset-x-0 bottom-0 p-2 text-right">
        <button className="mx-2 focus:outline-none" onClick={()=>onClick()} aria-label="Add Button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 flex-shrink-0 bg-white rounded-full shadow">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </button>
    </div>)
}