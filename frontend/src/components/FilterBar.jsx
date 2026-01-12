const filters=["All","React","JavaScript","Music","Gaming","Sports","Technology"];
function FilterBar(setCategory){
    return (
        <div className="filter">
            {filters.map((f)=>(
                <button className="filter-btn" key={f} onClick={()=>setCategory(f)}>
                    {f}
                </button>
        ))}
        </div>
    );
}

export default FilterBar;