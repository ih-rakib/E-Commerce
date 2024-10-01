
const FilterProducts = ({ filters, filteredState, setFilteredState, clearFilters }) => {
    return (
        <div className="space-y-5 flex-shrink-0">
            <h3>Filter Products</h3>

            {/* filter according to category */}

            <div className="flex flex-col space-y-2">
                <h4 className="font-medium text-lg">Category</h4>
                <hr />

                {
                    filters.categories.map((category) => (
                        <label key={category} className="capitalize cursor-pointer">
                            <input type="radio" name='category' value={category} checked={filteredState.category === category}
                                onChange={(e) => setFilteredState({ ...filteredState, category: e.target.value })} />
                            <span className="ml-1">{category}</span>
                        </label>
                    ))
                }
            </div>

            {/* filter according to price range */}

            <div className="flex flex-col space-y-2">
                <h4 className="font-medium text-lg">Price Range</h4>
                <hr />

                {
                    filters.priceRange.map((range) => (
                        <label key={range.label} className="capitalize cursor-pointer">
                            <input type="radio" name='priceRange' id="priceRange" value={`${range.min} - ${range.max}`} checked={filteredState.priceRange === `${range.min} - ${range.max}`}
                                onChange={(e) => setFilteredState({ ...filteredState, priceRange: e.target.value })} />
                            <span className="ml-1">{range.label}</span>
                        </label>
                    ))
                }
            </div>

            {/* clear filters */}
            <button onClick={clearFilters} className="bg-primary py-1 px-4 text-white rounded">Clear Filters</button>

        </div>
    )
}

export default FilterProducts