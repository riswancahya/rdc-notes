import React, {useContext, useEffect, useState} from 'react'
import db from '../db.config'
import Button from './button'
import CardNotes from './cardnotes'
import Empty from './empty'
import { store } from '../helper/context'

export default function Sidebar() {
    const { state, dispatch } = useContext(store)
    const [listNotes, setListNotes] = useState([])

    useEffect(()=>{
        getData()
    },[state])

    useEffect(()=>{
        getData()
    },[])

    const getData = async ()=>{
        const data_list = await db.notes.toArray();
        setListNotes(data_list)
    }

    const add = async () => {
        await db.notes.add({
            title: '',
            notes: ''
        });
        dispatch({type: 'update'})
        const data = await db.table('notes').orderBy('id').last()
        dispatch({type:"preview", payload:data})
    }

    const view = (data) => {
        dispatch({type:"preview", payload:data})
    }

    return (<div className="h-screen relative">
        <div className="overflow-y-auto h-full">
            {listNotes.map((data,ind)=> <CardNotes title={data.title} notes={data.notes} key={ind} onClick={()=> view(data)} /> )}
            {listNotes.length === 0 && <Empty />}
        </div>
        <Button onClick={add} />
    </div>)
}