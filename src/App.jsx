import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { ButtonCounter, GlobalListing, SquarePart } from './components'

function App() {
  const [val, setVal] = useState('');
  const [total, setTotal] = useState(0);
  const [isDisabled, setDisabled] = useState(false);
  const handleStep = (step) => {
    const num = Number(step);
    setTotal((previousValue) => {
      let newTotal = 0;
      if(num === 0) {
        newTotal = 0;
      } else {
        newTotal = previousValue + num;
      }
      setDisabled(newTotal > 9 || newTotal < 0);
      return newTotal;
    });
  }
  return (
    <>
    <SquarePart />
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <ButtonCounter sign="+" onStep={handleStep} disabled={isDisabled} />
        <div style={{padding: '0 1rem'}}>Total : {isDisabled ? "Done" : total}</div>
        <ButtonCounter sign="-" onStep={handleStep} disabled={isDisabled} />
        <ButtonCounter sign="reset" onStep={handleStep} />
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer">
        <GlobalListing />
      </section>
      <input value={val} onChange={e => setVal(e.target.value)} />
    </>
  )
}

export default App
