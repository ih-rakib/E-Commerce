
const FilterProducts = ({ filters, filteredState, setFilteredState, clearFilters }) => {
    return (
        <div className="space-y-5 flex-shrink-0 w-full md:w-60">
            <h3 className="text-lg font-semibold">Filter Products</h3>

            {/* filter according to category */}

            <fieldset className="flex flex-col space-y-2">
                <legend className="font-medium text-lg">Category</legend>
                <hr />

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:flex md:flex-col md:space-y-2">
                {
                    filters.categories.map((category) => (
                        <label key={category} className="capitalize cursor-pointer text-sm sm:text-base flex items-center gap-1 py-2 min-h-[44px] md:py-0.5 md:min-h-0">
                            <input type="radio" name='category' value={category} checked={filteredState.category === category}
                                onChange={(e) => setFilteredState({ ...filteredState, category: e.target.value })} />
                            <span className="ml-1">{category}</span>
                        </label>
                    ))
                }
                </div>
            </fieldset>

            {/* filter according to price range */}

            <fieldset className="flex flex-col space-y-2">
                <legend className="font-medium text-lg">Price Range</legend>
                <hr />

                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-x-4 gap-y-2 md:flex md:flex-col md:space-y-2">
                {
                    filters.priceRange.map((range, idx) => {
                        const value = `${range.min} - ${range.max}`;
                        return (
                        <label key={range.label} className="capitalize cursor-pointer text-sm sm:text-base flex items-center gap-1 py-2 min-h-[44px] md:py-0.5 md:min-h-0">
                            <input type="radio" name='priceRange' id={`priceRange-${idx}`} value={value} checked={filteredState.priceRange === value}
                                onChange={(e) => setFilteredState({ ...filteredState, priceRange: e.target.value })} />
                            <span className="ml-1">{range.label}</span>
                        </label>
                        );
                    })
                }
                </div>
            </fieldset>

            {/* clear filters */}
            <button type="button" onClick={clearFilters} className="bg-primary py-1 px-4 min-h-[44px] text-white rounded hover:bg-primary-dark">Clear Filters</button>

        </div>
    )
}

export default FilterProducts
