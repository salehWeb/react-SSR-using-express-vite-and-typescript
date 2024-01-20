import express from 'express';

export const preServe = async (req: express.Request) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { hello: "mom i love you" }
}

type myType = UnwrapPromise<ReturnType<typeof preServe>>;
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export const head = (props: myType) => {
  return (
    <>
      <title>hello page</title>
      <meta rel="description" content={props.hello} />
    </>
  )
}

const Hello = (props: myType) => {
  return (
    <div>
      <h1>Hello</h1>
      <p>{props.hello}</p>
    </div>
  )
}

export default Hello;
