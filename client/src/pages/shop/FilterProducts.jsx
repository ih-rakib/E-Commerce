
const FilterProducts = ({ filters, filteredState, setFilteredState, clearFilters }) => {
    return (
        <div className="space-y-5 flex-shrink-0 w-full md:w-60">
            <h3 className="text-lg font-semibold">Filter Products</h3>

            {/* filter according to category */}

            <fieldset className="flex flex-col space-y-2">
                <legend className="font-medium text-lg">Category</legend>
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
            </fieldset>

            {/* filter according to price range */}

            <fieldset className="flex flex-col space-y-2">
                <legend className="font-medium text-lg">Price Range</legend>
                <hr />

                {
                    filters.priceRange.map((range, idx) => {
                        const value = `${range.min} - ${range.max}`;
                        return (
                        <label key={range.label} className="capitalize cursor-pointer">
                            <input type="radio" name='priceRange' id={`priceRange-${idx}`} value={value} checked={filteredState.priceRange === value}
                                onChange={(e) => setFilteredState({ ...filteredState, priceRange: e.target.value })} />
                            <span className="ml-1">{range.label}</span>
                        </label>
                        );
                    })
                }
            </fieldset>

            {/* clear filters */}
            <button type="button" onClick={clearFilters} className="bg-primary py-1 px-4 text-white rounded hover:bg-primary-dark">Clear Filters</button>

        </div>
    )
}

export default FilterProducts
