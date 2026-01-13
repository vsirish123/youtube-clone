const filters=["All","React","JavaScript","Music","Gaming","Sports","Technology"];
function FilterBar({setCategory}){
    return (
        <div style={{display:"flex",gap:10,marginBottom:20}}>
            {filters.map((f)=>(
                <button className="filter-btn" key={f} onClick={()=>setCategory(f)} style={{padding:"8px 15px",borderRadius:20,border:"1px solid #ccc",cursor:"pointer"}}>
                    {f}
                </button>
        ))}
        </div>
    );
}

export default FilterBar;