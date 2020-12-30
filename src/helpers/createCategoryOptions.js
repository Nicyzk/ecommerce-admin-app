const createCategoryOptions = (categories, options = []) => {
    for (let cat of categories) {
        options.push(cat)
        if (cat.children.length > 0) {
            createCategoryOptions(cat.children, options)
        }
    }
    return options
}

export default createCategoryOptions