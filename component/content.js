import React, {useContext, useEffect, useState, useRef} from 'react'
import { store } from '../helper/context'
import db from '../db.config'
import autosize, { update } from "autosize";
import Modal from '../component/modal'

export default function Content(){
    const { state, dispatch } = useContext(store)
    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    const [modal, setModal] = useState(false)
    const inputEl = useRef(null)

    useEffect(()=>{
        autosize(inputEl.current)
        if (state.preview !== null){
            setTitle(state.preview.title)
            setNotes(state.preview.notes)
        }
    },[state.preview])


    const change = async (field, value) => {
        await db.table('notes').update(state.preview.id, { [field]: value })
        const data_list = await db.notes.toArray();
        const change = data_list.filter(x => x.id === state.preview.id)[0]
        dispatch({type: 'update'})
        dispatch({type:"preview", payload:change})
    }
    const hapus = async () => {
        await db.table('notes').delete(state.preview.id)
        dispatch({type: 'update'})
        dispatch({type:"preview", payload:null})
        setModal(false)
    }

    const update = async () => {
        await db.table('notes').update(state.preview.id, { title: title })
        await db.table('notes').update(state.preview.id, { notes: notes })
        dispatch({type: 'update'})
        dispatch({type:"preview", payload:null})
    }

    const renderIsi = () => {
        return (<div >
            <div className="flex">
                <textarea ref={inputEl} rows={1} className="text-xl my-2 focus:outline-none w-11/12" value={state.preview.title} onChange={e => change('title', e.target.value)} placeholder="Judul .." />
                <button className="absolute right-0 mx-4 focus:outline-none  hidden lg:block" onClick={() => setModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-500 w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
            <hr />
            <div className="my-2">
                <textarea className="w-full focus:outline-none" style={{height:"85vh"}} value={state.preview.notes} onChange={e => change('notes', e.target.value)} placeholder="Catatan .." />
            </div>
        </div>)
    }

    const renderMobile = () => {
        return (<div >
            <div className="flex">
                <textarea ref={inputEl} rows={1} className="text-xl my-2 focus:outline-none w-11/12" value={title} onChange={e => setTitle(e.target.value)} placeholder="Judul .." />
            </div>
            <hr />
            <div className="my-2">
                <textarea className="w-full focus:outline-none" style={{height:"85vh"}} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Catatan .." />
            </div>
            <button className="w-full p-3 bg-green-600 rounded-md focus:outline-none" onClick={() => update()} >Update</button>
        </div>)
    }
  
    return(<React.Fragment>
        <div className="lg:col-span-3 hidden lg:block bg-white p-4 ">
            {state.preview === null ? <div className="text-center p-24">Tidak Ada Data Di Pilih</div>
            : renderIsi()}
        </div>
        <div className="lg:hidden">
            <div className={ state.preview !== null ? "fixed h-screen bg-white bottom-0 w-screen transition-all duration-500" : "fixed h-screen bg-white -bottom-full w-screen  transition-all duration-500"} >
                <div className="shadow flex">
                    <button className="py-3 px-1 focus:outline-none" onClick={() => dispatch({type:"preview", payload:null})} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="absolute right-2 py-3 focus:outline-none" onClick={() => setModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-500 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
                <div className="p-4">
                    {state.preview !== null && renderMobile() }
                </div>
            </div>
        </div>

        {modal && <Modal toggle={setModal} modal={modal} toggleConfirm={hapus} title="Hapus Catatan!" description="Apakah Anda yakin akan menghapus catatan ini ?" confirm="Hapus" />}
    </React.Fragment>)
}