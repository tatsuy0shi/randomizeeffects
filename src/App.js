import React, { useState, useEffect } from 'react';
import data from'./data.json'
import './App.css';
import { Button, Paper, CircularProgress, Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';

function App() {
  const [randoming, setRandoming] = useState(false)
  const [show, setShow] = useState(false)
  const [pause, setPause] = useState(false)
  const [store, setStore] = useState([])
  const [randomize, setRandomize] = useState(0)
  const [preset, setPreset] = useState(0)
  const [number, setNumber] = useState(0)
  const [note, setNote] = useState(0)
  const [count, setCount] = useState(300)

  useEffect(()=>{
    let tempstore
    if(number !== 0)
    {
      tempstore = {
        effect: data[randomize].effect,
        preset: data[randomize].presets[preset],
        number: number,
        time: new Date().toLocaleString()
      }
      setStore([...store,tempstore])
    }
    else if(note !== 0)
    {
      tempstore = {
        effect: data[randomize].effect,
        preset: data[randomize].presets[preset],
        note: note,
        time: new Date().toLocaleString()
      }
      setStore([...store,tempstore])
    }
    else
    {
      tempstore = {
        effect: data[randomize].effect,
        preset: data[randomize].presets[preset],
        time: new Date().toLocaleString()
      }
      setStore([...store,tempstore])
    }
  },[randomize])

  useEffect(()=>{
    if(!pause)
    {
      setTimeout(()=>{
        setCount(count-1)
      },[1000])
      if(count === 0)
      {
        Randomizer()
        setCount(300)
      }
    }
  })

  function Randomizer() {
    setRandoming(true)
    const range = Math.floor(Math.random() * data.length)
    const range2 = Math.floor(Math.random() * data[range].presets.length)
    
    setTimeout(()=>{
      if(data[range].number)
      {
        const ranNum = Math.floor(Math.random() * 71 + 1)
        setNumber(ranNum)
      }
      if(data[range].note)
      {
        const ranNote = Math.floor(Math.random() * 4 + 1)
        setNote(ranNote)
      } 
      else
      {
        setNumber(0)
        setNote(0)
      }
      setRandomize(range)
      setPreset(range2)
      setRandoming(false)
    },[1000])
  }

  return (
    <div className='App-header'>
      <Paper elevation={8} variant="elevation" style={{display:'flex', flexDirection:'column', width:'20vw', textAlign:'center', padding:'40px 20px 0 20px', height:'40vh'}}>
        {randoming ?
        <>
          <p style={{color:'grey'}}>{data[randomize].effect}</p>
          {data[randomize].note ? <p style={{color:'grey'}}>{data[randomize].presets[preset]}{note}</p> : data[randomize].number ? <p style={{color:'grey'}}>{data[randomize].presets[preset]} ({number})</p>
          :
          <p style={{color:'grey'}}>{data[randomize].presets[preset]}</p>
          }
        </>
        :
        <>
          <p>{data[randomize].effect}</p>
          {data[randomize].note ? <p>{data[randomize].presets[preset]}{note}</p> : data[randomize].number ? <p>{data[randomize].presets[preset]} ({number})</p>
          :
          <p>{data[randomize].presets[preset]}</p>
          }
        </>
        }
        {randoming ?
          <Button disabled variant="outlined" color="primary" style={{marginTop:'1vh'}}>randomizing... <CircularProgress size={15} style={{marginLeft:'0.5vw'}}/></Button>
        :
          <Button onClick={Randomizer} variant="outlined" color="primary" style={{marginTop:'1vh'}}>randomize</Button>
        }
        <Button onClick={()=>setShow(true)} style={{marginTop:'1vh'}}>Effects Rolled: {store.length - 1}</Button>
        <div style={{display:'flex', justifyContent:'space-between',padding:'0 25px'}}>
          <p>Rolling again in {count} seconds...</p>
          { pause ?
            <Button onClick={()=>setPause(false)}>Resume</Button>
            :
            <Button onClick={()=>setPause(true)}>Pause</Button>
          }
        </div>
      </Paper>
      <Dialog open={show} onClose={()=>setShow(false)}>
        <DialogTitle>Effects List</DialogTitle>
        <DialogContent style={{maxHeight:'60vh',overflow:'auto'}}>
          {store.map((item,id)=>
            id > 0 ?
            <div>
              <span>{item.time}: </span>
              <span>{item.effect} </span>
              <span>{item.preset}</span>
              {item.note ?
                <span>{item.note}</span>
                :
                item.number ? 
                <span> ({item.number})</span>
                :
                <></>
              }
            </div>
            :
            <></>
          )}
        </DialogContent>
        <DialogActions><Button onClick={()=>setShow(false)}>Close</Button></DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
