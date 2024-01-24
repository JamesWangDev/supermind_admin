export const RecursiveSet = ({ data, IncludeList }) => {
    if (data && typeof data == 'object') {
        Object.keys(data).forEach(key => {
            if (data[key] == 0 && IncludeList?.includes(key)) {
                data[key] = false
            } else if (data[key] == 1 && IncludeList?.includes(key)) {
                data[key] = true
            } else {
                RecursiveSet({ data: data[key] });
            }
        })
    }
}