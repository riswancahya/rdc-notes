import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../component/sidebar'
import Content from '../component/content'
import Modal from '../component/modal'

export default function Home() {
    const [modal, setModal] = useState(true)
    const installEl = useRef(null)
    useEffect(()=>{

        const check = localStorage.getItem('install') 

        if (check !== 'false'){
            let deferredPrompt;
            let addArea = installEl.current;
            addArea.style.display = 'none';
            let addBtn = document.querySelector('.a2hs-button');
            addBtn.style.display = 'none';

            window.addEventListener('beforeinstallprompt', (e) => {
                // Prevent Chrome 67 and earlier from automatically showing the prompt
                e.preventDefault();
                // Stash the event so it can be triggered later.
                deferredPrompt = e;
                // Update UI to notify the user they can add to home screen
                addBtn.style.display = 'block';
                addArea.style.display = 'block';
            
                addBtn.addEventListener('click', (e) => {
                // hide our user interface that shows our A2HS button
                addBtn.style.display = 'none';
                addArea.style.display = 'none';
                // Show the prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        localStorage.setItem('install', false)
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                    });
                });
            });

        } else {
            setModal(false)
        }

    },[])

    const toggle = (value) => {
        if (!value) {
            localStorage.setItem('install', false)
            setModal(false)
        }
    }
    
    return (<React.Fragment>
        <div className="grid grid-cols-1 lg:grid-cols-4 bg-gray-50 font-sans">
            <Sidebar />
            <Content />
        </div>
        {modal && <div ref={installEl} className="fixed font-sans h-0">
            <Modal 
                title="Install PWA" 
                description="Akses lebih mudah melalui layar beranda anda tanpa koneksi internet" 
                toggle={toggle} 
                confirm="Install" 
                install={true}
            />
        </div>}
    </React.Fragment>)
}
