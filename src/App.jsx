function Square({ value }) {
  function handleClick() {
    console.log("Clicked!!!")
  }
  return (
    <button onClick={handleClick} className="bg-slate-600 border border-gray-400 h-24 w-24 m-1 leading-9 text-3xl font-bold rounded-md hover:bg-slate-900">{value}</button>
  )
}

export default function Board() {
  return (
    <>
      <div className="flex flex-col bg-slate-950 h-screen items-center justify-center">
        {/* First Row */}
        <div className="flex">
          <Square value="1"/>
          <Square value="2"/>
          <Square value="3"/>
        </div>

        {/* Second Row */}
        <div className="flex">
          <Square value="4"/>
          <Square value="5"/>
          <Square value="6"/>
        </div>
        
        {/* Third Row */}
        <div className="flex">
          <Square value="7"/>
          <Square value="8"/>
          <Square value="9"/>  
        </div>
      </div>
    </>
  )
}