import json from '../assets/text.json';

const NotFound = () => {
  return (
    <div>
      <h1 className="text-xl text-blue-500">NotFound</h1>
      <code>{JSON.stringify(json)}</code>
    </div>
  )
}

export default NotFound
