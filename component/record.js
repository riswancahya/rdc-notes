import React, { useState, useEffect } from 'react'

const Dictaphone = () => {
    const [listen, setListen] = useState(false)
    const [transcript, setTranscript] = useState('')

    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continous = true
    recognition.interimResults = true
    recognition.lang = 'id-ID'


    const doListen = (value) => {
        
        console.log('listening?', value)

        setListen(value)

        if (value) {
          recognition.start()
          recognition.onend = () => {
            console.log("...continue listening...")
            recognition.start()
          }


            recognition.onstart = () => {
                console.log("Listening!")
            }
        
            let finalTranscript = ''
            recognition.onresult = event => {
                let interimTranscript = ''
        
                for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) finalTranscript += transcript + ' ';
                else interimTranscript += transcript;
                }
                
                const transcriptArr = finalTranscript.split(' ')

                const stopCmd = transcriptArr.slice(-3, -1)
                console.log('stopCmd', stopCmd)
        
                if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
                recognition.stop()
                recognition.onend = () => {
                    console.log('Stopped listening per command')
                    const finalText = transcriptArr.slice(0, -3).join(' ')
                    setTranscript(finalText)
                }
                }

            }
    
        } else {
          recognition.stop()
          recognition.onend = () => {
            console.log("Stopped listening per click")
          }
        }
    
        
        
      //-----------------------------------------------------------------------
        
        recognition.onerror = event => {
          console.log("Error occurred in recognition: " + event.error)
        }
    }
        
    return (
        <div>
            <button onClick={() => doListen(!listen)}>{listen ? "Berhenti" : "Dengar"}</button>
            <p>{transcript}</p>
        </div>
    )
}
export default Dictaphone