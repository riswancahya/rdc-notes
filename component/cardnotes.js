export default function Cardnotes({title, notes, onClick}) {
    return (<div className="p-2 bg-white rounded-xl shadow-md m-4 transition-all hover:bg-gray-100 cursor-pointer" onClick={onClick}>
        <div>
            <div className="text-sm font-medium text-black truncate">{title === '' ? <i>Tidak ada judul</i>: title}</div>
            <p className="text-gray-500 text-xs truncate">{notes === '' ? <i>(Catatan Masih kosong)</i> : notes}</p>
        </div>
    </div>)
}