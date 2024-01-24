import { useState } from 'react'
import { Request, Response } from 'express';

type LoaderType<T> = T extends (...args: any[]) => Promise<infer U> ? U : never;

export const loader = async (req: Request, res: Response) => {

  if (req.query?.name === "salih") {
    res.redirect("/1")
  }

  return { data: { name: "sailh home page", content: req.get("content-type") } }
}

export const head = (args: LoaderType<typeof loader>) => {
  return (
    <>
      <title>home head</title>
      <meta rel='description' content={args.data.name} />
    </>
  )
}

const Home = (props: LoaderType<typeof loader>) => {
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
