import { useMemo } from 'react'
import TopStore from './TopStore'
import SearchableSelectInput from '../../InputFields/SearchableSelectInput'
import { topStoreOption } from '../../../Data/TabTitleListData'
import { store } from '../../../Utils/AxiosUtils/API'

const TopStoreTable = ({ values, setFieldValue }) => {
    const onFilterChange = (name, value) => {
        setFieldValue("filter_by", value)
    }
    const params = useMemo(() => {
        return {
            filter_by: values['filter_by']?.value ?? 'today',
            paginate: 6,
            top_vendor: 1,
        }
    }, [values['filter_by']])
    return (
        <TopStore url={store} moduleName={'TopStores'} paramsProps={{ ...params }} filterHeader={{
            noPagination: true, noSearch: true, noPageDrop: true, customFilter: <SearchableSelectInput
                nameList={[
                    {
                        name: "filter_by",
                        notitle: "true",
                        inputprops: {
                            name: "filter_by",
                            id: "filter_by",
                            options: topStoreOption || [],
                            value: values['filter_by'] ? values['filter_by']?.name : '',
                        },
                        store: "obj",
                        setvalue: onFilterChange
                    },
                ]}
            />
        }} />
    )
}

export default TopStoreTable