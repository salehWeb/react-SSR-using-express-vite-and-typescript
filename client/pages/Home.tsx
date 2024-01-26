import { useState } from 'react'
import { LoaderType } from '../../types'
import type homeLoader from './homeLoader'

export const head = (args: LoaderType<typeof homeLoader>) => {
  return (
    <>
      <title>{`home head - ${args.data.id}`}</title>
      <meta rel='description' content={args.data.name} />
    </>
  )
}

const Home = (props: LoaderType<typeof homeLoader>) => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src="/react.svg" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1 className='text-6xl text-blue-500'>{props.data.name}</h1>
      <div className="card bg-blue-600">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/pages/Home.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Home
